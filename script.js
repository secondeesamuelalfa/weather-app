// Declared with 'function' instead of 'const' so tests can reassign them
async function getWeather(city) {
  try {
    const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function showWeather(city) {
  const data = await getWeather(city);
  
  // Handle errors or undefined returns
  if (!data) {
    alert("Something went wrong, please try again later.");
    return;
  }

  // Safely extract nested objects to prevent undefined errors
  const weather = data.weather && data.weather[0] ? data.weather[0] : {};
  const main = data.main || {};
  const wind = data.wind || {};

  // Populate the DOM, using "N/A" if a value is undefined
  document.getElementById("weather-icon").src = weather.icon || "N/A";
  document.getElementById("location").textContent = data.name || "N/A";
  document.getElementById("weather-main").textContent = weather.main || "N/A";
  document.getElementById("main-temperature").textContent = main.temp !== undefined ? main.temp : "N/A";
  document.getElementById("feels-like").textContent = main.feels_like !== undefined ? main.feels_like : "N/A";
  document.getElementById("humidity").textContent = main.humidity !== undefined ? main.humidity : "N/A";
  document.getElementById("wind").textContent = wind.speed !== undefined ? wind.speed : "N/A";
  document.getElementById("wind-gust").textContent = wind.gust !== undefined ? wind.gust : "N/A";
  
  // Reveal the weather info container
  document.getElementById("weather-info").style.display = "block";
}

// Event listener for the button
document.getElementById("get-weather-btn").addEventListener("click", () => {
  const citySelect = document.getElementById("city-select");
  const selectedCity = citySelect.value;
  
  // Do nothing if no city is selected
  if (!selectedCity) {
    return;
  }
  
  showWeather(selectedCity);
});