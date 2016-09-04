var router = require("express").Router();
var cors = require("cors");
var phraseController = require('../phrases/phraseController.js');
var request = require("request");
var express = require('express')
var app = express();
var qs = require('querystring');  
var Yelp = require('yelp');
 
var yelp = new Yelp({
  consumer_key: "jyK0pX1w36_zOyRDBCQGPA",
  consumer_secret: "fldLTHhsFY4tr_rl8wDwcF_LGaU",
  token: "SV6V9Vm7pndVNtbPzxjF1uYmdeftjZyX",
  token_secret: "an2Idmg4tkrkcj93rTL6tJLFT74"
});
 


function getFoodPlaces (req,res){
test= qs.stringify(req.query.food)
	console.log(test)
yelp.search({
    // term: qs.stringify(req.body.food),
    term: test,
    location: 'Manhattan', 
    sort: 2, 
    limit: 10 })
.then(function (data) {
  res.send(data.businesses)
})
.catch(function (err) {
  console.error(err);
});
 	
}


module.exports = {
getFoodPlaces: getFoodPlaces
}
