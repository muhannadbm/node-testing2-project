const express = require('express')
const productRouter = express.Router()
const Product = require('./products-model')

productRouter.get('/', async(req,res)=> {
    let products = await Product.getAll()
    res.status(200).json(products)
})
productRouter.post('/', async(req,res)=> {
    if(!req.body.name) return res.status(422).end()
    let product = await Product.insert(req.body)
    res.status(200).json(product)
})

productRouter.delete('/', async(req,res)=> {
    let id = await Product.del(req.body)
    res.status(200).json([id])
})

module.exports = productRouter