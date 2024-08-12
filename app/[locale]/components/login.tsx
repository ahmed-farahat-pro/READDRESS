"use client"; // Ensures this component is only rendered on the client side

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import styles from '../styles/Auth-page.module.css';
import Footer from './Footer';
import Header from './Header';
import { useUser } from '../../UserContext';
import Link from 'next/link';
// Define types for login data
interface LoginData {
  email: string;
  password: string;
}

export default function LogIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { login, user } = useUser();

  const router = useRouter(); // Get the router instance from Next.js




  const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password } as LoginData),
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
<h1> Dont have an account ? </h1>
         <Link className={styles.link} href="/signup">
         SignUp
        </Link>
      </div>
  
    </div>
  );
}
