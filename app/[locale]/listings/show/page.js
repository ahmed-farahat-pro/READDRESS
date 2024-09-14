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

  // Extract the YouTube video ID from the URL if it's a valid YouTube link
  const extractYouTubeID = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = extractYouTubeID(listing.Video);

  return (
    <div className={styles.container}>
      <Header isLoggedIn={false} />
      <div className={styles.listingDetails}>
        <Slideshow imageUrls={listing.images} />
        <h1 className={styles.title}>{listing.title}</h1>
        <p className={styles.description}>{listing.description}</p>
        <p className={styles.price}>Price: {listing.price} EGP</p>
        <p className={styles.address}>
          Address: {listing.address}, {listing.city}, {listing.state}, {listing.zip_code}, {listing.country}
        </p>
        <p className={styles.propertyType}>Property Type: {listing.property_type}</p>
        <p className={styles.bedrooms}>Bedrooms: {listing.bedrooms}</p>
        <p className={styles.bathrooms}>Bathrooms: {listing.bathrooms}</p>
        <p className={styles.area}>Area: {listing.area} sq ft</p>
        
        {/* Add YouTube Video Embed */}
        {videoId && (
          <div className={styles.videoContainer}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column" }}> 
          <a 
            href={`tel:${listing.user_id.phone_number}`}
            className={styles.callButton}
          >
            Call
          </a>
          <br/>
          <a 
            href={`${listing.maps_url}`}
            className={styles.navButton}
          >
            Navigate
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
