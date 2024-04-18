import { useState } from 'react';
import EventCard from './EventCard';
import styles from '../styles/BrowseEvents.module.css'; // Import the CSS file

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Hardcoded events
  const events = [
    {
      id: 1,
      name: 'Concert in the Park',
      seatsAvailable: 100,
      category: 'Music',
      date: '2024-04-15',
      initials: 'CP',
      time: '19:00',
      city: 'New York',
      street: 'Central Park',
      venueName: 'Central Park',
    },
    {
      id: 2,
      name: 'Food Festival',
      seatsAvailable: 50,
      category: 'Food',
      date: '2024-05-01',
      initials: 'FF',
      time: '12:00',
      city: 'Los Angeles',
      street: '123 Main St',
      venueName: 'Downtown LA',
    },
  ];

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || event.category === selectedCategory)
  );

  return (
    <div>
      <div className={styles["search-bar"]}>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles["search-input"]} // Add custom class for input
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className={styles["category-select"]} // Add custom class for select
        >
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Food">Food</option>
          <option value="Dance">Dance</option>
          <option value="Sports">Sports</option>
        </select>
      </div>
      <div className={styles["events-container"]}>
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
