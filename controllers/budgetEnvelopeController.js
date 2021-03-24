const BudgetEnvelope = require('../models/').BudgetEnvelope
const User = require('../models/').User

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
               }]
            })
            .then( ( envelope ) => res.status( 200 ).send( envelope ) )
            .catch((error) => res.status(400).send(error));
    }
}