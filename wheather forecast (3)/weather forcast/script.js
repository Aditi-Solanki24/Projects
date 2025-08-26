const apiKey = "0ba795faa67f4c45cfa2c524e5cb337b"; // Replace with your OpenWeatherMap API key
const weatherInfo = document.getElementById("weather-info");

// Get weather by user's current location
window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            () => {
                weatherInfo.innerHTML = "<p>Unable to access location. Please search by city.</p>";
            }
        );
    } else {
        weatherInfo.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
    }
};

// Fetch weather by coordinates
function getWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(() => {
            weatherInfo.innerHTML = "<p>Error fetching weather data.</p>";
        });
}

// Fetch weather by city name
function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;
    if (city.trim() === "") {
        alert("Please enter a city name.");
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                weatherInfo.innerHTML = "<p>City not found.</p>";
            } else {
                displayWeather(data);
            }
        })
        .catch(() => {
            weatherInfo.innerHTML = "<p>Error fetching weather data.</p>";
        });
}

function displayWeather(data) {
    const { name, sys, weather, main, wind, coord } = data;  // added coord
    weatherInfo.innerHTML = `
        <h2>${name}, ${sys.country}</h2>
        <p>${weather[0].description}</p>
        <p>🌡 Temperature: ${main.temp}°C</p>
        <p>💧 Humidity: ${main.humidity}%</p>
        <p>💨 Wind Speed: ${wind.speed} m/s</p>
    `;
       const now = new Date().getHours();
    if (now >= 19 || now < 6) {
        // Night mode
        document.querySelector(".moon").style.display = "block";
        document.querySelector(".stars").style.display = "block";
        document.querySelectorAll(".cloud").forEach(c => c.style.display = "none");
        document.querySelectorAll(".shooting-star").forEach(s => s.style.display= "block");
        document.body.style.background = "linear-gradient(to top, #0d1b2a, #1b263b, #415a77)";
    } else {
        // Day mode
        document.querySelector(".moon").style.display = "none";
        document.querySelector(".stars").style.display = "none";
        document.querySelectorAll(".cloud").forEach(c => c.style.display = "block");
        document.querySelectorAll(".shooting-star").forEach(s => s.style.display = "none");
        document.body.style.background = "linear-gradient(-45deg, #2193b0, #6dd5ed, #00c6ff, #0072ff)";
    }
 

    // Fetch 5-day forecast (needs city name)
    getFutureForecast(name);
}


// Fetch 5-day forecast
function getFutureForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            let forecastHTML = "";
            data.list.forEach((item, index) => {
                if (index % 8 === 0) { // approx once per day
                    forecastHTML += `
                        <div class="forecast-item">
                            <p>${new Date(item.dt * 1000).toDateString()}</p>
                            <p>${item.weather[0].description}</p>
                            <p>🌡 ${item.main.temp}°C</p>
                        </div>
                    `;
                }
            });
            document.getElementById("forecast-data").innerHTML = forecastHTML;
        })
        .catch(() => {
            document.getElementById("forecast-data").innerHTML = "<p>Unable to fetch forecast.</p>";
        });
}
