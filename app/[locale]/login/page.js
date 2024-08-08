"use client"
import { useState } from 'react';
import styles from '../styles/Auth.module.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful');
        setError(null);
        console.log('Login successful:', data);

        // Redirect based on user type
        if (data.type === 'admin') {
          window.location.href = '/listings/approve'; // Example admin dashboard route
        } else {
            console.log(data)
         window.location.href = `/listings?userId=${encodeURIComponent(data.userId)}&name=${encodeURIComponent(data.first_name)}`;

        }
      } else {
        setError(data.error);
        setSuccess(null);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setSuccess(null);
    }
  };

  return (
     <div>  
    <div>   <Header isLoggedIn={false} /></div>
    <div className={styles.container}>
      
      <h1>Log In</h1>
      
      <form onSubmit={handleLogIn} className={styles.form}>
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
        <button type="submit" className={styles.button}>Log In</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    
    </div>
     <div>   <Footer /></div>
     </div>
  );
}
