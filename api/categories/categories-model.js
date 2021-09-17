const db = require('../../data/db-config')

async function getAll(){
    return await db('categories')
}

async function getById(id){
return await db('categories').where("category_id", id).first()
}

async function insert(category){

    let id = await db('categories').insert(category)
    return await getById(id)
    }

    async function del(category){
        return await db('categories').del().where("category_id", category.category_id)
    }
async function update(category){
    return await db('categories').update(category).where("category_id", category.category_id)
}

    






module.exports = {getAll, getById,update,insert,del}