var router = require("express").Router();
var cors = require("cors");
var request = require("request");
var express = require('express');
var queryString = require('querystring');
var yelp = require("node-yelp");
var app = express();

var client = yelp.createClient({
  oauth: {
  consumer_key: "jyK0pX1w36_zOyRDBCQGPA",
  consumer_secret: "fldLTHhsFY4tr_rl8wDwcF_LGaU",
  token: "SV6V9Vm7pndVNtbPzxjF1uYmdeftjZyX",
  token_secret: "an2Idmg4tkrkcj93rTL6tJLFT74"
  }
});

function getActivities(req,res) {
  client.search({
    term: req.body.activity,
    location:'Manhattan',
    sort: 2,
    limit: 10 })
  .then(function (data) {
  res.send(data.businesses);
  })
  .catch(function (err) {
  console.error(err);
  });
}

module.exports = {
getActivities: getActivities
}
