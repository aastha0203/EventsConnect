/*import React from "react";
import { useRef } from "react";
const signup=()=>{
    const emailRef=useRef();
    const passwordRef=useRef();
    return(
        <div>
        <center>
        <h2>Event Connect </h2>
        <h1>Create An Account</h1>
        <form onSubmit={signup}>
        <input type='firstname' >
            </input>
            </form>

        </center>
        </div>
    )

}*/
//import React, { useRef } from "react";
import React, { useRef, useState } from "react";
//import {createUserWithEmailAndPassword} from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth} from './Firebase';
//import styles from "@/styles/Signup.module.css";
import styles from '../styles/signup.module.css';
import { FaCheck } from "react-icons/fa";
import { FaGoogle } from 'react-icons/fa'
//import styles from "./signup.module.css";


const signup = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const roleRef = useRef();
    const [error, setError] = useState(null);

    

    const signup =  (e) => {
        e.preventDefault();

        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const password = passwordRef.current.value;
        const role = roleRef.current.value;
        if (!firstName || !lastName) {
            setError("Please enter your first name and last name.");
            return;
          }
      
          if (!email) {
            setError("Please enter your email address.");
            return;
          }
      
          // Email validation using regular expression
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
          }
      
          if (!phone) {
            setError("Please enter your phone number.");
            return;
          }
      
          // Phone number validation
          if (!/^\d{10}$/.test(phone)) {
            setError("Please enter a valid 10-digit phone number.");
            return;
          }
      
          if (!password) {
            setError("Please enter a password.");
            return;
          }
      
          // Password validation
          if (password.length < 6) {
            ("Password must be at least 6 characters long.");
            return;
          }
      
          // Additional password validation
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
          if (!passwordRegex.test(password)) {
            alert("Wrong format of password");
            return;
          }
        createUserWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            const user =userCredential.user;
            alert('signup successful');
        })
        .catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.errorMessage;
            if (errorCode === 'auth/email-already-in-use') {
              alert('An account with this email already exists.');
            } 
            else{
            alert(errorMessage)
            }
        });
        

        

        /*try {
            
            await firebase.auth().createUserWithEmailAndPassword(auth,email, password);

            
            const user = firebase.auth().currentUser;
            await user.updateProfile({
                displayName: `${firstName} ${lastName}`
            });

            
            await firebase.firestore().collection('users').doc(user.uid).set({
                firstName,
                lastName,
                email,
                phone,
                role
            });

            console.log('User signed up successfully:', user);
            
        } catch (error) {
            console.error('Signup error:', error.message);
            
        }*/

    }
    const handleGoogleSignIn = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        alert('Google sign-in successful');
      } catch (error) {
        setError(error.message);
      }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
            
                <h3>Event Connect</h3>
                <h2>Create An Account</h2>
                <form onSubmit={signup}>
                  <div className={styles.inputGroup}>
                     <input type='text' placeholder="First Name" ref={firstNameRef} required />
                   </div>
                   <div className={styles.inputGroup}> 
                      <input type='text' placeholder="Last Name" ref={lastNameRef} required />
                    </div>
                    <div className={styles.inputGroup}>
                         <input type='email' placeholder="Email Address" ref={emailRef} required />
                    </div>
                    <div className={styles.inputGroup}>
                         <input type='tel' placeholder="Phone Number" ref={phoneRef} required />
                    </div>
                    <div className={styles.inputGroup}>

                       <input type='password' placeholder="Password" ref={passwordRef} required />
                    </div>
                    <div className={styles.inputGroup}>
                       <select ref={roleRef}>
                          <option value="organizer">Organizer</option>
                          <option value="participant">Participant</option>
                      </select>
                    </div>
                    <div>
                      <p>Your password must contain </p>
                        <p><FaCheck color="green" /> One uppercase letter[A-Z]</p>
                       <p><FaCheck color="green" />One lowercase letter[a-z]</p>
                        <p><FaCheck color="green" />One number[0-9]</p>
                        <p><FaCheck color="green" />One special character[ !@#$%^&*]</p>
                        <p><FaCheck color="green" />Should be at least 6 characters long.</p>
                    </div>
                    <button type="submit" className={styles.submitButton}>Sign Up</button>
                    
                </form>
                <div className={styles.orText}>Or</div>
                      <button className={styles.googleButton} onClick={handleGoogleSignIn}>
                         <FaGoogle className={styles.googleIcon}  /> Continue with Google
                        </button>
                {error && <p className={styles.error}>{error}</p>}
            </div>
                
            
        </div>
    );
};

export default signup;

