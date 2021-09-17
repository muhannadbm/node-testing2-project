const express = require('express')
const categoryRouter = express.Router()
const Category = require('./categories-model')

categoryRouter.get('/', async(req,res)=> {
    let categories = await Category.getAll()
    res.status(200).json(categories)
})
categoryRouter.post('/', async(req,res)=> {
    let category = await Category.insert(req.body)
    res.status(200).json(category)
})

module.exports = categoryRouter