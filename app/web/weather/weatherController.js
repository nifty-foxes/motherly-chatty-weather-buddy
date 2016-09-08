var router = require("express").Router();
var mongoose = require('mongoose');
var cors = require("cors");
var request = require("request");
var express = require('express');
var app = express();

function getHourly(req, res, next) {

  var newurl = "https://api.forecast.io/forecast/32fb6fd1e3da63be7cd7cae8121fe98a/"
    + req.query.latitude + "," + req.query.longitude;

  request.get({url:newurl}, function(error, response, body) {
    if(error) next(error);


    req.body = JSON.parse(body).hourly;
    console.log('WEATHERBODY', req.body);
    req.body.timezone = JSON.parse(body).timezone;
    req.body = JSON.stringify(req.body);
    // console.log('REQBODY', req.body); //FULL THING SHOWS
    next();
  });
}

module.exports = {
  getHourly: getHourly
}
