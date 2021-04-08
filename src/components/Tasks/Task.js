import React,{Component} from 'react';
import {Button,Label,Media,Form,FormGroup,Input,Nav,NavItem,Navbar,NavbarBrand,NavbarToggler,Collapse,Card,CardHeader,CardBody} from 'reactstrap';
import {LIST} from '../../shared/list';
import { withRouter} from 'react-router-dom';
import background from '../background-circles.png';
import {connect} from 'react-redux';
import {fetchTasks, fetchList} from '../../redux/ActionCreators';
import { Toggle } from '@fluentui/react-toggle';


const mapStateToProps = state => {
    console.log(state.tasks.tasks)
    return {
        list: state.tasks.tasks,
        newList: state.newList.list
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTasks: () => {dispatch(fetchTasks())},
    fetchList: (list) => {dispatch(fetchList(list))}
})

class Task extends Component{

    constructor(props){
        super(props);
        this.state={
            isNavOpen: false,
            list: this.props.list,
            ID: 3,
            loading: false,
            theme: localStorage.getItem("theme"),
            currentItem:{
                id:0,
                title: '',
                description: '',
                tag:'incomplete',
                dueDate: ''
            },
            markedItem:{
                id: "",
                title: "",
                description: "",
                tag: "",
                dueDate: ""
            }


        }
        this.toggleNav = this.toggleNav.bind(this);
        this.markedFunction = this.markedFunction.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.doMark = this.doMark.bind(this);
        this.onListChange = this.onListChange.bind(this)
        this.handleThemeClick = this.handleThemeClick.bind(this)
    }

    componentDidMount(){
        this.props.fetchTasks()
        console.log(this.props.list)
        this.setState((prevState) => ({ ...prevState, list: this.props.list}, () => console.log("list-->", this.state.list)))
    }

    componentWillReceiveProps(nextProps) {
        const obj = nextProps.list[nextProps.list.length-1]
        if(obj!=undefined){
            console.log(obj.id)
            this.setState({ list: nextProps.list, ID: obj.id });
        }
            
          
      }

    doMark()
    {   
        const newItem={
         id:this.state.markedItem.id,
         title: this.state.markedItem.title,
         description: this.state.markedItem.description,
         tag: 'completed',
         dueDate: this.state.markedItem.dueDate
        };
        this.setState(Object.assign(this.state.markedItem,{tag:'completed'}));
            

        const newList1=this.state.list.map((item)=>{
                if(item.id==this.state.markedItem.id)
                    item.tag = this.state.markedItem.tag;
                return item;
        });
        this.setState({
            list:newList1
        })
    }

    handleSubmit(event)
    {    event.preventDefault();
         const num = this.state.ID+1;
        
         if(this.state.currentItem.title != "" && this.state.currentItem.description!=""){
            const item={...this.state.currentItem,id:num}
            this.setState(Object.assign(this.state.currentItem,{id:num}));  //ye dhyan rakh liyo aaj se Object.assign ke 
                                                                               //kuch aur kaam nhi karega.
    
            // this.setState({
            //     list: {...this.state.list,[item]}    //-> this thing doesnt work.
            // });
           
            // this.setState({
            //     list: [...this.state.list,item]     //-> this too doesnt work.
            // });
            const newList = [...this.state.list, item];
            this.setState({
                list:newList,
                currentItem:{
                    id: 0,
                    title:'',
                    description:'',
                    dueDate: '',
                    tag: ''
                  },
                ID:this.state.ID+1 
            }, () => console.log(this.state.list));
            
         }

         else{
             alert("The title and description of the task cannot be blank")
         }
    }
    handleInputChange(event){
        const target=event.target;
        const value=target.value;
        const name=target.name;
        const item={...this.state.currentItem,[name]:value}  //remember to put square brackets.
       this.setState({
           currentItem:item
       }, () => console.log(this.state.currentItem));
    }
    deleteTask()
    {
        const filteredItem=this.state.list.filter((item)=>
        item.id !== this.state.markedItem.id);

        console.log(filteredItem)
        this.setState({
            list: filteredItem
        }, () => console.log(this.state.list));
       
        const newMarkedItem = {
            id: '',
            title: '',
            description: ''
        };
        this.setState({
            markedItem: newMarkedItem
        });

    }

    markedFunction(id,title,description,tag, dueDate){
        const newMarked={
            id: id,
            title: title,
            description: description,
            tag: tag,
            dueDate: dueDate
        };
        this.setState({
            markedItem:newMarked
        });
    }
    toggleNav()
	{
		this.setState({isNavOpen : !this.state.isNavOpen});
  }

    

    onListChange(e){
        this.setState({loading: true}, () => console.log(this.state.loading));
        this.props.onChangeList(this.state.list)
        this.props.fetchList(this.state.list)
        setTimeout(() => {
            this.setState({ loading: false })
            this.props.history.push('/confirmation')
        }, 2000)       
        
    }

