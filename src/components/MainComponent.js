import React,{Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
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
        </Switch>
    );
    }
}
export default Main;