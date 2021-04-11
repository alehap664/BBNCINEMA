const express = require('express');
const Router = express.Router();

const validate = require("../../../middleware/v1/validate.middleware");

const controller = require("../../../controllers/api/v1/users.controller")

Router.post("/signin", validate.signInUser(), controller.signIn);
Router.post("/signup", validate.signUpUser(), controller.signUp);

module.exports = Router