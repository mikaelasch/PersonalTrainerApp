import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Customers from './components/Customers'
import Trainings from './components/Trainings';
import Calendar from './components/Calendar'
import Tabs from '@mui/material/Tabs'
import Tab  from '@mui/material/Tab';
import './App.css';



function App() {

  const [value,setValue] = React.useState('one')
  
  const handleChange = (event, value) => {
    setValue(value)
  }
  
  return (
    <div className="App">
      
      <AppBar position='static' >
        <Toolbar >
          <Typography variant='h6'>
             Personal Trainer
          </Typography>
        </Toolbar>
      <Tabs value={value} onChange={handleChange}>
          <Tab value='one' label='Customers'></Tab>
          <Tab value='two' label='Trainings'></Tab>
          <Tab value='three' label='Calendar'></Tab>
      </Tabs>
      </AppBar>
        {value === 'one' && <div> <Customers/></div>}
        {value === 'two' && <div><Trainings/></div>}
        {value === 'three' && <div><Calendar/></div>}
    </div>
  );
}

export default App;
