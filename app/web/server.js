var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = require("./router.js")

require("./db.js")

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/../client'));

app.use("/",router)

// app.get("./serviceAlerts.js", function(res, req) {
// /console.log("HELLO WORLD");
// // })
app.listen(process.env.PORT || 3000);
