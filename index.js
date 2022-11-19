let nowDate = new Date();
let nowTime = document.querySelector("#currentTime");
let nowHour = nowDate.getHours();
if (nowHour < 10) {
  nowHour = `0${nowHour}`;
}
let nowMinutes = nowDate.getMinutes();
if (nowMinutes < 10) {
  nowMinutes = "0" + nowMinutes;
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
let day = days[nowDate.getDay()];

nowTime.innerHTML = day + ", " + nowHour + ":" + nowMinutes;

function showTempWeather(response) {
  console.log(response.data);
  document.querySelector("#locationId").innerHTML = response.data.city;
  celTemp = response.data.temperature.current;
  document.querySelector("#temperatureMatt").innerHTML = Math.round(celTemp);
  document.querySelector("#air").innerHTML =
    response.data.condition.description;
  document.querySelector("#tears").innerHTML =
    "Dragon tears: " + response.data.temperature.humidity + "%";
  document.querySelector("#fairy").innerHTML =
    "Fairy wind: " + Math.round(response.data.wind.speed) + "km/h";
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function cityNewSearch(city) {
  let apiKey = "5c3b44fd3211f47fodb530a25ba78e2t";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTempWeather);
}
function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searching").value;
  cityNewSearch(city);
}

let searchCitySubmit = document.querySelector("form");
searchCitySubmit.addEventListener("submit", citySubmit);

function showWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#locationId");
  city.innerHTML = response.data.city;
  let temp = document.querySelector("#temperatureMatt");
  temp.innerHTML = Math.round(response.data.temperature.current);
  let air = document.querySelector("#air");
  air.innerHTML = response.data.condition.description;
  let humidityTears = document.querySelector("#tears");
  humidityTears.innerHTML =
    "Mysterious humidity: " + response.data.temperature.humidity + "%";
  let wind = document.querySelector("#fairy");
  let showWind = Math.round(response.data.wind.speed);
  wind.innerHTML = "Fairy wind: " + showWind + "km/h";
}

function lookCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5c3b44fd3211f47fodb530a25ba78e2t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(showTempWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(lookCurrentLocation);
}

let currentLocationButton = document.querySelector("#location-search");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureMatt");
  let tempF = (celTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(tempF);
}
let celTemp = null;

let linkF = document.querySelector("#degreeF");
linkF.addEventListener("click", displayF);

function displayC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureMatt");
  temperatureElement.innerHTML = Math.round(celTemp);
}

let linkC = document.querySelector("#degreeC");
linkC.addEventListener("click", displayC);
