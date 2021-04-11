const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
    timeID: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
})

const Time = mongoose.model("Time", timeSchema);
module.exports = Time;