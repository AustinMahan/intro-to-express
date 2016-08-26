//requires the express node
var express = require('express');

//calls express function
var app = express();

//requires the groceries object
var groceries = require('./groceries');

//starts and listens to a server on port 8000
app.listen(8000, function () {
  console.log('LISTENING');
});

//checks if any gets at the root
app.get('/', function (request, response, next) {
  response.send('WHY YOU HITTIN ME');
});

//checks for gets on the /new route
app.get("/new", function (req, res) {
  res.send("Congratulations on creating a new route!");
});

//checks for gets on the vegetables route
app.get('/vegetables', function (req, res) {

  if (Object.keys(req.query).length > 0) {
    var search = req.query.search.toUpperCase()
    var out = groceries.vegetables.filter(function (veg) {
      veg = veg.toUpperCase()
      return veg.indexOf(search) == 0
    })
    res.send(out)
  }
  res.send(groceries.vegetables.join(', '));
});

app.get('/vegetables/:index', function (req, res) {
  var veggie = groceries.vegetables[req.params.index] || 'No vegetable found.'
  res.send(veggie);
});

app.get('/hello', function (req, res) {
  res.status(200).send(`hey ${req.query.friend}`);
});
