var express = require('express');
var budgetEnvelopeRouter = express.Router();

var budgetEnvelopeController = require('../controllers/budgetEnvelopeController');

budgetEnvelopeRouter.get('/', budgetEnvelopeController.list );

module.exports = budgetEnvelopeRouter;