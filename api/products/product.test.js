const request = require('supertest')
const server = require('../server')
const db = require('../../data/db-config')
const Product = require('./products-model')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})

describe('products Model', () => {
    describe('Add Product', () => {
        beforeEach(async () => {
          await db.migrate.rollback()
          await db.migrate.latest()
        })
        test('products are added to database', async () => {
          let expected = {name: "Cake"}
            let input = await Product.insert({name: "Cake",product_id: 1})
          expect(input).toMatchObject(expected)
          let input2 = await db("products")
          let expected2 = [{name: "Cake", product_id: 1}]
          expect(input2).toMatchObject(expected2)
        })
        test('products are added to database even when no product_id is passed', async () => {
            await Product.insert({name: "Cake"})
            let input2 = await db("products")
            let expected2 = [{name: "Cake", product_id: 1}]
            expect(input2).toMatchObject(expected2)
          })
          test('resolves to the newly created product', async () => {
            let expected = {name: "Cake",product_id: 1}
            let input = await Product.insert({name: "Cake",product_id: 1})
          expect(input).toMatchObject(expected)
        })

        describe("Delete product", () => {
            test('products are deleted in database', async () => {
                let empty= await db("products")
                expect(empty).toEqual([])
                await Product.insert({name: "Cake"})
                let input2 = await db("products")
                let expected2 = [{name: "Cake", product_id: 1}]
                expect(input2).toMatchObject(expected2)
                await Product.del({name: "Cake", product_id: 1})
                expect(empty).toEqual([])
              })

            test('resolves to the deleted product id', async () => {
                let product = await Product.insert({name: "Cake"})
                let expected_id = product.product_id
               let id = await Product.del({name: "Cake", product_id: expected_id})
                expect(id).toEqual(expected_id)
            })
        })
      
    })

})

