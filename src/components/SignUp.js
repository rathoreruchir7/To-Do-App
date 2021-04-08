import React, {Component} from 'react';
import {Form,FormGroup,FormFeedback,Button,Input,Label} from 'reactstrap';


class SignUp extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            name: '',
            email: '',
            password: '',
            age: '',
            avatar: '',
            touched:{
                name:'',
                email: false,
                password: false,
                age: false,
                avatar: false
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }
    

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    validate(name,email,password,age,avatar)
    {
        const errors = {
            name: '',
            email: '',
            password: '',
            age: '',
            avatar: ''
        };

        if(this.state.touched.name && name.length<=3)
          errors.name='The name must be greater than 3 characteres';
        else if(this.state.touched.name && name.length>30)
          errors.name='The name should not exceed 30 characters';

        if(this.state.touched.email && email.split('').filter(x=> x=='@').length !=1)
          errors.email="The email should contain @";
        
        if(this.state.touched.password && password.length<5)
          errors.password='The password should be contain atleast five characters';
        
          if(this.state.touched.age && age<=0)
          errors.age='The age cannot be negative and Zero';
        
          return errors;
    }
    
    render()
    {
        const errors = this.validate(this.state.name, this.state.email, this.state.password, this.state.age,this.state.avatar);
        return(
            <div>
               <div className="circle1"></div>
               <div className="circle2"></div>
               <div className="circle3"></div>

               <div className="form2">
                 <div><h1>Register</h1></div>
                 <div className="line"></div>
               <div className="form-class-1">
               <Form onSubmit={this.handleSubmit}>
               <FormGroup row>
                      <Label htmlFor="name" className="label1">Name</Label>
                      <Input type="text" id="name" name="name" value={this.state.name} className="inputFields"
                        valid={errors.name === ''}
                        invalid={errors.name !== ''}
                       onBlur={this.handleBlur('name')}
                       onChange={this.handleInputChange}
                       placeholder="&#xf2c0; Enter your name" />  
                        <FormFeedback className="offset-2">{errors.name}</FormFeedback>                     
                    </FormGroup>
                  
                  <FormGroup row>
                      <Label htmlFor="email" className="label1">Email</Label>
                      <Input type="text" id="email" name="email"  value={this.state.email} className="inputFields"
                       valid={errors.email === ''}
                       invalid={errors.email !== ''}
                      onBlur={this.handleBlur('email')}
                      onChange={this.handleInputChange}
                      placeholder="&#xf2b6; john@example.com" /> 
                       <FormFeedback className="offset-2">{errors.email}</FormFeedback>                      
                    </FormGroup>
                    
                    <FormGroup row>
                      <Label htmlFor="password" className="label1">Password</Label>
                      <Input type="password" id = "password" name= "password" value={this.state.password} className="inputFields" 
                       valid={errors.password === ''}
                       invalid={errors.password !== ''}
                      onBlur={this.handleBlur('password')}
                     onChange={this.handleInputChange}
                      placeholder="&#xf023; ***********" />
                       <FormFeedback className="offset-2">{errors.password}</FormFeedback>
                    </FormGroup>
                   
                    <FormGroup row>
                     
                      <Label htmlFor="age" className="label1">Age</Label>
                      <Input type="text" id="age" name="age" value={this.state.age}  className="inputFields inputFields1 col-6 col-md-2"  
                       valid={errors.age === ''}
                       invalid={errors.age !== ''}
                      onBlur={this.handleBlur('age')}
                      onChange={this.handleInputChange}
                      placeholder="Your Age" />
                      
                       
                     
                      <Label htmlFor="avatar" className="label1 label2">Avatar</Label>
                      <Input type="file" id="avatar" name="avatar" value={this.state.avatar} className="inputFields inputFields1 col-6 col-md-3"  
                       valid={errors.avatar === ''}
                       invalid={errors.avatar !== ''}
                      onBlur={this.handleBlur('avatar')}
                      onChange={this.handleInputChange}
                      placeholder="&#xf2c0; Choose a file" /> 
                    </FormGroup>            

                   
                    
                    <FormGroup>
                        <Button className="offset-8 button2">Register<span className="fa fa-arrow-circle-right fa-lg arrow"></span></Button>
                    </FormGroup>
                    <FormGroup>
                        <div className="last"><p>Already a Member?  <a href="/login">Login</a></p></div>
                        </FormGroup> 
              </Form>
            </div>
            </div>

               <div className="circle4"></div>
               <div className="circle5"></div>
               <div className="circle6"></div>
            </div>
        );
    }
}
export default SignUp;

//ye values.author kaam nhi karta hai , seedha values pe chal raha tha.
                                        // button pe onclick function mat lagana
                                        //redux form use karna