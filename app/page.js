"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './styles/listings.module.css';
import Link from 'next/link';
import Header from './components/Header';

import Footer from './components/Footer';
import FilterSidebar from './components/FilterSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';


export default function Listings() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const applyFilters = () => {
    const { propertyType = [], priceRange = [0, 1000000], areaRange = [0, 10000], bedrooms = [], bathrooms = [], rentalType = [] } = filters;
    const filtered = listings.filter(listing => {
      const matchesPropertyType = propertyType.length === 0 || propertyType.includes(listing.property_type);
      const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];
      const matchesArea = listing.area >= areaRange[0] && listing.area <= areaRange[1];
      const matchesBedrooms = bedrooms.length === 0 || bedrooms.includes(listing.bedrooms);
      const matchesBathrooms = bathrooms.length === 0 || bathrooms.includes(listing.bathrooms);
      const matchesRentalType = rentalType.length === 0 || rentalType.includes(listing.buy); // Check rental type
      return matchesPropertyType && matchesPrice && matchesArea && matchesBedrooms && matchesBathrooms && matchesRentalType;
    });
    setFilteredListings(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();

        if (response.ok) {
          const approvedListings = data.listings.filter(listing => listing.status === 'approved');
          setListings(approvedListings);
          setFilteredListings(approvedListings); // Set initial filtered listings
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
        const approvedListings = data.listings.filter(listing => listing.status === 'approved');
        setListings(approvedListings);
        setFilteredListings(approvedListings); // Update filtered listings based on search
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
        <div className='newedit'  style={{ display: "flex", flexDirection: "row",  justifyContent: "space-between" , backgroundColor:"#cdb588"}}>
          <Link href="./authenticate">
            <button style={{ backgroundColor: "white", border: "1px solid black",padding:"10px", color: "#000000", borderRadius: "10px" }}>
              New
            </button>
          </Link>
           <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor:"#cdb588" }}>
            
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title"
            style={{
              backgroundColor: "white",
              border: "1px solid black",
             
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
    
              color: "#000000",
              borderRadius: "4px",
          
            }}
          >
            Search
          </button>
          {/* Sidebar toggle button */}
        
        </div>
          <Link href="./authenticate">
            <button style={{ backgroundColor: "white", border: "1px solid black",padding:"10px", color: "#000000", borderRadius: "10px" }}>
              Edit
            </button>
          </Link>
        </div>
   
  <button className={styles.sidebarToggle} onClick={toggleSidebar}>
       <FontAwesomeIcon icon={faFilter} />
          </button>
          
       

        <div>
          {/* Sidebar */}
          <div className={`${styles.xyz} ${sidebarVisible ? styles['xyz-show'] : styles['xyz-hidden']}`}>
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
             <div className={styles.actionButtons}>
    <button className={styles.actionButton}>Buy</button>
    <button className={styles.actionButton}>Sell</button>
  </div>
          {error && <p className={styles.error}>{error}</p>}
          {!loading ? (
            <div className={styles.listings}>
              {filteredListings.map((listing) => (
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
        </div>

        <Footer />
      </div>
    </Suspense>
  );
}
