var mongoose = require('mongoose');

var PhraseSchema = new mongoose.Schema({
  name: String,
  temperature: [String],
  weatherEvent: [String],
  type: String
});

module.exports = mongoose.model('Phrases', PhraseSchema);