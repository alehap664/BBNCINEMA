const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomID: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    quantityChair: {
        type: Number,
    }
})

const Room = mongoose.model("Room", roomSchema);

module.exports = Room