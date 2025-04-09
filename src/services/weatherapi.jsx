import axios from "axios";

// Function to get the user's current location using ip-api (IP Geolocation API)
export const getLocation = async () => {
  try {
    const response = await axios.get("https://ip-api.com/json");
    if (response.data && response.data.status === "fail") {
      throw new Error("Failed to retrieve location.");
    }
    
    const { lat, lon } = response.data; // Get latitude and longitude from the API response
    return { latitude: lat, longitude: lon };
  } catch (error) {
    throw new Error("Error getting location: " + error.message);
  }
};

// Function to get current weather using WeatherAPI
export const getWeather = async (latitude, longitude, apiKey) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching weather data.");
  }
};
