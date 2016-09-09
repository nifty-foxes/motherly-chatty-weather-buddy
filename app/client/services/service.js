

angular.module('chattyWeather.service', [])

.factory('goGet', function($window, $http) {

  var getWeatherData = function () {
    return new Promise(function(resolve, reject) {
      $window.navigator.geolocation.getCurrentPosition(function(location) {
        var latitude = location.coords.latitude;
        var longitude = location.coords.longitude;
        resolve($http({
          method: 'GET',
          url: '/api/weather',
          params: {latitude: latitude, longitude: longitude}
           // params: {latitude: 51.5, longitude: 0} // London
          // params: {latitude: 34, longitude: 118} // Shanghai

        }));
      });
    });
  };

  return {
    getWeatherData: getWeatherData
  };
})



.factory('Activities', function ($http, $location, $window) {


    var getActivities = function(activity){

      return $http({
        method: 'POST',
        url: '/api/activities/',
        data: {activity: activity}
    })
    .then(function (resp) {
      return resp.data;
    });
  }
  return {
    getActivities: getActivities
  };
})


.factory('Food', function ($http, $location, $window) {
  var postFoodPlaces = function(food){

    return $http({
      method: 'POST',
      url: '/api/food/',
      data: {food: food}
    })
    .then(function (resp) {
      return resp.data;
    });
  }

  return {
    postFoodPlaces: postFoodPlaces
  };
})
