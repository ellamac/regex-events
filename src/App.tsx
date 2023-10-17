import { useState, useEffect } from 'react';

import './App.css';
import extractEventDetails from './helpers/parseEventDetails';
import Events from './components/events';

function App() {
  const [text, setText] = useState('');
  const [event, setEvent] = useState({});

  useEffect(() => {
    if (text && text.length > 0) setEventDetails(text);
  }, [text]);

  const setEventDetails = (inputString) => {
    const eventObject = extractEventDetails(inputString);

    if (eventObject && eventObject?.name && eventObject?.startDate) {
      setEvent(eventObject);
    }
    return eventObject;
  };

  const dateToICSTimestamp = (d) => {
    const date = d
      .toISOString()
      .replaceAll(':', '-')
      .replaceAll('.', '-')
      .split('-')
      .join('')
      .slice(0, -4);
    /* const YYYY = date.getUTCFullYear();
    const MM = date.getUTCMonth();
    const DD = date.getUTCDate();
    const HH = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds();

    const timestamp = YYYY + MM + DD + 'T' + HH + mm + ss; */
    console.log('date', date);
    /*     console.log(YYYY);
    console.log(MM);
    console.log(DD);
    console.log(HH);
    console.log(mm);
    console.log(ss); */

    return date;
  };
  const createICSFile = () => {
    if (event && event.name && event.startDate) {
      let icsMSG = 'BEGIN:VCALENDAR\nVERSION:2.0\r\n';
      icsMSG += 'PRODID:-//EllaMakela//NONSGML v1.0//FI\r\n';
      icsMSG += 'BEGIN:VEVENT\r\n';
      icsMSG += 'UID:ella@makela.co\r\n';
      icsMSG += `DTSTAMP:${dateToICSTimestamp(new Date())}\r\n`;
      icsMSG += `DTSTART:${dateToICSTimestamp(event.startDate)}\r\n`;
      icsMSG += event.endDate
        ? `DTEND:${dateToICSTimestamp(event.endDate)}\r\n`
        : '';
      icsMSG += event.location ? `LOCATION:${event.location}\r\n` : '';
      icsMSG += 'END:VEVENT\r\nEND:VCALENDAR';
      console.log('icsmMFS', icsMSG);
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
