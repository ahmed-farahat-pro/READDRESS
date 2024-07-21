"use client";
import { useEffect, useState, Suspense } from 'react';
import GoogleMaps from '../../components/GoogleMapsRender'; // Adjust import path as needed
import styles from '../../styles/listings.module.css';

// Fallback component to show while data is loading or if an error occurs
const LoadingFallback = () => <div>Loading...</div>;
const ErrorFallback = ({ error }) => <div className={styles.error}>{error}</div>;

const ListingItem = ({ listing, onApprove, onDelete }) => (
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
    <p>Status: {listing.status}</p>

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

    {listing.status === 'pending' && (
      <div>
        <button onClick={() => onApprove(listing._id)}>Approve</button>
      </div>
    )}

    <div> 
      <button onClick={() => onDelete(listing._id)}>Delete</button>
    </div>
  </div>
);

export default function PendingListings() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingListings = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();

        if (response.ok) {
          // Filter pending and approved listings
          const filteredListings = data.listings.filter(listing =>
            listing.status === 'pending' || listing.status === 'approved'
          );
          setListings(filteredListings);
        } else {
          setError(data.error || 'Failed to fetch listings');
        }
      } catch (error) {
        setError('Failed to fetch listings');
      }
    };

    fetchPendingListings();
  }, []);

  const approveListing = async (listingId) => {
    try {
      const response = await fetch(`/api/listings/approve/${listingId}`, {
        method: 'PUT',
      });

      const data = await response.json();

      if (response.ok) {
        // Update the UI to reflect the approved listing
        setListings(prevListings =>
          prevListings.map(listing =>
            listing._id === listingId ? { ...listing, status: 'approved' } : listing
          )
        );
      } else {
        setError(data.error || 'Failed to approve listing');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const deleteListing = async (listingId) => {
    try {
      const response = await fetch(`/api/listings/${listingId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the deleted listing from UI
        setListings(prevListings =>
          prevListings.filter(listing => listing._id !== listingId)
        );
      } else {
        setError(data.error || 'Failed to delete listing');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Pending and Approved Listings</h1>
      {error && <ErrorFallback error={error} />}
      <Suspense fallback={<LoadingFallback />}>
        <div className={styles.listings}>
          {listings.map((listing) => (
            <ListingItem
              key={listing._id}
              listing={listing}
              onApprove={approveListing}
              onDelete={deleteListing}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
