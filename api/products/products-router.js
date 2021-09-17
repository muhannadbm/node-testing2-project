const express = require('express')
const productRouter = express.Router()
const Product = require('./products-model')

productRouter.get('/', async(req,res)=> {
    let products = await Product.getAll()
    res.status(200).json(products)
})

module.exports = productRouter