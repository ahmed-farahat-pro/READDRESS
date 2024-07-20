// pages/register-or-signin.js
"use client"
import Link from 'next/link';
import styles from './styles/RegisterOrSignIn.module.css';
import Header from './components/Header';
import Footer from './components/Footer';

export default function RegisterOrSignIn() {
  return (

    <div>
    <Header />
    <div className={styles.container}>
      <h1>Welcome</h1>
      <div className={styles.buttons}>
        <Link href="/signup">
          <button className={styles.button}>Sign Up</button>
        </Link>
        <Link href="/login">
          <button className={styles.button}>Log In</button>
        </Link>
      </div>
    </div>
 <Footer /> 
    </div>
  );
}
