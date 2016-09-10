angular.module('chattyWeather.music', [
    'chattyWeather.weather',
    'angularSoundManager',
    'ngRoute'
    ])

.controller('MusicController', function($scope, goGet, $timeout) {
        var weatherData;
        console.log(goGet)
        $scope.songs = [];
        $scope.music_index= 0;
        var init = function () {
            goGet.getWeatherData()
                .then(function (data) {
                console.log('init data', data);
                weatherData = data.data;
                console.log("############# Weather Data #############", weatherData)
            console.log("WEATHER-EVENT",weatherData)
        SC.initialize({
            client_id: "2773226042879ade8c285c30a9706dab"
        });
        
        SC.get("/tracks", {
            q: weatherData.weatherEvent,
            limit: 5
        }).then(function(tracks) {

            if (tracks) {
                tracks.forEach(function(track) {
                    if (track.streamable && track.sharing === "public") {
                        // console.log("############track##########3",track)
                           
                        SC.stream('/tracks/' + track.id)
                            .then(function(player){
                                // player.start();
                                // player.play();
                                // console.log("##############PLAYER###############", player)
                                var newObj = {
                                    id: track.id,
                                    title: track.title,
                                    artist: track.genre,
                                    // url: "https://api.soundcloud.com/tracks/293/stream?client_id=2773226042879ade8c285c30a9706dab"
                                    // url: "https://api.soundcloud.com/tracks/103632115/stream?client_id=2773226042879ade8c285c30a9706dab"
                                    url: track.uri + '/stream?client_id=2773226042879ade8c285c30a9706dab'
                                };
                                // console.log("NEWOBJJJJJJJJJJJJJJJJJJJJJJJJJ", newObj)
                                $scope.$apply(function () {
                                    console.log("push", newObj)
                                    $scope.songs.push(newObj);
                                });
                            }); 
                        };    
                    })
                }      
            })
          });
        }

        $scope.next = function () {
          if ($scope.music_index >= $scope.songs.length - 1) {
              $scope.music_index = 0;
          } else {
              $scope.music_index++;
          }
          console.log($scope.songs.length + '/' + $scope.music_index);
        };
  init()
  // $timeout(function(){$scope.next()}, 1000);
});