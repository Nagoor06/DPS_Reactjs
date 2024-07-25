import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Chart } from 'react-google-charts';
import UserTable from './components/UserTable';
import FilterControls from './components/FilterControls';
import WelcomePage from './WelcomePage';
import './tailwind.css';
import logo from './assets/logo.jpg';
import backgroundImage1 from './assets/imgbg1.avif';
import userAvatar from './assets/pp.jpg';

const cityCoordinates = {
  "Phoenix": { lat: 33.4484, lng: -112.0740 },
  "Houston": { lat: 29.7604, lng: -95.3698 },
  "Washington": { lat: 38.9072, lng: -77.0369 },
  "Seattle": { lat: 47.6062, lng: -122.3321 },
  "Jacksonville": { lat: 30.3322, lng: -81.6557 },
  "Fort Worth": { lat: 32.7555, lng: -97.3308 },
  "Indianapolis": { lat: 39.7684, lng: -86.1581 },
  "San Antonio": { lat: 29.4241, lng: -98.4936 },
  "New York": { lat: 40.7128, lng: -74.0060 },
  "Denver": { lat: 39.7392, lng: -104.9903 },
  "Columbus": { lat: 39.9612, lng: -82.9988 },
  "San Jose": { lat: 37.3382, lng: -121.8863 },
  "San Diego": { lat: 32.7157, lng: -117.1611 },
  "Chicago": { lat: 41.8781, lng: -87.6298 },
  "Philadelphia": { lat: 39.9526, lng: -75.1652 },
  "Dallas": { lat: 32.7767, lng: -96.7970 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  "San Francisco": { lat: 37.7749, lng: -122.4194 }
};

const containerStyle = { width: '100%', height: '400px' };
const center = { lat: 37.7749, lng: -122.4194 };

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [highlightOldest, setHighlightOldest] = useState(false);
  const [debouncedNameFilter, setDebouncedNameFilter] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleEnter = () => {
    setShowWelcome(false);
  };

  useEffect(() => {
    axios.get('https://dummyjson.com/users')
      .then(response => {
        const usersWithCity = response.data.users.map(user => ({
          ...user,
          city: user.address.city
        }));
        setUsers(usersWithCity);
        setFilteredUsers(usersWithCity);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedNameFilter(nameFilter);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [nameFilter]);

  useEffect(() => {
    let filtered = users;

    if (debouncedNameFilter) {
      filtered = filtered.filter(user => {
        const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
        return fullName.includes(debouncedNameFilter.toLowerCase());
      });
    }

    if (cityFilter) {
      filtered = filtered.filter(user => user.city.toLowerCase().includes(cityFilter.toLowerCase()));
    }

    if (highlightOldest) {
      // Create a map to store the oldest user in each city
      const oldestUsersByCity = new Map();
    
      // Determine the oldest user for each city
      filtered.forEach(user => {
        const birthDate = new Date(user.birthDate);
        const currentOldest = oldestUsersByCity.get(user.city);
        if (!currentOldest || birthDate < new Date(currentOldest.birthDate)) {
          oldestUsersByCity.set(user.city, { ...user, birthDate });
        }
      });
    
      // Create a new array with the highlighted oldest users
      filtered = filtered.map(user => {
        const oldestUser = oldestUsersByCity.get(user.city);
        if (oldestUser && oldestUser.id === user.id) {
          return { ...user, highlight: true };
        }
        return { ...user, highlight: false }; // Optionally, set highlight to false for others
      });
    }
    
    

    setFilteredUsers(filtered);
  }, [debouncedNameFilter, cityFilter, highlightOldest, users]);

  const cityCounts = filteredUsers.reduce((acc, user) => {
    acc[user.city] = (acc[user.city] || 0) + 1;
    return acc;
  }, {});

  const data = [
    ['City', 'Users'],
    ...Object.keys(cityCounts).map(city => [city, cityCounts[city]])
  ];

  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleCityChange = (e) => {
    setCityFilter(e.target.value);
  };

  const handleHighlightChange = (e) => {
    setHighlightOldest(e.target.checked);
  };

  return (
    <div
      className="flex-grow bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage1})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {showWelcome ? (
        <WelcomePage onEnter={handleEnter} />
      ) : (
        <div className="transition-transform duration-1000 transform rotate-y-180">
          <div className="min-h-screen">
            <header className="bg-sky-400 text-white py-4 px-6 flex justify-between items-center fixed top-0 w-full z-50">
              <img src={logo} alt="Logo" className="h-12" />
              <h1 className="text-3xl font-bold">CRM Portal</h1>
              <div className="flex items-center">
                <img src={userAvatar} alt="User" className="rounded-full h-10 w-10 mr-2" />
                <span>V Nagoor</span>
              </div>
            </header>
            <main className="container mx-auto py-6 px-4 pt-20">
              <FilterControls
                nameFilter={nameFilter}
                onNameChange={handleNameChange}
                cities={[...new Set(users.map(user => user.city))]}
                cityFilter={cityFilter}
                onCityChange={handleCityChange}
                highlightOldest={highlightOldest}
                onHighlightChange={handleHighlightChange}
              />
              <div className="flex">
                <div className="w-1/2 p-4">
                  <UserTable users={filteredUsers} />
                </div>
                <div className="w-1/2 p-4">
                  <div className="bg-white p-5 shadow-lg rounded">
                    <h2 className="text-center font-bold text-xl mb-4">User Distribution by City</h2>
                    <Chart
                      chartType="PieChart"
                      data={data}
                      width="100%"
                      height="365px"
                    />
                  </div>
                </div>
              </div>
            </main>
            <div className="container mx-auto py-6 px-4">
              <div className="bg-white rounded shadow-md p-4">
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={4}
                  >
                    {Object.keys(cityCounts).map(city => {
                      const coordinates = cityCoordinates[city];
                      if (coordinates) {
                        return (
                          <Marker
                            key={city}
                            position={{ lat: coordinates.lat, lng: coordinates.lng }}
                            onClick={() => setSelectedMarker(city)}
                            label={{
                              text: `${cityCounts[city]}`,
                              color: 'white',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}
                          />
                        );
                      }
                      return null;
                    })}
                    {selectedMarker && (
                      <InfoWindow
                        position={{
                          lat: cityCoordinates[selectedMarker].lat,
                          lng: cityCoordinates[selectedMarker].lng
                        }}
                        onCloseClick={() => setSelectedMarker(null)}
                      >
                        <div>
                          <h2>{selectedMarker}</h2>
                          <p>{`${cityCounts[selectedMarker]} users`}</p>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
