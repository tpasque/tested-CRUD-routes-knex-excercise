
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table){
   table.increments();
   table.string('movie_id');
   table.string('author');
   table.integer('rating');
 });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};

// fill in column names and datatypes
// do again for movies
// knex migrate:latest --env development
