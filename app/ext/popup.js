$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(location) {
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;

    $.ajax({
      url: 'https://chattyweather.herokuapp.com/api/weather',
      data: {latitude: latitude, longitude: longitude},
      success: success
    });
 });
}, false);



function success(data) {
  console.log(data);
  display(data);
  setInterval(display.bind(null, data), 5000);
}


function display(data) {
  $('canvas').attr('id', data.weatherEvent);
  var skycons = new Skycons({"color": "white"});
  skycons.set(data.weatherEvent, data.weatherEvent);
  skycons.play();

  $('.bubble').css({
    "height": "auto",
    "min-height": "30px",
    "padding": "10px 20px",
    "margin-bottom": "10px"});
  $('.info').css({
    "margin-top": "15px",
    "margin-bottom": "25px" });


  $('#temp').html(data.temperature + "\&deg;F   " + data.weatherEvent.split("-").join(" "));

  $('#phrase').html(data.phrases[Math.floor(Math.random() * data.phrases.length)]);
  $('#food').html(data.foods[Math.floor(Math.random() * data.foods.length)].split(':')[0]);
  $('#prop').html(data.props[Math.floor(Math.random() * data.props.length)]);
  $('#activity').html(data.activity[Math.floor(Math.random() * data.activity.length)].split(':')[0]);
}
