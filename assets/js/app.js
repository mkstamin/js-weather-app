const condition = document.getElementById('condition');
const city = document.getElementById('city');
const country = document.getElementById('country');
const mainText = document.getElementById('main');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');

const cityInput = document.getElementById('city-input');
const historyElm = document.getElementById('history');
const masterHistory = document.getElementById('master-history');

const API_KEY = '5253df4d0556552918bf7fa34672ecca';
const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?q=&appid=${API_KEY}`;
const ICON_URL = 'http://openweathermap.org/img/wn/';
const DEFAULT_CITY = 'bogra,bd';

window.onload = function () {
  navigator.geolocation.getCurrentPosition(
    (s) => {
      // console.log(s.coords);
      getWeatherData(null, s.coords);
    },
    (e) => {
      // console.log(e);
      getWeatherData();
    }
  );

  cityInput.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
      if (e.target.value) {
        getWeatherData(e.target.value);

        // console.log(e.target.value);
        // cityInput.value=''
        e.target.value = '';
      } else {
        alert('Plz Enter a valid City Name');
      }
    }
  });
};

function getWeatherData(city = DEFAULT_CITY, coords) {
  // console.log(coords);
  let url = BASE_URL;

  city === null
    ? (url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}`)
    : // : (url = `${url}&q=${city}`);
      (url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);

  // console.log(url);

  axios
    .get(url)
    .then(({ data }) => {
      // console.log(data);
      let weather = {
        icon: data.weather[0].icon,
        main: data.weather[0].main,
        description: data.weather[0].description,
        name: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
      };

      setWeather(weather);
    })
    .catch((e) => {
      // console.log(e);
      alert('City Not Found');
    });
}

function setWeather(weather) {
  condition.src = `${ICON_URL}${weather.icon}.png`;
  city.innerHTML = weather.name;
  country.innerHTML = weather.country;
  mainText.innerHTML = weather.main;
  description.innerHTML = weather.description;
  temp.innerHTML = weather.temp;
  pressure.innerHTML = weather.pressure;
  humidity.innerHTML = weather.humidity;
}
