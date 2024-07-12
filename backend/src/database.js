const knex = require("knex");
const { database } = require("./config");

const db = knex({
  client: "mysql2",
  connection: database,
});

db.schema.hasTable("contacts").then(function (exists) {
  if (!exists) {
    return db.schema.createTable("contacts", function (t) {
      t.increments("id").primary();
      t.string("name", 100);
      t.string("email", 100);
      t.string("message", 1000);
      t.timestamps();
    });
  }
});

db.schema.hasTable("reviews").then(function (exists) {
  if (!exists) {
    return db.schema.createTable("reviews", function (t) {
      t.increments("id").primary();
      t.string("name", 100);
      t.integer("rating");
      t.string("review", 1000);
      t.timestamps();
    });
  }
});

db.schema.hasTable("appointments").then(function (exists) {
  if (!exists) {
    return db.schema.createTable("appointments", function (t) {
      t.increments("id").primary();
      t.string("name", 100);
      t.string("email", 100);
      t.string("service", 100);
      t.date("date");
      t.timestamps();
    });
  }
});

db.schema.hasTable("prices").then(function (exists) {
  if (!exists) {
    return db.schema.createTable("prices", function (t) {
      t.increments("id").primary();
      t.string("service", 100);
      t.decimal("price", 10, 2);
      t.timestamps();
    });
  }
});

// initialize the prices table

db("prices")
  .count("id as count")
  .then(function (rows) {
    if (rows[0].count === 0) {
      db("prices")
        .insert([
          { service: "cleaning", price: 100.0 },
          { service: "filling", price: 150.0 },
          { service: "extraction", price: 200.0 },
          { service: "root-canal", price: 500.0 },
          { service: "whitening", price: 300.0 },
        ])
        .then(function () {
          console.log("prices table initialized");
        });
    }
  });

module.exports = db;
