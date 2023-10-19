import { useState, useEffect } from 'react';

import Event from './Event';
import '../styles/events.css';
import { Event as EventType } from '../helpers/types';

type EventsProps = {
  eventObject: EventType;
};

const Events = ({ eventObject }: EventsProps) => {
  const [event, setEvent] = useState<EventType>({
    name: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    setEvent(eventObject);
  }, [eventObject, event]);

  const createEvents = (ev: EventType): JSX.Element[] => {
    // how many days are inbetween start and end
    // (0 = start and end are the same day, 1 = start and end are right after each other (eg. mon-tue) )
    const dayCount = Math.floor(
      (ev.endDate.getTime() - ev.startDate.getTime()) / (1000 * 3600 * 24)
    );

    const evs = [];
    evs.push(
      <Event
        starts={ev.startDate}
        ends={ev.endDate}
        type='firstDay'
        name={ev.name}
        location={ev.location}
      />
    );
    if (dayCount > 0) {
      for (let i = 1; i < dayCount; i++) {
        const date = new Date(ev.startDate);
        date.setDate(date.getDate() + i);
        evs.push(
          <Event
            starts={date}
            ends={ev.endDate}
            type={'inbetweenDay'}
            name={ev.name}
            location={ev.location}
          />
        );
      }
      evs.push(
        <Event
          starts={ev.endDate}
          ends={ev.endDate}
          type='lastDay'
          name={ev.name}
          location={ev.location}
        />
      );
    }
    return evs;
  };

  if (!eventObject) return <p>eioo</p>;
  return <section className='events'>{createEvents(event)}</section>;
};

export default Events;
