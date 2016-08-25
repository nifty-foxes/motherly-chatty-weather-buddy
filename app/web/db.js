var mongoose = require("mongoose");

var dbURL = process.env.DBURL || "mongodb://localhost/chattyWeather";

module.exports = mongoose.connect(dbURL, function(err) {
  if (err) console.error(err);
  else console.log("Successfully connected to database");
});
