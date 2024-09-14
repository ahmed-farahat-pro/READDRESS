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
import TranslationsProvider from './components/TranslationsProvider';
import { useTranslation } from 'react-i18next';
import initTranslations from '../i18n'; // Ensure this path is correct
import { useUser } from '../UserContext';
import { faBuilding  } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap'; // Import GSAP
const i18nNamespaces = ['home'];

export default function Listings({ params: { locale } }) {
    const propertyList = [
  'Apartment', 'House', 'Condo', 'Villa', 'Townhouse', 'Studio', 'Penthouse', 'Duplex',
  'Triplex', 'Loft', 'Flat', 'Bungalow', 'Cottage', 'Mansion', 'Farmhouse', 'Land',
  'Commercial', 'Office Space', 'Retail Space', 'Warehouse', 'Industrial'
];

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
   const { user } = useUser(); // Get user from context
  const [t, setT] = useState(() => (key) => key); // Default to identity function
  const [resources, setResources] = useState(null);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [translationsReady, setTranslationsReady] = useState(false);
   const [showBackground, setShowBackground] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

 useEffect(() => {
    if (showBackground) {
      gsap.fromTo(
        ".cle-text", 
        { x: '-100vw', opacity: 0 }, // Starting from offscreen left and hidden
        { x: '0', opacity: 1, duration: 3, ease: 'power3.out', delay: 1 } // Animate to center and fade in
      );

      // Background fade-out after the "CLE" animation
      gsap.to(".fade-bg", { opacity: 0, duration: 2, delay: 5, onComplete: () => setShowBackground(false) });
    }
  }, [showBackground]);

    useEffect(() => {
    console.log('User:', user);
  }, [user]);

  const applyFilters = () => {
    const { propertyType = [], priceRange = [0, 1000000], areaRange = [0, 10000], bedrooms = [], bathrooms = [], rentalType = [] } = filters;
    const filtered = listings.filter(listing => {
      const matchesPropertyType = propertyType.length === 0 || propertyType.includes(listing.property_type);
      const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];
      const matchesArea = listing.area >= areaRange[0] && listing.area <= areaRange[1];
      const matchesBedrooms = bedrooms.length === 0 || bedrooms.includes(listing.bedrooms);
      const matchesBathrooms = bathrooms.length === 0 || bathrooms.includes(listing.bathrooms);
      const matchesRentalType = rentalType.length === 0 || rentalType.includes(listing.rental_type);
      return matchesPropertyType && matchesPrice && matchesArea && matchesBedrooms && matchesBathrooms && matchesRentalType;
    });
    setFilteredListings(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, listings]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const { t, resources } = await initTranslations(locale, i18nNamespaces);
        setT(() => t); // Ensure t is set as a function
        setResources(resources);
        setTranslationsReady(true);
      } catch (error) {
        console.error("Failed to fetch translations:", error);
      }
    };

    fetchTranslations();
  }, [locale]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listings');
        const data = await response.json();

        if (response.ok) {
          const approvedListings = data.listings.filter(listing => listing.status === 'approved');
          setListings(approvedListings);
          setFilteredListings(approvedListings);
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
        setFilteredListings(approvedListings);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to fetch listings');
    }
  };
  const cardStyles = {
  display: "flex",
  flexDirection: "column",
  fontSize: '2.5rem', // Responsive font size for larger screens
  margin: '0 1rem', // Responsive margin
  cursor: 'pointer', // Pointer on hover
  alignItems: "center",
  justifyContent: "center", // Center content vertically
  backgroundColor: "#383535", // Light grey background
  padding: "1.5rem", // Responsive padding
  borderRadius: "1rem", // Rounded edges
  boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)", // Light shadow effect
  border: "0.2rem solid #ccc", // Optional border
  fontFamily: "sans-serif", // Sans-serif font
  transition: "transform 0.3s ease", // Smooth hover animation
  width: '100%', // Full width to allow flexibility
  maxWidth: '30rem', // Max width for larger screens
};

// Styles for the text in the cards
const paragraphStyles = {
  fontSize: "1.5rem", // Responsive font size
  margin: 0,
  textAlign: "center", // Center text for better alignment
};

// Media query for phones (smaller screens)
const smallScreenStyles = {
  ...cardStyles,
  fontSize: '1.5rem', // Smaller font size for phones
  padding: '1rem', // Smaller padding for phones
  margin: '0.5rem', // Reduce margin for phones
  maxWidth: '100%', // Allow full width on smaller screens
  borderRadius: "0.5rem", // Reduce border radius for phones
};

