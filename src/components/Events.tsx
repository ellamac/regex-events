import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Event from './Event';
import '../styles/events.css';
const Events = ({ eventObject }) => {
  const [event, setEvent] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvent(eventObject);
    setEvents(createEvents(eventObject));
  }, [eventObject, event]);

  useEffect(() => {}, [events]);

  const createEvents = (ev) => {
    const starts = ev.startTime || ev.startDate;
    const ends = ev.endTime || ev.endDate || starts || null;
    let currentDate = new Date(starts);
    let currentEvent = {
      name: ev.name,
      location: ev.location,
      starts,
      ends,
      type: 'firstDay',
    };

    let evs = [];

    if (ends?.toDateString() !== starts?.toDateString()) {
      while (
        new Date(currentDate?.toDateString()) <= new Date(ends?.toDateString())
      ) {
        currentEvent = {
          ...currentEvent,
          starts: new Date(currentDate),
          type:
            currentDate.toDateString() === starts.toDateString()
              ? 'firstDay'
              : currentDate.toDateString() === ends.toDateString()
              ? 'lastDay'
              : 'inbetweenDay',
        };
        evs.push(currentEvent);

        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else evs.push(currentEvent);

    return evs;
  };

  if (!eventObject) return <p>eioo</p>;
  return (
    <section className='events'>
      {events && events.length > 0 && events[0].name ? (
        events.map((e, i) => <Event
       key={i}
       name={e.name}
       starts={e.starts}
       ends={e.ends}
       location={e.location}
       type={e.type}
        />)
      ) : (
        <></>
      )}
    </section>
  );
};

export default Events;

