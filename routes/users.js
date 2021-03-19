var express = require('express');
var usersRouter = express.Router();

const usersController = require('../controllers/usersController')

/* GET users listing. */
usersRouter.get('/', usersController.list);
usersRouter.post('/add', usersController.addUser);

module.exports = usersRouter;
