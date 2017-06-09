var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var getItemName = require('./getItemName');
var matrix = require('./matrix');
var getPath = require('./getPath');
var stock = require('./chooseStock');
var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/path', function (req, res) {
  res.send(getPath());
})

app.get('/test', function (req, res) {
  var item = {color: 'red', hardness: 'soft', size: 'small'};
  var name = getItemName(item);
  stock.addToArray(name, stock.arr.indexOf(name));
  stock.getMostPossible(stock.getTargetStock(name));
});

app.listen(3000, function () {
  console.log('App listening on port ', 3000);
})
