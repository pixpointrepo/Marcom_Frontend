import React, { useEffect, useState } from "react";
import { getLocation, getWeather } from "../services/weatherapi";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
} from "lucide-react";
import NepaliDate from "nepali-date-converter";

const WeatherTimeDisplay = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const apiKey = "fab9a597d30345489a572633250603";

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun size={40} color="yellow" />;
      case "cloudy":
        return <Cloud size={40} color="gray" />;
      case "partly cloudy":
        return <Cloud size={40} color="lightgray" />;
      case "rain":
        return <CloudRain size={40} color="blue" />;
      case "snow":
        return <CloudSnow size={40} color="lightblue" />;
      case "storm":
      case "thunderstorm":
        return <CloudLightning size={40} color="darkgray" />;
      case "windy":
        return <Wind size={40} color="blue" />;
      default:
        return <Cloud size={40} color="gray" />;
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const { latitude, longitude } = await getLocation();
        const weatherData = await getWeather(latitude, longitude, apiKey);
        setWeather(weatherData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [apiKey]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // English date and time
  const englishDateTime = currentTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getNepaliDateWithWeekday = () => {
    const nepaliDateObj = new NepaliDate(); // Get the current Nepali date

    // Nepali weekday names
    const nepaliWeekdays = [
      "आइतवार",
      "सोमवार",
      "मंगलवार",
      "बुधवार",
      "बिहीबार",
      "शुक्रवार",
      "शनिवार",
    ];

    // Get the day of the week (0-6) in Nepali format
    const weekday = nepaliWeekdays[nepaliDateObj.getDay()];

    // Format the date (e.g., 06 फागुन 2081)
    const formattedDate = nepaliDateObj.format("DD MMMM YYYY", "np");

    // Return the formatted date with the weekday
    return `${weekday}, ${formattedDate}`;
  };

  return (
    <div className="flex flex-row lg:flex-col xl:flex-row items-center justify-between w-full   px-8 font-semibold text-gray-500 ">
      {weather && (
        <div className="flex flex-col  justify-center items-center ">
          <div className="flex items-center justify-center">
            {getWeatherIcon(weather.current.condition.text)}{" "}
            <p className="text-lg pl-2">{weather.current.temp_c}°C</p>
          </div>

          <p>{weather.location.name}</p>
        </div>
      )}

      <div className="flex flex-col  text-sm space-y-4 lg:space-y-1 xl:space-y-4 ite justify-center font-semibold text-gray-500 mt-1">
      
          <p>{englishDateTime}</p>
      
      
          <p> {getNepaliDateWithWeekday()} </p>
      
      </div>
    </div>
  );
};

export default WeatherTimeDisplay;
