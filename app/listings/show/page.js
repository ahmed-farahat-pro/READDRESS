"use client";
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/listingShow.module.css';
import Slideshow from '../../components/SlideShow';

export default function ListingShow() {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const listing = data ? JSON.parse(data) : null;

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.listingDetails}>
       <Slideshow imageUrls= {listing.images}/>
        <h1>{listing.title}</h1>
        <p>{listing.description}</p>
        <p className={styles.price}>Price: {listing.price} EGB</p>
        <p>Address: {listing.address}, {listing.city}, {listing.state}, {listing.zip_code}, {listing.country}</p>
        <p>Property Type: {listing.property_type}</p>
        <p>Bedrooms: {listing.bedrooms}</p>
        <p>Bathrooms: {listing.bathrooms}</p>
        <p>Area: {listing.area} sq ft</p>
         <a 
      href={`tel:${listing.user_id.phone_number}`}
      style={{ backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block', marginTop: '10px' }}
    >
      Call
    </a>
      </div>
      <Footer />
    </div>
  );
}
