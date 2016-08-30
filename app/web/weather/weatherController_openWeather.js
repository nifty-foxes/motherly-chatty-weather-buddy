var router = require("express").Router();
var mongoose = require('mongoose');
var unirest = require('unirest');
var cors = require("cors");
var request = require("request");
var express = require('express')
var app = express();

// var endPoints ="http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=bff0f682235785a793d3f9aade60fc80"


function getWeather (req,res){
  //console.log("REQ=======",req.query);
  var headers = {}
  for (var key in request.headers) {
    if (request.headers.hasOwnProperty(key)) {
    headers[key] = request.get(key)
    }
  }
  headers['host'] = 'final-host'

  var newurl = "http://api.openweathermap.org/data/2.5/weather?lat="
   + req.query.latitude + "&lon=" + req.query.longitude + "&APPID=bff0f682235785a793d3f9aade60fc80";
  request.get({url:newurl, headers: headers }, function (error, response, body) {
  console.log(JSON.parse(body));
  res.status(200).send(JSON.parse(body));

  });
  
}


module.exports = {
getWeather: getWeather

}


