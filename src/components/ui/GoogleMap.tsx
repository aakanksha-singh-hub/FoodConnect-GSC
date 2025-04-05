import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

interface Location {
  lat: number;
  lng: number;
}

interface GoogleMapComponentProps {
  center: Location;
  markers?: Array<{
    position: Location;
    title?: string;
    label?: string;
  }>;
  zoom?: number;
  height?: string;
  width?: string;
  onMarkerClick?: (marker: any) => void;
  onMapClick?: (location: Location) => void;
  isEditable?: boolean;
}

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.5rem",
};

const defaultOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  center,
  markers = [],
  zoom = 14,
  height = "400px",
  width = "100%",
  onMarkerClick,
  onMapClick,
  isEditable = false,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
    if (onMarkerClick) {
      onMarkerClick(marker);
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (isEditable && e.latLng && onMapClick) {
      onMapClick({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}
    >
      <div style={{ width, height }}>
        {process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? (
          <GoogleMap
            mapContainerStyle={{ ...containerStyle, height }}
            center={center}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
            options={defaultOptions}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                title={marker.title}
                label={marker.label}
                onClick={() => handleMarkerClick(marker)}
              />
            ))}

            {selectedMarker && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div>
                  <h3 className="font-medium">{selectedMarker.title}</h3>
                  {selectedMarker.label && (
                    <p className="text-sm text-gray-600">
                      {selectedMarker.label}
                    </p>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
            <div className="text-center p-4">
              <p className="text-gray-600 mb-2">
                Google Maps API key is missing
              </p>
              <p className="text-sm text-gray-500">
                Please add your Google Maps API key to the .env file
              </p>
            </div>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;
