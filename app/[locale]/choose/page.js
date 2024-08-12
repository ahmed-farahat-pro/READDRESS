// pages/property-types.js
"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/PropertyTypes.module.css'; // Import CSS module for styling
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSearchParams } from 'next/navigation';
import LogIn from "../components/login"
import { useUser } from '../../UserContext';
import { useState } from 'react';

const propertyTypes = [
  'Apartment', 'House', 'Condo', 'Villa', 'Townhouse', 'Studio', 'Penthouse', 'Duplex',
  'Triplex', 'Loft', 'Flat', 'Bungalow', 'Cottage', 'Mansion', 'Farmhouse', 'Land',
  'Commercial', 'Office Space', 'Retail Space', 'Warehouse', 'Industrial'
];

const PropertyTypesPage = () => {
const user = useUser();
const [logged,setLogged] = useState(false);
    useEffect(() => {
  
if (user !=null){
    setLogged(true);
}

  }, [user]);

  const searchParams = useSearchParams();
  const type = searchParams.get('type'); // Get the action type from the query parameters

  return (
    <div className={styles.container}>
          {type==="sell" &&  logged==false&&
        <div className='divlogitin'>
            
            <LogIn/>
            
            
            
            </div>}
      <Header isLoggedIn={logged} />
      <div>
        <h1 style={{ color: "#000" }}>
          {type === 'buy' ? 'Buying' : type === 'sell' ? 'Selling' : 'Select an Action'}
        </h1>

      
        {/* Conditionally render content based on the type */}
        {type === 'buy' && (
          <div className={styles.buttonContainer}>
            {propertyTypes.map((propertyType) => (
              <Link
                key={propertyType}
                href={`/choose/category?type=${encodeURIComponent(propertyType)}`}
              >
                <button className={styles.button}>{propertyType}</button>
              </Link>
            ))}
          </div>
        )}
        {type === 'sell' && (
          <div className={styles.buttonContainer}>
            {propertyTypes.map((propertyType) => (
              <Link
                key={propertyType}
                href={`/listings/new?propertyType=${encodeURIComponent(propertyType)}`}
              >
                <button className={styles.button}>{propertyType}</button>
              </Link>
            ))}
          </div>
        )}
        {!type && (
          <div className={styles.buttonContainer}>
            <Link href="?type=buy">
              <button className={styles.button}>Start Buying</button>
            </Link>
            <Link href="?type=sell">
              <button className={styles.button}>Start Selling</button>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default PropertyTypesPage;
