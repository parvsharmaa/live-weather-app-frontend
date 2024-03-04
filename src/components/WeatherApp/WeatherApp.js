import React, { useState, useEffect } from 'react';
import WeatherInfo from '../WeatherInfo/WeatherInfo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';

const WeatherApp = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const socket = io('http://localhost:5000', { transports: ['websocket'] });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        toast.error(
          'Error getting user location. Please allow location access.'
        );
      }
    );

    // Clean up function to disconnect socket on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (location !== null) {
      const fetchWeatherData = async (latitude, longitude) => {
        try {
          const response = await fetch(`http://localhost:5000/api/weather`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude }),
          });
          if (!response.ok) {
            throw new Error('Unable to fetch weather data');
          }
          const { data } = await response.json();
          setWeatherData(data);
          toast.success('Weather data fetched successfully!');
        } catch (error) {
          toast.error('Error fetching weather data. Please try again later.');
        }
      };

      // Fetch weather data based on current location
      fetchWeatherData(location.latitude, location.longitude);
      // Emit weather parameters to backend via socket
      socket.emit('sendWeatherParams', {
        latitude: location.latitude,
        longitude: location.longitude,
      });

      // Listen for weather updates from the socket
      socket.on('weatherUpdate', (updatedWeatherData) => {
        setWeatherData(updatedWeatherData);
        toast.success('Weather data updated successfully!');
      });
    }
  }, [location]);

  return (
    <div>
      <ToastContainer />
      <WeatherInfo data={weatherData} />
    </div>
  );
};

export default WeatherApp;
