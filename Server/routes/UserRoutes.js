const express = require('express');
const route = express.Router();

const {
  handelPostSaveUser,
  handelGetAllUsers,
  handelGetUserById,
  handelUpdateUserById,
  handelDeleteUserById,
} = require('../controller/UserController.js');

route.route("/")
  .get(handelGetAllUsers)
  .post(handelPostSaveUser);

route.route("/:id")
  .get(handelGetUserById)
  .patch(handelUpdateUserById)
  .delete(handelDeleteUserById);

module.exports = { route };
