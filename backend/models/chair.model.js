const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chairSchema = new Schema({
    roomID: {
        type: String,
        required: true
    },
    filmID: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    timeTable: {
        type: Number,
        required: true
    },
    chairs:[
        {
            chairID: {
                type: String,
                required: true
            },
            line: {
                type: String,
                required: true
            },
            isBook: {
                type: Boolean,
                required: true,
                default: false
            },
            user: {
                name: {
                    type: String,
                    default: ""
                },
                userID: {
                    type: String,
                    default: ""
                } 
            }
        }
    ]
})

const Chair = mongoose.model("Chair", chairSchema);
module.exports = Chair