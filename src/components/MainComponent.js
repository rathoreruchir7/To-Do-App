import React,{Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Task from './Task';
class Main extends Component{
    constructor(props)
    {
        super(props);

    }
    render(){
    return(
        <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path = '/signup' component={SignUp} />
            <Route exact path = '/tasks' component={Task} />
            <Redirect to = '/login' component={Login} />
        </Switch>
    );
    }
}
export default Main;