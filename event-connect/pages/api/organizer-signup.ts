import { NextApiRequest, NextApiResponse } from 'next';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase'; // Corrected import path
import { sql } from '@vercel/postgres';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(405).end(); // Method Not Allowed
  }

  try {
    const organizerData = request.body; // Assuming all required organizer data is sent in the request body

    // Ensure that password field is provided and not empty
    if (!organizerData.password || organizerData.password.trim() === '') {
      return response.status(400).json({ error: 'Password is required' });
    }

    // Use Firebase Auth for organizer signup
    const userCredential = await createUserWithEmailAndPassword(auth, organizerData.email, organizerData.password);
    // Signup successful, extract user ID
    const userId = userCredential.user.uid;

    // Store organizer data in PostgreSQL database
    await storeOrganizerData(organizerData);

    return response.status(201).json({ message: 'Organizer signed up successfully' });
  } catch (error) { // Removed type annotation
    console.error('Error signing up organizer:', error);
    return response.status(500).json({ error: 'Failed to sign up organizer' });
  }
}

async function storeOrganizerData(organizerData) {
  const { email, contactNumber, firstName, lastName} = organizerData;

  try {
    // Insert organizer data into the database
    await sql`
      INSERT INTO Organizer (O_EmailId, O_ContactNumber, O_FirstName, O_LastName)
      VALUES (${email}, ${contactNumber}, ${firstName}, ${lastName})
    `;
  } catch (error) {
    console.error('Error storing organizer data:', error);
    throw error; // Rethrow the error to propagate it to the calling function
  }
}