const smallParagraphStyles = {
  fontSize: "1rem", // Smaller font size for text on phones
};




  return (
    <div className={styles.container}>
          {showBackground && (
        <div
          className="fade-bg"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            zIndex: 1000, // High z-index to ensure it covers the content
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* "CLE" Text */}
          <div className="cle-text" style={{ color: 'white', fontSize: '5rem', fontWeight: 'bold' }}>
            CLE
          </div>
        </div>
      )}
      {translationsReady ? (
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Header isLoggedIn={false} />
            <div className='newedit' style={{ display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#cdb588" }}>
            
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#cdb588" }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("search")}
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
                  {t('search')}
                </button>
              </div>
         
            </div>
            <button className={styles.sidebarToggle} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faFilter} />
            </button>
            <div>
              <div className={`${styles.xyz} ${sidebarVisible ? styles['xyz-show'] : styles['xyz-hidden']}`}>
                <FilterSidebar onFilterChange={handleFilterChange} />
              </div>
            <div className={styles.actionButtons}>
      <button className={styles.actionButton}>
        <Link href="/choose?type=buy">
          {t('buy')}
        </Link>
      </button>
      <button className={styles.actionButton}>
        <Link href="/choose?type=sell">
          {t('sell')}
        </Link>
      </button>
    </div>
  <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        margin: '10px',
        overflowX: 'auto', // Enable horizontal scrolling
        whiteSpace: 'nowrap', // Prevent wrapping of items

      }}
    >
{propertyList.map((property, index) => (
       <div
  style={window.innerWidth <= 600 ? smallScreenStyles : cardStyles}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
>
  <p style={window.innerWidth <= 600 ? smallParagraphStyles : paragraphStyles}>{t(property)}</p>
</div>
      ))}

    </div>
              {error && <p className={styles.error}>{error}</p>}
              {!loading ? (
                <div className={styles.listingsContainer}>
  {/* House Listings */}
  <div className={styles.rowContainer}>
    <h3>{t('House')}</h3>
    <div className={styles.scrollableRow}>
      {filteredListings
        .filter((listing) => listing.property_type === 'House')
        .map((listing) => (
          <Link
            key={listing._id}
            href={`/listings/show?data=${encodeURIComponent(
              JSON.stringify(listing)
            )}`}
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
              <p className={styles.price}>
                {listing.price} {t('EGP')}
              </p>
            </div>
          </Link>
        ))}
    </div>
  </div>

  {/* Land Listings */}
  <div className={styles.rowContainer}>
        <h3>{t('Land')}</h3>
    <div className={styles.scrollableRow}>
      {filteredListings
        .filter((listing) => listing.property_type === 'Land')
        .map((listing) => (
          <Link
            key={listing._id}
            href={`/listings/show?data=${encodeURIComponent(
              JSON.stringify(listing)
            )}`}
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
              <p className={styles.price}>
                {listing.price} {t('EGP')}
              </p>
            </div>
          </Link>
        ))}
    </div>
  </div>

  {/* Villa Listings */}
  <div className={styles.rowContainer}>
     <h3>{t('Villa')}</h3>
    <div className={styles.scrollableRow}>
      {filteredListings
        .filter((listing) => listing.property_type === 'Villa')
        .map((listing) => (
          <Link
            key={listing._id}
            href={`/listings/show?data=${encodeURIComponent(
              JSON.stringify(listing)
            )}`}
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
              <p className={styles.price}>
                {listing.price} {t('EGP')}
              </p>
            </div>
          </Link>
        ))}
    </div>
  </div>

  {/* Twinhouse Listings */}
  <div className={styles.rowContainer}>
        <h3>{t('Twinhouse')}</h3>
    <div className={styles.scrollableRow}>
      {filteredListings
        .filter((listing) => listing.property_type === 'Twinhouse')
        .map((listing) => (
          <Link
            key={listing._id}
            href={`/listings/show?data=${encodeURIComponent(
              JSON.stringify(listing)
            )}`}
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
              <p className={styles.price}>
                {listing.price} {t('EGP')}
              </p>
            </div>
          </Link>
        ))}
    </div>
  </div>
</div>

              ) : (
                <div className={styles.loading}>
                  <p>loading</p>
                </div>
              )}
            </div>
          
          </Suspense>
        </TranslationsProvider>
      ) : (
        <div>loadingTranslations</div>
      )}
    </div>
  );
}
