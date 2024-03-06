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
import React, { useRef } from "react";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from './Firebase';


const signup = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const roleRef = useRef();

    const signup =  (e) => {
        e.preventDefault();

        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const password = passwordRef.current.value;
        const role = roleRef.current.value;
        createUserWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            const user =userCredential.user;
            alert('signup successful');
        })
        .catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.errorMessage;
            alert(errorMessage)
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

    return (
        <div>
            <center>
                <h2>Event Connect</h2>
                <h1>Create An Account</h1>
                <form onSubmit={signup}>
                    <input type='text' placeholder="First Name" ref={firstNameRef} required />
                    <br />
                    <input type='text' placeholder="Last Name" ref={lastNameRef} required />
                    <br />
                    <input type='email' placeholder="Email Address" ref={emailRef} required />
                    <br />
                    <input type='tel' placeholder="Phone Number" ref={phoneRef} required />
                    <br />
                    <input type='password' placeholder="Password" ref={passwordRef} required />
                    <br />
                    <select ref={roleRef}>
                        <option value="organizer">Organizer</option>
                        <option value="participant">Participant</option>
                    </select>
                    <br />
                    <button type="submit">SignUp</button>
                </form>
            </center>
        </div>
    );
};

export default signup;

