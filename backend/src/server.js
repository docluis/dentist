const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const database = require("./database");

// Appi
const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/version", function(req, res, next) {
  database.raw('select VERSION() version')
    .then(([rows, columns]) => rows[0])
    .then((row) => res.json({ message: `Hello from MySQL ${row.version}` }))
    .catch(next);
});

app.get("/healthz", function(req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

app.post('/contact', function(req, res, next) {
  const { name, email, message } = req.body;
  database('contacts')
    .insert({ name, email, message, created_at: new Date(), updated_at: new Date() })
    .then(() => res.status(201).send('Contact information saved'))
    .catch(next);
});


// Get the n most recent Reviews
app.get("/reviews", function(req, res, next) {
  const n = req.query.n || 5;
  database('reviews')
    .select('*')
    .orderBy('created_at', 'desc')
    .limit(n)
    .then((reviews) => res.json(reviews))
    .catch(next);
});

// Post a Review
app.post("/reviews", function(req, res, next) {
  const { name, rating, review } = req.body;
  database('reviews')
    .insert({ name, rating, review, created_at: new Date(), updated_at: new Date() })
    .then(() => res.status(201).send('Review saved'))
    .catch(next);
});

// Book an Appointment
app.post("/book-appointment", function(req, res, next) {
  const { name, email, service, date } = req.body;
  database('appointments')
    .insert({ name, email, service, date, created_at: new Date(), updated_at: new Date() })
    .then(() => res.status(201).send('Appointment saved'))
    .catch(next);
});

// Inquire Service Price
app.get("/inquire-price", function(req, res, next) {
  const { service } = req.query;
  database('prices')
    .where('service', service)
    .select('price')
    .then(([row]) => {
      if (row) {
        res.json({ price: row.price });
      } else {
        res.status(404).send('Service not found');
      }
    })
    .catch(next);
});


// Get Tooth Market Location (just print the device location for now)
app.post("/toothmarket_location", function(req, res) {
  console.log(req.body.device_location);
  res.json({ message: "Location received" });
});

module.exports = app;
