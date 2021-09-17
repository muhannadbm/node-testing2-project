const db = require('../../data/db-config')

async function getAll(){
    return await db('products')
}

async function getById(id){
return await db('products').where("product_id", id).first()
}

async function insert(product){
    let id = await db('products').insert(product)
    return await getById(id)
    }

async function del(product){
    return await db('products').del().where("product_id", product.product_id)
}

async function update(product){
    return await db('products').update(product).where("product_id", product.id)
}

    






module.exports = {getAll, getById,update,insert, del}