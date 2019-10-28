const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const Employee = require("../models").Employee;
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

// Register
router.post("/employees/signup", (req, res) => {
	console.log(req.body);

	const { firstName, lastName, email, password, password2, jobType } = req.body;

	Employee.findOne({
		where: {
			email
		}
	}).then(employee => {
		if (employee) {
			res.send("Email already exists!");
		} else {
			const encryptedPassword = bcrypt.hashSync(password, salt);

			let newEmployee = {
				firstName,
				lastName,
				email,
				password: encryptedPassword,
				jobType
			};
			Employee.create(newEmployee)
				.then(() => {
					delete newEmployee.password;
					res.send(newEmployee);
				})
				.catch(function(err) {
					console.log(err);
					res.json(err);
				});
		}
	});
});

// Login
router.post("/employees/login", function(req, res, next) {
	const { email, password } = req.body;
	// generate the authenticate method and pass the req/res
	passport.authenticate("employees-local", function(err, employee, info) {
		if (!email || !password) {
			return;
		}
		if (err) {
			return res.status(401).json(err);
		}
		if (!employee) {
			return res.status(401).json(info);
		}

		// req / res held in closure
		req.logIn(employee, () => {
			Employee.findOne({
				where: {
					email: req.body.email
				}
			}).then(employee => {
				const token = jwt.sign(
					{ email: employee.email },
					process.env.JWT_SECRET,
					{
						expiresIn: "12h"
					}
				);
				res.status(200).send({
					authEmployee: true,
					token,
					message: "user found & logged in",
					employee
				});
			});
		});
	})(req, res, next);
});

router.get("/employees", (req, res) => {
	Employee.findAll({}).then(function(dbEmployee) {
		res.json(dbEmployee);
	});
});

// Employees profile authenticated
// router.get('/employees/profile', passport.authenticate('jwtEmployee', { session: false }), (req, res) => {
//     console.log(req.user);
//     return res.json(
//         req.user
//     );
// });

// DELETE route for employees.
router.delete("/employees/:id", function(req, res) {
	Employee.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(dbEmployee) {
		res.json(dbEmployee);
	});
});

//Getting one single employee
router.get(
	"/employees/:id",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		console.log(req.employee);
		// console.log(res)
		return db.Employee.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(dbEmployee) {
			if (typeof dbEmployee === "object") {
				res.json(dbEmployee);
			}
		});
	}
);

// Logout
router.get("/employees/logout", function(req, res) {
	req.logOut();
	req.session.destroy(function(err) {
		res.redirect("/auth/employees/login");
	});
});

module.exports = router;
