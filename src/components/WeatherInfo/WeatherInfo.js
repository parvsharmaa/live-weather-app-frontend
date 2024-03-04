import React from 'react';
import './WeatherInfo.css';
import clearSky from '../../assets/clear-sky.jpg';
import cloudySky from '../../assets/cloudy-sky.jpg';
import rainyDay from '../../assets/rainy-day.jpg';
import snowyDay from '../../assets/snowy-day.jpg';

const WeatherInfo = ({ data }) => {
  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  const getBackgroundImage = () => {
    if (!data) return `url(${clearSky})`;
    const weatherCondition = data.weather[0].main.toLowerCase();
    switch (weatherCondition) {
      case 'clear':
        return `url(${clearSky})`;
      case 'clouds':
        return `url(${cloudySky})`;
      case 'rain':
        return `url(${rainyDay})`;
      case 'snow':
        return `url(${snowyDay})`;
      default:
        return `url(${clearSky})`;
    }
  };

  const backgroundImage = getBackgroundImage();

  const renderWeatherDetails = () => {
    if (!data) return null;
    return (
      <>
        <h2 className='weather-info-title'>Current Weather</h2>
        <div className='weather-info-details'>
          <div>
            <p className='weather-info-label'>Location:</p>
            <p>
              {data.name}, {data.sys.country}
            </p>
          </div>
          <div>
            <p className='weather-info-label'>Weather:</p>
            <p>
              {data.weather[0].main} - {data.weather[0].description}
            </p>
          </div>
          <div>
            <p className='weather-info-label'>Temperature:</p>
            <p>{convertKelvinToCelsius(data.main.temp)}°C</p>
          </div>
          <div>
            <p className='weather-info-label'>Feels Like:</p>
            <p>{convertKelvinToCelsius(data.main.feels_like)}°C</p>
          </div>
          <div>
            <p className='weather-info-label'>Minimum Temperature:</p>
            <p>{convertKelvinToCelsius(data.main.temp_min)}°C</p>
          </div>
          <div>
            <p className='weather-info-label'>Maximum Temperature:</p>
            <p>{convertKelvinToCelsius(data.main.temp_max)}°C</p>
          </div>
          <div>
            <p className='weather-info-label'>Wind Speed:</p>
            <p>{data.wind.speed} m/s</p>
          </div>
          <div>
            <p className='weather-info-label'>Wind Direction:</p>
            <p>{data.wind.deg}°</p>
          </div>
          <div>
            <p className='weather-info-label'>Atmospheric Pressure:</p>
            <p>{data.main.pressure} hPa</p>
          </div>
          <div>
            <p className='weather-info-label'>Humidity:</p>
            <p>{data.main.humidity}%</p>
          </div>
          <div>
            <p className='weather-info-label'>Cloudiness:</p>
            <p>{data.clouds.all}%</p>
          </div>
          <div>
            <p className='weather-info-label'>Visibility:</p>
            <p>{data.visibility} meters</p>
          </div>
          <div>
            <p className='weather-info-label'>Sunrise:</p>
            <p>{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
          </div>
          <div>
            <p className='weather-info-label'>Sunset:</p>
            <p>{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className='weather-info-container'
      style={{ backgroundImage: backgroundImage }}
    >
      {!data && (
        <div className='weather-info-retrieving'>
          <div className='weather-info-retrieving-overlay'>
            retrieving live data...
          </div>
        </div>
      )}
      {renderWeatherDetails()}
    </div>
  );
};

export default WeatherInfo;
