const request = require('supertest')
const server = require('./server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})


describe('[get] /api/category', () => {
    let res
    beforeEach(async () => {
      res = await request(server).get('/api/category')
    })
    test('responds with a 200 OK', async () => {
      expect(res.status).toBe(200)
    })
  })
  describe('[post] /api/category', () => {
      beforeEach(async () => {
          await db.migrate.rollback()
          await db.migrate.latest()
        })
    test('responds with the new category', async () => {
      const res = await request(server)
        .post('/api/category')
        .send({ name: 'test' })
      expect(res.body).toMatchObject({ category_id: 1, name: 'test' })
    }, 600)
    test('responds with a 422 on missing name', async () => {
      const res = await request(server)
        .post('/api/category')
        .send({ nam: 'wrong name' })
      expect(res.status).toBe(422)
    }, 600)
  })
  describe('[delete] /api/category', () => {
      test('resolved to deleted category id', async () => {
      let id =await db("categories").insert({ name: 'test2' })
      let category = await db("categories").where("category_id", id).first()
        const res = await request(server)
          .delete('/api/category')
          .send(category)
        expect(res.body).toEqual(id)
      }, 600)
      test('Delete Category from Database', async () => {
          let id =await db("categories").insert({ name: 'test2' })
  
          let category = await db("categories").where("category_id", id).first()
        const res = await request(server)
          .delete('/api/category')
          .send(category)
          let all = await db("categories")
        expect(all).toEqual([])
      }, 600)
    })



  describe('[get] /api/product', () => {
    let res
    beforeEach(async () => {
      res = await request(server).get('/api/product')
    })
    test('responds with a 200 OK', async () => {
      expect(res.status).toBe(200)
    })
  })
  describe('[post] /api/product', () => {
      beforeEach(async () => {
          await db.migrate.rollback()
          await db.migrate.latest()
        })
    test('responds with the new product', async () => {
      const res = await request(server)
        .post('/api/product')
        .send({ name: 'test' })
      expect(res.body).toMatchObject({ product_id: 1, name: 'test' })
    }, 600)
    test('responds with a 422 on missing name', async () => {
      const res = await request(server)
        .post('/api/product')
        .send({ nam: 'wrong name' })
      expect(res.status).toBe(422)
    }, 600)
  })
  describe('[delete] /api/product', () => {
      test('resolved to deleted product id', async () => {
      let id =await db("products").insert({ name: 'test2' })
      let product = await db("products").where("product_id", id).first()
        const res = await request(server)
          .delete('/api/product')
          .send(product)
        expect(res.body).toEqual(id)
      }, 600)
      test('Delete product from Database', async () => {
          let id =await db("products").insert({ name: 'test2' })
  
          let product = await db("products").where("product_id", id).first()
        const res = await request(server)
          .delete('/api/product')
          .send(product)
          let all = await db("products")
        expect(all).toEqual([])
      }, 600)
    })