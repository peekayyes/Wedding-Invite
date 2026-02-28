// Card shuffle animation and page transition
document.addEventListener('DOMContentLoaded', () => {
    const loadingScene = document.getElementById('loading-scene');
    const bgReveal = document.getElementById('bg-reveal');
    
    // Show background after king card flies
    setTimeout(() => {
        bgReveal.classList.remove('hidden');
        bgReveal.classList.add('show');
    }, 10000);
    
    // Hide loading scene
    setTimeout(() => {
        loadingScene.classList.add('fade-out');
        setTimeout(() => {
            loadingScene.style.display = 'none';
        }, 500);
    }, 10000);
    
    // Hide background reveal after paper appears
    setTimeout(() => {
        bgReveal.style.display = 'none';
    }, 11000);
    
    // Start countdown and weather
    setTimeout(() => {
        startCountdown();
        fetchWeather();
    }, 11000);
});

// Countdown Timer
function startCountdown() {
    const weddingDate = new Date('2026-04-23T10:30:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-timer').innerHTML = '<p style="font-size: 2rem; color: #d4af37;">The Wedding Day is Here! 🎉</p>';
        }
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Weather Information
function fetchWeather() {
    // Kovilpatti coordinates
    const lat = 9.1711;
    const lon = 77.8711;
    
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=Asia/Kolkata`)
        .then(response => response.json())
        .then(data => {
            const temp = Math.round(data.current.temperature_2m);
            const weatherCode = data.current.weather_code;
            const weatherDesc = getWeatherDescription(weatherCode);
            
            document.getElementById('weather-temp').textContent = `${temp}°C`;
            document.getElementById('weather-desc').textContent = weatherDesc;
        })
        .catch(() => {
            document.getElementById('weather-temp').textContent = 'Pleasant Weather Expected';
            document.getElementById('weather-desc').textContent = 'Perfect for celebrations';
        });
}

function getWeatherDescription(code) {
    const weatherCodes = {
        0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
        45: 'Foggy', 48: 'Foggy', 51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle',
        61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain', 80: 'Light Showers', 81: 'Showers', 82: 'Heavy Showers'
    };
    return weatherCodes[code] || 'Pleasant Weather';
}

// Smooth scroll for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add keyboard accessibility for interactive elements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        if (document.activeElement.classList.contains('directions-btn')) {
            e.preventDefault();
            document.activeElement.click();
        }
    }
});
