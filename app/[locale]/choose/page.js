// pages/property-types.js
"use client";
import React from 'react';
import Link from 'next/link';
import styles from '../styles/PropertyTypes.module.css'; // Import CSS module for styling
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSearchParams } from 'next/navigation';

const propertyTypes = [
  'Apartment', 'House', 'Condo', 'Villa', 'Townhouse', 'Studio', 'Penthouse', 'Duplex',
  'Triplex', 'Loft', 'Flat', 'Bungalow', 'Cottage', 'Mansion', 'Farmhouse', 'Land',
  'Commercial', 'Office Space', 'Retail Space', 'Warehouse', 'Industrial'
];

const PropertyTypesPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type'); // Get the action type from the query parameters

  return (
    <div className={styles.container}>
      <Header isLoggedIn={false} />
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
      <Footer />
    </div>
  );
};

export default PropertyTypesPage;
