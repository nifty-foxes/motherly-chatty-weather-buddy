angular.module('chattyWeather.service', [])

.factory('goGet', function($window, $http) {
  
  var getWeatherData = function () {
    return new Promise(function(resolve, reject) {
      $window.navigator.geolocation.getCurrentPosition(function(location) {
        var latitude = location.coords.latitude;
        var longitude = location.coords.longitude;
        console.log('here', latitude, longitude);
        resolve($http({
          method: 'GET',
          url: '/api/weather',
          params: {latitude: latitude, longitude: longitude}
        }));
      });    
    });
  };

  return {
    getWeatherData: getWeatherData
  };
})



.factory('Activities', function ($http, $location) {
    var storage ={};
    function set(obj, data){
      storage[obj] = data
    }

    function get(obj){
      return storage[obj]
    };

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
      getActivities: getActivities,
      set           : set,
      get           : get

    };
})


.factory('Food', function ($http, $location) {

  var storage ={};
    function set(obj, data){
      storage[obj] = data
    }

    function get(obj){
      return storage[obj]
    };
    
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
      postFoodPlaces: postFoodPlaces,
      set           : set,
      get           : get

    };
})