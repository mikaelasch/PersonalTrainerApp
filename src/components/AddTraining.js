import * as React from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function AddTraining(props) {

    const[open,setOpen]=React.useState(false)
    const[training,setTraining] = React.useState({
        date:'', 
        activity:'',
        duration:'',
        customer:''
    })
    const handleClickOpen = () => {
        setTraining({...training, duration:'', customer: props.customer.links[0].href})
        setOpen(true)
    };
    const handleClose = () =>{
        setOpen(false)
    }
    const addTraining = () =>{
        props.addTraining(training)
        handleClose()
    }

    return(
        <div>
        <AddCircleOutlineIcon onClick={handleClickOpen}/>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add new training</DialogTitle>
            <DialogContent>
            <LocalizationProvider dateAdapter={AdapterMoment}>
             <DatePicker
                label="Date"
                value={training.date}
                onChange={value=> setTraining({...training,date:value})}
                renderInput={(params) => <TextField variant="standard"{...params} />}
                />
            </LocalizationProvider>
            <TextField  
                    margin="dense"
                    label="Activity"
                    fullWidth
                    variant="standard"
                    value={training.activity}
                    onChange={event => setTraining({...training, activity: event.target.value})}/>
            <TextField  
                    margin="dense"
                    label="Duration"
                    fullWidth
                    variant="standard"
                    value={training.duration}
                    onChange={event => setTraining({...training, duration: event.target.value})}/>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addTraining}>Save</Button>
        </DialogActions>
        </Dialog>
        </div>
    )
}