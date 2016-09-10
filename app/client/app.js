angular.module('chattyWeather', [
  'chattyWeather.weather',
  'chattyWeather.service',
  'chattyWeather.activities',
  'chattyWeather.food',
  'chattyWeather.music',
  'ngRoute'
  ])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
	  .when('/weather', {
	    templateUrl: 'weather/weather.html',
	    controller: 'WeatherController'
	  })
    .when('/activities', {
      templateUrl: 'activities/activities.html',
      controller: 'activitiesController'
    })
    .when('/food', {
      templateUrl: 'food/food.html',
      controller: 'foodController'
    })
    .otherwise({
      redirectTo: '/weather'
    });
})
