"use client";
import { useState, useEffect, Suspense, lazy } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../../styles/listings.module.css';
import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';


// Dynamically import GoogleMaps with React.lazy
const GoogleMaps = lazy(() => import('../../components/GoogleMapsRender'));

export default function Listings() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!userId) return; // Don't fetch listings until we have the userId

    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();

        if (response.ok) {
          const approvedListings = data.listings.filter(listing => listing.status === 'approved' && listing.user_id._id === userId);
          setListings(approvedListings);
          console.log(approvedListings);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('Failed to fetch listings');
      }
    };

    fetchListings();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setListings(listings.filter(listing => listing._id !== id));
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete listing');
      }
    } catch (error) {
      setError('Failed to delete listing');
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      return; // Don't fetch listings if search term is empty
    }

    try {
      const response = await fetch(`/api/listings/search/${searchTerm}`);
      const data = await response.json();

      if (response.ok) {
        const approvedListings = data.listings.filter(listing => listing.status === 'approved' && listing.user_id === userId);
        setListings(approvedListings);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to fetch listings');
    }
  };

  if (!userId) {
    return <div>Loading...</div>; // Show a loading state while waiting for userId
  }

  console.log('Listings page userId:', userId);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1>My Listings</h1>
        <Link href={`/listings/new?userId=${userId}`}>
          <button>Add New Listing</button>
        </Link>
        <h1>Listings</h1>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.listings}>
          {listings.map((listing) => (
            <div key={listing._id} className={styles.listing}>
            
             
              <div className={styles['image-container']}>
                  <img  src={listing.images[0].image_url} alt={`Image`} />
              </div>
              
             
              <div className={styles.actions}>
                <Link href={`/listings/edit/listing/?id=${listing._id}&userId=${userId}`}>
                  <button style={{ backgroundColor: 'green', color: 'white', marginBottom: '10px', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Edit
                  </button>
                </Link>
                <button
                  style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                  onClick={() => handleDelete(listing._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
