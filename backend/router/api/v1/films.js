const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/v1/films.controller')

Router.post("/", controller.post);
Router.get("/", controller.get);
Router.get("/:id", controller.getByID);


module.exports = Router