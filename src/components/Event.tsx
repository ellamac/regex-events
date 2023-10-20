import '../styles/events.css';

type EventProps = {
  starts: Date;
  type: 'inbetweenDay' | 'firstDay' | 'lastDay';
  ends: Date;
  name: string;
  location?: string;
};

const Event = ({ starts, type, ends, name, location }: EventProps) => {
  if (!name || !starts) return <></>;

  const timeToShow = () => {
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
      <h2 className='date'>
        {starts?.toLocaleDateString(undefined, {
          weekday: 'short',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })}
      </h2>
      <p className='time'>{timeToShow()}</p>
      <p className='name'>{name}</p>
      <p className='location'>{location ? '@ ' + location : ''}</p>
    </section>
  );
};

export default Event;
