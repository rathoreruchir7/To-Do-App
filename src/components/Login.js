import React,{Component} from 'react';
import {Form,FormGroup,FormFeedback,Button,Input,Label} from 'reactstrap';

class Login extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            email:'',
            password: '',
            touched:{
                email: false,
                
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate(email)
    {
        const errors={
            email: ''
        };
        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1) 
            errors.email = 'Email should contain a @';
            return errors;

    }
    handleInputChange(event){
        const target=event.target;
        const value=target.value;
        const name=target.name;

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
        if (this.state.touched.email && JSON.stringify(this.state.email).split('').filter(x => x === '@').length !== 1) 
           alert('Email is incorrect');
        else
        alert('Current State is: ' + JSON.stringify(this.state));

        event.preventDefault();
    }
    render()
    {
        const errors=this.validate(this.state.email);
        return(
            <div>
                <div className="circle1">
              </div>

              <div className="circle2"> </div>
              <div className="circle3"></div>
             <div className="form1">
                 <div><h1>Welcome Back! Sign In</h1></div>
                 <div className="line"></div>
               <div className="form-class">
               <Form onSubmit={this.handleSubmit}>
                  <FormGroup row>
                      <Label htmlFor="email" className="label">Email</Label>
                      <Input type="text" id="email" name="email" value={this.state.email} className="inputFields" placeholder="&#xf2b6; john@example.com" 
                        valid={errors.email === ''}
                        invalid={errors.email !== ''}
                       onBlur={this.handleBlur('email')}
                        onChange={this.handleInputChange}/>
                        <FormFeedback className="offset-2">{errors.email}</FormFeedback>
                    </FormGroup>
                    <FormGroup row>
                      <Label htmlFor="password" className="label">Password</Label>
                      <Input type="password" id = "password" name= "password" value={this.state.password}className="inputFields" placeholder="&#xf023; ***********"
                        onChange={this.handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button className="offset-8 button1">Login<span className="fa fa-arrow-circle-right fa-lg arrow"></span></Button>
                    </FormGroup>
                    <FormGroup>
                        <div className="last1"><p>New user?<a href="/signup">  Register</a></p></div>
                        </FormGroup> 
              </Form>
            </div>
            </div>
            <div className="circle4"></div>
            <div className="div5"><div className="circle5"></div></div>
            <div className="circle6"></div>
           </div>
        );
    }
}
export default Login;