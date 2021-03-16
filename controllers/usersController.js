// performs all of the database actions against the users table
const User = require('../models/').User;

module.exports = {
    // list all of the users in the Users table
    list( req, res ) {
        return User
            .findAll({
                model: User,
                as: 'Users'
            })
            .then( (user) => res.status( 200 ).send(user) )
            .catch((error) => { res.status(400).send(error); });
    },
}