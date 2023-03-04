const express = require('express')

//app
const app = express()
const PORT = process.env.PORT

//middleware
app.use('/', (req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.status(200).json({

        message:"A"
    });
})

app.listen(3000, () => {
    console.log("AAAAAAAAAA");
})