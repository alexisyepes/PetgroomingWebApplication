// Requiring our models
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
var db = require("../models");
const passport = require("passport");
// const { ensureAuthenticated, ensureAuthenticatedEmployee } = require('../passport/auth');

module.exports = function(app) {
	//Client routes
	//Getting all clients
	app.get("/api/clients", (req, res) => {
		db.Client.findAll({
			include: [db.Pet]
		}).then(function(dbClient) {
			res.json(dbClient);
		});
	});

	//Getting one single client
	app.get(
		"/auth/api/clients/:id",
		passport.authenticate(["jwt", "jwtEmployee"], {
			session: false
		}),
		(req, res) => {
			console.log(req.user);
			// console.log(res)
			return db.Client.findOne({
				where: {
					id: req.params.id
				},
				include: [
					{
						model: db.Pet,
						include: [{ model: db.Comment }]
					}
				]
			}).then(function(dbClient) {
				if (typeof dbClient === "object") {
					res.json(dbClient);
				}
			});
		}
	);

	//Searching client by Last Name
	app.get("/api/clients/lastName/:lastName", function(req, res) {
		db.Client.findAll({
			where: {
				lastName: req.params.lastName
			}
		}).then(function(dbClient) {
			console.log(res);
			console.log(dbClient);
			//form validation on modal
			if (typeof dbClient === "object") {
				res.json(dbClient);
			}
		});
	});

	//Searching client by First Name
	app.get("/api/clients/firstName/:firstName", function(req, res) {
		db.Client.findAll({
			where: {
				firstName: req.params.firstName
			}
		}).then(function(dbClient) {
			console.log(res);
			console.log(dbClient);
			//form validation on modal
			if (typeof dbClient === "object") {
				res.json(dbClient);
			}
		});
	});

	//Searching client by phone
	app.get("/api/clients/primaryPhoneNumber/:primaryPhoneNumber", function(
		req,
		res
	) {
		db.Client.findAll({
			where: {
				[Op.or]: [
					{ primaryPhoneNumber: req.params.primaryPhoneNumber },
					{ cellphone: req.params.primaryPhoneNumber },
					{ workPhone: req.params.primaryPhoneNumber }
				]
			}
		}).then(function(dbClient) {
			//form validation on modal
			if (typeof dbClient === "object") {
				res.json(dbClient);
			}
		});
	});

	//Searching Pet by Name
	app.get("/api/pets/name/:name", function(req, res) {
		db.Pet.findAll({
			where: {
				name: req.params.name
			}
		}).then(function(dbPet) {
			console.log(res);
			console.log(dbPet);
			//form validation on modal
			if (typeof dbPet === "object") {
				res.json(dbPet);
			}
		});
	});

	// POST route for saving a new client
	app.post("/api/clients", function(req, res) {
		db.Client.create({
			...req.body
		})
			.then(function(dbClient) {
				res.json(dbClient);
			})
			.catch(function(err) {
				res.json(err);
			});
	});

	// DELETE route for deleting clients.
	app.delete("/api/clients/:id", function(req, res) {
		db.Client.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(dbClient) {
			res.json(dbClient);
		});
	});

	// PUT route for updating clients.
	app.put("/api/clients/:id", function(req, res) {
		db.Client.update(
			{
				clientid: req.body.clientid,
				lastName: req.body.lastName,
				firstName: req.body.firstName,
				primaryPhoneNumber: req.body.primaryPhoneNumber,
				cellphone: req.body.cellphone,
				workPhone: req.body.workPhone,
				email: req.body.email
			},
			{
				where: {
					id: req.body.id
				}
			}
		)
			.then(function(dbClient) {
				res.json(dbClient);
			})
			.catch(function(err) {
				res.json(err);
			});
	});

	// C O M M E N T S   R O U T E S //////////////////////////
	// POST route for saving a new Comment
	app.post("/api/comments/:PetId", function(req, res) {
		db.Comment.create({
			...req.body,
			PetId: req.params.PetId
		})
			.then(function(dbComment) {
				res.json(dbComment);
			})
			.catch(function(err) {
				res.json(err);
			});
	});

	// PUT route for updating Comments.
	app.put("/api/comments/:id", function(req, res) {
		db.Comment.update(
			{
				...req.body
			},
			{
				where: {
					id: req.params.id
				}
			}
		)
			.then(function(dbComment) {
				res.json(dbComment);
			})
			.catch(function(err) {
				res.json(err);
			});
	});

	//Getting one single comment
	app.get("/api/comments/:id", (req, res) => {
		return db.Comment.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(dbComment) {
			if (typeof dbComment === "object") {
				res.json(dbComment);
			}
		});
	});

	// DELETE route for deleting comments.
	app.delete("/api/comments/:id", function(req, res) {
		db.Comment.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(dbComment) {
			res.json(dbComment);
		});
	});

	// P E T S   R O U T E S //////////////////////////////

	// POST route for saving a new Pet
	app.post("/api/pets/:ClientId", function(req, res) {
		db.Pet.create({
			...req.body,
			ClientId: req.params.ClientId
		})
			.then(function(dbPet) {
				res.json(dbPet);
			})
			.catch(function(err) {
				res.json(err);
			});
	});

	//Getting all pets
	app.get("/api/pets", (req, res) => {
		db.Pet.findAll({
			include: [db.Comment]
		}).then(function(dbPet) {
			res.json(dbPet);
		});
	});

	// DELETE route for deleting Pets.
	app.delete("/api/pets/:id/", function(req, res) {
		db.Pet.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(dbPet) {
			res.json(dbPet);
		});
	});

	//Getting one single pet
	app.get("/auth/api/pets/:id", (req, res) => {
		return db.Pet.findOne({
			where: {
				id: req.params.id
			},
			include: [db.Comment]
		}).then(function(dbPet) {
			if (typeof dbPet === "object") {
				res.json(dbPet);
			}
		});
	});

	// PUT route for updating pets.
	app.put("/api/pets/:id", function(req, res) {
		db.Pet.update(
			{
				...req.body
			},
			{
				where: {
					id: req.params.id
				}
			}
		)
			.then(function(dbPet) {
				res.json(dbPet);
			})
			.catch(function(err) {
				res.json(err);
			});
	});
};
