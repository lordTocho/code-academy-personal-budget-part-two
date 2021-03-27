var express = require('express');
var budgetEnvelopeRouter = express.Router();

var budgetEnvelopeController = require('../controllers/budgetEnvelopeController');

budgetEnvelopeRouter.get('/', budgetEnvelopeController.list );
budgetEnvelopeRouter.get('/:envelopeId', budgetEnvelopeController.getEnvelopeById );
budgetEnvelopeRouter.get('/total', budgetEnvelopeController.totalBudgetEnvelope )

budgetEnvelopeRouter.post('/add', budgetEnvelopeController.addEnvelopesWithUsers );

budgetEnvelopeRouter.put('/:envelopeId', budgetEnvelopeController.updateBudgetEnvelope )

budgetEnvelopeRouter.delete('/:envelopeId', budgetEnvelopeController.delete )

module.exports = budgetEnvelopeRouter;