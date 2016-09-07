var weatherController = require('../weather/weatherController.js');
var util = require('./util.js');

module.exports = {
  getWeatherPhrases: function(req, res, next) {
    var hourlyData = JSON.parse(req.body).data;
    var temperature = "";
    var weatherEvent = hourlyData[0].icon;
    var avgTemperature = 0;
    var events = [];

    for(var i = 0; i < 12; i++) {
      avgTemperature += hourlyData[i].temperature / 12;
    }
    temperature = util.fahrenheitToString(avgTemperature);
    var timezone = req.body.timezone;

    req.body = {
      timezone: JSON.parse(req.body).timezone,
      temperatureNum: hourlyData[0].temperature,
      temperature: temperature,
      weatherEvent: weatherEvent
    };
    // console.log('REQBODY', req.body); //FULL THING SHOWS
    req.query = req.body;
    next();
  }
};
