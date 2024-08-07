"use client";
import { useSearchParams,useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import styles from '../../../styles/listingShow.module.css';
import Slideshow from '../../../components/SlideShow';
import { useState } from 'react';


export default function ListingShow() {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const Router = useRouter();
  const listing = data ? JSON.parse(data) : null;
  const[error,setError]= useState();
  
 const approveListing = async (listingId) => {
    try {
      const response = await fetch(`/api/listings/approve/${listingId}`, {
        method: 'PUT',
      });

      const data = await response.json();
      
     
      if (response.ok) {
        // Update the UI to reflect the approved listing
         alert("approved");
            window.location.href = "../../listings/approve";
    
        
              
 
        
      } else {
        setError(data.error || 'Failed to approve listing');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const deleteListing = async (listingId) => {
    try {
      const response = await fetch(`/api/listings/approve/${listingId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      console.log(response)
     
   
      if (response.ok) {
        // Remove the deleted listing from UI
            alert("deleted");
         window.location.href = "../../listings/approve";
  
       
   
 
      } else {
        setError(data.error || 'Failed to delete listing');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

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
        <div style={{display:"flex" , flexDirection:"column"}}> 
    
        <br/>
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
          navigate
        </a>

         <br/>
  <div>
  {listing.status.trim() === "pending" ? (
    <button style={{backgroundColor:"#000"}} onClick={() => approveListing(listing._id)}>
      Approve
    </button>
  ) : null}
</div>



   
<br/>
        <button style={{backgroundColor:"#000"}} onClick={() => deleteListing(listing._id)}>Delete</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
