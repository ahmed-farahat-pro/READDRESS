"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/listings.module.css';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Listings() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!userId) return;

    const fetchListings = async () => {
      try {
        // Fetching with cache: 'no-store' to ensure fresh data
        const response = await fetch('/api/listings', {
          next: {
      tags: ['listings'],
      revalidate: 1,
    },
         
        });
        const data = await response.json();

        if (response.ok) {
          const approvedListings = data.listings.filter(listing => listing.status === 'approved');
          setListings(approvedListings);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('Failed to fetch listings');
      }
    };

    fetchListings();
  }, [userId]);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      // Fetching with cache: 'no-store' to ensure fresh data
      const response = await fetch(`/api/listings/search/${searchTerm}`, {
        cache: 'no-store',
       
      });
      const data = await response.json();

      if (response.ok) {
        const approvedListings = data.listings.filter(listing => listing.status === 'approved');
        setListings(approvedListings);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to fetch listings');
    }
  };

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.container}>
         <Header isLoggedIn={true} />

        <Link href={`/listings/new?userId=${userId}`}>
          <button>Add New Listing</button>
        </Link>
        <br />
        <Link href={`/listings/edit?userId=${userId}`}>
          <button>Edit Listing</button>
        </Link>
        <h1>Listings</h1>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title"
            style={{color:"#000000"}}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.listings}>
          {listings.map((listing) => (
            <Link key={listing._id} href={`/listings/show?data=${encodeURIComponent(JSON.stringify(listing))}`} className={styles.cardLink}>
              <div className={styles.listing}>
                {listing.images.length > 0 && (
                  <img
                    src={listing.images[0].image_url}
                    alt="Listing Image"
                    className={styles['image-container']}
                  />
                )}
                <h2>{listing.title}</h2>
                <p className={styles.price}>{listing.price} EGB</p>
              </div>
            </Link>
          ))}
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}
