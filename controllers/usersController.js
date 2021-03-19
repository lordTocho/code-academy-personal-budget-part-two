// performs all of the database actions against the users table
const User = require('../models/').User;

module.exports = {
    // list all of the users in the Users table
    list( req, res ) {
        return User
            .findAll({
                attributes : ['userId', 'firstName', 'lastName', "createdAt", "updatedAt"]
            })
            .then( (user) => res.status( 200 ).send(user) )
            .catch((error) => { res.status(400).send(error); });
    },

    addUser( req, res ) {
        return User
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName

          }, { attributes : ['userId', 'firstName', 'lastName', "createdAt", "updatedAt"] })
          .then((user) => res.status(201).send(user))
          .catch((error) => res.status(400).send(error));
    }
}