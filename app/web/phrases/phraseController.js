var Phrase = require('./phrasesModel.js');

module.exports = {
  getPhrases: function(req, res, next) {
    Phrase.find({})
    .where('temperature').equals(req.body.temperature);
    .where('weatherEvent').equals(req.body.weatherEvent);
    .exec(function(err, phrases) {
      if(err) console.log(err)
      res.json(phrases);
    });
  },

  addPhrase: function(req, res, next) {
    phrase = req.body;
    var newPhrase = {
      name: phrase.name,
      temperature: phrase.temperature,
      weatherEvent: phrase.weatherEvent,
      type: phrase.type
    }
    Phrase.create(newPhrase, function (err, newPhrase) {
      if (err) return console.log(err);
      res.json(newPhrase);
    })
  }
};