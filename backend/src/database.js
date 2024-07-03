const knex = require('knex');
const { database } = require('./config');

const db = knex({
  client: 'mysql2',
  connection: database,
});

db.schema.hasTable('contacts').then(function(exists) {
  if (!exists) {
    return db.schema.createTable('contacts', function(t) {
      t.increments('id').primary();
      t.string('name', 100);
      t.string('email', 100);
      t.string('message', 1000);
      t.timestamps();
    });
  }
});

db.schema.hasTable('reviews').then(function(exists) {
  if (!exists) {
    return db.schema.createTable('reviews', function(t) {
      t.increments('id').primary();
      t.string('name', 100);
      t.integer('rating');
      t.string('review', 1000);
      t.timestamps();
    });
  }
});

module.exports = db;
