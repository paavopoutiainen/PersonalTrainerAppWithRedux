import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { connect } from "react-redux"

const localizer = momentLocalizer(moment)

const CalendarPage = (props) => {

   
    let events = props.trainings.map(t => {
        let date = new Date(t.date)
        
        let events = {
            start: date,
            end: new Date(moment(date).add(t.duration, "minutes")),
            title: t.activity
        }

        return events
    })  


    return (
            
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView='week'
            />
           
 
    );
};

const mapStateToProps = (state) => {
    return {
        trainings: state.trainings
    }
}

export default connect(mapStateToProps)(CalendarPage)