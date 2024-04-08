export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Retrieve form data from the request body
        const { name, seatsAvailable, category, date, initials, time, city, street, venueName } = req.body;
  
        // Execute SQL query to create the Event table
        await sql`
          CREATE TABLE IF NOT EXISTS Event (
            EventId SERIAL PRIMARY KEY,
            E_Name VARCHAR(50),
            Seats_available INT,
            Date DATE,
            Time TIME,
            Category VARCHAR(30),
            E_initials CHAR(30), 
            Name_of_venue VARCHAR(50),
            Street VARCHAR(50),
            City VARCHAR(50)
          );
        `;
  
        // Send response indicating success
        res.status(200).json({ message: 'Event table created successfully' });
      } catch (error) {
        // Handle error and send response
        console.error('Error creating event table:', error);
        res.status(500).json({ error: 'Failed to create event table' });
      }
    } else {
      // Method not allowed
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  