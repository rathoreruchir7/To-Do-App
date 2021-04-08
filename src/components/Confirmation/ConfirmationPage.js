import React, { useState } from 'react';
import background from '../background-circles.png';
import { Label, Button, Nav, NavItem, Navbar,NavbarToggler, Collapse, Card,CardHeader,CardBody } from 'reactstrap';
import { Link, withRouter, NavLink } from 'react-router-dom';
import {fetchList, saveTasks} from '../../redux/ActionCreators';
import {connect} from 'react-redux';
// import { Button} from '@fluentui/react-northstar'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import { PrimaryButton } from '@fluentui/react';
import { Toggle } from '@fluentui/react-toggle';


const mapStateToProps = state => {
    console.log(state)
    return {
        list: state.tasks.tasks, 
        newList: state.newList.list
    }
}

const mapDispatchToProps = dispatch => ({
    fetchList: (list) => {dispatch(fetchList(list))},
    saveTasks: (list, newList) => {dispatch(saveTasks(list, newList))}
})

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  

function ConfirmationPage(props) {
    console.log(props)
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [savingChanges, setSavingChanges] = useState(false)



    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    

    const classes = useStyles();
    const list = props.list
    const newList = props.newList
    const [theme, setTheme] = useState(localStorage.getItem('theme'))

    const findItem = (arr, title) => {
        for(let i=0; i<arr.length; i++)
        {
            if(arr[i].title == title)
                return 1;
        }
        return 0;
    }

    const addedItems = newList.filter((item) => {
        if(!findItem(list, item.title))
                return item;
            
    })

    const deletedItems = list.filter((item) => {
        if(!findItem(newList, item.title))
            return item;
    })

    function onSaveChanges(){
        setSavingChanges(true)
        setTimeout(() => {
            setSavingChanges(false)
        }, 3000)
    }

    function onSaveHandle(){
        onSaveChanges()

        props.saveTasks(list, newList)
    }

    function handleThemeClick(){
            if(theme == "dark"){
                setTheme("light")
                localStorage.setItem("theme", "light");
            }
                
            else{
                setTheme("dark")
                localStorage.setItem("theme", "dark")  
            }    
                      
    }

    
    return (
        <div style={{ backgroundImage: `url(${background})`, backgroundColor: theme == 'light' ? '#f1e8e6' : '#201F1F', height: "100vh", width: '100%' }}>
            <Navbar dark expand="md">
                <div className="container offset-md-10">
                    <Label for="data-test-theme-id" style={{color: theme=="dark"? "#ffffff": "#000000"}}>Theme</Label>
                    <Toggle id="data-test-theme-id" defaultChecked={ theme == 'dark'? true: false} onText="" offText=""  onChange={handleThemeClick}/>
                    <div style={{color: theme=="dark"? "#ffffff": "#000000"}}>{theme} mode</div>
                </div>
            </Navbar>

            <Grid container spacing={3} style={{display: "flex", flexDirection: "row", justifyContent: 'center', alignContent: "center" }}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card style={{opacity: theme=="dark"? "100%" : "70%"}}>
                        <CardHeader>New Items Added</CardHeader>
                        <CardBody>
                            {addedItems.length>0 ? addedItems : "No new tasks added"}
                        </CardBody>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card style={{opacity: theme=="dark"? "100%" : "70%"}}>
                        <CardHeader>Items Deleted</CardHeader>
                        <CardBody>
                            {deletedItems.length>0 ? deletedItems : "No previous tasks deleted"}
                        </CardBody>
                    </Card>
                </Grid>
            </Grid>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                <Button className="save-button" style={{
                                marginTop: "20px", width: "150px", 
                                color: theme=="light"? "#0000CD": "#ffffff",
                                backgroundColor: theme=="light"? "#ffffff": "#0000CD",
                                border: theme=="light" ?"2px solid #0000CD": "none"
                                }} 
                        onClick={onSaveHandle}>{ savingChanges ? (<i class="fa fa-spinner fa-pulse fa-2x fa-fw text-primary"></i>) : "Save Changes"}</Button>
            </div>
            
        </div>
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage))