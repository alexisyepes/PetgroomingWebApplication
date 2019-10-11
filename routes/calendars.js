const express = require("express");
const router = express.Router();
const CalendarAdmin = require("../models").CalendarAdmin;
const CalendarEmp1 = require("../models").CalendarEmp1;
const CalendarEmp2 = require("../models").CalendarEmp2;

//Calendar Admin Routes*****************************************

//Get All Appointments Admin
router.get("/calendar_admin", (req, res) => {
	CalendarAdmin.findAll({}).then(function(dbCalendarAdmin) {
		res.json(dbCalendarAdmin);
	});
	// res.send("calendar")
});

//Add an Appointment Admin
router.post("/calendar_admin", function(req, res) {
	CalendarAdmin.create({
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		appointment: req.body.appointment
	})
		.then(function(dbCalendarAdmin) {
			res.json(dbCalendarAdmin);
		})
		.catch(function(err) {
			res.json(err);
		});
});

//Get one Appointment Admin
router.get("/calendar_admin/:id", (req, res) => {
	console.log(res);
	// console.log(res)
	return CalendarAdmin.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(dbCalendar) {
		if (typeof dbCalendar === "object") {
			res.json(dbCalendar);
		}
	});
});

// PUT route for updating one Calendar Event.
router.put("/calendar_admin/:id", function(req, res) {
	CalendarAdmin.update(
		{
			title: req.body.title,
			start: req.body.start,
			end: req.body.end,
			appointment: req.body.appointment
		},
		{
			where: {
				id: req.body.id
			}
		}
	)
		.then(function(dbCalendar) {
			res.json(dbCalendar);
		})
		.catch(function(err) {
			res.json(err);
		});
});

// DELETE route for events Admin Calendar.
router.delete("/calendar_admin/:id", function(req, res) {
	CalendarAdmin.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(dbCalendar) {
		res.json(dbCalendar);
	});
});

//Calendar Admin Routes*****************************************

//Calendar Employee 1 Routes*****************************************

//GET All appointments Emp1
router.get("/calendar_emp1", (req, res) => {
	CalendarEmp1.findAll({}).then(function(dbCalendarEmp1) {
		res.json(dbCalendarEmp1);
	});
	// res.send("calendar")
});

//Create Appointments Emp1
router.post("/calendar_emp1", function(req, res) {
	CalendarEmp1.create({
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		appointment: req.body.appointment
	})
		.then(function(dbCalendarEmp1) {
			res.json(dbCalendarEmp1);
		})
		.catch(function(err) {
			res.json(err);
		});
});

//Get one Appointment Emp1
router.get("/calendar_emp1/:id", (req, res) => {
	console.log(res);
	// console.log(res)
	return CalendarEmp1.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(dbCalendar) {
		if (typeof dbCalendar === "object") {
			res.json(dbCalendar);
		}
	});
});

// PUT route for updating one Calendar Event Emp1.
router.put("/calendar_emp1/:id", function(req, res) {
	CalendarEmp1.update(
		{
			title: req.body.title,
			start: req.body.start,
			end: req.body.end,
			appointment: req.body.appointment
		},
		{
			where: {
				id: req.body.id
			}
		}
	)
		.then(function(dbCalendar) {
			res.json(dbCalendar);
		})
		.catch(function(err) {
			res.json(err);
		});
});

// DELETE route for events emp1 Calendar.
router.delete("/calendar_emp1/:id", function(req, res) {
	CalendarEmp1.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(dbCalendar) {
		res.json(dbCalendar);
	});
});

//Calendar Employee 1 Routes*****************************************

//Calendar Employee 2 Routes*****************************************

//GET All appointments Emp2
router.get("/calendar_emp2", (req, res) => {
	CalendarEmp2.findAll({}).then(function(dbCalendarEmp2) {
		res.json(dbCalendarEmp2);
	});
	// res.send("calendar")
});

//Create Appointments Emp2
router.post("/calendar_emp2", function(req, res) {
	CalendarEmp2.create({
		title: req.body.title,
		start: req.body.start,
		end: req.body.end,
		appointment: req.body.appointment
	})
		.then(function(dbCalendarEmp2) {
			res.json(dbCalendarEmp2);
		})
		.catch(function(err) {
			res.json(err);
		});
});

//Get one Appointment Emp2
router.get("/calendar_emp2/:id", (req, res) => {
	console.log(res);
	// console.log(res)
	return CalendarEmp2.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(dbCalendar) {
		if (typeof dbCalendar === "object") {
			res.json(dbCalendar);
		}
	});
});

// PUT route for updating one Calendar Event Emp2.
router.put("/calendar_emp2/:id", function(req, res) {
	CalendarEmp2.update(
		{
			title: req.body.title,
			start: req.body.start,
			end: req.body.end,
			appointment: req.body.appointment
		},
		{
			where: {
				id: req.body.id
			}
		}
	)
		.then(function(dbCalendar) {
			res.json(dbCalendar);
		})
		.catch(function(err) {
			res.json(err);
		});
});

// DELETE route for events emp2 Calendar.
router.delete("/calendar_emp2/:id", function(req, res) {
	CalendarEmp2.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(dbCalendar) {
		res.json(dbCalendar);
	});
});

//Calendar Employee 2 Routes*****************************************

module.exports = router;
