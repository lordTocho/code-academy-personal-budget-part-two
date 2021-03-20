var express = require('express');
var usersRouter = express.Router();

const usersController = require('../controllers/usersController')

/* GET users listing. */
usersRouter.get('/', usersController.list);
usersRouter.get('/:userId', usersController.getUserbyId);

usersRouter.post('/add', usersController.addUser);

usersRouter.put('/:userId', usersController.updateUserRecord);

usersRouter.delete("/:userId", usersController.deleteUserRecord );

module.exports = usersRouter;
