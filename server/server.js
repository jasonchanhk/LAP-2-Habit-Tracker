const express = require('express')
const app = express()

app.get('/', (req, res) => res.json({ message: 'Welcome to Team 3 server!'}))

module.exports = app
