var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const PORT = 3000;
var logger = require('morgan');
var waypoints = require('./waypoints');
var PF = require('pathfinding');
var brain = require('brain');
var getItemName = require('./getItemName');
var matrix = require('./matrix');
var getPath = require('./getPath');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/brain', function (req, res) {
  var net = new brain.NeuralNetwork();

  /*
    1 - truskawki
    2 - jablka
    3 - banany
    4 - winogrona
    5 - gruszki
  */
  net.train([
            //   {input: { truskawki: 0, jablka: 0, banany: 0, winogrona: 0, gruszki: 0 }, output: { 1: 1 }},
            //   {input: { truskawki: 0, jablka: 0, banany: 0, winogrona: 0, gruszki: 0 }, output: { 2: 1 }},
            //   {input: { truskawki: 0, jablka: 0, banany: 0, winogrona: 0, gruszki: 0 }, output: { 3: 1 }},
            //   {input: { truskawki: 0, jablka: 0, banany: 0, winogrona: 0, gruszki: 0 }, output: { 4: 1 }},
            //   {input: { truskawki: 0, jablka: 0, banany: 0, winogrona: 0, gruszki: 0 }, output: { 5: 1 }},
            //
            //  {input: { truskawki: 1, jablka: 0, banany: 0, winogrona: 0, gruszki: 0 }, output: { 1: 1 }},
            //  {input: { truskawki: 0, jablka: 0, banany: 1, winogrona: 0, gruszki: 0 }, output: { 1: 1 }},
            // //  {input: {truskawki: 0, jablka: 1, banany: 0, winogrona: 0, gruszki: 0 }, output: { 2: 1 }},
            //  {input: { truskawki: 0, jablka: 0, banany: 1, winogrona: 0, gruszki: 0 }, output: { 3: 1 }},
            // //  {input: { truskawki: 0, jablka: 0, banany: 0, winogrona: 1, gruszki: 0 }, output: { 4: 1 }},
            // //  {input: {truskawki: 0, jablka: 0, banany: 0, winogrona: 0, gruszki: 1 }, output: { 5: 1 }}

           ],{
      errorThresh: 0.005,  // error threshold to reach
      iterations: 20000,   // maximum training iterations
      log: true,           // console.log() progress periodically
      logPeriod: 10,       // number of iterations between logging
      learningRate: 0.3    // learning rate
});

  // var output = net.run({ truskawki: 0, jablka: 0, banany: 1, winogrona: 0, gruszki: 0 });  // { white: 0.99, black: 0.002 }
  var output = net.run({ item:[0,0,1,0,0] });  // { white: 0.99, black: 0.002 }

  res.send(output);
});

app.get('/tree', function (req, res) {
  var item = {color: 'red', hardness: 'soft', size: 'small'};
  res.send(getItemName(item));
});

app.post('/path', function (req, res) {
  res.send(getPath());
})

app.listen(PORT, function () {
  console.log('App listening on port ', PORT);
})
