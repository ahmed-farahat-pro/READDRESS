import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const GoogleMaps = ({ googleMapsUrl }) => {
  const getLatLngFromUrl = (url) => {
    if (!url) {
      return null; // Handle case where url is undefined or null
    }

    // Extract latitude and longitude from the Google Maps URL
    // Example URL: https://www.google.com/maps?q=52.36479846406238,13.502248829638658
    const match = url.match(/q=([-.\d]+),([-.\d]+)/);
    if (match && match.length >= 3) {
      return {
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2]),
      };
    }
    return null;
  };

  const location = getLatLngFromUrl(googleMapsUrl);

  if (!location) {
    return <div>No valid location found</div>; // Handle case where location is null
  }
  console.log(location)

  return (
    <LoadScript googleMapsApiKey="AIzaSyB3EsHTJw17gKdd5J7bxeAK407b-v1A5G4">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={10}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMaps;
