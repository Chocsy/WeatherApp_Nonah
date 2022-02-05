function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weatherForecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (dailyForecast, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
   <div class="col-2">
     <div class="weather-forecast-day">${formatDay(dailyForecast.dt)}</div>
     <img src="http://openweathermap.org/img/wn/${
       dailyForecast.weather[0].icon
     }@2x.png" width="40"/>

     <div class="weather-forecast-temperature">
       <span class="weather-forecast-temperature-max">${Math.round(
         dailyForecast.temp.max
       )}°</span>
       <span class="weather-forecast-temperature-min"> ${Math.round(
         dailyForecast.temp.min
       )}°</span>
   </div>
 </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "914657084188fb97efc6e46d721160fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#currentTemp");
  let cityElement = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let dayElement = document.querySelector("#currentDay");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = `${Math.round(celciusTemperature)}`;
  cityElement.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  dayElement.innerHTML = formatDate(response.data.dt * 1000);
  windElement.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed * 3.6
  )}km/hr`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "914657084188fb97efc6e46d721160fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch");
  search(city.value);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(farenheitTemperature)}°`;
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `${Math.round(celciusTemperature)}`;
}

let celciusTemperature = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let farenheitButton = document.querySelector("#farenheit-btn");
farenheitButton.addEventListener("click", displayFarenheitTemperature);

let celciusButton = document.querySelector("#celcius-btn");
celciusButton.addEventListener("click", displayCelciusTemperature);

search("Sydney");
