"use client"; // Ensures this component is only rendered on the client side

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import styles from '../styles/Auth.module.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useUser } from '../../UserContext';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { login, user } = useUser();
  const router = useRouter(); // Get the router instance from Next.js

  useEffect(() => {
    if (user) {
      // Perform the redirection based on user type
      console.log(user);
      if (user.type === 'admin') {
        router.push('/listings/approve'); // Client-side navigation
      } else {
        router.push(`/listings?userId=${encodeURIComponent(user.userId)}&name=${encodeURIComponent(user.first_name)}`);
      }
    }
  }, [user, router]); // Dependency array ensures this runs when `user` is updated

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

        // Set user data in context
        await login(data);

        // After setting the user, redirection will be handled by useEffect
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
      <Header isLoggedIn={false} />
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
      <Footer />
    </div>
  );
}
