var Mta = require('mta-gtfs');
var mta = new Mta({
  key: '8da2071f9daa6e3942a7f34d1e278768', // only needed for mta.schedule() method
  feed_id: 1                  // optional, default = 1
});

module.exports = {

mtaInfo: function(req, res, next) {
var subwayInfo = [];

mta.status('subway').then(function (result) {
  for(var i = 0; i< result.length; i++) {
    if(result[i].status === "DELAYS" || result[i].status === "PLANNED WORK") {
  	var lines = result[i].name;
  	var status = result[i].status;
  	var info = lines + " : " + status;
  	  subwayInfo.push(info);
   } 
  }
  req.query.subwayInfo = subwayInfo;
  next();
 });
},

getAllMtaData: function(req, res){
var allSubwayInfo = [];

mta.status('subway').then(function (result) {
  for(var i = 0; i< result.length; i++) {
    var allLines = result[i].name;
    var everyStatus = result[i].status;
    var allInfo = allLines + " : " + everyStatus;
      allSubwayInfo.push(allInfo);
   } 
   // var allInfoObj = {allData: allSubwayInfo}
   // console.log(allInfoObj);
   res.json(allSubwayInfo);
   });
  }
 }

