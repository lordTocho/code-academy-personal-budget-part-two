// the root router for the application
const express = require('express');

const userRouter = require('./users')
const budgetEnvelopeRouter = require('./budgetEnvelope')

const apiRouter = express.Router();

apiRouter.use('/users', userRouter)
apiRouter.use('/envelope', budgetEnvelopeRouter )

module.exports = { apiRouter };