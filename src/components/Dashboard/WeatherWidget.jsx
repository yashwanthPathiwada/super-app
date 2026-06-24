import { useEffect, useState, useCallback } from 'react';
import { fetchWeatherByCity } from '../../services/weatherService';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadWeather = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchWeatherByCity('Hyderabad');
      setWeather(data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          'Unable to fetch weather data'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  return (
    <div className="rounded-xl border border-line bg-panel p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-white">
          Weather
        </h3>
        {weather ? (
          <span className="text-xs text-muted">{weather.city}</span>
        ) : null}
      </div>

      {loading && <Loader label="Fetching weather..." />}
      {!loading && error && <ErrorMessage message={error} onRetry={loadWeather} />}

      {!loading && !error && weather && (
        <div className="animate-fadeIn">
          <div className="flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
              className="h-16 w-16"
            />
            <div>
              <p className="font-display text-3xl font-bold text-white">
                {weather.temperature}°C
              </p>
              <p className="text-sm capitalize text-muted">
                {weather.description}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-panel2 px-2 py-2 text-center">
              <p className="text-[10px] uppercase text-muted">Humidity</p>
              <p className="text-sm font-semibold text-white">
                {weather.humidity}%
              </p>
            </div>
            <div className="rounded-lg bg-panel2 px-2 py-2 text-center">
              <p className="text-[10px] uppercase text-muted">Pressure</p>
              <p className="text-sm font-semibold text-white">
                {weather.pressure} hPa
              </p>
            </div>
            <div className="rounded-lg bg-panel2 px-2 py-2 text-center">
              <p className="text-[10px] uppercase text-muted">Wind</p>
              <p className="text-sm font-semibold text-white">
                {weather.windSpeed} m/s
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
