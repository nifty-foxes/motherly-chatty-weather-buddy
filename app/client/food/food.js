angular.module('chattyWeather.food', [])

.controller('foodController', function($scope, $http, Food) {

  $scope.data;
// console.log(data)

var initializeFood = function () {
	var getTerm = Food.get("yelpFoodTerm")
	Food.postFoodPlaces(getTerm)
	.then(function (foodPlaces) {
	         $scope.data = foodPlaces;
	     })
	.catch(function (error) {
		console.error(error);
	});


};

  initializeFood()

})


