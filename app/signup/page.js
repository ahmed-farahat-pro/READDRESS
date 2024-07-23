"use client"
import { useState } from 'react';
import styles from '../styles/Auth.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
       
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
          
        }),
      });

      console.log(response)

      if (!response.ok) {
        const errorText = await response.text(); // Read the response as text
        console.error('Sign Up Error:', errorText); // Log the error response text
        throw new Error('Server error occurred'); // Throw a generic error
   
      }

      const data = await response.json();
      console.log('Sign Up Response:', data);
      // Redirect to OTP verification page
      window.location.href = 'http://localhost:3000/verify-otp';
    } catch (error) {
      console.error('Sign Up Error:', error.message);
    }
  };

  return (
     <div>  
    <div>    <Header isLoggedIn={false} /></div>
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp} className={styles.form}>
        <label className={styles.label}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className={styles.input}
          />
        </label>
         
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
      
    <div>   <Footer /></div>
    </div> 
  );
}
