"use client";
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/listingShow.module.css';

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
        {listing.images.length > 0 && (
          <img
            src={listing.images[0].image_url}
            alt="Listing Image"
            className={styles.image}
          />
        )}
        <h1>{listing.title}</h1>
        <p>{listing.description}</p>
        <p className={styles.price}>Price: {listing.price} EGB</p>
        <p>Address: {listing.address}, {listing.city}, {listing.state}, {listing.zip_code}, {listing.country}</p>
        <p>Property Type: {listing.property_type}</p>
        <p>Bedrooms: {listing.bedrooms}</p>
        <p>Bathrooms: {listing.bathrooms}</p>
        <p>Area: {listing.area} sq ft</p>
      </div>
      <Footer />
    </div>
  );
}
