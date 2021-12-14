var cityFormEl = document.querySelector("#user-form");
var savedCityEl = document.getElementById("saved-cities");

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

// variable to carry name
var cityName = "";

displayCity.textContent= ("Your City");

// loads ciyHistory array from local storage at page load/refresh
window.addEventListener('load', (event) => {
  console.log('The page has fully loaded');
  // loads data from local storage
  var cityRetrive = localStorage.getItem("cityHistory");
  cityHistory = JSON.parse(cityRetrive);
  if(cityRetrive === null) {
    cityHistory = [];
  }
  citySaved(cityHistory);
  
});

// sends saved cities to be loaded into saved user city buttons
var citySaved = function() {
  if(cityHistory.length <= 0) {
    return    
  } 
  else {
    // cityName.setAttribute("Id");
    var cityNameId = 0;
    for (var i = 0; i<=cityHistory.length-1; i++) {
     
      cityName = cityHistory[i];
      cityNameId = i + 1;
      cityLoad(cityName);
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
  cityLoad(cityName);
};

// creates buttons from saved cities
var cityLoad = function(cityName) {
  var savedEl = document.createElement("button");
  var buttonId = 0;

  // counts # of child elements to created button id
  if(document.getElementById("saved-cities").childElementCount >0)  {   
    var x = document.getElementById("saved-cities").childElementCount;
    console.log(x);
    buttonId = x + 1;  }
  else {
    buttonId = 1;    
  }

  savedEl.id = "idBtn" + buttonId;
  savedEl.textContent = cityName;
  savedEl.className = "btn2";
  savedCityEl.appendChild(savedEl);
};


displayCity.textContent= ("Your City");

// pulls weather criteria from cityName lat and lon properties
var fetchWeather = function(cityCoord) {  
  
  // create lat and lon variables to feed into openweather for weather criteria
  var lat = cityCoord.lat;
  var lon = cityCoord.lon;
  var nameCity = cityCoord.name;

  var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=f75cb668c488053420a8d04b3b31fdd5"

  // calls open weather api from city coordinates
  fetch(weatherUrl) 
    .then(function(response) {
      return response.json();
    })
    .then (function(data) {
    console.log("data", data);

    // variables for the incoming api data for "current" value in api data
    var currentDate = data.current.dt;
    var currentHumidity = data.current.humidity;
    var currentTemp = data.current.temp;
    var currentWind = data.current.wind_speed;
    var currentUv = data.current.uvi;

    

    // takes unix timecode and translates to date
    var dateCode = currentDate;  
    var dateString = new Date(dateCode * 1000).toLocaleDateString("en-US");

    // console.log(weatherCriteria.weatherIcon);

    // var iconCurrent = weatherCriteria.weatherIcon;
    var iconUrl = "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
    
    var iconCurrentEl = document.querySelector("#currentIcon");
    iconCurrentEl.innerHTML = "";

    var iconCurrentCreate = document.createElement("img");
    iconCurrentCreate.src = (iconUrl);
    iconCurrentCreate.alt = ("Current weather icon");
    //iconCurrentEl.textContent = "";
    console.log(iconCurrentCreate);
    
  

    //console.log(iconCurrentString);
    iconCurrentEl.append(iconCurrentCreate);
    console.log(iconCurrentEl);
    console.log(document.getElementById("currentIcon"));
        

    // displays selected city name, current date and weather icon in main area
    displayCity.textContent = (nameCity);
    currentDateDisplay.textContent = (" (" + dateString + ") ");
    // current_icon.textContent = (iconGet);
    // console.log(iconGet);
    console.log(current_icon);       
    
    //console.log(weatherCriteria.weatherIcon);

    //console.log(weatherCriteria);

    // loads current weather data to html
    currentTempSpan.textContent = (currentTemp);
    currentWindSpan.textContent = (currentWind);
    currentHumidSpan.textContent = (currentHumidity);
    currentUvSpan.textContent = (currentUv);

    if(currentUv <=3) {
      document.getElementById("currentUvSpan").style.backgroundColor = "green";
      document.getElementById("currentUvSpan").style.color = "white";
    }
    else if (currentUv <=8) {
      document.getElementById("currentUvSpan").style.backgroundColor = "yellow";
      document.getElementById("currentUvSpan").style.color = "black";
    }
    else if (currentUv <=12) {
      document.getElementById("currentUvSpan").style.backgroundColor = "red";
      document.getElementById("currentUvSpan").style.color = "white";
    }
    else if (currentUv >=11) {
      document.getElementById("currentUvSpan").style.backgroundColor = "darkviolet";
      document.getElementById("currentUvSpan").style.color = "white";
    };
      
    // handles defining and loading 5 day forecast data
    var infoLoad = function() {
      for(var i = 0; i<=5; i++ ) {
        dayCount = i;
        var dailyWeather = {
          dailyDate: data.daily[i + 1].dt,
          dailyIcon: data.daily[i + 1].weather[0].icon,
          dailyTemp: data.daily[i + 1].temp.day,
          dailyWind: data.daily[i + 1].wind_speed,
          dailyHumidity: data.daily[i + 1].humidity
        }

        iconUrl = "https://openweathermap.org/img/w/" + dailyWeather.dailyIcon + ".png";
        

        // handles turning unix timestamp into readable date
        dateCode = dailyWeather.dailyDate;
        var dateString = new Date(dateCode * 1000).toLocaleDateString("en-US");

        // using 'for loop' to add "i" + 1 to string to define ID name
        var dateDaily = i + 1 + "Date";
        var iconDaily = i + 1 + "Icon";
        var tempDaily = i + 1 + "Temp";
        var windDaily = i + 1 + "Wind";
        var humidDaily = i + 1 + "Humidity";

        // connects to daily weather data containers
        var daily_date = document.getElementById(dateDaily);
        var daily_icon = document.getElementById(iconDaily);
        var daily_temp = document.getElementById(tempDaily);
        var daily_humidity = document.getElementById(humidDaily);
        var daily_wind = document.getElementById(windDaily);

        daily_icon.src = (iconUrl);

        // loads daily weather containers
        daily_date.textContent = (dateString);
        daily_icon.src.textContent = (dailyWeather.dailyIcon);
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

// handles city search event
var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value(city name) from input element
  cityName = cityInputEl.value.trim();
  
  // sends cityName to both fetchLocation and citySave functions
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

// uses calls geolocator api and loads cityName to define lat and lon data for weather api
var fetchLocation = function(cityName) {
  console.log(cityName);

  // format the openweather api url
  var locationUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=f75cb668c488053420a8d04b3b31fdd5";
  console.log("locationUrl", locationUrl);
 
  // make a get request to url
  fetch(locationUrl) 
    .then(function(response) {
      return response.json();
    })
    .then (function(data) {
      // viewable geolocation api data in console log  
      console.log("data", data);
      if(!data[0]) {
        alert("City not found");
      } else { 
        var cityCoord = {name: (cityName), lat: data[0].lat, lon: data[0].lon};
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

savedCityEl.addEventListener("click", (event) => {
  var buttonText = event.target.textContent;
  cityName = buttonText;
  fetchLocation(cityName);
});
