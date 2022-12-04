import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Typography } from '@mui/material';


export default function Calendar(){
    const [trainings, setTrainings] = React.useState([])


    useEffect(() => getTrainings(),[])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

    return(
        <div>
            <Typography variant='h3'>
             Calendar
            </Typography>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                center: 'dayGridMonth,timeGridWeek,timeGridDay',
                 }}
         
            events={trainings.map((training) => {
                const calendar = {};
                calendar.date = training.date;
                calendar.title = [
                training.activity + ': ' +
                training.customer.firstname + ' ' +
                training.customer.lastname
              ];
            return calendar;
        })}
      />
        </div>
    )
}