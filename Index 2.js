async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "YOUR_API_KEY";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        
        document.getElementById("weatherData").innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        document.getElementById("weatherData").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}
