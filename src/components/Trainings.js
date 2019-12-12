import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Button from '@material-ui/core/Button';
import { connect } from "react-redux"
import { getTrainingsWithCustomers } from "../reducers/trainingsWithCustomersReducer"
import { getTrainings, deleteTraining } from "../reducers/trainingsReducer"
import { newNotificationActionCreator } from "../reducers/notificationReducer"



//{getTrainings, deleteTraining}
const Trainings = (props) => {

  useEffect(() => {
    props.getTrainingsWithCustomers()
  }, [])
 
  const handleDeleteClick = async (link, row) => {
    if(window.confirm("are you sure?")){
      try {
        await props.deleteTraining(link)
        await props.getTrainingsWithCustomers()
        props.newNotificationActionCreator("Training deleted")
      }catch (exception) {
        console.error(exception)
      }
      
    }
}
  const baseUrlForDeletingTrainings = "https://customerrest.herokuapp.com/api/trainings/"

  const columns = [
    {
      Header: 'Customer',
      accessor: 'customer' // String-based value accessors!
    },
  {
    Header: 'Date',
    accessor: 'date' // String-based value accessors!
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
    onClick={() => handleDeleteClick(`${baseUrlForDeletingTrainings}/${row.original.id}`)
     }>Delete</Button>
}
]
  return (
      <div>
        <ReactTable 
          data={props.trainings}
          columns={columns}
          filterable={true}
        />
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    trainings: state.trainingsWithCustomers
  }
}

export default connect(mapStateToProps, { getTrainingsWithCustomers, getTrainings, deleteTraining, newNotificationActionCreator })(Trainings)