
"use client"
// pages/property-types.js
import React from 'react';
import Link from 'next/link';
import styles from '../styles/PropertyTypes.module.css'; // Import CSS module for styling
import Header from '../components/Header';
import Footer from '../components/Footer';

const propertyTypes = [
  'Apartment', 'House', 'Condo', 'Villa', 'Townhouse', 'Studio', 'Penthouse', 'Duplex',
  'Triplex', 'Loft', 'Flat', 'Bungalow', 'Cottage', 'Mansion', 'Farmhouse', 'Land',
  'Commercial', 'Office Space', 'Retail Space', 'Warehouse', 'Industrial'
];

const PropertyTypesPage = () => {
  return (
    <div className={styles.container}>
     <Header isLoggedIn={false}/>
      <div className={styles.buttonContainer}>
        {propertyTypes.map((type) => (
          <Link key={type} href={`/choose/category?type=${encodeURIComponent(type)}`}>
            <button className={styles.button}>{type}</button>
          </Link>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default PropertyTypesPage;
