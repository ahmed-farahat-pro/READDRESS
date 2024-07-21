"use client"; // Add this directive at the top to use client-side features

import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Slider from 'react-slick';
import styles from '../../styles/listingShow.module.css';

export default function ListingShow() {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const listing = data ? JSON.parse(data) : null;

  if (!listing) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.listingDetails}>
        <Slider {...settings} className={styles.slider}>
          {listing.images.map((image, index) => (
            <div key={index} className={styles.slide}>
              <img
                src={image.image_url}
                alt={`Listing Image ${index + 1}`}
                className={styles.image}
              />
            </div>
          ))}
        </Slider>
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
