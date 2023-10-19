import { useState, useEffect } from 'react';

import './App.css';
import extractEventDetails from './helpers/parseEventDetails';
import Events from './components/Events';
import { Event } from './helpers/types';

type Text = string;

function App() {
  const [text, setText] = useState<Text>('');
  const [event, setEvent] = useState<Event>({
    name: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    if (text && text.length > 0) setEventDetails(text);
  }, [text]);

  const setEventDetails = (inputString: Text) => {
    const eventObject = extractEventDetails(inputString);

    if (eventObject && eventObject?.name && eventObject?.startDate) {
      setEvent(eventObject);
    }
    return eventObject;
  };

  const dateToISOLikeButLocal = (date: Date): string => {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal = date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    return iso;
  };

  const dateToICSTimestamp = (d: Date): string => {
    const date = dateToISOLikeButLocal(d)
      .replace(/:|\.|-/g, '')
      .slice(0, -4);

    return date;
  };

  const createICSFile = () => {
    if (event && event.name && event.startDate) {
      let icsMSG = 'BEGIN:VCALENDAR\nVERSION:2.0\r\n';
      icsMSG += `PRODID:-//${event.name}//NONSGML v1.0//FI\r\n`;
      icsMSG += 'BEGIN:VEVENT\r\n';
      icsMSG += `UID:${event.name}@${event.startDate}\r\n`;
      icsMSG += `DTSTAMP:${dateToICSTimestamp(new Date())}\r\n`;
      icsMSG += `DTSTART:${dateToICSTimestamp(event.startDate)}\r\n`;
      icsMSG +=
        event.endDate.valueOf() !== event.startDate.valueOf()
          ? `DTEND:${dateToICSTimestamp(event.endDate)}\r\n`
          : '';
      icsMSG += `SUMMARY:${event.name}\r\n`;
      icsMSG += event.location ? `LOCATION:${event.location}\r\n` : '';
      icsMSG += 'END:VEVENT\r\nEND:VCALENDAR';

      const file = new Blob([icsMSG], { type: 'text/calendar' });
      const element = document.createElement('a');
      element.href = URL.createObjectURL(file);
      element.download = 'newEvent' + Date.now() + '.ics';
      // simulate link click
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  return (
    <>
      <section>
        <h1>Luo tapahtuma</h1>
        <form id='newEventForm'>
          <label>
            tapahtuman kuvaus pp.kk.(-pp.kk.) (klo hh.mm[-hh.mm]) (sijainti)
            <input
              name='text'
              type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
        </form>
      </section>
      <section className='preview'>
        <h2>esikatselu</h2>
        <p>{text}</p>
        <Events eventObject={event} />
      </section>

      <button onClick={createICSFile}>Tallenna tapahtuma kalenteriin</button>
    </>
  );
}

export default App;
