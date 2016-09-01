var router = require("express").Router();
var mongoose = require('mongoose');
var unirest = require('unirest');
var cors = require("cors");
var request = require("request");
var express = require('express')
var app = express();


// var endPoints ="http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=bff0f682235785a793d3f9aade60fc80"


// function getWeather (req,res){
//   var headers = {}
//   for (var key in request.headers) {
//     if (request.headers.hasOwnProperty(key)) {
//     headers[key] = request.get(key)
//     }
//   }
//   headers['host'] = 'final-h'
//   var newurl = "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=bff0f682235785a793d3f9aade60fc80"
//   request.get({url:newurl, headers: headers }, function (error, response, body) {
//   console.log(body)
//   res.send(response.statusCode, body)

// })
 
// }


function getHourly (req, res, next){
 var headers = {}
 for (var key in request.headers) {
   if (request.headers.hasOwnProperty(key)) {
   headers[key] = request.get(key)
   }
 }
  var newurl = "https://api.forecast.io/forecast/32fb6fd1e3da63be7cd7cae8121fe98a/" 
    + req.query.latitude + "," + req.query.longitude;

  request.get({url:newurl}, function (error, response, body) {
   //console.log(JSON.parse(body).hourly)
   if(error) next(error);
   req.body = JSON.stringify(JSON.parse(body).hourly);
   next();
  })
 
}



module.exports = {
// getWeather: getWeather,
getHourly: getHourly

}