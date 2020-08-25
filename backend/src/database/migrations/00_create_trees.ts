import Knex from "knex";

exports.up = function(knex : Knex) {
  return knex.schema.createTable('trees', function (trees){
    trees.string('family_name').notNullable();
    trees.increments('id').primary();
  });
};

exports.down = function(knex : Knex) {
  return knex.schema.dropTable('trees');
};