    handleThemeClick(){
        if(this.state.theme == "dark"){
            this.setState({theme: "light"}, () => console.log(this.state.theme))
            localStorage.setItem("theme", "light")
        }

        else{
            this.setState({theme: "dark"}, () => console.log(this.state.theme))
            localStorage.setItem("theme", "dark")
        }
        
    }
    render(){
        const theme = localStorage.getItem('theme')
        const items = this.state.list && this.state.list.map((item)=>{
           if(item.tag!='completed'){
            return(
                <div className="col-12 mt-5 taskButtton" key={item.id}>
            <Button color ="danger" className="taskbutton2" onClick={()=>this.markedFunction(item.id,item.title,item.description,item.tag)}>{item.title}</Button>   
            </div>
            );
           }

           else                                                            //ye upar wala onclick function ka type bahut imp hai
           {
               
            return(
                <div className="col-12 mt-5 taskButtton" key={item.id}>
            <Button className="taskbutton2" onClick={()=>this.markedFunction(item.id,item.title,item.description)}>{item.title}<span className="fa fa-check fa-lg"></span></Button>   
            </div>
            ); 
           }
        });
        
        return(
           
    <React.Fragment>
            <div className="body2" style={{ backgroundImage: `url(${background})`, backgroundColor: theme=='light'?'#f1e8e6': '#201F1F' }}>
            <Navbar dark expand="md">
            <div className="container offset-md-10">
                <Label for="data-test-theme-id" style={{color: theme=="dark"? "#ffffff": "#000000"}}>Theme</Label>
                <Toggle label="" id="data-test-theme-id"  defaultChecked={ theme == 'dark'? true: false}  onChange={this.handleThemeClick}/>
                <div style={{color: theme=="dark"? "#ffffff": "#000000"}}>{theme} mode</div>
            </div>
        </Navbar>
        
    <div className="container">
            
         <div className="row">
          <div className="col-12 col-md-3" >
             
            <Card style={{marginTop: "100px", opacity: theme=="dark"? "100%" : "70%"}}>
                <CardHeader>Your Plans</CardHeader>
                <CardBody>
                    {items}
                    </CardBody>
            </Card>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: "50px"}}>
                <Button className="save-button" 
                style={{
                    color: theme=="light"? "#0000CD": "#ffffff",
                    backgroundColor: theme=="light"? "#ffffff": "#0000CD",
                    border: theme=="light" ?"2px solid #0000CD": "none"
                }} 
                onClick={(e) => this.onListChange(e)}>{this.state.loading ? (<i class="fa fa-spinner fa-pulse fa-2x fa-fw text-primary"></i>) : "Save"}</Button>
            </div>

         </div>
         <div >
         <div className="col-12 col-md-3 offset-md-1" >
            <Card className="card2" style={{opacity: theme=="dark"? "100%" : "70%"}}>
                <CardHeader >{this.state.markedItem.title != "" ? this.state.markedItem.title: "No task selected"}</CardHeader>
                <CardBody>{this.state.markedItem.description}</CardBody>
                <div className="row">
                    <div className="col-5 col-md-1 offset-md-6">
                        <Button className="btn-delete" onClick={this.deleteTask} style={{
                            color: theme=="dark"? "#ffffff": "#000000",
                            backgroundColor: theme=="dark"? "#D10505": "#fb5951"}}>Delete Task <span className="fa fa-times-circle-o"></span></Button>
                        </div>
                        <div className="col-5 col-md-1 offset-1">
                        <Button className="btn-complete" onClick={this.doMark} style={{
                            color: theme=="dark"? "#ffffff": "#000000",
                            backgroundColor: theme=="dark"? "#0B9E02": "#a1dd70"}}>Mark As Completed <span className="fa fa-check-square"></span></Button>
                        </div>

                </div>
            </Card>
        </div>
        <div className="col-12 col-md-3 offset-md-1">
            <Card className="card2" style={{opacity: theme=="dark"? "100%" : "70%"}}>
            <CardHeader>Add New Task</CardHeader>
            <CardBody>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label sm={2} for="title">Title</Label>
                    <Input sm={5} type="text" className="input1" id="title" name="title" value={this.state.currentItem.title} 
                     onChange={this.handleInputChange}
                    placeholder="Title of the Task" />
                </FormGroup>
                
                <FormGroup row>
                    <Label sm={2} for="description">Description</Label>
                    <Input sm={5} type="text" className="input1 input2" id="description" name="description" value={this.state.currentItem.description} 
                    onChange={this.handleInputChange}
                    placeholder="Description of the Task" />
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} >Due Date</Label>
                    <Input sm={5} type="date" className="input1" id="dueDate" name="dueDate" value={this.state.currentItem.dueDate} 
                    onChange={this.handleInputChange}
                    placeholder="Description of the Task" />
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>Status</Label>
                    <Input type="select" name="tag" id="tag" className="input1" onChange={this.handleInputChange} value={this.state.currentItem.tag}>
                    <option selected>Incomplete</option>
                    <option>On Hold</option>
                    <option>Completed</option>
                </Input>
                </FormGroup>
                    <FormGroup>
                        <Button type="submit" className="offset-md-10 btn3" style={{backgroundColor: theme=="dark"? "#0B9E02": "#a1dd70"}}>Add Task <span className="fa fa-plus-circle fa-lg"></span></Button>
                    </FormGroup>
                </Form>
                </CardBody>
                </Card>

         </div>
         
        </div>
        
           </div>
        
            </div>
            </div>
            
            </React.Fragment>
            
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));


// "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")"