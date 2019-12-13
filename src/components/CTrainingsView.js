import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ReactTable from 'react-table'
import { connect } from "react-redux"
import { deleteTraining, getTrainings } from "../reducers/trainingsReducer"
import { getTrainingsForCustomer } from "../reducers/customersTrainingsReducer"
import { newNotificationActionCreator } from "../reducers/notificationReducer"

const useStyles = makeStyles(theme => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const CTrainingsView = (props) => {
    const customersTrainingsUrl = props.cRow
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [booleanForFetch, setBoolean] = useState(false)
  
      
    //to fetch only when the dialog is clicked open("trainings" button)
    if(booleanForFetch){
      props.getTrainingsForCustomer(customersTrainingsUrl)
      setBoolean(false)
    }

    const handleDeleteClick = async (link) => {
      if(window.confirm("are you sure?")){
        try{
          await props.deleteTraining(link)
          await props.getTrainingsForCustomer(customersTrainingsUrl)
          props.newNotificationActionCreator("Training deleted")
        }catch(exception){
          console.error(exception)
        }
      }
    }
    const handleClickOpen = () => {
        setOpen(true);
        setBoolean(true)
      };
    
    const handleCloseDialog = async () => {
        setOpen(false);
        props.getTrainings()
    };

    const columns = [{
        Header: 'Date',
        accessor: 'date' 
      }, {
        Header: 'Activity',
        accessor: 'activity'
      }, 
      {
        Header: 'Duration',
        accessor: "duration"
      },
      {
        accessor: "",
        filterable: false,
        sortable: false,
        width: 75,
        Cell: row => <Button color="secondary" size ="small" 
        onClick={() => handleDeleteClick(row.original.links[1].href)}>Delete</Button>
    }
    ]
    

    return (
        
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Trainings
        </Button>
        <Dialog fullScreen open={open} onClose={handleCloseDialog} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Customers trainings
              </Typography>
              <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <ReactTable data = {props.customersTrainings} columns = {columns}></ReactTable>
        </Dialog>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customersTrainings: state.customersTrainings
  }
}

export default connect(mapStateToProps, { deleteTraining, getTrainingsForCustomer, getTrainings, newNotificationActionCreator })(CTrainingsView)