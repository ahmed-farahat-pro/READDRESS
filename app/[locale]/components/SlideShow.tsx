"use client"
import React, { useState, useEffect } from 'react';
import './Slideshow.css'; // Import your CSS file here

const Slideshow = ({ imageUrls }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
 console.log(imageUrls[0]["image_url"]);
  const plusSlides = (n) => {
    setCurrentSlide((prevSlide) => (prevSlide + n - 1 + imageUrls.length) % imageUrls.length + 1);
  };

  const currentSlideHandler = (n) => {
    setCurrentSlide(n);
  };

  useEffect(() => {
   

    const interval = setInterval(() => {
      plusSlides(1);
      
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [imageUrls]);

  return (
    <div className="slideshow-container">
      {imageUrls.map((url, index) => (
        <div className={`mySlides fade ${currentSlide === index + 1 ? 'active' : ''}`} key={index}>
          <div className="numbertext">{index + 1} / {imageUrls.length}</div>
          <img src={url["image_url"]} style={{ width: '100%' }} alt={`Slide ${index + 1}`} />
          <div className="text">Caption {index + 1}</div>
        </div>
      ))}

      <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
      <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>

      <div style={{ textAlign: 'center' }}>
        {imageUrls.map((_, index) => (
          <span
            className={`dot ${currentSlide === index + 1 ? 'active' : ''}`}
            onClick={() => currentSlideHandler(index + 1)}
            key={index}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
