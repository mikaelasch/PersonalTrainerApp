import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {CSVLink} from 'react-csv'
import { Typography } from "@mui/material";

export default function Customers(training) {
    const[open,setOpen] = React.useState(false)
    const[customers, setCustomers] = useState([])
    const[columnDefs] = useState([
        { width: 100, headerName: '', field:'links.0.href', cellRenderer:row=> <DeleteForeverIcon  size="small" color="error" onClick={()=> deleteCustomer(row.value)}/>},
        { width:120,
            cellRenderer: params => <EditCustomer data={params.data} editCustomer={editCustomer}/>},
        { width: 150,
            cellRenderer:row =><AddTraining addTraining={addTraining} customer= {row.data}/> },
        {field:'firstname', sortable:true, filter:true, floatingFilter: true},
        {field:'lastname',sortable:true, filter:true, floatingFilter: true},
        {field:'streetaddress',sortable:true, filter:true, floatingFilter: true},
        {field:'postcode',sortable:true, filter:true, floatingFilter: true},
        {field:'city',sortable:true, filter:true, floatingFilter: true},
        {field:'email',sortable:true, filter:true, floatingFilter: true},
        {field:'phone',sortable:true, filter:true, floatingFilter: true},
        
    ])


    useEffect(() => getCustomers(),[])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', 
        {method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(customer)
    })
        .then(response => {
            if(response.ok)
            getCustomers()
            else 
            alert('Something went wrong with adding a new customer')
        })
            .catch(err=> console.error(err))


    }

    const editCustomer = (customer,url) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(customer)
        })
            .then(response => {
                if(response.ok)
                getCustomers()
                else
                alert('Something went wrong in edit')
            })
            .catch(err => console.error(err))

    }

    const deleteCustomer = (url) => {
        if (window.confirm('Are you sure you want to delete customer?')) {
          fetch(url, {method: 'DELETE'})
          .then (res => getCustomers() )
          .catch(err => console.error(err))
          setOpen(true);
        }
      }

      function addTraining(training){
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => getCustomers())
            .catch(err => console.error(err))
    }
    
    
    return(
        <>
        <Typography variant='h3'>
            Customers
          </Typography>
        <AddCustomer saveCustomer={saveCustomer}/>
        <div className='ag-theme-material' style={{width:'60%', height:500, margin:'auto'}}>
        <CSVLink data={customers} >Download as CSV</CSVLink>
        <AgGridReact
            rowSelection='single'
            rowData={customers}
            columnDefs={columnDefs}
            animateRows={true}>
       </AgGridReact>
       
        </div>
    </>
    )
}