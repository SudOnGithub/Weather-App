const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "e7c54161c48681943d300f2dcb031e5e";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    console.log("Nothing");
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const finalApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  // This I made for the 5 day forecast
  const response = await fetch(apiUrl);
  const response2 = await fetch(finalApiUrl);
  console.log(response, response2);

  const currentResponse = await fetch(apiUrl);
  if (!currentResponse.ok) {
    throw new Error("Could not fetch current weather data");
  }
  const currentWeatherData = await currentResponse.json();

  // Fetch 5-day forecast data
  const forecastResponse = await fetch(finalApiUrl);
  if (!forecastResponse.ok) {
    throw new Error("Could not fetch forecast data");
  }
  const forecastWeatherData = await forecastResponse.json();

  // Created an object containing both current and forecast weather data
  return { current: currentWeatherData, forecast: forecastWeatherData };
}

function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
    wind: { speed },
    sys: { country },
  } = data.current;

  for(let i=1;i=data.forecast.list.length;i+=8){
  const name = data.forecast.list[i+8];
  console.log(name)}
  
  card.textContent = "";
  //   Above is to reset once we write a correct city after we have seen data for another city
  card.style.display = "flex";

  const cityDisplay = document.createElement("div");

  const tempDisplay = document.createElement("p");

  const descDisplay = document.createElement("p");

  const weatherEmoji = document.createElement("div");

  const otherDisplay = document.createElement("div");

  cityDisplay.innerHTML = `<p style="font-size:2.5rem;font-weight: 500;">${city}</p> <p style="font-size:1.5rem;">${country}</p>`;
  tempDisplay.innerHTML = `${(temp - 273.15).toFixed(
    1
  )} <sup style="font-size:3rem"> ° C</sup>`;
  descDisplay.textContent =
    description.charAt(0).toUpperCase() + description.slice(1).toLowerCase();
  weatherEmoji.innerHTML = getWeatherEmoji(id);
  otherDisplay.innerHTML = `<div class="otherDisplay1"><i class="fa-solid fa-water"></i> 
   <div style="text-align:left; >
   <p style="font-size:2rem;"> ${humidity} %</p> 
   <p style="font-size:1rem;font-weight: 200;">Humidity</p></div>
   </div>
   <div class="otherDisplay1"><i class="fa-solid fa-wind"></i> 
   <div style="text-align:left; >
   <p style="font-size:2rem;"> ${speed} m/s</p> 
   <p style="font-size:1rem;font-weight: 200;">Wind Speed</p></div>
   </div>`;

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");
  otherDisplay.classList.add("otherDisplay");

  card.appendChild(weatherEmoji);
  card.appendChild(descDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(cityDisplay);
  card.appendChild(otherDisplay);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      document.body.style.backgroundImage = 'url("./thunderstorm.jpg.svg")';
      return `<img src="./SVG/thunderstorm.svg" height="200px" alt="sja">`;
    case weatherId >= 300 && weatherId < 400:
      document.body.style.backgroundImage = 'url("./rain.jpg")';
      return `<img src="./SVG/rain+clouds.svg" height="200px" alt="sja">`;
    case weatherId >= 500 && weatherId < 600:
      document.body.style.backgroundImage = 'url("./snow+rain.jpg")';
      return `<img src="./SVG/snow+rain.svg" height="200px" alt="sja">`;
    case weatherId >= 600 && weatherId < 700:
      document.body.style.backgroundImage = 'url("./snow.jpg")';
      return `<img src="./SVG/snow.svg" height="200px" alt="sja">`;
    case weatherId >= 700 && weatherId < 800:
      document.body.style.backgroundImage = 'url("./haze.jpg")';
      return `<img src="./SVG/clouds.svg" height="200px" alt="sja">`;
    case weatherId === 800:
      document.body.style.backgroundImage = 'url("./sunny.jpg")';
      return `<img src="./SVG/sunny.svg" height="200px" alt="sja">`;
    case weatherId >= 801 && weatherId < 810:
      document.body.style.backgroundImage = 'url("./clouds2.jpg")';
      return `<img src="./SVG/clouds.svg" height="200px" alt="sja">`;
    default:
      return "❓";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

// If only one value is given in slide it means the starting position
