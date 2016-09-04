angular.module('chattyWeather.activities', [])

.controller('activitiesController', function($scope, $http, Activities) {

  $scope.data;
// console.log(data)

var initializeActivities = function () {
	Activities.getActivities()
	.then(function (activities) {
	         $scope.data = activities;
	         // for(i=0;i< activities.length;i++){
	         // 	$scope.data.push(activities[i])
	         // 	console.log(activities[0].name)
	         // 	$scope.data[i] = business;

	         // 	var business = {}
	         // 	$scope.name = activities[i].name;
	         // 	$scope.phone = activities[i].phone
	         // }

	     })
	.catch(function (error) {
		console.error(error);
	});


};

  initializeActivities()

})


