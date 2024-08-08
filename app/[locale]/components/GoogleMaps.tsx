'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapsProps {
    onUrlChange: (url: string) => void;
}

export default function GoogleMaps({ onUrlChange }: GoogleMapsProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [clickedLocation, setClickedLocation] = useState<google.maps.LatLng | null>(null);

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'quarterly',
                libraries: ['places'], // Ensure 'places' library is loaded
            });

            const google = await loader.load();
            const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
                center: { lat: 39.60128890889341, lng: -9.069839810859907 },
                zoom: 15,
                mapId: 'NEXT_MAPS_TUTS',
            });

            const marker = new google.maps.Marker({
                position: { lat: 39.60128890889341, lng: -9.069839810859907 },
                map: map,
            });

            const autocomplete = new google.maps.places.Autocomplete(inputRef.current as HTMLInputElement);
            autocomplete.bindTo('bounds', map);

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();

                if (!place.geometry || !place.geometry.location) {
                    return;
                }

                // If the place has a geometry, then present it on a map.
                map.setCenter(place.geometry.location);
                map.setZoom(15);

                // Move the marker to the new location
                marker.setPosition(place.geometry.location);

                // Clear clicked location state
                setClickedLocation(null);
            });

            // Add click listener to move marker on map click
            map.addListener('click', (event: google.maps.MapMouseEvent) => {
                const clickedLocation = event.latLng;

                if (clickedLocation) {
                    // Move the marker to the clicked location
                    marker.setPosition(clickedLocation);
                    setClickedLocation(clickedLocation);

                    // Update the URL in the parent component
                    const url = `https://www.google.com/maps?q=${clickedLocation.lat()},${clickedLocation.lng()}`;
                    onUrlChange(url);
                }
            });
        };

        initializeMap();
    }, [onUrlChange]);

    return (
        <div>
            
            <input
                type="text"
                ref={inputRef}
                placeholder="Search for a location"
                style={{ width: '100%', padding: '8px', marginBottom: '10px' , color:"#000"}}
            />
            <div className="h-[600px]" ref={mapRef} />
        </div>
    );
}
