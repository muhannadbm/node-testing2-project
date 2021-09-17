const express = require('express')
const categoryRouter = express.Router()
const Category = require('./categories-model')

categoryRouter.get('/', async(req,res)=> {
    let categories = await Category.getAll()
    res.status(200).json(categories)
})
categoryRouter.post('/', async(req,res)=> {
    if(!req.body.name) return res.status(422).end()
    let category = await Category.insert(req.body)
    res.status(200).json(category)
})

categoryRouter.delete('/', async(req,res)=> {
    let id = await Category.del(req.body)
    res.status(200).json([id])
})

module.exports = categoryRouter