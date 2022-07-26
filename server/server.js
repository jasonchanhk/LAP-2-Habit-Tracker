const express = require('express')
const cors = require("cors")

const app = express()

app.use(express.json());
app.use(cors("*"));

const habits = require('./controllers/habits')

app.use('/habits', habits)

app.get('/:id', (req, res) => {
    setInterval(() => {
        console.log(`5 seconds pass${req.params.id}`)
    }, 5000)
    res.json({ message: 'Welcome to Team 3 server!'})
})

module.exports = app
