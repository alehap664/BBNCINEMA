const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    pass: {
      type: Boolean,
      required: true,
      default: false
    },
    email: {
        type: String,
        required: true
    },
    films: [
      {
        filmID: {
          type: String,
          required: true
        },
        roomID: {
          type: String,
          required: true
        },
        chairID: {
          type: String,
          required: true
        },
        day: {
          type: String,
          required: true
        },
        timeTable: {
          type: String,
          required: true
        },
      }
    ]
    
})

const User = mongoose.model("User", userSchema);
module.exports = User;