const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  id: {type: String, required: true},
  film__bg: {type: String, required: true},
  film__director: {type: Array, required: true},
  film__categories: {type: Array, required: true},
  film__countries: {type: Array, required: true},
  film__cover: {type: String, required: true},
  film__description: {type: String, required: true},
  film__cast: {type: Array, required: true},
  film__photos: {type: Array, required: true},
  film__price: {type: Number, required: true},
  film__release: {type: Number, required: true},
  film__running: {type: Number, required: true},
  film__title: {type: String, required: true},
  film__trailer: {type: String, required: true},
  film__video: {type: Object, required: true},
  film__thumb: {type: String, required: true},
  film__rate: {type: Number, required: true},
})

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;