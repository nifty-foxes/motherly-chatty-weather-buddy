var Phrase = require('./phraseModel.js');



module.exports = {
  getPhrases: function(req, res, next) {
    req.body = req.query
    Phrase.find({})
    .where('temperature').equals(req.body.temperature)
    .where('weatherEvent').equals(req.body.weatherEvent)
    .exec(function(err, phrases) {
      if(err) console.log(err)
      phrases = order(phrases);
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

function order(phrases) {
  result = {
    phrases: [],
    foods: [],
    activity: [],
    props: []
  }
  for(var i in phrases) {
    if(phrases[i].type === "activity") result.activity.push(phrases[i].name);
    if(phrases[i].type === "foods") result.foods.push(phrases[i].name);
    if(phrases[i].type === "props") result.props.push(phrases[i].name);
    if(phrases[i].type === "phrases") result.phrases.push(phrases[i].name);
  }
  console.log(result);
  return result;
}