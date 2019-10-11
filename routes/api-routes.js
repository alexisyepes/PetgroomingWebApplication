// Requiring our models
var db = require("../models");
const passport = require('passport');
// const { ensureAuthenticated, ensureAuthenticatedEmployee } = require('../passport/auth');


module.exports = function (app) {


  //Client routes
  //Getting all clients
  app.get("/api/clients", (req, res) => {
    db.Client.findAll({}).then(function (dbClient) {
      res.json(dbClient);
    });
  });

  //Getting one single client
  app.get('/auth/api/clients/:id', passport.authenticate(['jwt', 'jwtEmployee'], {
    session: false
  }), (req, res) => {

    console.log(req.user);
    // console.log(res)
    return (db.Client.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbClient) {
      if (typeof dbClient === "object") {
        res.json(dbClient);
      }
    }
    ));
  });

  
  //Searching client by name
  app.get("/api/clients/firstName/:firstName", function (req, res) {
    db.Client.findOne({
      where: {
        firstName: req.params.firstName
      }
    }).then(function (dbClient) {
      console.log(res)
      console.log(dbClient)
      //form validation on modal
      if (typeof dbClient === "object") {
        res.json(dbClient);
      }
    })

  });

  //Searching client by phone
  app.get("/api/clients/phone/:phone", function (req, res) {
    db.Client.findOne({
      where: {
        phone: req.params.phone
      }
    }).then(function (dbClient) {
      console.log(res)
      console.log(dbClient)
      //form validation on modal
      if (typeof dbClient === "object") {
        res.json(dbClient);
      }
    })

  });

  // POST route for saving a new client
  app.post("/api/clients", function (req, res) {
    db.Client.create({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      phone: req.body.phone,
      petName: req.body.petName,
      breed: req.body.breed,
      notes: req.body.notes
    }).then(function (dbClient) {
      res.json(dbClient);
    })
      .catch(function (err) {
        res.json(err);
      });
  });

  // DELETE route for deleting clients.
  app.delete("/api/clients/:id", function (req, res) {
    db.Client.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbClient) {
      res.json(dbClient);
    });

  });

  // PUT route for updating clients.
  app.put("/api/clients/:id", function (req, res) {

    db.Client.update({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      phone: req.body.phone,
      petName: req.body.petName,
      breed: req.body.breed,
      notes: req.body.notes
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (dbClient) {
        res.json(dbClient);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
};
