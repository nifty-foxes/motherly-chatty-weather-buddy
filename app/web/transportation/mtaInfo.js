var Mta = require('mta-gtfs');
var mta = new Mta({
  key: '47491751a729844f884cd67205c2f0d', // only needed for mta.schedule() method
  feed_id: 1                  // optional, default = 1
});



mta.status('subway').then(function (result) {
  console.log(result[0].status);
});