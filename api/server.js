const express = require('express')
const server = express()
server.use(express.json())
const categoryRouter = require('./categories/categories-router')
server.use('/api/category', categoryRouter)

module.exports = server