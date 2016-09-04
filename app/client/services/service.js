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
    
  var getActivities = function(activity){
    return $http({
      method: 'GET', 
      url: '/api/activities/',
      params: {activity: activity},
   })
   .then(function (resp) {
      return resp.data;
    });
  }  
      
  
  // var postActivities = function (){
  //   return $http({
  //     method: 'GET',
  //     url: '/api/activities/'
  //   })
  //   .then(function (resp) {
  //     console.log(resp.data)
  //     return resp.data;
  //   });
  // }  
  
    return {
      getActivities: getActivities,

      // postActivities:  postActivities
    };

})



.factory('Food', function ($http, $location) {

  var getFoodPlaces = function(food){
    return $http({
      method: 'POST', 
     url: '/api/food/',
     params: {food: food.toString()},
   })         
   
  }

  var postFoodPlaces = function (){
    return $http({
      method: 'GET',
      url: '/api/food/'
    })
    .then(function (resp) {
      console.log(resp.data)
      return resp.data;
    });
  }  
  

    return {
      getFoodPlaces: getFoodPlaces,
      postFoodPlaces:  postFoodPlaces
    };



})
