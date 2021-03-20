// performs all of the database actions against the users table
const User = require('../models/').User;

module.exports = {
    // list all of the users in the Users table
    list( req, res ) {
        return User
            .findAll()
            .then( (user) => res.status( 200 ).send(user) )
            .catch((error) => { res.status(400).send(error); });
    },

    getUserbyId( req, res ) {
        return User
        .findByPk(req.params.userId)
        .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'User was not found',
              });
            }
            return res.status(200).send(user);
          })
          .catch((error) => res.status(400).send(error));
    },

    addUser( req, res ) {
        let firstName = req.body.firstName
        let lastName = req.body.lastName

        return User
            .create({
                        firstName: firstName,
                        lastName: lastName

            })
            .then((user) => res.status(200).send({ newUser: user,
                                                    response: 'New record succesfully added.' }))
            .catch((error) => res.status(400).send(error));
        
    },

    updateUserRecord( req, res ) {
        let firstName = req.body.firstName
        let lastName = req.body.lastName

            return User
                .findByPk(req.params.userId)
                .then( ( user ) => {

                    if ( !user ) {
                        return res.status(404).send({
                          message: 'User Not Found',
                        });
                    }
                    return user
                        .update({
                            firstName: firstName,
                            lastName: lastName
                        })
                        .then(() => res.status(200).send( { updateUser: user,
                                                            response: 'Update successful'
                         } ) )
                        .catch((error) => res.status(400).send(error));
                } )
                .catch((error) => res.status(400).send(error));

        
    },

    deleteUserRecord( req, res ) {
        return User
                .findByPk(req.params.userId)
                .then( ( user ) => {

                    if ( !user ) {
                        return res.status(404).send({
                          message: 'User Not Found',
                        });
                    }
                    return user
                        .destroy()
                        .then(() => res.status(200).send( { response: "User successfully deleted." } ) )
                        .catch((error) => res.status(400).send(error));
                } )
                .catch((error) => res.status(400).send(error));
    }
}