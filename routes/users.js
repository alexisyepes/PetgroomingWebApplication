const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models").User;
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

// Register
router.post("/signup", (req, res) => {
	console.log(req.body);

	const { username, email, password, jobType } = req.body;

	if (password.length < 6) {
		throw "Password must be at least 6 characters";
	} else {
		User.findOne({
			where: {
				email
			}
		}).then(user => {
			if (user) {
				res.send("Email already exists!");
			} else {
				const encryptedPassword = bcrypt.hashSync(password, salt);

				let newUser = {
					username,
					email,
					password: encryptedPassword,
					jobType
				};
				User.create(newUser)
					.then(() => {
						// newUser.isAdmin = true
						delete newUser.password;
						res.send(newUser);
					})
					.catch(function(err) {
						console.log(err);
						res.json(err);
					});
			}
		});
	}
});

// Login Admin
router.post("/login", function(req, res, next) {
	const { email, password } = req.body;
	// generate the authenticate method and pass the req/res
	passport.authenticate("admin-local", function(err, user, info) {
		if (!email || !password) {
			return;
		}
		if (err) {
			return res.status(401).json(err);
		}
		if (!user) {
			return res.status(401).json(info);
		}
		// req / res held in closure
		req.logIn(user, () => {
			User.findOne({
				where: {
					email: req.body.email
				}
			}).then(user => {
				const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
					expiresIn: "12h"
				});
				res.status(200).send({
					auth: true,
					token,
					message: "user found & logged in",
					user: user.jobType
				});
			});
		});
	})(req, res, next);
});

router.get(
	"/admin",
	passport.authenticate("jwt", {
		session: false
	}),
	(req, res) => {
		console.log(req.user);
		return res.json(req.user);
	}
);

// Logout
// router.get('/logout', function (req, res) {
//     req.logOut();
//     req.session.destroy(function (err) {
//         res.redirect('/auth/login');
//     });
// });

module.exports = router;
