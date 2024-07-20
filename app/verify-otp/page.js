// pages/verify-otp.js
"use client"
import { useState } from 'react';
import styles from '../styles/Auth.module.css';
import axios from 'axios';

export default function VerifyOTP() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/verify-otp', { email, otp });
      console.log('Verify OTP Response:', response.data);
      // Redirect to a success page or log in the user
      window.location.href = '/login';
    } catch (error) {
      console.error('Verify OTP Error:', error.response.data);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Verify OTP</h1>
      <form onSubmit={handleVerifyOTP} className={styles.form}>
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
          OTP:
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>Verify</button>
      </form>
    </div>
  );
}
