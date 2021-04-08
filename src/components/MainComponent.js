import React,{Component, useEffect} from 'react';
import { useState } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Task from './Tasks/Task';
import ConfirmationPage from './Confirmation/ConfirmationPage'
function Main(){
    
    const [theme, setTheme] = useState('');
    const [revisedList, setRevisedList] = useState(null) 

    function handleChange(){
            if(theme == 'light')
                {
                    setTheme('dark')
                    localStorage.setItem('theme', 'dark')
                }
            else{
                setTheme('light')
                localStorage.setItem('theme', 'light')
            }    
        
    }

    function handleChangeList(list){
        console.log(revisedList)
        setRevisedList(list);
    }

    // useEffect(() => {
    //     console.log(theme)
       
    // })

    // useEffect(() => {
    //     console.log(revisedList)
    // })

    
    // useEffect(() => {
    //     console.log(revisedList)
    // })


    
    
    return(
        <Router>
        <Switch>
            <Route exact path='/login' component={() => (<Login theme={theme} onChange={handleChange} />) }/>
            <Route exact path = '/signup' component={SignUp} />
            <Route exact path = '/tasks' component={(props) => ( <Task theme={theme} onChangeList = {handleChangeList} {...props}/>)} />
            <Route exact path='/confirmation' component={(props) => (<ConfirmationPage revisedList={revisedList} {...props}/>)} />
            <Redirect to = '/tasks' />
        </Switch>
        </Router>
    );
    
}
export default Main;