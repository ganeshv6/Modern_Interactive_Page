const carouselTrack = document.querySelector('.carousel-track');
const carouselImages = document.querySelectorAll('.carousel-img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carousel-dots');

const carouselDescription = document.getElementById('carousel-description'); 

let currentImageIndex = 0;
const totalImages = carouselImages.length;

for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = i;
    dot.addEventListener('click', () => {
        currentImageIndex = i;
        updateCarousel();
    });
    dotsContainer.appendChild(dot);
}

const carouselDots = document.querySelectorAll('.dot');

function updateCarousel() {
    carouselImages.forEach(img => img.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active'));

    const activeImage = carouselImages[currentImageIndex]; 
    activeImage.classList.add('active');
    carouselDots[currentImageIndex].classList.add('active');
    
    const description = activeImage.getAttribute('data-description');
    carouselDescription.textContent = description;
}

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateCarousel();
});

updateCarousel(); 

const WEATHER_API_KEY = 'YOUR_API_KEY'; 
const weatherDetailsDiv = document.getElementById('weather-details');
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

async function fetchWeatherData(city) {
    if (!WEATHER_API_KEY) {
        weatherDetailsDiv.innerHTML = `<p>API key is missing.</p>`;
        return;
    }
    if (!city) {
        weatherDetailsDiv.innerHTML = `<p>Please enter a city name.</p>`;
        return;
    }
    weatherDetailsDiv.innerHTML = `<p>Fetching weather for ${city}...</p>`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Location not found or network error. Status: ${response.status}`);
        }
        const data = await response.json();
        const main = data.main;
        const weather = data.weather[0];
        const wind = data.wind;

        weatherDetailsDiv.innerHTML = `
            <h4>Current Weather in ${data.name} (${data.sys.country})</h4>
            <p><strong>Condition:</strong> <img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="${weather.description}" style="vertical-align: middle;"> ${weather.description}</p>
            <p><strong>Temperature:</strong> ${main.temp}°C</p>
            <p><strong>Feels Like:</strong> ${main.feels_like}°C</p>
            <p><strong>Min/Max Temp:</strong> ${main.temp_min}°C / ${main.temp_max}°C</p>
            <hr style="border-color: #eee;">
            <p><strong>Humidity:</strong> ${main.humidity}%</p>
            <p><strong>Pressure:</strong> ${main.pressure} hPa</p>
            <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDetailsDiv.innerHTML = `<p style="color: #cc0000;">Error: ${error.message}</p>`;
    }
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    fetchWeatherData(city);
});

const generateJokeBtn = document.getElementById('generate-joke-btn');
const jokeOutputDiv = document.getElementById('joke-output');

async function fetchJokeData() {
    jokeOutputDiv.innerHTML = `<p>Generating joke...</p>`;
    const url = 'https://official-joke-api.appspot.com/random_joke';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        jokeOutputDiv.innerHTML = `
            <p class="joke-setup"><strong>Setup:</strong> ${data.setup}</p>
            <p class="joke-punchline"><strong>Punchline:</strong> ${data.punchline}</p>
        `;
    } catch (error) {
        console.error('Error fetching joke data:', error);
        jokeOutputDiv.innerHTML = `<p style="color: #cc0000;">Failed to load joke. <small>Error: ${error.message}</small></p>`;
    }
}

generateJokeBtn.addEventListener('click', fetchJokeData);

document.addEventListener('DOMContentLoaded', () => {
    weatherDetailsDiv.innerHTML = `<p>Enter a city name and click 'Search' to get started.</p>`;

});
