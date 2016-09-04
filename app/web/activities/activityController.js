var router = require("express").Router();
var cors = require("cors");
// var phrases = require('./phrases/phraseController.js');
var request = require("request");
var express = require('express')
var app = express();

var Yelp = require('yelp');
 
var yelp = new Yelp({
  consumer_key: "jyK0pX1w36_zOyRDBCQGPA",
  consumer_secret: "fldLTHhsFY4tr_rl8wDwcF_LGaU",
  token: "6TzUIWo9jSnFavceu5JgJKhp1HnnOx89",
  token_secret: "bAvERieQodYWGQk3aoWC8fT3lJ0",
});
 




// PersonModel.find({$where : 'this.favouriteFoods.indexOf("sushi") != -1'});
// function getYelpTerm(req,res,next){
//        console.log("herrreee")
//       var test =  req.query.activity.split(" ")
//     // Phrase.find({})
//     // .where('name').equals(req.query.activity)


// }

function getActivities (req,res){
yelp.search({
    // term: qs.stringify(req.body.activity),
    term: req.query.activity,
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



