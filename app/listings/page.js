"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/Listings.module.css';
import Link from 'next/link';
import GoogleMaps from '../components/GoogleMapsRender';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
    if (!searchTerm) {
      return; // Don't fetch listings if search term is empty
    }

    try {
      const response = await fetch(`/api/listings/search/${searchTerm}`);
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
    return <div>Loading...</div>; // Show a loading state while waiting for userId
  }

  console.log('Listings page userId:', userId);

  return (
    
    <div className={styles.container}>
        <Header />
        
      <Link href={`/listings/new?userId=${userId}`}>
        <button>Add New Listing</button>
      </Link>
      <br></br>
        <Link href={`/listings/edit?userId=${userId}`}>
        <button>editListing</button>
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
            <h2>{listing.title}</h2>
            <p>{listing.description}</p>
            <p>Price: ${listing.price}</p>
            <p>Bedrooms: {listing.bedrooms}</p>
            <p>Bathrooms: {listing.bathrooms}</p>
            <div className={styles.images}>
              {listing.images.map((image, index) => (
                <img key={index} src={image.image_url} alt={`Image ${index + 1}`} />
              ))}
            </div>
                <div>
      <h1>Google Maps Location</h1>
      <GoogleMaps googleMapsUrl={listing.maps_url} />
    </div>
     <a 
                href={`tel:${listing.user_id.phone_number}`}
                style={{ backgroundColor: 'blue', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block', marginTop: '10px' }}
              >
                Call
              </a>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
