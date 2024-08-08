"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../../styles/listings.module.css';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Listings() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
    const [loading , setLoading] = useState(true);

  useEffect(() => {
  

    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();

        if (response.ok) {
          const approvedListings = data.listings;
          setListings(approvedListings);
          setLoading(false);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('Failed to fetch listings');
      }
    };

    fetchListings();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await fetch(`/api/listings/search/${searchTerm}`);
      const data = await response.json();

      if (response.ok) {
        const approvedListings = data.listings;
        setListings(approvedListings);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to fetch listings');
    }
  };


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.container}>
       <Header isLoggedIn={false} />


        
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", padding: "20px" }}>
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search by title"
    style={{
      backgroundColor: "white",
      border: "1px solid black",
      padding: "10px 20px",
      color: "#000000",
      borderRadius: "4px",
      width: "200px",
    }}
  />
  <button
    onClick={handleSearch}
    style={{
      backgroundColor: "white",
      border: "1px solid black",
      padding: "10px 20px",
      color: "#000000",
      borderRadius: "4px",
    }}
  >
    Search
  </button>
</div>

        {error && <p className={styles.error}>{error}</p>}
      {!loading ? (
  <div className={styles.listings}>
    {listings.map((listing) => (
      <Link
        key={listing._id}
        href={`/listings/approve/validate?data=${encodeURIComponent(JSON.stringify(listing))}`}
        className={styles.cardLink}
      >
        <div className={styles.listing}>
          {listing.images.length > 0 && (
            <img
              src={listing.images[0].image_url}
              alt="Listing Image"
              className={styles['image-container']}
            />
          )}
          <h2>{listing.title}</h2>
          <p className={styles.price}>{listing.price} EGP</p>
           <p className={styles.price}>{listing.status} </p>
        </div>
      </Link>
    ))}
  </div>
) : (
  <div className={styles.loading}>
    <p>Loading...</p>
  </div>
)}

        <Footer />
      </div>
    </Suspense>
  );
}