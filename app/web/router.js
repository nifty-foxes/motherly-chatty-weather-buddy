var router = require('express').Router();
var weatherController = require('./weather/weatherController.js');
var phraseController = require('./phrases/phraseController.js');
var serviceAlerts = require('./transportation/serviceAlerts.js');
var logicController = require('./logic/weatherLogicController');

router.get('/api/weather/', weatherController.getHourly, logicController.getWeatherPhrases, serviceAlerts.mtaInfo, phraseController.getPhrases);

// router.get('/api/service/', serviceAlerts.mtaInfo); //do we need it?

router.get('/api/transportation/', serviceAlerts.getAllMtaData ); 

router.get('/api/phrases/', phraseController.getPhrases);
router.post('/api/phrases/', phraseController.addPhrase);

module.exports = router
