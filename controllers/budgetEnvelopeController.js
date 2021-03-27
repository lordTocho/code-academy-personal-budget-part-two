const BudgetEnvelope = require('../models/').BudgetEnvelope
const User = require('../models/').User
const sequelize = require('sequelize');

// contains all of the logic that recieves the API calls and runs commands against the database

module.exports = {
    /*
        SELECT *
	        FROM public."BudgetEnvelopes"
		    INNER JOIN public."Users" ON public."BudgetEnvelopes"."userId" = public."Users"."userId";

        Currently working with the following query down below

        SELECT "BudgetEnvelope"."BudgetEnvelopeId", "BudgetEnvelope"."EnvelopeDescription", "BudgetEnvelope"."Budget", "BudgetEnvelope"."userId", "BudgetEnvelope"."createdAt", "BudgetEnvelope"."updatedAt", "BudgetEnvelope"."UserUserId", "User"."userId" AS "User.userId", "User"."firstName" AS "User.firstName", "User"."lastName" AS "User.lastName", "User"."createdAt" AS "User.createdAt", "User"."updatedAt" AS "User.updatedAt" FROM "BudgetEnvelopes" AS "BudgetEnvelope" INNER JOIN "Users" AS "User" ON "BudgetEnvelope"."UserUserId" = "User"."userId";

        Postman's current output
        "SELECT \"BudgetEnvelope\".\"BudgetEnvelopeId\", \"BudgetEnvelope\".\"EnvelopeDescription\", \"BudgetEnvelope\".\"Budget\", \"BudgetEnvelope\".\"userId\", \"BudgetEnvelope\".\"createdAt\", \"BudgetEnvelope\".\"updatedAt\", \"BudgetEnvelope\".\"UserUserId\", \"User\".\"userId\" AS \"User.userId\", \"User\".\"firstName\" AS \"User.firstName\", \"User\".\"lastName\" AS \"User.lastName\", \"User\".\"createdAt\" AS \"User.createdAt\", \"User\".\"updatedAt\" AS \"User.updatedAt\" FROM \"BudgetEnvelopes\" AS \"BudgetEnvelope\" INNER JOIN \"Users\" AS \"User\" ON \"BudgetEnvelope\".\"UserUserId\" = \"User\".\"userId\";
    */
    list( req, res ) {
        // list out all of the envelopes that each user has in the system
        return BudgetEnvelope
            .findAll({ include: [{
                                    model: User,
                                    required: true
                                }],
            })
            .then( ( envelope ) => res.status( 200 ).send( envelope ) )
            .catch((error) => res.status(400).send(error));
    },

    /*
        SELECT "BudgetEnvelope"."BudgetEnvelopeId", "BudgetEnvelope"."EnvelopeDescription", "BudgetEnvelope"."Budget", "BudgetEnvelope"."userId", "BudgetEnvelope"."createdAt", "BudgetEnvelope"."updatedAt", "User"."userId" AS "User.userId", "User"."firstName" AS "User.firstName", "User"."lastName" AS "User.lastName", "User"."createdAt" AS "User.createdAt", "User"."updatedAt" AS "User.updatedAt" FROM "BudgetEnvelopes" AS "BudgetEnvelope" INNER JOIN "Users" AS "User" ON "BudgetEnvelope"."userId" = "User"."userId" WHERE "BudgetEnvelope"."BudgetEnvelopeId" = '1';
    */
    getEnvelopeById( req, res ) {
        // fetch budget envelope based on ID
        return BudgetEnvelope
            .findByPk(req.params.envelopeId,{
                include: [{
                    model: User,
                    required: true
                }],

            })
            .then((envelope) => {
            if (!envelope) {
              return res.status(404).send({
                message: 'Envelope was not found',
              });
            }
            return res.status(200).send({ envelopes: envelope,
                                          response: "Budget envelopes sent successfully"
            });
          })
          .catch((error) => res.status(400).send(error));

    },

    addEnvelopesWithUsers( req, res ){
        return BudgetEnvelope
            .create({
                EnvelopeDescription: req.body.envelopeDescription,
                Budget: req.body.budget,
                userId: req.body.userId
            })
            .then((envelope) => res.status(201).send({ envelope: envelope,
                                                       response: "New envelope record created successfully"}))
            .catch((error) => res.status(400).send(error));
    },

    updateBudgetEnvelope( req, res ) {

        let envelopeDescription = req.body.envelopeDescription
        let budget = req.body.budget

        return BudgetEnvelope
            .findByPk(req.params.envelopeId)
            .then( ( envelope ) => {

                if ( !envelope ) {
                    return res.status(404).send({
                      message: 'Envelope Not Found',
                    });
                }
                return envelope
                    .update({
                        EnvelopeDescription: envelopeDescription,
                        Budget: budget
                    })
                    .then(() => res.status(200).send( { updateBudgetEnvelope: envelope,
                                                        response: 'Envelope Update successful'
                     } ) )
                    .catch((error) => res.status(400).send(error));
            } )
    },

    // deletes records
    delete( req, res ) {
        return BudgetEnvelope
                .findByPk(req.params.envelopeId)
                .then( ( envelope ) => {

                    if ( !envelope ) {
                        return res.status(404).send({
                          message: 'Budget Envelope Not Found',
                        });
                    }
                    return envelope
                        .destroy()
                        .then(() => res.status(200).send( { response: "Envelope successfully deleted." } ) )
                        .catch((error) => res.status(400).send(error));
                } )
                .catch((error) => res.status(400).send(error));
    },

    totalBudgetEnvelope( req, res ) {
            return BudgetEnvelope
                .findAll({
                    attributes: [
                        'userId',
                        [sequelize.fn('SUM', sequelize.col('Budget')), 'totalBudget']
                    ],
                    group: ['userId']
                })
                .then( ( envelope ) => {

                    if ( !envelope ) {
                        return res.status(404).send({
                          message: `User Id: ${req.params.userId} was not found. Unable to bring up budget total`,
                        });
                    }
                    return envelope
                        .then(() => res.status(200).send( { budgetTotal: envelope,
                                                            response: "Successfully sent total budgets." } ) )
                        .catch((error) => res.status(400).send(error));
                } )
                .catch((error) => res.status(400).send(error));

    }
}