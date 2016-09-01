
var Yelp = require('yelp');
 
var yelp = new Yelp({
  consumer_key: "jyK0pX1w36_zOyRDBCQGPA",
  consumer_secret: "fldLTHhsFY4tr_rl8wDwcF_LGaU",
  token: "6TzUIWo9jSnFavceu5JgJKhp1HnnOx89",
  token_secret: "bAvERieQodYWGQk3aoWC8fT3lJ0",
});
 

yelp.search({category: "icecream, All", category: "yelpevents, All", location: 'Manhattan' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});
 