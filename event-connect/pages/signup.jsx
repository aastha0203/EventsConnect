import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from './Firebase';
import styles from '../styles/signup.module.css';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const userData = { firstName, lastName, email, phone, role };
      await storeUserDataInDatabase(userId, userData);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const storeUserDataInDatabase =  (userId, userData) => {
    try {
      const endpoint = userData.role === 'organizer' ? '/api/organizer-signup' : '/api/participant-signup';
      
      const response =  fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ...userData }),
      });

      if (!response.ok) {
        throw new Error('Failed to store user data');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to store user data');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupForm}>
        <h1>Create an Account</h1>
        <form onSubmit={handleSignup}>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="" disabled>Choose your role</option>
              <option value="organizer">Organizer</option>
              <option value="participant">Participant</option>
            </select>
          </div>
          <button type="submit" className={styles.signupButton}>Sign Up</button>
        </form>
        <div className={styles.orText}>Or</div>
        <button className={styles.googleButton} onClick={handleGoogleSignup}>
          <FaGoogle className={styles.googleIcon} /> Sign Up with Google
        </button>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.signupMessage}>
          Don't have an account?{" "}
          <span className={styles.signupLink}><Link href="/login">Login</Link></span>
        </p>
      </div>
      <div className={styles.greetingMessage}>
        <h1>Hello Friend!</h1>
        <h2>Fill out your personal details and start your journey with us.</h2>
        <div className={styles.passwordPolicy}>
          <h3>Please keep our password policy in mind while registering</h3>
          <ul>
            <li>One uppercase letter [A-Z]</li>
            <li>One lowercase letter [a-z]</li>
            <li>One number [0-9]</li>
            <li>One special character [!@#$%^&*]</li>
            <li>Should be at least 6 characters long</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Signup;
