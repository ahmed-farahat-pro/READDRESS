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
  const [loading , setLoading] = useState(true);

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
          setLoading(false);
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

<div style={{ display: "flex", flexDirection: "row", gap: "10px" , justifyContent:"space-between" }}>
      <Link href={`/listings/new?userId=${userId}`}>
    <button style={{ backgroundColor: "white", border: "1px solid black", padding: "10px 20px" ,color:"#000000",borderRadius:"10px"}}>
      New
    </button>
  </Link>
     <Link href={`/listings/edit?userId=${userId}`}>
    <button style={{ backgroundColor: "white", border: "1px solid black", padding: "10px 20px" , color:"#000000",borderRadius:"10px"}}>
      Edit
    </button>
  </Link>
</div>
  
        
   
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
        href={`/listings/show?data=${encodeURIComponent(JSON.stringify(listing))}`}
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
