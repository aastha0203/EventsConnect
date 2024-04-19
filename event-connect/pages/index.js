import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa'; 
import Link from 'next/link';
import styles from '@/styles/HomePage.module.css';
const categories = [
  { name: 'Music', icon: '/icons/microphone-icon.svg' },
  { name: 'DIY Workshops', icon: '/icons/brush-pencil-icon.svg' },
  { name: 'Dance', icon: '/icons/dance-icon.svg' },
  { name: 'Sports', icon: '/icons/table-tennis-icon.svg' },
  { name: 'Culinary', icon: '/icons/dish-spoon-knife-icon.svg' },
  { name: 'Poetry', icon: '/icons/author-writer-icon.svg' },
  { name: 'TED Talks', icon: '/icons/speak-speech-man-icon.svg' },
  { name: 'Webinar', icon: '/icons/conference-video-call-icon.svg' },
  { name: 'Magic Show', icon: '/icons/witch-cap-icon.svg' },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <h1>Event Connect</h1>
        </div>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search events"
            value={searchTerm}
            onChange={handleInputChange}
            className={styles.searchInput}
          />
          {searchTerm && <FaTimes className={`${styles.icon} ${styles.clearIcon}`} onClick={clearSearch} />}
          {!searchTerm && <FaSearch className={`${styles.icon} ${styles.searchIcon}`} />}
        </div>
        <nav className={styles.navBar}>
          <ul>
            <li>
              <Link href="/BrowseEvents">Browse Events</Link>
            </li>
            <li>
              <Link href="/createevent">Create Event</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.image}>
        <img src="img1.jpg" alt="Event" />
      </div>
      <div className={styles.categories}>
        {categories.map((category, index) => (
          <div className={styles.category} key={index}>
            <img src={category.icon} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
         </div>
    </div>
  );
};

export default HomePage;
