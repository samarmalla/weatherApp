function getWeather(){

    const apiKey = "9b68baccd0d459e81f3b34aee3608c55";
    const city = document.getElementById("city").value;

    if(!city){
    alert ("Please enter a city");
    return;
     }

    if (!/[a-zA-Z]/.test(city)) {
        alert("City name must contain letters.");
        return;
    }

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherURL).then(response => response.json()).then(data=>{displayWeather(data);})
    .catch(error=>{console.error('Error fecthing current weather:',error);
        alert('Could not fetch current weather data. Please try again');
    });

    fetch(forecastUrl).then(response=>response.json()).then(data=>{displayHourlyForecast(data.list);})
    .catch(error=>{console.error('Error fetching hourly forecast data:', error);
        alert('Error fetching hourly forecast data. Please try again');
        document.getElementById('forecast').innerHTML = "";
    });


}

function displayWeather(data){
        
    const tempInfo = document.getElementById('temp');
    const weatherCondition = document.getElementById('condition');
    const tempIcon = document.getElementById('weatherImg');
    const humiInfo = document.getElementById('humidity');
    const windInfo = document.getElementById('windSpeed');
    const resetBtn = document.getElementById('resetBtn');

    //clear previous content
    tempInfo.innerHTML = "";
    weatherCondition.innerHTML = "";
    humiInfo.innerHTML = "";
    windInfo.innerHTML = "";
    tempIcon.src = "";

    if(data.cod === '404'){
        tempInfo.innerHTML = `<p>${data.message}</p>`;
        tempIcon.src = "weatherLogo.jpg"; // Show default logo
        tempIcon.alt = "weather logo";
        resetBtn.disabled = true;
        document.getElementById('forecast').innerHTML = ""; // Hide forecast
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;  
        const windDirection = data.wind.deg;

        tempInfo.innerHTML = `<h2>${cityName}</h2><p>Temp:${temperature}&deg;C</p>`;
        weatherCondition.innerHTML = `<p>Condition:${description}</p>`;
        tempIcon.src = iconUrl;
        tempIcon.alt = description;
        humiInfo.innerHTML = `<p>Humidity: ${humidity}%</p>`;
        windInfo.innerHTML = `<p>Wind: ${windSpeed} m/s, ${windDirection}&deg;</p>`;
        resetBtn.disabled = false; // Enable reset button

    }
}

function displayHourlyForecast(list) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = "<h3>Forecast (next 5 periods):</h3>";
    for (let i = 0; i < 5 && i < list.length; i++) {
        const item = list[i];
        const time = item.dt_txt;
        const temp = Math.round(item.main.temp - 273.15);
        const desc = item.weather[0].description;
        forecastDiv.innerHTML += `<div>${time}: ${temp}&deg;C, ${desc}</div>`;
    }
}

document.getElementById("city").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

document.getElementById("resetBtn").addEventListener("click", function() {
    document.getElementById("city").value = "";
    document.getElementById("temp").innerHTML = "";
    document.getElementById("condition").innerHTML = "";
    document.getElementById("humidity").innerHTML = "";
    document.getElementById("windSpeed").innerHTML = "";
    document.getElementById("weatherImg").src ="weatherLogo.jpg";
    document.getElementById("weatherImg").alt = "weather logo";
    document.getElementById("forecast").innerHTML = "";
    this.disabled = true; // Disable reset button after reset

});


