
import '../styles/events.css';

type EventProps= {
  starts: Date,
  type: string,
  ends?: Date,
  name: string,
  location?: string
}

const Event = ({starts, type, ends, name, location}: EventProps) => {
  if (!event) return <></>;

  const timeToShow = (type, starts, ends) => {
    let textToShow = '';
    let time = '';
    switch (type) {
      case 'inbetweenDay':
        textToShow = 'koko päivä';
        break;
      case 'lastDay':
        time = ends.toLocaleTimeString().slice(0, -3);
        textToShow = time === '0.00' ? 'koko päivä' : '- ' + time;
        break;
      case 'firstDay':
        time = starts.toLocaleTimeString().slice(0, -3);
        textToShow = time === '0.00' ? 'koko päivä' : time + ' - ';
        if (
          starts.toLocaleDateString() === ends.toLocaleDateString() &&
          starts.toLocaleTimeString() !== ends.toLocaleTimeString()
        )
          textToShow += ends.toLocaleTimeString().slice(0, -3);
        break;
      default:
        break;
    }
    return textToShow;
  };
  return (
    <section className='event'>
      <h2 className='date'>{starts?.toLocaleDateString()}</h2>
      <p className='time'>{timeToShow(type, starts, ends)}</p>
      <p className='name'>{name}</p>
      <p className='location'>{location ? '@ ' + location : ''}</p>
    </section>
  );
};

export default Event;
