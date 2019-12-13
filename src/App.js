import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Customers from "./components/Customers"
import Trainings from "./components/Trainings"
import CalendarPage from "./components/CalendarPage"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { initializeCustomers } from "./reducers/customerReducer"
import { getTrainings } from "./reducers/trainingsReducer"
import { emptyNotificationActionCreator } from "./reducers/notificationReducer"
import { getTrainingsWithCustomers } from "./reducers/trainingsWithCustomersReducer"


function App(props) {

  //After the first render
  useEffect(()=>{
    //fetchCustomers()
    props.initializeCustomers()
    //fetchTrainings()
    props.getTrainings()

  }
    , [])

  function customerRender(){
    return (
      <Customers></Customers>
    )
  }  
  function trainingsRender(){
    return (
      <Trainings></Trainings>
    )
  }

  function calendarRender(){
    return <CalendarPage></CalendarPage>
  }

//Closing the snackbar 
  function handleClose(){
    
    props.emptyNotificationActionCreator()
  }

  return (
    <div>
      <Paper className="paper">
      <BrowserRouter>
      <AppBar className="appBar" position="static">
      
      
        <Toolbar>
          <Typography variant="h6" styles={{marginLeft: 0}}>
            Paavo's PT Company
          </Typography>
        </Toolbar>
      
        <div>
          
          <Link className="links" to="/customers" >Customers</Link>
          <Link className="links" to="/trainings">Trainings</Link>
          <Link className="links" to="/calendar">Calendar</Link>
        </div>
          
      </AppBar>
      
          <Switch>
            <Route exact path="/" render={customerRender}></Route>
            <Route exact path="/customers" render={customerRender}></Route>
            <Route exact path="/trainings" render={trainingsRender}></Route>
            <Route exact path="/calendar" render={calendarRender}></Route>
          </Switch>
      </BrowserRouter>
      <Snackbar open = {props.snackbarOpen} autoHideDuration={3000} onClose= {handleClose} message={props.notification}/>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      customers: state.customers,
      notification: state.notification.notification,
      snackbarOpen: state.notification.open
    }
}

export default connect(mapStateToProps, { initializeCustomers, 
  getTrainings, 
  emptyNotificationActionCreator,
  getTrainingsWithCustomers })(App)
