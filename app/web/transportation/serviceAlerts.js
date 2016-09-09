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
        name : 'NUM1',
        text : 'Delays Posted: 0/08/2016 5:13PM<br><br>Following an earlier incident at 170 St, [4] service has resumed with residual delays.<br><br>b<br><br>c<br><br>MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM<br><br>e<br><br>f<br><br>g<br><br>h<br><br>i<br><br>j<br><br>k<br><br>l<br><br>',
        Date: '0/08/2016',
        Time: '5:13PM'
      })

      result.push({
        status : 'PLANNED WORK',
        name: 'NUM2',
        text: '<span class="TitlePlannedWork" >Planned Work</span>  \
              <br/>\
              <a class="plannedWorkDetailLink" onclick=ShowHide(131915);>\
              <b>[M] Service ends early between 71 Av and Essex St<br clear=left>[E] [F] [R] trains provide alternate service\
              </a><br/><br/><div id= 131915 class="plannedWorkDetail" ></b>Evenings, 8:30 PM to 11 PM, Tue to Thu, Sep 6 - 8\
              <br>\
              <br>[M] service operates between <b>Essex St</b> and <b>Metropolitan Av</b>.\
              <br>\
              <br><table class=plannedworkTableStyle  width=70%><tr><td><font size=3><b>Travel Alternatives</b></font><td align=right>[TP]</table>\
              <br>[R] trains make all [M] stops between 71 Av and Queens Plaza.\
              <br>[E] trains make all [M] stops between Queens Plaza and 5 Av/53 St.\
              <br>[F]* trains make [M] stops between 47-50 Sts and Delancey St/Essex St.\
              <br>\
              <br>&bull; Transfer between <b>[F]</b> and <b>[R]</b> trains at Roosevelt Av or 34 St-Herald Sq.\
              <br>&bull; Transfer between <b>[E]</b> and <b>[F]</b> trains at W 4 St.\
              <br>&bull; Transfer between <b>[F]</b> and <b>[M]</b> trains at Delancey St/Essex St.\
              <br>\
              <br><i>*Please review [F] advisories for additional information that may affect your trip.\
              <br>\
              <br></i><b>Note:</b> [E] [F] trains run local in Queens after 10 PM.\
              <br>\
              <br>Please use the following guide to arrive at your station before end of service.\
              <br>\
              <br><table class=plannedworkTableStyle  width=65% border=1 cellspacing=1 cellpadding=3 rules=rows frame=hsides><tr bgcolor=#FAF8CC><td colspan=2><b>To 71 Av:</b><td>&nbsp;&nbsp;<td colspan=2><b>To Metropolitan Av:</b><tr><td>Metropolitan Av<td align=right>8:37 PM<td rowspan=5>&nbsp;<td>71 Av<td align=right>8:52 PM<tr><td>Myrtle Av<td align=right>8:50 PM<td>Roosevelt Av<td align=right>9:02 PM<tr><td>Essex St<td align=right>9:02 PM<td>Queens Plaza<td align=right>9:12 PM<tr><td>W 4 St<td align=right>9:08 PM<td>47-50 Sts<td align=right>9:20 PM<tr><td>47-50 Sts<td align=right>9:16 PM<td>Bway-Lafayette St<td align=right>9:30 PM</table>\
              <br><b>Reminder:</b> </font><a href=http://advisory.mtanyct.info/pdf_files/NightMap.pdf target=_blank><font color=#0000FF><b><u>Late Night</u></b></font></a> <b>[M]</b> service operates between Metropolitan Av and Myrtle Av.</font>\
              <br>\
              <br></font><table class=plannedworkTableStyle  border=1 cellspacing=1 cellpadding=5 rules=none frame=box><td>&nbsp;&nbsp;[ad]&nbsp;&nbsp;<td><font size=1>This service change affects one or more ADA accessible stations. Please call 511 for help with planning<br>your trip. If you are deaf or hard of hearing, use your preferred relay service provider or the free 711 relay.&nbsp;&nbsp;</font></table>\
              <br><b>\
              <br></div></b><br/>\
              <br/><br/>'
      })

      for(var i = 0; i< result.length; i++) {
        if(result[i].status === "DELAYS" || result[i].status === "PLANNED WORK") {
          console.log('THING', result[i]);
          // var info = detailSplitter(result[i].text);
          var info = {};
          var lines = result[i].name;
          var status = result[i].status;
          var date = result[i].Time || 'Time Unspecified';
          var text = result[i].text;
          var time = result[i].Date || 'Date Unspecified';
          // var postDate = result[i].date
          info.title = status + '<br>Posted: ' + date + ' ' + time;
          info.summary = lines + " : " + status;
          info.text = text;
          // (Parsing gets too cute with this)
          // info.text = text.indexOf(time) !== -1 ?
          //   text.split(time)[1] :
          //   text
          // ;
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
