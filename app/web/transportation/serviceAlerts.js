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
      var detailSplitter = function(str) {
        console.log('splitting', str);
        var idx = str.indexOf('<br><br>');
        var title = str.slice(0,idx);
        var text = str.slice(idx+8);
        return {
          title: title,
          text: text
        }
      }

      result.push({ //PLACEHOLDER
        status : 'DELAYS',
        name : 'NQR',
        text : 'Delays Posted: 0/08/2016 5:13PM<br><br>Following an earlier incident at 170 St, [4] service has resumed with residual delays.<br><br>b<br><br>c<br><br>MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM<br><br>e<br><br>f<br><br>g<br><br>h<br><br>i<br><br>j<br><br>k<br><br>l<br><br>'
      })

      for(var i = 0; i< result.length; i++) {
        if(result[i].status === "DELAYS" || result[i].status === "PLANNED WORK") {
          var info = detailSplitter(result[i].text);
          var lines = result[i].name;
          var status = result[i].status;
          info.summary = lines + " : " + status;
          // info.details = result[i].text;
          console.log('pushing', info);
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
