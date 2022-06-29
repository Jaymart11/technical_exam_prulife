const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FamilySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('family', FamilySchema);
