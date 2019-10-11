const sslRedirect = require("heroku-ssl-redirect");
const express = require("express");
const path = require("path");
// const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const usersRouter = require("./routes/users");
const employeesRouter = require("./routes/employees");
const calendarsRouter = require("./routes/calendars");
require("dotenv").config();

app.use(cors());
// Passport Config
require("./passport/passport")(passport);

app.use(sslRedirect());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	app.locals.user = req.user;
	next();
});
app.use(morgan("dev"));
app.use(express.json());

//Passport Config
app.use(passport.initialize());
// app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

// Requiring our models for syncing
var db = require("./models");

// Define API routes here
require("./routes/api-routes.js")(app);
app.use("/auth", usersRouter);
app.use("/auth", employeesRouter);
app.use("/schedule", calendarsRouter);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync({ force: false }).then(function() {
	app.listen(PORT, () => {
		console.log(`🌎 ==> API server now on port ${PORT}!`);
	});
});

// app.listen(PORT, () => {
//     console.log(`🌎 ==> API server now on port ${PORT}!`);
//   });
