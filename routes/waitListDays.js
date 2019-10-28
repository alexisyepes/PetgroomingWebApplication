// const express = require("express");
// const router = express.Router();

// const Tuesday = require("../models").Tuesday;
// const Wednesday = require("../models").Wednesday;
// const Thursday = require("../models").Thursday;
// const Friday = require("../models").Friday;
// const Saturday = require("../models").Saturday;

// //Add an Appointment Admin
// router.post("/tuesday", function(req, res) {
// 	Tuesday.create({
// 		waitListDetails: req.body.waitListDetails
// 	})
// 		.then(function(dbWaitList) {
// 			res.json(dbWaitList);
// 		})
// 		.catch(function(err) {
// 			res.json(err);
// 		});
// });

// //GET All Tuesday wait list events
// router.get("/tuesday", (req, res) => {
// 	Tuesday.findAll({}).then(function(dbWaitList) {
// 		res.json(dbWaitList);
// 	});
// });

// //Add an Appointment Admin
// router.post("/wednesday", function(req, res) {
// 	Wednesday.create({
// 		waitListDetails: req.body.waitListDetails
// 	})
// 		.then(function(dbWaitList) {
// 			res.json(dbWaitList);
// 		})
// 		.catch(function(err) {
// 			res.json(err);
// 		});
// });

// //GET All Wednedsday wait list events
// router.get("/wednesday", (req, res) => {
// 	Wednesday.findAll({}).then(function(dbWaitList) {
// 		res.json(dbWaitList);
// 	});
// });

// //Add an Appointment Thursday
// router.post("/thursday", function(req, res) {
// 	Thursday.create({
// 		waitListDetails: req.body.waitListDetails
// 	})
// 		.then(function(dbWaitList) {
// 			res.json(dbWaitList);
// 		})
// 		.catch(function(err) {
// 			res.json(err);
// 		});
// });

// //GET All Thursday wait list events
// router.get("/thursday", (req, res) => {
// 	Thursday.findAll({}).then(function(dbWaitList) {
// 		res.json(dbWaitList);
// 	});
// });

// //Add an Appointment Friday
// router.post("/friday", function(req, res) {
// 	Friday.create({
// 		waitListDetails: req.body.waitListDetails
// 	})
// 		.then(function(dbWaitList) {
// 			res.json(dbWaitList);
// 		})
// 		.catch(function(err) {
// 			res.json(err);
// 		});
// });

// //GET All Friday wait list events
// router.get("/friday", (req, res) => {
// 	Friday.findAll({}).then(function(dbWaitList) {
// 		res.json(dbWaitList);
// 	});
// });

// //Add an Appointment Saturday
// router.post("/saturday", function(req, res) {
// 	Saturday.create({
// 		waitListDetails: req.body.waitListDetails
// 	})
// 		.then(function(dbWaitList) {
// 			res.json(dbWaitList);
// 		})
// 		.catch(function(err) {
// 			res.json(err);
// 		});
// });

// //GET All Saturday wait list events
// router.get("/saturday", (req, res) => {
// 	Saturday.findAll({}).then(function(dbWaitList) {
// 		res.json(dbWaitList);
// 	});
// });

// module.exports = router;
