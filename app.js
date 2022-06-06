//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
//bab28Id79e5f1e9755a68d754cc313e7
//key: "79e9e0689c27f8176e2306ec99b577e1",
// key: "bab281d79e5f1e9755a68d754cc313e7",
const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7", 
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}
//event listenter on function key prees
const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        console.log(searchInputBox.value);
        getweatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});

//get weather report
function getweatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
            return weather.json();
        }).then(showWeatherReport);
};
//show weather report
function showWeatherReport(weather) {
    console.log(weather);
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let temperature = document.getElementById('temperature');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;
    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;
    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    } else if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('images/fullcloudy.jpg')";
    } else if (weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('images/fullrainy.jpg')";
    } else if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    } else if (weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url('images/stormy.jpg')";
    } else if (weatherType.textContent == 'Haze') {
     document.body.style.backgroundImage = "url('images/lightning.jpg')";
     }
};
//date manage functions
function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`;
};