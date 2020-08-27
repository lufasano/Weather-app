let now = new Date();
let dateParagraph = document.querySelector("h3");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dateParagraph.innerHTML = `${day} ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let currentDay = days[date.getDay()];
  return `${currentDay}`;
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  let city = document.querySelector("#form-input").value;
  let h1 = document.querySelector("h1");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  celsiusTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  h1.innerHTML = response.data.name;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `src/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  let latitude = response.coord.lat;
  let longitude = response.coord.lon;

  for (let index = 1; index < 7; index++) {
    forecast = response.data.daily[index];
    forecastElement.innerHTML += `
    <div class="col-2">
    <div>
      ${formatDay(forecast.dt * 1000)}
      </div>
      <img src="src/${forecast.weather[0].icon}.png" alt="weather" id="icons"/>
      <span class="shade">${Math.round(forecast.temp_max)}°</span>
      <span class="text"> | ${Math.round(forecast.temp_min)}°</span>
    </div>`;
  }
}

function searchCity(city) {
  let key = "60165e6fa483c2ba25ca27f92df423ed";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showTemperature);
  let latitude = response.coord.lat;
  let longitude = response.coord.lon;
  url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&daily&appid=${key}&units=metric`;
  axios.get(url).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#form-input").value;
  searchCity(city);
}

function displayFarenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#my-form");
form.addEventListener("submit", search);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", displayFarenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

function showPosition(position) {
  let key = "60165e6fa483c2ba25ca27f92df423ed";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(url).then(showTemperature);
}

function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#geo-button");
button.addEventListener("click", getCurrentPosition);

searchCity("Lisbon");
