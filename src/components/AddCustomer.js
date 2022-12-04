import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function AddCustomer (props) {
    const [open, setOpen] = React.useState(false)
    const [customer, setCustomer] = React.useState({
        firstname:'',
        lastname:'',
        streetaddress:'',
        postcode:'',
        city:'',
        email:'',
        phone: ''
    })
    

    const handleClickOpen = () => {
        setOpen(true)
    }
    
    const handleClose = () => {
        setOpen(false)
    }


    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    }
    return(
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
             Add customer 
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a new customer</DialogTitle>
                <DialogContent>
                 <TextField
                    margin="dense"
                    label="Firstname"
                    fullWidth
                    variant="standard"
                    value={customer.firstname}
                    onChange={event => setCustomer({...customer, firstname: event.target.value})}/>
                <TextField
                    margin="dense"
                    label="Lastname"
                    fullWidth
                    variant="standard"
                    value={customer.lastname}
                    onChange={event => setCustomer({...customer, lastname: event.target.value})}/>
                <TextField
                    margin="dense"
                    label="Streetaddress"
                    fullWidth
                    variant="standard"
                    value={customer.streetaddress}
                    onChange={event => setCustomer({...customer, streetaddress: event.target.value})}/>
                <TextField
                    margin="dense"
                    label="Postcode"
                    fullWidth
                    variant="standard"
                    value={customer.postcode}
                    onChange={event => setCustomer({...customer, postcode: event.target.value})}/>
                <TextField
                    margin="dense"
                    label="City"
                    fullWidth
                    variant="standard"
                    value={customer.city}
                    onChange={event => setCustomer({...customer, city: event.target.value})}/>
                <TextField
                    margin="dense"
                    label="Email"
                    fullWidth
                    variant="standard"
                    value={customer.email}
                    onChange={event => setCustomer({...customer, email: event.target.value})}/>
                <TextField
                    margin="dense"
                    label="Phone"
                    fullWidth
                    variant="standard"
                    value={customer.phone}
                    onChange={event => setCustomer({...customer, phone: event.target.value})}/>
                 </DialogContent>
                     <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                     <Button variant='contained' onClick={addCustomer}>Save</Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
}