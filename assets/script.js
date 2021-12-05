var cityFormEl = document.querySelector("#user-form");
var languageButtonsEl = document.querySelector("#language-buttons");
var cityInputEl = document.querySelector("#cityName");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var apiKey = "f75cb668c488053420a8d04b3b31fdd5";
var weatherKey = "f75cb668c488053420a8d04b3b31fdd5";

// pulls weather criteria from cityName lat and lon properties
var fetchWeather = function(cityCoord) {
  // create lat and lon variables to feed into openweather for weather criteria
  let lat = cityCoord.lat;
  let lon = cityCoord.lon;
  console.log(lat);
  console.log(lon);


  var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=f75cb668c488053420a8d04b3b31fdd5"

  fetch(weatherUrl) 
    .then(function(response) {
      return response.json();
    })
    .then (function(data) {
      console.log("data", data);
      // if(!data[0]) {
      //   alert("City not found");
      // } else { 
      //   console.log(data[0].lat);
      //   var cityCoord = {lat: data[0].lat, lon: data[0].lon};
      //   console.log(cityCoord)
      //   fetchWeather(cityCoord);
 
      // }
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

var buttonClickHandler = function(event) {
  // get the language attribute from the clicked element
  var language = event.target.getAttribute("data-language");

  if (language) {
    getFeaturedRepos(language);

    // clear old content
    repoContainerEl.textContent = "";
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
        var cityCoord = {lat: data[0].lat, lon: data[0].lon};
        console.log(cityCoord)
        fetchWeather(cityCoord);
 
      }
    })
    .catch(function(error) {
      console.error(error);
    })
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
