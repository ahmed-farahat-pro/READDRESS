"use client";
import { useState, useEffect, Suspense, lazy } from 'react';

import { useSearchParams } from 'next/navigation';
import axios from 'axios'; // Make sure to import axios
import styles from '../../../styles/Form.module.css';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useRouter } from 'next/router';

// Dynamically import GoogleMaps with React.lazy
const GoogleMaps = lazy(() => import('../../../components/GoogleMaps'));

export default function EditListing() {
  
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const userId = searchParams.get('userId');
  const [loading , setLoading]=useState(false);


  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
 const handleUrlChange=(url)=>{

    setGoogleMapsUrl(url)
}
  const [formData, setFormData] = useState({
    user_id: userId,
    title: '',
    maps_url: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    property_type: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'pending',
    images: []
  });

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (id) {
      fetchListing();
    }
  }, [id]);

  const fetchListing = async () => {
    try {
      const res = await axios.get(`/api/listings/${id}`);
      const listing =  res.data.listing;
   
      
      setFormData({
        user_id: userId,
        title: listing.title,
        maps_url: listing.maps_url,
        description: listing.description,
        price: listing.price,
        address: listing.address,
        city: listing.city,
        state: listing.state,
        zip_code: listing.zip_code,
        country: listing.country,
        property_type: listing.property_type,
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        area: listing.area,
        status: listing.status,
        images: listing.images
      });
      setGoogleMapsUrl(listing.maps_url);
      setLoading(true);
      console.log(formData)
    } catch (error) {
      console.error('Error fetching listing:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/aws-up', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrls = await Promise.all(files.map(file => uploadImage(file)));
    if (imageUrls.some(url => url === null)) {
      alert('Failed to upload one or more images');
      return;
    }

   

    const updatedFormData = {
      ...formData,
      images: imageUrls.map(url => ({ image_url: url })),
      maps_url: googleMapsUrl,
      status: 'pending'
    };

    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFormData)
      });

      if (!response.ok) {
        throw new Error('Failed to update listing');
      }

      const result = await response.json();
      alert('Listing updated successfully');
   
    } catch (error) {
      console.error(error);
      alert('Error updating listing');
    }
  };
if (!loading){
    return <div>......loading</div>
}
  return (
    
    <div>
      <Header isLoggedIn={true} />
      <div className={styles.container}>
        <h1>Edit Listing</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
             
              className={styles.input}
              placeholder={formData.title}
            />
            
          </label>
          <label className={styles.label}>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
             
              className={styles.textarea}
            />
               
          </label>
          <label className={styles.label}>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
             
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
             
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
           
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Zip Code:
            <input
              type="text"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
             
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
           
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Property Type:
            <input
              type="text"
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
        
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Bedrooms:
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
          
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Bathrooms:
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
            
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Area:
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
             
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Upload Images:
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className={styles.input}
            />
          </label>
          <div>
            <Suspense fallback={<div>Loading Google Maps...</div>}>
              <GoogleMaps onUrlChange={handleUrlChange} />
            </Suspense>
            <p>URL for clicked location: {googleMapsUrl}</p>
          </div>
          <button type="submit" className={styles.button}>Update Listing</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
