(async function () {
	try {
		const cors = require('cors');
		const express = require('express');
		const app = express();
		const PORT = process.env.PORT || 5000;

		const mongoose = require('mongoose');

		const v1Router = require("./router/api/v1")

		require('dotenv').config()

		const uri = process.env.DB_CONNECTION;
		await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
		console.log("DB Connected");

		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(cors());
		app.set("view engine", "ejs")

		app.get("/", (req, res) => {
			res.send("<h1>React Cinema<h1/><a href='/api'>API<a/>")
		})

		// app.use("/add", add)

		app.get("/api", (req, res) => { res.render("index") });
		app.use("/api/v.1", v1Router);

		app.listen(PORT, () => {
			console.log("Sever running at PORT:", PORT);
		})
	} catch (error) {
		console.log(error);
	}

})()