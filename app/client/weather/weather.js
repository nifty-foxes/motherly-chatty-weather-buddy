angular.module('chattyWeather.weather', ['ui.bootstrap'])

.controller('WeatherController', function($scope, goGet, $http, $location, Activities, Food, $window, $sce) {
	var weatherData;
  $scope.phrase = ". . loading . .";
  $scope.food;
  $scope.prop;
  $scope.activity;
  $scope.mtaAlert;
  $scope.temp;
  $scope.city = "";
  $scope.time;
  $scope.weatherEvent;
  $scope.hourlyTemp = [];
  $scope.hourlyTime = [];
  $scope.timeWeather = "";
  $scope.hourly = {};
  var sky;


  $scope.getFoodTerm = function() {
    $window.localStorage.setItem('currentFood', $scope.food[1]);
    $location.path('/food');
  };


  $scope.getActivityTerm = function() {
    $window.localStorage.setItem('currentActivity', $scope.activity[1]);
    $location.path('/activities');
  };

  $scope.displayAlert = function(alert) {
    console.log('clicked alert', alert.details);
  };

  // $scope.alertDetails = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');
  // $scope.alertDetails = $sce.trustAsHtml('<span style="color: black">hi</span>');
  // $scope.placeholdertxt = '<span style="color: black">hi</span>';
  // $scope.alertDetails = function(htmlStr) {
  //   console.log('htmlstr', htmlStr);
  //   console.log('sce', $sce.trustAsHtml(htmlStr));
  //   // return $sce.trustAsHtml(htmlStr)
  // };

  $scope.assignDetail = function(alert) {
    console.log('alert', alert);
    $scope.alertDetails = $sce.trustAsHtml('<div class="mtaTitle">' + alert.title + '</div><div class="mtaDetails">' + alert.text + '</div>');
  }

  function timeNow() {
    var d = new Date(),
        h = (d.getHours()<10?'0':'') + d.getHours(),
        m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    return h + ' : ' + m;
  }

  function getHours(){

    var date = new Date();
    var hour =  date.getHours();
    var amPm = "AM";
     for(var i = 0; i < 6; i++){
      date.setHours(++hour);
    if(hour > 12){
      hour -= 12;
      amPm = "PM"
    }
    if(hour < 10)
      space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
  else
      space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

      $scope.hourlyTime.push((hour));
      $scope.hourlyTemp.push(Math.round(weatherData.hourlyTemp[i]));
      $scope.timeWeather += $scope.hourlyTime[i] + " " + amPm + space + $scope.hourlyTemp[i] + "℉" + '<br>';
     }

  }

  var init = function () {
    goGet.getWeatherData()
      .then(function (data) {
        // console.log('init data', data);
        weatherData = data.data;
        $scope.hourlyTemp.data = weatherData.hourlyTemp;
        $scope.hourlyTime.data = weatherData.hourlyTime;
        $scope.hourly = weatherData.data;
      getHours();
      $scope.popover = $sce.trustAsHtml('<h3>HOURLY WEATHER</h3><hr><center>'+$scope.timeWeather+'<br>');

      self.explicitlyTrustedHtml = $sce.trustAsHtml(
        '<span onmouseover="this.textContent=&quot;Explicitly trusted HTML bypasses ' +
        'sanitization.&quot;">Hover over this text.</span>');



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
      // console.log("DATAAA", data.hourlyTemp)
      $scope.weatherEvent = data.weatherEvent;
      // console.log('WEATHEREVENT', $scope.weatherEvent);
      var skycons = new Skycons({"color": "white"});
      skycons.set(data.weatherEvent, data.weatherEvent);
      skycons.play();
      // console.log('data', data);
      $scope.phrase = data.phrases[Math.floor(Math.random() * data.phrases.length)];
      $scope.food = data.foods[Math.floor(Math.random() * data.foods.length)].split(":");

      $scope.prop = data.props[Math.floor(Math.random() * data.props.length)];
      $scope.activity = data.activity[Math.floor(Math.random() * data.activity.length)].split(":");

      $scope.temp = data.temperature.toFixed(1) + " ℉";
      $scope.city = data.timezone.split("/")[1].split("_").join(" ");
      $scope.time = timeNow();
        // console.log("TIME", $scope.hourlyTime)

      // console.log('mta info', data.subwayInfo);
      $scope.mtaAlert = data.subwayInfo.length === 0 ? ["All Good!"] : data.subwayInfo;
      // $scope.mtaAlert = ["7 : DELAYS", "A C E: PLANNED WORK"] //PLACEHOLDER

    });
  }

  var positionSunMoon = function() {
    var d = new Date();
    var minutes = d.getHours() * 60 +  d.getMinutes() - (6 * 60);
    var rad = 2 * Math.PI * minutes / 1440
    var top = Math.sin(Math.PI - rad) * (window.innerHeight)
    var left = Math.cos(Math.PI - rad) * (window.innerHeight)

    if(document.getElementsByClassName("positionSun")[0] !== undefined) {
      var sunStyle = document.getElementsByClassName("positionSun")[0].style;
      sunStyle.top = window.innerHeight -150 - top + "px";
      sunStyle.left = (window.innerWidth / 2) - 150 + left + "px";

      var moonStyle = document.getElementsByClassName("positionMoon")[0].style;
      moonStyle.top = window.innerHeight - 150 + top + "px";
      moonStyle.left = (window.innerWidth / 2) - 150 - left + "px";
   }
  }

  init();
})
