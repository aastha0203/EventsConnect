import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from './Firebase';
import styles from '../styles/signup.module.css';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
//import {collection, addDoc } from "firebase/firestore";
//import { getFirestore, doc, setDoc } from "firebase/firestore";
const Signup = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const password = passwordRef.current.value;
    const role = roleRef.current.value;

    // Perform form validation here...

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Signup successful, perform additional actions if needed

      /*await addUserToFirestore(userCredential.user.uid, {
        firstName,
        lastName,
        email,
        phone,
        role,
      });*/
    } catch (error) {
      setError(error.message);
    }
  };
  /*const addUserToFirestore = async (userId, userData) => {
    const db = getFirestore();
    const userDocRef = doc(db, "Users", userId);
    await setDoc(userDocRef, userData);
  };*/

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Signup successful with Google, perform additional actions if needed
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupForm}>
        <h1>Create an Account</h1>
        <form onSubmit={handleSignup}>
          {/* Signup form inputs */}
          <div className={styles.inputGroup}>
            <input type="text" placeholder="First Name" ref={firstNameRef} required />
          </div>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Last Name" ref={lastNameRef} required />
          </div>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Email Address" ref={emailRef} required />
          </div>
          <div className={styles.inputGroup}>
            <input type="tel" placeholder="Phone Number" ref={phoneRef} required />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Password" ref={passwordRef} required />
          </div>
          <div className={styles.inputGroup}>
            <select ref={roleRef}>
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
        {/* Signup message with link to Login page */}
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
