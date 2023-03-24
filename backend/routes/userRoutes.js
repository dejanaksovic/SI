const express = require('express')
const router = express.Router();
const {getUsers, createUser, deleteUser, updateUser, loginUser} = require('../controllers/usersController')

//validation
const tokenValidation = require('../middleware/tokenVerify')
const {adminValidation} = require('../middleware/usersV')

//@ GET /users
//returns users or specified user with an id
//[ADMIN, BOSS]
router.get('/:id?',tokenValidation, adminValidation, getUsers)

//@POST /users
//creates a new user
//[ADMIN]
router.post('/',tokenValidation, adminValidation, createUser)

//@PUT /users
//updates the user with the given id
//[ADMIN]
router.put('/:id',tokenValidation, adminValidation, updateUser)

//@DELETE /users
//deletes the user with the given id
//[ADMIN]
router.delete('/:id',tokenValidation, adminValidation, deleteUser)

//@POST /users/login
//logs in the user and responds with jwt
//[]
router.post("/login", loginUser)

module.exports = router