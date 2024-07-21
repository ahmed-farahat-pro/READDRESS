"use client";
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../../styles/Form.module.css';
import GoogleMaps from '../../components/GoogleMaps';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function AddListing() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
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
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

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

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      return data.imageUrl; // Assuming your API returns the URL of the uploaded image in a field named `imageUrl`
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = await Promise.all(files.map(file => uploadImage(file)));
      if (imageUrls.some(url => url === null)) {
        alert('Failed to upload one or more images');
        return;
      }

      const updatedFormData = {
        ...formData,
        images: imageUrls.map(url => ({ image_url: url })),
        maps_url: googleMapsUrl
      };

      const response = await fetch('/api/listings/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFormData)
      });

      if (!response.ok) throw new Error('Failed to create listing');

      await response.json();
      alert('Listing created successfully');
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Error creating listing');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1>Add New Listing</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {Object.keys(formData).map(key => (
            key !== 'images' && key !== 'maps_url' && (
              <label key={key} className={styles.label}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:
                <input
                  type={key === 'price' || key === 'bedrooms' || key === 'bathrooms' || key === 'area' ? 'number' : 'text'}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </label>
            )
          ))}
          <label className={styles.label}>
            Upload Images:
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              required
              className={styles.input}
            />
          </label>
          <div>
            <Suspense fallback={<div>Loading Google Maps...</div>}>
              <GoogleMaps onUrlChange={setGoogleMapsUrl} />
            </Suspense>
            <p>URL for clicked location: {googleMapsUrl}</p>
          </div>
          <button type="submit" className={styles.button}>Add Listing</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
