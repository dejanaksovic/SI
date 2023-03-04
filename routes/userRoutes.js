const express = require('express')
const router = express.Router();

const {getUsers, createUser, deleteUser, updateUser} = require('../controllers/usersController')

router.get('/:id?', getUsers)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router