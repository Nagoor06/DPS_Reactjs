// src/components/Map.js
import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const Map = ({ usersByCity }) => {
  const [selectedCity, setSelectedCity] = React.useState(null);

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const defaultCenter = {
    lat: 20.5937,
    lng: 78.9629
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={5}
        center={defaultCenter}
      >
        {Object.keys(usersByCity).map((city, index) => {
          const cityUsers = usersByCity[city];
          const firstUser = cityUsers[0];

          return (
            <Marker
              key={index}
              position={{ lat: firstUser.address.coordinates.lat, lng: firstUser.address.coordinates.lng }}
              onClick={() => setSelectedCity(city)}
            />
          );
        })}

        {selectedCity && (
          <InfoWindow
            position={{
              lat: usersByCity[selectedCity][0].address.coordinates.lat,
              lng: usersByCity[selectedCity][0].address.coordinates.lng
            }}
            onCloseClick={() => setSelectedCity(null)}
          >
            <div>
              <h3 className="text-lg font-bold">{selectedCity}</h3>
              <p>{usersByCity[selectedCity].length} customers</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
