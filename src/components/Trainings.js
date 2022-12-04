import React, { useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'
import { TextField, Button } from "@mui/material";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';


export default function Trainings() {
  
    const[open,setOpen] = React.useState(false)
    const[trainings, setTrainings] = React.useState([])
    const[columnDefs] = React.useState([
        { width: 100, headerName: '', field:'links.0.href', cellRenderer:row=> <DeleteForeverIcon
    variant="contained" size="small" color="error" onClick={()=> deleteTraining(row.data.id)}/>},
        { headerName: 'Date', field: 'date' , sortable:true, filter:true, floatingFilter: true,
        cellRenderer: (data) => {
             return moment(data.value).format('MM/DD/YYYY HH:mm') }},
        {field: 'duration', sortable:true, filter:true, floatingFilter: true},
        {field: 'activity', sortable:true, filter:true, floatingFilter: true},
        { headerName: 'Lastname', field: 'customer.lastname', sortable: true, filter: true, width: 180   },
    { headerName: 'Firstname', field: 'customer.firstname', sortable: true, filter: true, width: 180   },
    
       
    ])

    useEffect(() => getTrainings(),[])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

    const deleteTraining= (id) => {
        if (window.confirm('Are you sure?')) {
          fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {method: 'DELETE'})
          .then (res => getTrainings() )
          .catch(err => console.error(err))
          setOpen(true);
        }
      }

    

    return(

        <div className='ag-theme-material' style={{width:'60%', height:500, margin:'auto'}}>
        <AgGridReact
            rowSelection='single'
            rowData={trainings}
            columnDefs={columnDefs}
            animateRows={true}>
       </AgGridReact>
    </div>
    )
}