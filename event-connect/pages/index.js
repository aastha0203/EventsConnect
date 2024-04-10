import Head from "next/head";
import Image from "next/image";
import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa'; 
//import { FaDancing, FaMusic, FaTheaterMasks, FaMicrophoneAlt,FaSearch, FaTimes } from 'react-icons/fa';
import { Inter } from "next/font/google";
//import styles from "@/styles/Home.module.css";
//import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

/*export default function Home() {
  return (
    <div className={styles.container}>
      <Link href={'/signup'}>Signup</Link>
      <br>
      </br>
      <Link href={'/login'}>Login</Link>
      

    </div>
  );
}*/


import Link from 'next/link';
import styles from '@/styles/HomePage.module.css';

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
          <h1>event Connect</h1>
        </div>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search events"value={searchTerm}onChange={handleInputChange} className={styles.searchInput} />
          {searchTerm && <FaTimes className={`${styles.icon} ${styles.clearIcon}`} onClick={clearSearch} />}
          {!searchTerm && <FaSearch className={`${styles.icon} ${styles.searchIcon}`} />}
        </div>
        <div className={styles.navBar}>
          <ul>
            <li>
              <Link href="/BrowseEvents">Browse Events</Link>
              
             
            </li>
            <li>
              <Link href="/createevent">CreateEvent</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.image}>
        <img src="img1.jpg" />
      </div>
      
     
      </div>
      
    
  );
};

export default HomePage;
