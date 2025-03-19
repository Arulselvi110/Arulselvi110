const apiKey = 'your_api_key';  // Replace with your OpenWeatherMap API key
let unit = 'metric';  // Default unit: 'metric' for Celsius
let city = '';

function getWeatherData() {
  city = document.getElementById('location-input').value;
  if (!city) {
    alert('Please enter a valid location.');
    return;
  }

  fetchWeatherData(city);
}

function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        alert('Error: ' + data.message);
        return;
      }
      
      displayCurrentWeather(data);
      fetchForecastData(data.coord.lat, data.coord.lon);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Failed to retrieve data.');
    });
}

function displayCurrentWeather(data) {
  const cityName = document.getElementById('city-name');
  const currentTemp = document.getElementById('current-temp');
  const currentHumidity = document.getElementById('current-humidity');
  const currentWind = document.getElementById('current-wind');
  const currentCondition = document.getElementById('current-condition');

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  currentTemp.textContent = `Temperature: ${data.main.temp}° ${unit === 'metric' ? 'C' : 'F'}`;
  currentHumidity.textContent = `Humidity: ${data.main.humidity}%`;
  currentWind.textContent = `Wind Speed: ${data.wind.speed} ${unit === 'metric' ? 'm/s' : 'mph'}`;
  currentCondition.textContent = `Condition: ${data.weather[0].description}`;
}

function fetchForecastData(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayForecast(data))
    .catch(error => console.error('Error fetching forecast data:', error));
}

function displayForecast(data) {
  const forecastContainer = document.getElementById('forecast');
  forecastContainer.innerHTML = '';

  data.daily.forEach(day => {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');
    
    const date = new Date(day.dt * 1000);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    const temp = day.temp.day;
    const icon = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
    
    forecastItem.innerHTML = `
      <h4>${dayOfWeek}</h4>
      <img src="${icon}" alt="Weather icon" />
      <p>${temp}° ${unit === 'metric' ? 'C' : 'F'}</p>
    `;
    
    forecastContainer.appendChild(forecastItem);
  });
}

function toggleUnits() {
  unit = unit === 'metric' ? 'imperial' : 'metric';  // Toggle between Celsius (metric) and Fahrenheit (imperial)
  fetchWeatherData(city);  // Refetch the data with the new units
}
