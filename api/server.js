const express = require('express')
const server = express()
server.use(express.json())
const categoryRouter = require('./categories/categories-router')
const productRouter = require('./products/products-router')
server.use('/api/category', categoryRouter)
server.use('/api/product', productRouter)

module.exports = server