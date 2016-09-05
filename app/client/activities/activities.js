angular.module('chattyWeather.activities', [])

.controller('activitiesController', function($scope, $http, Activities) {

  $scope.data;

var initializeActivities = function () {
	var getTerm = Activities.get("yelpTerm")
	Activities.getActivities(getTerm)
	.then(function (activities) {
	         $scope.data = activities;
	   
	     })
	.catch(function (error) {
		console.error(error);
	});


};

  initializeActivities()

})
