import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import EditCustomer from "./EditCustomer"
import Button from '@material-ui/core/Button';
import AddTraining from "./AddTraining"
import AddCustomer from "./AddCustomer"
import CTrainingsView from "./CTrainingsView"
import { connect } from "react-redux"
import { deleteCustomerActionCreator } from "../reducers/customerReducer"
import { newNotificationActionCreator } from "../reducers/notificationReducer"

const Customers = (props) => {

  const handleDeleteClick = (row) => {
    if(window.confirm("are you sure?")){
      try{
        props.deleteCustomerActionCreator(row.original.links[1].href)
        props.newNotificationActionCreator(`${row.original.firstname} ${row.original.lastname} was deleted`)
      }catch(exception){
        console.error(exception)
      }
    }
  }  
 
const columns = [{
    Header: 'First name',
    accessor: 'firstname' 
  }, {
    Header: 'Last name',
    accessor: 'lastname'
    
  }, 
  {
    Header: 'Street address',
    accessor: "streetaddress"
  }, 
  {
    Header: "Post code",
    accessor: "postcode"
  }, 
  {
    Header: "City",
    accessor: "city"
  }, 
  {
    Header: "Email",
    accessor: "email"
  }, 
  {
    Header: "Phone",
    accessor: "phone",
    filterable:false
  },
  {
    accessor: "",
    filterable: false,
    sortable: false,
    width: 75,
    Cell: row => <EditCustomer customer = {row.original} >Delete</EditCustomer>
  },
  {
    accessor: "",
    filterable: false,
    sortable: false,
    width: 75,
    Cell: row => <Button color="secondary" size ="small" 
    onClick={() => handleDeleteClick(row)}>Delete</Button>
  },
  {
    accessor: "",
    filterable: false,
    sortable: false,
    width: 125,
    Cell: row => <AddTraining dataOfCustomer={row.original} test={row} ></AddTraining>
  },
  {
    accessor: "",
    filterable: false,
    sortable: false,
    width: 125,
    Cell: row => <CTrainingsView cRow={row.original.links[2].href}></CTrainingsView>
  }
]
  return (
      <div>
        <AddCustomer ></AddCustomer>
        <ReactTable 
          data={props.customers}
          columns={columns}
          filterable={true}
        />
      </div>
    );
};

const mapStateToProps = (state) => {
  return {
    customers: state.customers
  }
}


export default connect(mapStateToProps, {
  deleteCustomerActionCreator,
  newNotificationActionCreator
})(Customers)