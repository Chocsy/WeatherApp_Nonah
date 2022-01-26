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

function showTemperature(response) {
  let temperatureElement = document.querySelector("#currentTemp");
  let cityElement = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let dayElement = document.querySelector("#currentDay");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = `${Math.round(celciusTemperature)}°C`;
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
  temperatureElement.innerHTML = `${Math.round(farenheitTemperature)}°F`;
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = `${Math.round(celciusTemperature)}°C`;
}

let celciusTemperature = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let farenheitButton = document.querySelector("#farenheit-btn");
farenheitButton.addEventListener("click", displayFarenheitTemperature);

let celciusButton = document.querySelector("#celcius-btn");
celciusButton.addEventListener("click", displayCelciusTemperature);

search("Sydney");
