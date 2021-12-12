var cityFormEl = document.querySelector("#user-form");
var savedCityEl = document.querySelector("#saved-cities");

var cityInputEl = document.querySelector("#cityName");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var APIKey = "f75cb668c488053420a8d04b3b31fdd5";
var current_date = document.querySelector("#current-date");

// html connections for display of selected city, current day date and weather condition icon
var displayCity = document.querySelector("#cityDisplay");
var dateDisplay = document.getElementsByClassName("dateDisplay");
var current_icon = document.getElementsByClassName("current-icon");

// html connections for display of current day weather conditions
var currentDateDisplay = document.getElementById("currentDateDisplay"); 
var currentTempSpan = document.getElementById("currentTempSpan");
var currentWindSpan = document.getElementById("currentWindSpan");
var currentHumidSpan = document.getElementById("currentHumidSpan");
var currentUvSpan = document.getElementById("currentUvSpan");
var currentDateValue;
var dailyDateValue;

// array for saved cities
var cityHistory = [];




displayCity.textContent= ("Your City");

console.log(cityHistory);
console.log(localStorage);


console.log(cityHistory);
console.log(cityHistory.length);

window.addEventListener('load', (event) => {
  console.log('The page has fully loaded');
  // loads data from local storage
  var cityRetrive = localStorage.getItem("cityHistory");
  cityHistory = JSON.parse(cityRetrive);
  if(cityRetrive === null) {
    cityHistory = [];
  }
  console.log(cityHistory);
  citySaved(cityHistory);
  
});

var citySaved = function() {
  console.log(cityHistory.length);

  if(cityHistory.length <= 0) {
    return    
  } 
  else {
    for (var i = 0; i<=cityHistory.length-1; i++) {
      cityName = cityHistory[i];
      cityLoad(cityName);
      console.log(cityName);
    }
  }
};




// checks incoming city string input and passes unique cities to array for saved cities
var citySave = function(cityName) {  
  if (cityHistory.indexOf(cityName) !== -1) {
      return;
  }
  else if (cityName === null) {
    return;
  }
  cityHistory.push(cityName);
  localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
  //citySaved(cityName);
  console.log(cityHistory);
  cityLoad(cityName);
};

// creates buttons from saved cities
var cityLoad = function(cityName) {
  var savedEl = document.createElement("button");
  //savedEl.classList (justify-content-center);
  savedEl.textContent = cityName;
  console.log(savedEl.textContent);
  savedCityEl.appendChild(savedEl);

};


displayCity.textContent= ("Your City");

console.log(cityHistory);
console.log(localStorage);



// pulls weather criteria from cityName lat and lon properties
var fetchWeather = function(cityCoord) {  
  
  // create lat and lon variables to feed into openweather for weather criteria
  var lat = cityCoord.lat;
  var lon = cityCoord.lon;
  var nameCity = cityCoord.name;

  var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=f75cb668c488053420a8d04b3b31fdd5"

  fetch(weatherUrl) 
    .then(function(response) {
      return response.json();
    })
    .then (function(data) {
    console.log("data", data);

    // variables for the incoming api data for "current" value in api data
    var weatherCriteria = {
      currentDate: data.current.dt,
      currentHumidity: data.current.humidity,
      currentTemp: data.current.temp,
      currentWind: data.current.wind_speed,
      currentUv: data.current.uvi,
      weatherIcon: data.current.weather[0].icon,          
    };        

    // takes unix timecode and translates to date
    var dateCode = weatherCriteria.currentDate;  
    var dateString = new Date(dateCode * 1000).toLocaleDateString("en-US");

    console.log(weatherCriteria.currentDate);

    var iconGet = "http://openweathermap.org/img/wn/" + weatherCriteria.weatherIcon +"2x.png";
        

    // displays selected city name, current date and weather icon in main area
    displayCity.textContent = (nameCity + " (" + dateString + ")");
    currentDateDisplay.textContent = (dateString);
    current_icon.textContent = (iconGet);
    console.log(iconGet);
    console.log(current_icon);
     
        
    
    console.log(weatherCriteria.weatherIcon);

    console.log(weatherCriteria);
    currentTempSpan.textContent = (weatherCriteria.currentTemp);
    currentWindSpan.textContent = (weatherCriteria.currentWind);
    currentHumidSpan.textContent = (weatherCriteria.currentHumidity);
    currentUvSpan.textContent = (weatherCriteria.currentUv);
      
    var infoLoad = function() {
      for(var i = 0; i<=5; i++ ) {
        dayCount = i;
        var dailyWeather = {
          dailyIcon: data.daily[i + 1].weather[0].icon,
              dailyDate: data.daily[i + 1].dt,
          dailyHumidity: data.daily[i + 1].humidity,
          dailyTemp: data.daily[i + 1].temp.day,
          dailyWind: data.daily[i + 1].wind_speed
        }

        dateCode = dailyWeather.dailyDate;
        var dateString = new Date(dateCode * 1000).toLocaleDateString("en-US");

        // using 'for loop' to add "i" + 1 to string to define ID name
        var dateDaily = i + 1 + "Date";
        var tempDaily = i + 1 + "Temp";
        var windDaily = i + 1 + "Wind";
        var humidDaily = i + 1 + "Humidity";
                
        var daily_date = document.getElementById(dateDaily);
        var daily_temp = document.getElementById(tempDaily);
        var daily_humidity = document.getElementById(humidDaily);
        var daily_wind = document.getElementById(windDaily);


        daily_date.textContent = (dateString);
        daily_temp.textContent = (dailyWeather.dailyTemp);
        daily_wind.textContent = (dailyWeather.dailyWind);
        daily_humidity.textContent = (dailyWeather.dailyHumidity);
      }
    }        

    infoLoad();  
 
    })
  .catch(function(error) {
    console.error(error);
  })
};





var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityName = cityInputEl.value.trim();
  console.log(cityName);
 


  if (cityName) {
    fetchLocation(cityName);
    citySave(cityName);
    console.log(cityHistory);
    console.log(localStorage);

    // clear old content
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};



var fetchLocation = function(cityName) {
  console.log(cityName);

  // format the openweather api url
  var locationUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=f75cb668c488053420a8d04b3b31fdd5";
  console.log("locationUrl", locationUrl);
 
  // make a get request to url
  fetch(locationUrl) 
    .then(function(response) {
      return response.json();
    })
    .then (function(data) {
      console.log("data", data);
      if(!data[0]) {
        alert("City not found");
      } else { 
        console.log(data[0].lat);
        var cityCoord = {name: (cityName), lat: data[0].lat, lon: data[0].lon};
        console.log(cityCoord)
        fetchWeather(cityCoord);


      }
    })
    .catch(function(error) {
      console.error(error);
    })
};



// -----------------------OLD CODE --------------------
var buttonClickHandler = function(event) {
  // get the language attribute from the clicked element
  var language = event.target.getAttribute("data-language");

  if (language) {
    getFeaturedRepos(language);

    // clear old content
    repoContainerEl.textContent = "";
  }
};



// add event listeners to form and button container
cityFormEl.addEventListener("submit", formSubmitHandler);
