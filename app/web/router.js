var router = require('express').Router();
var weatherController = require('./weather/weatherController.js');
var phraseController = require('./phrases/phraseController.js');
var serviceAlerts = require('./transportation/serviceAlerts.js');
var logicController = require('./logic/weatherLogicController');
var activityController = require('./activities/activityController');
var foodController = require('./food/foodController');

router.get('/api/weather/', weatherController.getHourly, logicController.getWeatherPhrases, serviceAlerts.mtaInfo, phraseController.getPhrases);

router.get('/api/transportation/', serviceAlerts.getAllMtaData);

router.get('/api/phrases/', phraseController.getPhrases);
router.post('/api/phrases/', phraseController.addPhrase);

router.get('/api/activities/', activityController.getActivities);
router.post('/api/activities/', activityController.getActivities);

router.get('/api/food/', foodController.getFoodPlaces);
router.post('/api/food/', foodController.getFoodPlaces);

module.exports = router;
