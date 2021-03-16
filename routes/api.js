// the root router for the application
const express = require('express');
const userRouter = require('./users')
const apiRouter = express.Router();

apiRouter.use('/users', userRouter)

module.exports = { apiRouter };