// Nasze api
var apiId = 'a85d2123b5271bca849dc751e64a2b42';
// Jednostki w ktorych chcemy otrzymywac dane
var units = 'metric';
// Sposob wyszukiwania zip lub miasto. Mozemy zostawic stale lub dac mozliwosc wyboru
// IMO ZIP jest u nas rzadko wykorzystywany, zostałbym przy samym mieście - Wiktor
var searchMethod = 'q';

// Funkcja wysylajaca zapytanie o dane pogodowe za pomoca naszego api na podany "url,
// nastepnie czeka na odpowiedz od serwera, odbiera json'a z danymi pogodowymi,
// inicjuje funkcje do obrabiania naszych danych (na ta chwile loguje jsona zeby podgladac format danych)
function searchWeather(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${city}&APPID=${apiId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

// Funkcja do obrabiania danych
function init(dataSet) {
    switch (dataSet.weather[0].main) {
        case 'Clouds':
            document.body.style.backgroundImage = "url('images/clouds.jpg')";
            break;

        case 'Clear':
            document.body.style.backgroundImage = "url('images/clear.jpg')";
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = "url('images/rain.jpg')";
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
            break;

        case 'Snow':
            document.body.style.backgroundImage = "url('images/snow.jpg')";
            break;

        default:
            break;
    }

    let weatherType = document.getElementById('weatherType');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');

    let weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + dataSet.weather[0].icon + '.png';
    // console.log(weatherIcon.src);

    let resultsDescription = dataSet.weather[0].description;
    weatherType.innerHTML = resultsDescription.charAt(0).toUpperCase () + resultsDescription.slice(1);

    
    temperatureElement.innerHTML = "<img src='icons/temp.png'/>" + Math.floor(dataSet.main.temp) + '&#176C';
    windSpeedElement.innerHTML = "<img src='icons/wind.png'/>" + Math.floor(dataSet.wind.speed) + ' m/s';
    cityName.innerHTML = dataSet.name;
    humidityElement.innerHTML = "<img src='icons/humidity.png'/>" + Math.floor(dataSet.main.humidity) + ' %';

        

    console.log(dataSet.weather[0].main);                                     // stan pogody
    console.log(dataSet.main.temp + " " + String.fromCharCode(176) + "C");  // temperatura w stopniach C
    console.log(dataSet);
}



// Reakcja na klikniecie przycisku i pobranie danych(miasta) z inputu oraz uruchomienie funkcji pogodowej z wybranym miastem
document.getElementById('searchBtn').addEventListener('click', () => {
    let city = document.getElementById('city').value;
    searchWeather(city);
})
document.getElementById('city').addEventListener('keyup', (e) => {
    if (e.keyCode === 13){
        let city = document.getElementById('city').value;
        searchWeather(city);
    }
})