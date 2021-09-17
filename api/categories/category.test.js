const request = require('supertest')
const server = require('../server')
const db = require('../../data/db-config')
const Category = require('./categories-model')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})

describe('Categories Model', () => {
    describe('Add Categroy', () => {
        beforeEach(async () => {
          await db.migrate.rollback()
          await db.migrate.latest()
        })
        test('categories are added to database', async () => {
          let expected = {name: "Seasonal"}
            let input = await Category.insert({name: "Seasonal",category_id: 1})
          expect(input).toMatchObject(expected)
          let input2 = await db("categories")
          let expected2 = [{name: "Seasonal", category_id: 1}]
          expect(input2).toMatchObject(expected2)
        })
        test('categories are added to database even when no category_id is passed', async () => {
            await Category.insert({name: "Seasonal"})
            let input2 = await db("categories")
            let expected2 = [{name: "Seasonal", category_id: 1}]
            expect(input2).toMatchObject(expected2)
          })
          test('resolves to the newly created category', async () => {
            let expected = {name: "Seasonal",category_id: 1}
            let input = await Category.insert({name: "Seasonal",category_id: 1})
          expect(input).toMatchObject(expected)
        })

        describe("Delete Category", () => {
            test('categories are deleted in database', async () => {
                let empty= await db("categories")
                expect(empty).toEqual([])
                await Category.insert({name: "Seasonal"})
                let input2 = await db("categories")
                let expected2 = [{name: "Seasonal", category_id: 1}]
                expect(input2).toMatchObject(expected2)
                await Category.del({name: "Seasonal", category_id: 1})
                expect(empty).toEqual([])
              })

            test('resolves to the deleted category id', async () => {
                let category = await Category.insert({name: "Seasonal"})
                let expected_id = category.category_id
               let id = await Category.del({name: "Seasonal", category_id: expected_id})
                expect(id).toEqual(expected_id)
            })
        })
      
    })

})

