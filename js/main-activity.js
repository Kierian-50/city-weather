/**
 * This method allows to call the API and when we have the response to set the value in the html.
 * Cette méthode permet d'appeler l'API et quand la reponse est recy, défini les parametre dans le code html.
 */
function callApi() {
    // Find URL
    let url = "http://api.openweathermap.org/data/2.5/";
    let key = "APPID=ee07e2bf337034f905cde0bdedae3db8";
    let cityRequest = "weather?q="+findCityName()+",fr&units=metric&";
    let finalUrl = url+cityRequest+key;
    console.log("[*] call url : "+finalUrl);

    // Call api
    let xhr = new XMLHttpRequest();
    xhr.open("GET", finalUrl, true);
    xhr.send(null);

    xhr.onreadystatechange = function(){
        console.log("[*] status : "+xhr.status);

        // When the response is sent by the server the state is 4
        // Lorsque la reponse est envoyé par le serveur l'état est à 4
        // 0 : Not initialize / non initialisé
        // 1 : Open / Ouverture
        // 2 : Send / Envoyé
        // 3 : Doing / En cours
        // 4 : OK
        if(xhr.readyState === 4){
            // if request ok : status code = 200
            // Si ok : code de status = 200
            if(xhr.status === 200){
                let json = JSON.parse(xhr.response);
                setWeatherIcon(json.weather[0].icon);
                setWindDirection(json.wind.deg);
                setComplementaryInfo(json.main.humidity, json.main.pressure, json.wind.speed);
                setTemperature(json.main.temp);
                setHeader(json.name, json.weather[0].description)
            }
        }
    }
}

/**
 * Set the dead of the html parameters with the name of the city, the date and the desc of the weather.
 * Defini le haut des parametres html avec le nom de la ville, la date et la description de la météo.
 * @param name
 * @param weatherDesc
 */
function setHeader(name, weatherDesc){
    let date = new Date();
    let nbDate = date.getDay();
    document.getElementById("city-name").innerHTML = name;
    document.getElementById("weather-desc").innerHTML = weatherDesc;

    if(nbDate === 1){
        document.getElementById("date").innerHTML = "Lundi"
    }else if(nbDate === 2){
        document.getElementById("date").innerHTML = "Mardi"
    }else if(nbDate === 3){
        document.getElementById("date").innerHTML = "Mercredi"
    }else if(nbDate === 4){
        document.getElementById("date").innerHTML = "Jeudi"
    }else if(nbDate === 5){
        document.getElementById("date").innerHTML = "Vendredi"
    }else if(nbDate === 6){
        document.getElementById("date").innerHTML = "Samedi"
    }else if(nbDate === 7){
        document.getElementById("date").innerHTML = "Dimanche"
    }
}

/**
 * This method allows to find the city enter by the user and return it as a string.
 * Cette méthode permet de trouver la ville entrée par l'utilisateur et le retourner en tant que string.
 * @returns The name of the city entered by the user / Le nom de la ville entrée par l'utilisateur.
 */
function findCityName(){
    let cityName = document.getElementById('city').value;
    console.log("[*] city : "+cityName);
    return cityName;
}

/**
 * This method allows to set the temperature in the html.
 * Cette méthode permet de définir la température dans le html.
 * @param temperature
 */
function setTemperature(temperature) {
    document.getElementById("temperature").innerHTML = temperature + "°C";
}

/**
 * This method allows to set the parameters at the bottom of the html.
 * Cette méthode permet de définir les parametres à la fin de la page html.
 * @param humidity The humidity in % / L'humidité en %
 * @param pressure The pressure in HPa / La pression en HPa
 * @param windSpeed The speed of the wind / La vitesse du vent.
 */
function setComplementaryInfo(humidity, pressure, windSpeed){
    document.getElementById("wind-speed").innerHTML = "Vitesse du vent : " + windSpeed + " km/h";
    document.getElementById("humidity").innerHTML = "Humidité : " + humidity + "%";
    document.getElementById("precipitation").innerHTML = "Pression : " + pressure + " HPa";
}

/**
 * This method allows to define the icon which represents the direction of the wind.
 * Cette méthode permet de définir l'icone représentant la direction du vent.
 * @param windDirection The direction of the wind  / La direction du vent.
 */
function setWindDirection(windDirection){
    document.getElementById("wind-direction").innerHTML = "<i class=\"wi wi-wind towards-"+windDirection+"-deg\"></i>";
}

/**
 * Define the icon of the main weather.
 * Définie l'icone de la météo principale.
 * @param icon The name of the icon / Le nom de l'icone.
 */
function setWeatherIcon(icon){
    if(icon === "01d" || icon === "01n"){
        document.getElementById("weather-icon").innerHTML = "<i class=\"wi wi-day-sunny\"></i>";
    }else if(icon === "02d" || icon === "02n"){
        document.getElementById("weather-icon").innerHTML = "<i class=\"wi wi-day-cloudy\"></i>";
    }else if(icon === "O3d" || icon === "03n"){
        document.getElementById("weather-icon").innerHTML = "<i class=\"wi wi-cloud\"></i>";
    }else if(icon === "04d" || icon === "04n"){
        document.getElementById("weather-icon").innerHTML = "<i class=\"wi wi-cloudy\"></i>";
    }else if(icon === "09d" || icon === "09n"){
        document.getElementById("weather-icon").innerHTML = "<i class=\"wi wi-showers\"></i>";
    }else if(icon === "10d" || icon === "10n"){
        document.getElementById("weather-icon").innerHTML = "<i class=\"wi wi-day-showers\"></i>";
    }else if(icon === "11d" || icon === "11n"){
        document.getElementById("weather-icon").innerHTML = "<i class=\"wi wi-thunderstorm\"></i>";
    }else if(icon === "13d" || icon === "13n"){
        document.getElementById("weather-icon").innerHTML = "<i class=\"wi wi-snow\"></i>";
    }else if(icon === "50d" || icon === "50n"){
        document.getElementById("weather-icon").innerHTML = "<i class=\"wi wi-fog\"></i>";
    }else{
        document.getElementById("weather-icon").innerHTML = "<i class=\"wi wi-cloud\"></i>";
    }
}