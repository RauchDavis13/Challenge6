# Challenge 6

## Bootcamp: Challenge 6 - Weather App

The purpose of this assignment, is to create a working website in a to capture weather data for current day, in addition to 5 day forecast based on city selected

- Motivation: Test what has been learned through practical application and testing of Javascript, CSS, HTML 3rd party styling and usage of client side API's related to the construct of this assignment

- Project: Take the lessons learned from languages learned to date (HTML, CSS, Javascript), as well as utilize at openweather API's for geolocation and weather data, as well as 3rd styling library.  Implement best practices for scout rule, coding, GitHub repository building, README.md construction.

- Problem Solved: Successful website is built to give current weather and 5 day weather forecast based on city selected

- Lessons Learned: Many.  This assignment caused many challenges.  The first was understanding how to route a city name into the openweather geolocator api to access a lat and lon coordinate.  Then, routing this information to the openweather weather api, where data was collected for date, temp, humidity, wind, UV and icons.  At the same time when a city is selected, it is also saved and then user selectable to bring that cities weather data up.  Each phase of this assignment was met with having to dig through various resources for answers.  However, in this process, javascript is finally starting to be understood.  This assignment had me seriously questioning to continue with this program, however, even though late, with perseverance, was able to get through.


## Acceptance Criteria

- WHEN I search for a city / THEN I am presented with current and future conditions for that city and that city is added to the search history: Upon the user clicking the "search" button, 2 things occur.  1st, the "city" is routed to the open weather geolocator for lat and lon coordinates, then to the openweather weather API to pull data.  This then populates the various variables for date, temp, wind, humidity, uvi and icon.  2nd, the cityname is route to go into local storage and has a button created, featuring the city's name.

- WHEN I view current weather conditions for that city / THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index:  Upon the user hitting the search button, the above conditions are met, except for icon.  Still working out how to bring the icon into the DOM.  Variable has been identified and string formed in javascript, however, can't figure out to how bring to the document.

- WHEN I view the UV index /THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe: This was not completed due to time.  

- WHEN I view future weather conditions for that city / 
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity: Upon the user searching a city, the user see's 5 blocks featuring a 5 day forecast showing date, wind, humidity, uvi and icon (currently, icon link is showing in place of actual icon, still working how to flow this correctly).

- WHEN I click on a city in the search history / THEN I am again presented with current and future conditions for that city:  The user is presented buttons for every city saved.  Upon the user clicking a city button, that city's data will populate for both current and 5 day weather conditions.

Open Weather geolocation API: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

Open Weather weather API: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

Open Weather Icon API: http://openweathermap.org/img/wn/10d@2x.png 


GitHub repository: https://github.com/RauchDavis13/Challenge6.git

## Website..

- Successfully created live Git based URL
https://rauchdavis13.github.io/Challenge6/

## Thank you's
Matthew Kim(Instructor)
Valeria Flores(TA)
Dustin Erwin (TA)
Kris Renaldi (TA)
Chris McCormack (student)
Sandra Smith (tutor)

