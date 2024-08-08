"use client"; // Ensure you use "use client" if you are using the Next.js App Router

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/Category.module.css'; // Import CSS module for styling
import { useSearchParams } from 'next/navigation';

const CategoryPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  useEffect(() => {
    if (type) {
      // Construct the URL for the API request
      const apiUrl = `/api/choose/${type}`;
      
      // Fetch data from the API
      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setListings(data);
          console.log(listings);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [type]);

  return (
    <div className={styles.container}>
      <Header isLoggedIn={false} />
      <div className={styles.content}>
        <h1>You chose the following property type:</h1>
        <p className={styles.selectedType}>{type}</p>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}
        {!loading && !error && (
          <ul className={styles.listings}>
            {listings.length > 0 ? (
              listings.map((listing) => (
                <li key={listing.id} className={styles.listingItem}>
                  {/* Render listing details here */}
                  <h2>{listing.title}</h2>
                  <p>{listing.description}</p>
                </li>
              ))
            ) : (
              <p>No listings found.</p>
            )}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
