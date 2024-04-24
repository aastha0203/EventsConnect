import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(405).end(); // Method Not Allowed
  }

  try {
    const eventData: {
      name: string;
      seatsAvailable: number;
      category: string;
      date: string;
      initials: string;
      time: string;
      city: string;
      street: string;
      venueName: string;
    } = request.body;

    // Extract event data from the request body
    const { name, seatsAvailable, category, date, initials, time, city, street, venueName } = eventData;

    // Insert event data into the database
    sql`
    INSERT INTO event (e_Name, seats_available, date, time, category, e_initials, name_of_venue, street, city)
    VALUES (${name}, ${seatsAvailable}, ${date}, ${time}, ${category}, ${initials}, ${venueName}, ${street}, ${city})
  `;
  

    return response.status(201).json({ message: 'Event created successfully' });
  } catch (error: any) {
    console.error('Error creating event:', error);
    return response.status(500).json({ error: 'Failed to create event' });
  }
}