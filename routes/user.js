const express = require('express');
const {
  getUsers, getUsersById, createUser, updateUser, updateUserAvatar,
} = require('../controllers/user');

const usersRoute = express.Router();
usersRoute.get('/', getUsers);
usersRoute.patch('/me', updateUser);
usersRoute.patch('/me/avatar', updateUserAvatar);
usersRoute.get('/:userId', getUsersById);
usersRoute.post('/', createUser);
module.exports = usersRoute;
