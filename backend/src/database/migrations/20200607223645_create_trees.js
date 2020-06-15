
exports.up = function(knex) {
  return knex.schema.createTable('trees', function (trees){
    trees.string('family_name').notNullable();
    trees.increments('id').primary();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('trees');
};
