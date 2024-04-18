import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).end(); // Method Not Allowed
  }

  try {
    const eventData = request.body;

    // Extract event data from the request body
    const { name, seatsAvailable, category, date, initials, time, city, street, venueName } = eventData;

    // Insert event data into the database
    await sql`
      INSERT INTO events (name, seats_available, category, event_date, initials, event_time, city, street, venue_name)
      VALUES (${name}, ${seatsAvailable}, ${category}, ${date}, ${initials}, ${time}, ${city}, ${street}, ${venueName})
    `;

    return response.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    return response.status(500).json({ error: 'Failed to create event' });
  }
}
