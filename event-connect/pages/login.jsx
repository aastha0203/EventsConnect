import React, { useRef, useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from './Firebase';
import styles from '../styles/login.module.css';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link'; 

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError("An error occurred during Google login. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <div className={styles.slide}>
          <h2>Welcome Back!</h2>
          <p>We're excited to have you back. Login to access your account.</p>
        </div>
      </div>
      <div className={styles.loginForm}>
        <h1>Login to Your Account</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Email Address" ref={emailRef} required />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" placeholder="Password" ref={passwordRef} required />
          </div>
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
        <div className={styles.orText}>Or</div>
        <button className={styles.googleButton} onClick={handleGoogleLogin}>
          <FaGoogle className={styles.googleIcon} /> Login with Google
        </button>
        {error && <p className={styles.error}>{error}</p>}
        {/* Updated signup message */}
        <p className={styles.signupMessage}>Don't have an account? </p><p><Link href="/signup"><span className={styles.signupLink}>Signup</span></Link></p>
      </div>
    </div>
  );
};

export default Login;
