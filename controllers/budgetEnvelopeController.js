const BudgetEnvelope = require('../models/').BudgetEnvelope
const User = require('../models/').User

module.exports = {
    /*
        SELECT *
	        FROM public."BudgetEnvelopes"
		    INNER JOIN public."Users" ON public."BudgetEnvelopes"."userId" = public."Users"."userId";
    */
    list( req, res ) {
        // list out all of the envelopes that each user has in the system
        return BudgetEnvelope
            .findAll({ include: User, required: true })
            .then( ( envelope ) => res.status( 200 ).send( envelope ) )
            .catch((error) => res.status(400).send(error));
    }
}