// pages/listings/edit/[id].js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import styles from '../../../styles/Form.module.css';
import GoogleMaps from '../../../components/GoogleMaps';
import axios from 'axios';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function EditListing() {
   const searchParams = useSearchParams();
 const id = searchParams.get('id');
 console.log(id);
 
  
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  const handleUrlChange = (url) => {
    setGoogleMapsUrl(url);
  };

  const userId = searchParams.get('userId');
  console.log(userId)
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
      const listing = res.data.data;
      setFormData({
        user_id: listing.user_id,
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
        status: 'pending',
        images: listing.images
      });
      setGoogleMapsUrl(listing.maps_url);
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
      const response = await fetch('http://localhost:3000/api/aws-up', {
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

    const updatedFormData1 = {
      ...formData,
      images: [...formData.images, ...imageUrls.map(url => ({ image_url: url }))],
    };

    const updatedFormData = {
      ...updatedFormData1,
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
      router.push(`/listings?userId=${userId}`); // Redirect to listings page after update
    } catch (error) {
      console.error(error);
      alert('Error updating listing');
    }
  };

  return (
    <div> 

        <div> <Header /> </div>
    
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
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
            required
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
          <GoogleMaps onUrlChange={handleUrlChange} />
          <p>URL for clicked location: {googleMapsUrl}</p>
        </div>
        <button type="submit" className={styles.button}>Update Listing</button>
      </form>
    </div>
<div> <Footer /> </div>
    </div>
  );
}
