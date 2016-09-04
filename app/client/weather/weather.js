angular.module('chattyWeather.weather', [])

.controller('WeatherController', function($scope, goGet, $http, $location, Activities, Food) {
	var weatherData;
  $scope.phrase = ". . loading . .";
  $scope.food;
  $scope.prop;
  $scope.activity;
  $scope.mtaAlert;
  $scope.temp;
  $scope.city;
  $scope.time;
  $scope.weatherEvent;

  $scope.getFoodTerm = function() {
    Food.getFoodPlaces($scope.food)
     $location.path('/food');
  };


  $scope.getActivityTerm = function() {
    console.log($scope.activity)
    Activities.getActivities($scope.activity)
     $location.path('/activities');
    return $scope.activity
  };


  function timeNow() {
    var d = new Date(),
        h = (d.getHours()<10?'0':'') + d.getHours(),
        m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    return h + ' : ' + m;
  }

  var init = function () {
    goGet.getWeatherData()
      .then(function (data) {
        console.log(data);
        weatherData = data.data;
        display(weatherData);
        setInterval(display.bind(null, weatherData), 5000);
      })
      .catch(function (error) {
        console.error(error);
      });
   
  };

  var display = function(data) {
    positionSunMoon();
    $scope.$apply(function() {
      $scope.weatherEvent = data.weatherEvent;
      var skycons = new Skycons({"color": "white"});
      skycons.set(data.weatherEvent, data.weatherEvent);
      skycons.play();
      $scope.phrase = data.phrases[Math.floor(Math.random() * data.phrases.length)];
      $scope.food = data.foods[Math.floor(Math.random() * data.foods.length)];
         $scope.foodTips = "Find Nearest"

      $scope.prop = data.props[Math.floor(Math.random() * data.props.length)];

      $scope.activity = data.activity[Math.floor(Math.random() * data.activity.length)]; 
      $scope.tips = "Find Nearest";

      $scope.temp = data.temperature.toFixed(1) + " ℉";
      $scope.city = data.timezone.split("/")[1].split("_").join(" ");
      $scope.time = timeNow();
      // console.log(data.subwayInfo);

      $scope.mtaAlert = data.subwayInfo.length === 0 ? ["All Good!"] : data.subwayInfo;
      
    });
  }
  
  var positionSunMoon = function() {
    var d = new Date();
    var min = d.getHours() * 60 +  d.getMinutes() - (7 * 60);
    //min = 360;
    var rad = 2 * Math.PI * min / 1440
    var top = Math.sin(Math.PI - rad) * (window.innerHeight) 
    var left = Math.cos(Math.PI - rad) * (window.innerHeight)
    console.log(top, left)

    var sunStyle = document.getElementsByClassName("positionSun")[0].style;
    sunStyle.top = window.innerHeight -150 - top + "px";
    sunStyle.left = (window.innerWidth / 2) - 150 + left + "px";

    var moonStyle = document.getElementsByClassName("positionMoon")[0].style;
    moonStyle.top = window.innerHeight - 150 + top + "px";
    moonStyle.left = (window.innerWidth / 2) - 150 - left + "px";
  }


  init();
})