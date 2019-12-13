import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux"
import { editCustomerActionCreator } from "../reducers/customerReducer"
import { newNotificationActionCreator } from "../reducers/notificationReducer"


const EditCustomer = (props) => {
    const[open, setOpen] = useState(false)
    const[customerState, setCustomer] = useState({firstname: "", lastname:"", streetaddress:"", postcode:"",
city:"", email:"", phone:""})


    function handleClickOpen() {
        setCustomer({firstname: props.customer.firstname, lastname: props.customer.lastname, streetaddress: props.customer.streetaddress,
             postcode:props.customer.postcode, city:props.customer.city, email:props.customer.email, phone:props.customer.phone})
        setOpen(true)
    }

    function handleClose(){
        setOpen(false)
    }

    function handleChange(e){
        setCustomer({...customerState, [e.target.name] : e.target.value})
    }
    const handleCloseSave = async () => {
      try{
        props.editCustomerActionCreator(customerState, props.customer.links[1].href)
        props.newNotificationActionCreator(`Customer ${customerState.firstname} ${customerState.lastname} edited`)
        setOpen(false)
      }catch(exception) {
        console.error(exception)
      }
    }
    return (
        <div>
        <Button size = "small" color="primary" onClick={handleClickOpen}>
        Edit
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit customer {props.customer.firstname} {props.customer.lastname}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update the information of the customer
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              label="Firstname"
              fullWidth
              onChange = {e => handleChange(e)}
              value = {customerState.firstname}
            />
            <TextField
            
              margin="dense"
              name="lastname"
              label="Lastname"
              fullWidth
              onChange = {e => handleChange(e)}
              value = {customerState.lastname}
            />
            <TextField
            
            margin="dense"
            name="streetaddress"
            label="Street address"
            fullWidth
            onChange = {e => handleChange(e)}
            value = {customerState.streetaddress}
            />
            <TextField
              
              margin="dense"
              name="postcode"
              label="Post code"
              fullWidth
              onChange = {e => handleChange(e)}
              value = {customerState.postcode}
            />
            <TextField
              
              margin="dense"
              name="city"
              label="City"
              fullWidth
              onChange = {e => handleChange(e)}
              value = {customerState.city}
            />
            <TextField
              
              margin="dense"
              name="email"
              label="Email"
              fullWidth
              onChange = {e => handleChange(e)}
              value = {customerState.email}
            />
            <TextField
              
              margin="dense"
              name="phone"
              label="Phone"
              fullWidth
              onChange = {e => handleChange(e)}
              value = {customerState.phone}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCloseSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    );
};

export default connect(null, { editCustomerActionCreator, newNotificationActionCreator })(EditCustomer)