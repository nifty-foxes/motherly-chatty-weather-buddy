//Receiving Data
var router = require("express").Router();
var mongoose = require('mongoose');
var unirest = require('unirest');
var cors = require("cors");
var request = require("request");
var express = require('express')
var app = express();

// var endPoints ="https://511ny.org/api/getevents?key={66202881ff9b491697d3ff762e917748}&format={json}"
//API key: 66202881ff9b491697d3ff762e917748
//Format: Json


function getTransportEvents (req, res){
var headers = {}
  for (var key in request.headers) {
  if (request.headers.hasOwnProperty(key)) {
    headers[key] = request.get(key)
  }
}
headers['host'] = 'final-host';
var newurl = "https://511ny.org/api/getevents?key={66202881ff9b491697d3ff762e917748}&format={json}";

request.get({url:newurl}, function (error, response, body) {
console.log(body);
  res.end(body);
  }); 
}

module.exports = {
getTransportEvents: getTransportEvents
};


