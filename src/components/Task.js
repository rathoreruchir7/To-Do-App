import React,{Component} from 'react';
import {Button,Label,Media,Form,FormGroup,Input,Nav,NavItem,Navbar,NavbarBrand,NavbarToggler,Collapse,Card,CardHeader,CardBody} from 'reactstrap';
import {LIST} from '../shared/list';

import { NavLink } from 'react-router-dom';


class Task extends Component{

    constructor(props){
        super(props);
        this.state={
            isNavOpen: false,
            list: LIST,
            ID:3,
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
    }
    doMark()
    {   const newItem={
         id:this.state.markedItem.id,
         title: this.state.markedItem.title,
         description: this.state.markedItem.description,
         tag: 'complete'
    };
    this.setState(Object.assign(this.state.markedItem,{tag:'complete'}));
            alert(JSON.stringify(newItem));

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
        
        alert(JSON.stringify(newList));
        
        
     
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
        alert(JSON.stringify(this.state.list));
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
    render(){
        
        const items = this.state.list.map((item)=>{
           if(item.tag=='incomplete'){
            return(
                <div className="col-12 mt-5 taskButtton" key={item.id}>
            <Button onClick={()=>this.markedFunction(item.id,item.title,item.description,item.tag)}>{item.title}</Button>   
            </div>
            );
           }

           else                                                            //ye upar wala onclick function ka type bahut imp hai
           {
               
            return(
                <div className="col-12 mt-5 taskButtton" key={item.id}>
            <Button onClick={()=>this.markedFunction(item.id,item.title,item.description)}>{item.title}<span className="fa fa-check fa-lg"></span></Button>   
            </div>
            ); 
           }
        });
        
        return(
            <React.Fragment>
            <div>
            <Navbar dark expand="md">
            <div className="container offset-md-6">
                <NavbarToggler onClick={this.toggleNav} />
                
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                    <NavItem>
                        <NavLink className="nav-link"  to='#'><span className="navbar-item">Edit Profile</span></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to='#'><span className="navbar-item">Delete Account</span></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link"  to='#'><span className="navbar-item">Logout From Device</span></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to='/login'><span className="navbar-item">Login</span></NavLink>
                    </NavItem>
                    </Nav>
                    
                </Collapse>
            </div>
        </Navbar>
        
    <div className="container">
            
         <div className="row">
          <div className="col-12 col-md-3">
         <Card>
            <CardHeader>Your Plans</CardHeader>
            <CardBody>
                {items}
                </CardBody>
         </Card>
         </div>
         <div >
         <div className="col-12 col-md-3 offset-md-3">
            <Card className="card2">
                <CardHeader>{this.state.markedItem.title}</CardHeader>
                <CardBody>{this.state.markedItem.description}</CardBody>
                <div className="row">
                    <div className="col-5 col-md-1 offset-md-6">
                        <Button className="btn-delete" onClick={this.deleteTask}>Delete Task <span className="fa fa-times-circle-o"></span></Button>
                        </div>
                        <div className="col-5 col-md-1 offset-1">
                        <Button className="btn-complete" onClick={this.doMark}>Mark As Completed <span className="fa fa-check-square"></span></Button>
                        </div>

                </div>
            </Card>
        </div>
        <div className="col-12 col-md-3 offset-md-3">
            <Card className="card2">
            <CardHeader>Add New Task</CardHeader>
            <CardBody>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input type="text" className="input1" id="title" name="title" value={this.state.currentItem.title} 
                     onChange={this.handleInputChange}
                    placeholder="Topic of the Task" />
                    </FormGroup>
                    <FormGroup>
                    <Input type="text" className="input1 input2" id="description" name="description" value={this.state.currentItem.description} 
                    onChange={this.handleInputChange}
                    placeholder="Description of the Task" />
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" className="offset-md-10 btn3">Add Task <span className="fa fa-plus-circle fa-lg"></span></Button>
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
export default Task;