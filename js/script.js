// Nasze api
var apiId = 'a85d2123b5271bca849dc751e64a2b42';
// Jednostki w ktorych chcemy otrzymywac dane
var units = 'metric';
// Sposob wyszukiwania zip lub miasto. Mozemy zostawic stale lub dac mozliwosc wyboru
// IMO ZIP jest u nas rzadko wykorzystywany, zostałbym przy samym mieście - Wiktor
var searchMethod = 'q';

// Funkcja wysylajaca zapytanie o dane pogodowe za pomoca naszego api na podany url,
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
    console.log(dataSet.weather[0].main)                                    // stan pogody
    console.log(dataSet.main.temp + " " + String.fromCharCode(176) + "C")  // temperatura w stopniach C
}

// Reakcja na klikniecie przycisku i pobranie danych(miasta) z inputu oraz uruchomienie funkcji pogodowej z wybranym miastem
document.getElementById('searchBtn').addEventListener('click', () => {
    let city = document.getElementById('city').value;
    searchWeather(city);
})
