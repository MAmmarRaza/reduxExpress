const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true,
  }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
