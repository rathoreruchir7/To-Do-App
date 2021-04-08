import React,{Component} from 'react';
import {Button,Label,Media,Form,FormGroup,Input,Nav,NavItem,Navbar,NavbarBrand,NavbarToggler,Collapse,Card,CardHeader,CardBody} from 'reactstrap';
import {LIST} from '../../shared/list';
import { withRouter, NavLink, Link } from 'react-router-dom';
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
            ID:3,
            theme: localStorage.getItem("theme"),
            currentItem:{
                id:0,
                title: '',
                description: '',
                tag:''
            },
            markedItem:{
                id: LIST[0].id,
                title: LIST[0].title,
                description: LIST[0].description,
                tag: LIST[0].tag
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
        this.setState({ list: nextProps.list });  
      }

    doMark()
    {   
        const newItem={
         id:this.state.markedItem.id,
         title: this.state.markedItem.title,
         description: this.state.markedItem.description,
         tag: 'complete'
        };
        this.setState(Object.assign(this.state.markedItem,{tag:'complete'}));
            

        const newList1=this.state.list.map((item)=>{
                if(item.id==this.state.markedItem.id)
                item.tag = !item.tag;
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
            const item={...this.state.currentItem,id:num,tag:'incomplete'}
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
                    description:''
                  },
                ID:this.state.ID+1 
            });
            
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
       });
    }
    deleteTask()
    {
        const filteredItem=this.state.list.filter((item)=>
        item.id !== this.state.markedItem.id);

        this.setState({
            list: filteredItem
        });
       
        const newMarkedItem = {
            id: '',
            title: '',
            description: ''
        };
        this.setState({
            markedItem: newMarkedItem
        });

    }

    markedFunction(id,title,description,tag){
        const newMarked={
            id: id,
            title: title,
            description: description,
            tag: tag
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
        // this.props.onChangeList(this.state.list)
        
        // this.props.fetchList(this.state.list)
        // console.log(this.props)

        this.props.history.push('/confirmation')
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
           if(item.tag=='incomplete'){
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
        console.log(this.props)
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
                onClick={(e) => this.onListChange(e)}>Save</Button>
            </div>

         </div>
         <div >
         <div className="col-12 col-md-3 offset-md-2 " >
            <Card className="card2" style={{opacity: theme=="dark"? "100%" : "70%"}}>
                <CardHeader >{this.state.markedItem.title}</CardHeader>
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
        <div className="col-12 col-md-3 offset-md-2">
            <Card className="card2" style={{opacity: theme=="dark"? "100%" : "70%"}}>
            <CardHeader>Add New Task</CardHeader>
            <CardBody>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" className="input1" id="title" name="title" value={this.state.currentItem.title} 
                     onChange={this.handleInputChange}
                    placeholder="Title of the Task" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" className="input1 input2" id="description" name="description" value={this.state.currentItem.description} 
                    onChange={this.handleInputChange}
                    placeholder="Description of the Task" />
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