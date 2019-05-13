const express = require("express");
const googleMapsClient = require("@google/maps").createClient({
	key: "AIzaSyCjdWc2whWGJLhGA_uZwaNEfjtsUo_BCHk",
	Promise: Promise
});
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/", (req, res) => {
	res.json({ status: "hello" });
});

app.get("/place", (req, res) => {
	googleMapsClient
		.placesNearby({
			language: "en",

			location: [41.133916, -74.356341],
			radius: 30000,
			type: "car_repair"
		})
		.asPromise()
		.then(response => {
			res.json(response.json.results);
		})
		.catch(err => {
			console.log(err);
		});
});

app.get("/place/:lat/:long", (req, res) => {
	googleMapsClient
		.placesNearby({
			language: "en",
			location: [req.params.lat, req.params.long],
			radius: 3000,
			type: "car_repair"
		})
		.asPromise()
		.then(response => {
			res.json(response.json.results);
		})
		.catch(err => {
			console.log(err);
		});
});

app.get("/photo/:ref", (req, res) => {
	var refr = req.params.ref;

	var photo = {
		photoreference: refr,
		maxwidth: 200,
		maxheight: 200
	};

	googleMapsClient
		.placesPhoto(photo)
		.asPromise()
		.then(response => {
			res.json({ ur: response.requestUrl });
		})
		.catch(err => {
			console.log(err);
		});
});

app.get("/zip/:zippy", (req, res) => {
	googleMapsClient
		.geocode({
			address: req.params.zippy
		})
		.asPromise()
		.then(response => {
			res.json(response.json.results[0].geometry.location);
		});
});

app.listen(3000, () => {
	console.log("sever is listening on port 3000");
});
