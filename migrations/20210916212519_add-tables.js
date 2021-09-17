
exports.up = function(knex) {
  return knex.schema
  .createTable("categories", table => {
      table.increments('category_id')
      table.string('name').unique().notNullable()
  })
  .createTable("products", table => {
      table.increments('product_id')
      table.string("name")
      table.integer("category_id")
      .references("category_id")
      .inTable("categories")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
  })
}

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("products")
    .dropTableIfExists("categories")
}
