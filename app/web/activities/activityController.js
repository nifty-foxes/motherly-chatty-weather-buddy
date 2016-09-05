var router = require("express").Router();
var cors = require("cors");
// var phrases = require('./phrases/phraseController.js');
var request = require("request");
var express = require('express')
var app = express();
var queryString = require('querystring');
// var Yelp = require('yelp');
 
// var yelp = new Yelp({
//   consumer_key: "jyK0pX1w36_zOyRDBCQGPA",
//   consumer_secret: "fldLTHhsFY4tr_rl8wDwcF_LGaU",
//   token: "SV6V9Vm7pndVNtbPzxjF1uYmdeftjZyX",
//   token_secret: "an2Idmg4tkrkcj93rTL6tJLFT74"
// });
  

var yelp = require("node-yelp");


var client = yelp.createClient({
  oauth: {
  consumer_key: "jyK0pX1w36_zOyRDBCQGPA",
  consumer_secret: "fldLTHhsFY4tr_rl8wDwcF_LGaU",
  token: "SV6V9Vm7pndVNtbPzxjF1uYmdeftjZyX",
  token_secret: "an2Idmg4tkrkcj93rTL6tJLFT74"
  }
});


// PersonModel.find({$where : 'this.favouriteFoods.indexOf("sushi") != -1'});
// function getYelpTerm(req,res,next){
//        console.log("herrreee")
//       var test =  req.query.activity.split(" ")
//     // Phrase.find({})
//     // .where('name').equals(req.query.activity)


// }

function getActivities (req,res){
  console.log("bodyyyyyy",req.body)
client.search({
    term: req.body.activity,
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
getActivities: getActivities
}



