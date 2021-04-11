const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  filmImg: {
    type: String,
    required: true
  },
  filmID: {
    type: String,
    required: true
  },
  filmName: {
    type: String,
    required: true
  },
  director: {
    type: Array,
    required: true,
    default: "unknown"
  },
  actor: {
    type: Array,
    required: true,
    default: "unknown"
  },
  category: {
    type: Array,
    required: true,
    default: "unknown"
  },
  premiere: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  language: {
    type: Array,
    required: true,
    default: "unknown"
  },
  rate: {
    type: String,
    required: true,
    default: "P"
  },
  timeTable: [
    {
      date: {
        type: String,
        required: true,
      },
      time: {
        type: Array,
        required: true
      }
    }
  ]
  
})

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;