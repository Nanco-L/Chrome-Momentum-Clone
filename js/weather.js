const WEATHER_API_KEY = "46f93ba75ca67ec92ed3ab8e9318ccab";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weather = document.querySelector(".weather span:first-child");
            const city = document.querySelector(".weather span:last-child");
            weather.innerText = `${data.weather[0].main}, ${Math.round(
                data.main.temp
            )}\xB0C`;
            city.innerText = data.name;
        });
}

function onGeoError() {
    const weather = document.querySelector(".weather span:first-child");
    weather.innerText =
        "Allow to see your location to get weather information.";
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
