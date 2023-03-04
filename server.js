const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

//connecting to db
mongoose.connect(process.env.MONGO_STRING)
mongoose.Promise = global.Promise;

//app
const app = express()

//Parsers
app.use(express.json())
app.use(express.urlencoded())

//routers
const usersRoute = require('./routes/userRoutes') 
const jobsRoute = require('./routes/jobRoutes')
const companyRoute = require('./routes/companyRoutes')
app.use('/users', usersRoute)
app.use('/jobs', jobsRoute)
app.use('/companies', companyRoute)


const PORT = process.env.PORT

//middleware
app.use('/', (req, res, next) => {
    console.log(req.path, req.method)
    next()
})


app.listen(PORT, () => {
    console.log("AAAAAAAAAA running on port ", PORT);
})