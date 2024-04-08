// pages/CreateEvent.jsx

import  React, { useRef, useState } from "react";
import styles from '../styles/CreateEvent.module.css';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

const createevent = () => {
  const [formData, setFormData] = useState({
    name: '',
    seatsAvailable: '',
    category: '',
    date: '',
    initials: '',
    time: '',
    city: '',
    street: '',
    venueName: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      const response = await fetch('/api/createeventAPI', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('Event created successfully');
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Seats Available:</label>
          <input type="text" name="seatsAvailable" value={formData.seatsAvailable} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Initials:</label>
          <input type="text" name="initials" value={formData.initials} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Time:</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Street:</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Name of Venue:</label>
          <input type="text" name="venueName" value={formData.venueName} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default createevent;
