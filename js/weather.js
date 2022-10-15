// const WEATHER_API_KEY = "46f93ba75ca67ec92ed3ab8e9318ccab";
const API_FILE = "weather_api.json";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(API_FILE)
        .then((response) => response.json())
        .then((data) => {
            const WEATHER_API_KEY = data.API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const weather = document.querySelector(
                        ".weather span:first-child"
                    );
                    const city = document.querySelector(
                        ".weather span:last-child"
                    );
                    weather.innerText = `${data.weather[0].main}, ${Math.round(
                        data.main.temp
                    )}\xB0C`;
                    city.innerText = data.name;
                });
        })
        .catch((error) => printGeoError("WEATHER_API_KEY is not found."));
}

function printGeoError(message) {
    const weather = document.querySelector(".weather span:first-child");
    weather.innerText = message;
}

function onGeoError() {
    printGeoError("Allow to see your location to get weather information.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
