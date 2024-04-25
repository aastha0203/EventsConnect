// pages/api/participant-signup.js
import { NextApiRequest, NextApiResponse } from 'next';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase.jsx';


import { sql } from '@vercel/postgres';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(405).end(); // Method Not Allowed
  }

  try {
    const participantData = request.body; // Assuming all required participant data is sent in the request body

    // Use Firebase Auth for participant signup
    const userCredential = await createUserWithEmailAndPassword(auth, participantData.email, participantData.password);
    // Signup successful, extract user ID
    const userId = userCredential.user.uid;

    // Store participant data in PostgreSQL database
    await storeParticipantData(userId, participantData);

    return response.status(201).json({ message: 'Participant signed up successfully' });
  } catch (error: any) {
    console.error('Error signing up participant:', error);
    return response.status(500).json({ error: 'Failed to sign up participant' });
  }
}

async function storeParticipantData(userId, participantData) {
  const { firstName, lastName, email, phone, role } = participantData;

  // Insert participant data into the database
  await sql`
    INSERT INTO Participant (P_FirstName, P_LastName, P_EmailId, P_contactNumber, P_initials)
    VALUES (${firstName}, ${lastName}, ${email}, ${phone}, ${role})
  `;
}
