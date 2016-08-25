angular.module('chattyWeather', [
  'chattyWeather.weather',
  'ngRoute'
  ])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
	  .when('/weather', {
	    templateUrl: 'weather/weather.html',
	    controller: 'WeatherController'
	  })
    .otherwise({
      redirectTo: '/'
    });
})