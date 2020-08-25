import Knex from "knex";

exports.up = function(knex : Knex) {
  return knex.schema.createTable('persons', function (persons){
    persons.increments('id_person').primary();
    persons.integer('tree_id').notNullable();
    persons.foreign('tree_id').references('id').inTable('trees');
    persons.string('person_name').notNullable();
    persons.date('person_birthdate').notNullable();
    persons.integer('id_parents').nullable();
    persons.integer('id_relation').nullable();
  });
};

exports.down = function(knex : Knex) {
  return knex.schema.dropTable('persons');
};