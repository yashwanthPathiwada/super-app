import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchWeatherByCity = async (city = 'Hyderabad') => {
  if (!API_KEY) {
    throw new Error('Missing VITE_OPENWEATHER_API_KEY in your .env file');
  }

  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });

  const data = response.data;

  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
};

export const fetchWeatherByCoords = async (lat, lon) => {
  if (!API_KEY) {
    throw new Error('Missing VITE_OPENWEATHER_API_KEY in your .env file');
  }

  const response = await axios.get(BASE_URL, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
    },
  });

  const data = response.data;

  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
};
