// const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const User = require("../models").User;
const Employee = require("../models").Employee;
// const jwtSecret = require('./secret');
const jwtSecret = process.env.JWT_SECRET;
require("dotenv").config();

// const salt = bcrypt.genSaltSync(10);

module.exports = function(passport) {
	passport.use(
		"admin-local",
		new LocalStrategy(
			// Our user will sign in using an email, rather than a "username"
			{
				usernameField: "email"
			},
			function(email, password, done) {
				// When a user tries to sign in this code runs
				User.findOne({
					where: {
						email
					}
				}).then(user => {
					if (!user || !user.password) {
						return done(null, false, {
							message: "No user found under those credentials"
						});
					}
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw err;

						if (isMatch) {
							return done(null, user);
						} else {
							return done(null, false, {
								message: "Email or Password not valid"
							});
						}
					});
				});
			}
		)
	);

	passport.use(
		"employees-local",
		new LocalStrategy(
			// Our user will sign in using an email, rather than a "username"
			{
				usernameField: "email"
			},
			function(email, password, done) {
				// When a user tries to sign in this code runs
				Employee.findOne({
					where: {
						email
					}
				}).then(employee => {
					if (!employee || !employee.password) {
						return done(null, false, {
							message: "No user found under those credentials"
						});
					}
					bcrypt.compare(password, employee.password, (err, isMatch) => {
						if (err) throw err;

						if (isMatch) {
							return done(null, employee);
						} else {
							return done(null, false, {
								message: "Email or Password not valid"
							});
						}
					});
				});
			}
		)
	);

	const opts = {
		jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
		secretOrKey: process.env.JWT_SECRET
	};

	passport.use(
		"jwt",
		new JWTstrategy(opts, (jwt_payload, done) => {
			try {
				User.findOne({
					where: {
						email: jwt_payload.email
					}
				}).then(user => {
					if (user && user.jobType === "admin") {
						console.log("Admin found in db in passport");
						done(null, user);
					} else {
						console.log("user not found in db");
						done(null, false);
					}
				});
			} catch (err) {
				done(err);
			}
		})
	);

	passport.use(
		"jwtEmployee",
		new JWTstrategy(opts, (jwt_payload, done) => {
			try {
				Employee.findOne({
					where: {
						email: jwt_payload.email
					}
				}).then(user => {
					if (
						(user && user.jobType === "groomer") ||
						user.jobType === "bather"
					) {
						console.log("employee found in db in passport");
						done(null, user);
					} else {
						console.log("employee not found in db");
						done(null, false);
					}
				});
			} catch (err) {
				done(err);
			}
		})
	);
};
