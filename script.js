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
    });


}

function displayWeather(data){
        
    const tempInfo = document.getElementById('temp');
    const weatherCondition = document.getElementById('condition');
    const tempIcon = document.getElementById('weatherImg');
    const humiInfo = document.getElementById('humidity');
    const windInfo = document.getElementById('windSpeed');

    //clear previous content
    tempInfo.innerHTML = "";
    weatherCondition.innerHTML = "";
    humiInfo.innerHTML = "";
    windInfo.innerHTML = "";
    tempIcon.src = "";

    if(data.cod === '404'){
        tempInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;  
        const windDirection = data.wind.deg;

        tempInfo.innerHTML = `<h2>${cityName}</h2><p>${temperature}&deg;C</p>`;
        weatherCondition.innerHTML = `<p>${description}</p>`;
        tempIcon.src = iconUrl;
        tempIcon.alt = description;
        humiInfo.innerHTML = `<p>Humidity: ${humidity}%</p>`;
        windInfo.innerHTML = `<p>Wind: ${windSpeed} m/s, ${windDirection}&deg;</p>`;
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


