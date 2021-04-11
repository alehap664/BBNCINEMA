const express = require("express");
const Router = express.Router();

const films = require("./v1/films");
const users = require("./v1/users");
const comments = require("./v1/comments");

const filmsController = require("../../controllers/api/v1/films.controller")

Router.get("/", (req, res) => {
  res.render("v1")
})

Router.get("/categories", filmsController.getCategory);
Router.get("/countries", filmsController.getCountry);

Router.use("/films", films);
Router.use("/users", users);
Router.use("/comments", comments);


module.exports = Router
