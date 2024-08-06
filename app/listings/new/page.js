'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../../styles/Form.module.css';
import GoogleMaps from '../../components/GoogleMaps';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function AddListing() {
    const buyitorrent = ['buy' , 'rent'];
     const propertyTypes = [
    'Apartment',
    'House',
    'Condo',
    'Villa',
    'Townhouse',
    'Studio',
    'Penthouse',
    'Duplex',
    'Triplex',
    'Loft',
    'Flat',
    'Bungalow',
    'Cottage',
    'Mansion',
    'Farmhouse',
    'Land',
    'Commercial',
    'Office Space',
    'Retail Space',
    'Warehouse',
    'Industrial'
  ];

  const searchParams = useSearchParams();
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [formData, setFormData] = useState({
    user_id: searchParams.get('userId'),  // Replace with actual user ID or handle user authentication
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
        buy:'',
    bedrooms: '',
    bathrooms: '',
    area: '',
    status: 'pending',
    images: []
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUrlChange = (url)=>{
    setGoogleMapsUrl(url)
  }
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Generate previews
    const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const removeImage = (index) => {
    // Remove from files
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);

    // Remove from previews
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
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
      return data.imageUrl; // Assuming your API returns the URL of the uploaded image in a field named `url`
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
      images: imageUrls.map(url => ({ image_url: url }))
    };

    const updatedFormData = {
      ...updatedFormData1,
      maps_url: googleMapsUrl
    };

    try {
      const response = await fetch('/api/listings/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFormData)
      });

      if (!response.ok) {
        throw new Error('Failed to create listing');
      }

      const result = await response.json();
      alert('Listing created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating listing');
    }
  };

  return (
    <div>
       <Header isLoggedIn={true} />
      <div className={styles.container}>
        <h1>Add New Listing</h1>
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
            <select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              required
              className={styles.select}
              style={{color:"#000"}} 
            >
              <option style={{color:"#000"}} value="" disabled>Select property type</option>
              {propertyTypes.map(type => (
                <option  style={{color:"#000"}}  key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>

            <label className={styles.label}>
            Buy or rent :
            <select
              name="property_type"
              value={formData.buy}
              onChange={handleChange}
              required
              className={styles.select}
              style={{color:"#000"}} 
            >
              
              {buyitorrent.map(type => (
                <option  style={{color:"#000"}}  key={type} value={type}>{type}</option>
              ))}
            </select>
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

          <div className={styles.imagePreviewContainer}>
            {previews.map((preview, index) => (
              <div key={index} className={styles.imagePreview}>
                <img src={preview} alt={`Preview ${index}`} className={styles.previewImage} />
                <button type="button" onClick={() => removeImage(index)} className={styles.removeButton}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div>
            <GoogleMaps onUrlChange={handleUrlChange} />
            <p>URL for clicked location: {googleMapsUrl}</p>
          </div>
          <button type="submit" className={styles.button}>Add Listing</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
