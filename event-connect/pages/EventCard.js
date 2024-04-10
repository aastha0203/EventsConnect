import styles from '../styles/EventCard.module.css';

const EventCard = ({ event }) => {
  return (
    <div className={styles['event-card']}>
      <h2>{event.name}</h2>
      <p>Seats Available: {event.seatsAvailable}</p>
      <p>Category: {event.category}</p>
      <p>Date: {event.date}</p>
      <p>Initials: {event.initials}</p>
      <p>Time: {event.time}</p>
      <p>Location: {event.city}, {event.street}, {event.venueName}</p>
    </div>
  );
};

export default EventCard;
