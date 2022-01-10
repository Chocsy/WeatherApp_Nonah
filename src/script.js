let today = document.querySelector("#currentDay");
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
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
let dayWeek = days[now.getDay()];
today.innerHTML = `${dayWeek}`;
let timeNow = document.querySelector("#currentTime");
timeNow.innerHTML = `${hours}:${minutes}`;

function citySelection(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch").value;
  let apiKey = "914657084188fb97efc6e46d721160fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function showTemperature(response) {
    event.preventDefault();
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#currentTemp").innerHTML = `${Math.round(
      response.data.main.temp
    )}°C`;
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;

    document.querySelector(
      "#humidity"
    ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
    document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
      response.data.wind.speed * 3.6
    )}km/hr`;
  }
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#searchForm");
form.addEventListener("submit", citySelection);

function convertCelcius(event) {
  event.preventDefault();
  let convertedTemp = document.querySelector("h1");
  convertedTemp.innerHTML = "17°C";
}
let celciusTemp = document.querySelector("#celcius-btn");
celciusTemp.addEventListener("click", convertCelcius);

function convertFarenheit(event) {
  event.preventDefault();
  let convertedTemp = document.querySelector("h1");
  convertedTemp.innerHTML = "63°F";
}
let farenheitTemp = document.querySelector("#farenheit-btn");
farenheitTemp.addEventListener("click", convertFarenheit);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(ShowLocation);

  function ShowLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "914657084188fb97efc6e46d721160fb";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }
  function showTemperature(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#currentTemp").innerHTML = `${Math.round(
      response.data.main.temp
    )}°C`;
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;

    document.querySelector(
      "#humidity"
    ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
    document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
      response.data.wind.speed * 3.6
    )}km/hr`;
  }
}

let locationButton = document.querySelector("#currentLocationButton");
locationButton.addEventListener("click", getCurrentPosition);
