angular.module('chattyWeather', [
  'chattyWeather.weather',
  'chattyWeather.service',
  'ngRoute'
  ])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
	  .when('/weather', {
	    templateUrl: 'weather/weather.html',
	    controller: 'WeatherController'
	  })
    .otherwise({
      redirectTo: '/weather'
    });
})