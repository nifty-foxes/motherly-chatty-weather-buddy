var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var router = require('./router.js');
// var routerErr = require('./routerErr.js'); //Doesn't currently do anything?
var app = express();

require("./db.js");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/../client'));
app.use("/",router);
// app.use(routerErr.errorLogger);
// app.use(routerErr.errorHandler);

module.exports = app;
app.listen(process.env.PORT || 3000);
