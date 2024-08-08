"use client"
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Form.module.css';

export default function AddListing() {
     const router = useRouter();
  const { userId } = router.query;
  const [formData, setFormData] = useState({
    user_id: userId,  // Replace with actual user ID or handle user authentication
    title: '',
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
    images: [{ image_url: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...formData.images];
    newImages[index].image_url = e.target.value;
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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
          Image URL:
          <input
            type="text"
            value={formData.images[0].image_url}
            onChange={(e) => handleImageChange(e, 0)}
            required
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>Add Listing</button>
      </form>
    </div>
  );
}
