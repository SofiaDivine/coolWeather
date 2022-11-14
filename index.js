let nowDate = new Date();
let nowTime = document.querySelector("#currentTime");
let nowHour = nowDate.getHours();
if (nowHour < 10) {
  nowHour = `0&{nowHour}`;
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

nowTime.innerHTML = day + " ," + nowHour + ":" + nowMinutes;

function showTempWeather(response) {
  console.log(response.data);
  document.querySelector("#locationId").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML =
    Math.round(response.data.main.temp) + "°";
  document.querySelector("#air").innerHTML = response.data.weather[0].main;
  document.querySelector("#tears").innerHTML =
    "Dragon tears: " + response.data.main.humidity + "%";
  document.querySelector("#fairy").innerHTML =
    "Fairy wind: " + Math.round(response.data.wind.speed) + "km/h";
}

function cityNewSearch(city) {
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTempWeather);
}
function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searching").value;
  cityNewSearch(city);
}

let searchCitySubmit = document.querySelector("form");
searchCitySubmit.addEventListener("submit", citySubmit);

function clickDegreeC(event) {
  event.preventDefault();
  let clickTemp = document.querySelector("#currentTemp");
  clickTemp.innerHTML = "17°C";
}

function clickDegreeF(event) {
  event.preventDefault();
  let clickTemp = document.querySelector("#currentTemp");
  clickTemp.innerHTML = "63°F";
}

let clickC = document.querySelector("#degreeC");
clickC.addEventListener("click", clickDegreeC);

let clickF = document.querySelector("#degreeF");
clickF.addEventListener("click", clickDegreeF);

function showWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#locationId");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = Math.round(response.data.main.temp) + "C";
  let air = document.querySelector("#air");
  air.innerHTML = response.data.weather[0].main;
  let humidityTears = document.querySelector("#tears");
  humidityTears.innerHTML =
    "Mysterious humidity: " + response.data.main.humidity + "%";
  let wind = document.querySelector("#fairy");
  let showWind = Math.round(response.data.wind.speed);
  wind.innerHTML = "Fairy wind: " + showWind + "km/h";
}

function lookCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(lookCurrentLocation);
}

let currentLocationButton = document.querySelector("#location-search");
currentLocationButton.addEventListener("click", getCurrentLocation);
