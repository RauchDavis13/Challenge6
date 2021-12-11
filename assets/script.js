var cityFormEl = document.querySelector("#user-form");
var languageButtonsEl = document.querySelector("#language-buttons");

var cityInputEl = document.querySelector("#cityName");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var APIKey = "f75cb668c488053420a8d04b3b31fdd5";
var current_date = document.querySelector("#current-date");

var current_temp = document.querySelector("#current-temp");
var current_wind = document.querySelector("#current-wind");
var current_humidity = document.querySelector("#current-humidity");
var current_uvi = document.querySelector("#current-uvi");

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

displayCity.textContent= ("Your City");


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

                console.log(dailyWeather.dailyDate);

                dateCode = dailyWeather.dailyDate;
                var dateString = new Date(dateCode * 1000).toLocaleDateString("en-US");

                console.log(dateCode);

                var dateDaily = i + 1 + "Date";
                var tempDaily = i + 1 + "Temp";
                var windDaily = i + 1 + "Wind";
                var humidDaily = i + 1 + "Humidity";
                var daily_date = document.getElementById(dateDaily);
                var daily_temp = document.getElementById(tempDaily);
                var daily_humidity = document.getElementById(humidDaily);
                var daily_wind = document.getElementById(windDaily);
                console.log(dateString);
                daily_date.textContent = (dateString);
                daily_temp.textContent = (dailyWeather.dailyTemp);
                daily_wind.textContent = (dailyWeather.dailyWind);
                daily_humidity.textContent = (dailyWeather.dailyHumidity);

                console.log(dailyWeather.dailyTemp);
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

    // clear old content
    repoContainerEl.textContent = "";
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



var getFeaturedRepos = function(language) {
  // format the github api url
  var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

  // make a get request to url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data.items, language);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

// var displayRepos = function(repos, searchTerm) {
//   // check if api returned any repos
//   if (repos.length === 0) {
//     repoContainerEl.textContent = "No repositories found.";
//     return;
//   }

//   repoSearchTerm.textContent = searchTerm;

//   // loop over repos
//   for (var i = 0; i < repos.length; i++) {
//     // format repo name
//     var repoName = repos[i].owner.login + "/" + repos[i].name;

//     // create a link for each repo
//     var repoEl = document.createElement("a");
//     repoEl.classList = "list-item flex-row justify-space-between align-center";
//     repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

//     // create a span element to hold repository name
//     var titleEl = document.createElement("span");
//     titleEl.textContent = repoName;

//     // append to container
//     repoEl.appendChild(titleEl);

//     // create a status element
//     var statusEl = document.createElement("span");
//     statusEl.classList = "flex-row align-center";

//     // check if current repo has issues or not
//     if (repos[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
//     } else {
//       statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     // append to container
//     repoEl.appendChild(statusEl);

//     // append container to the dom
//     repoContainerEl.appendChild(repoEl);
//   }
// };

// add event listeners to form and button container
cityFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);
