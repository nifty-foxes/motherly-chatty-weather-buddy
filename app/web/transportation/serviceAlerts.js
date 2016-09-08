var Mta = require('mta-gtfs');
// var request = require("request");
var mta = new Mta({
  key: '8da2071f9daa6e3942a7f34d1e278768',
  feed_id: 1
});

module.exports = {

  mtaInfo: function(req, res, next) {
    var subwayInfo = [];

    // mta.status returns a JSON arr with details for each subway line
    mta.status('subway').then(function (result) {
      console.log('result', result);
      for(var i = 0; i< result.length; i++) {
        if(result[i].status === "DELAYS" || result[i].status === "PLANNED WORK") {
          var info = {};
          var lines = result[i].name;
          var status = result[i].status;
          info.summary = lines + " : " + status;
          info.details = result[i].text;
          subwayInfo.push(info);
        }
      }
      req.query.subwayInfo = subwayInfo;
      // req.body.subwayDetails = module.exports.getAllMtaData();
      next();
     });
  },

  getAllMtaData: function(req, res) {

    mta.status('subway').then(function (result) {
      for(var i = 0; i< result.length; i++) {
        var allLines = result[i].name;
        var everyStatus = result[i].status;
        var allInfo = allLines + " : " + everyStatus;
        allSubwayInfo.push(allInfo);
      }
      // res.json(allSubwayInfo);
      return allSubwayInfo;
    });
  }
}
