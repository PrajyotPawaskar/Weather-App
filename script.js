const form = document.querySelector('.weatherForm');
const cityInput = document.querySelector('#city');
const searchButton = document.querySelector('#srchBtn');
let info = document.querySelector('.container');
const apiKey = "9ab8842d9a56a0a66427c09f9a55637b";
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const data = await getData(city);
            displayData(data);
        } catch (error) {
            displayError(error);
        }
    }
    else {
        displayError("Please Enter City Name !!!");
    }
})

async function getData(c) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${apiKey}`;

    let response = await fetch(url);
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    let responseJson = await response.json();
    return responseJson;
}

function displayData(responseJson) {
    if (!responseJson || !responseJson.name) {
        throw new Error('Invalid data received from the weather API.');
    }
    let loc = responseJson.name;
    let temp = responseJson.main.temp;
    let humidity = responseJson.main.humidity;
    let description = responseJson.weather[0].description;
    let weatherId = responseJson.weather[0].id;
    let weatherEmoji = getEmoji(weatherId);
    info.innerHTML = `
        <p class="location">${loc}</p>
        <p class="temp">${(temp - 273.15).toFixed(1)}</p>
        <p class="humidity">Humidity: ${humidity}%</p>
        <p class="desc">${description}</p>
        <p class="emoji">${weatherEmoji}</p>
    `
    cityInput.value = '';
}

function displayError(e) {
    info.innerHTML = `
        <p class="location">${e}</p>
    `
}

function getEmoji(id) {
    switch (true) {
        case (id >= 200 && id < 300):
            return " ⛈ ";
        case (id >= 300 && id < 400):
            return " ⛈ ";
        case (id >= 500 && id < 600):
            return " ⛈ ";
        case (id >= 600 && id < 700):
            return " ❄ ";
        case (id >= 700 && id < 800):
            return " 💨 ";
        case (id == 800):
            return " ☀ ";
        case (id >= 800 && id < 810):
            return " ☁ ";
        default:
            return " ❓ ";
    }
}