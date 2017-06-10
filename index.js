var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var getItemName = require('./getItemName');
var getPath = require('./getPath');
var stock = require('./chooseStock');
var sentenceParser = require('./sentenceParser');
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

app.post('/test', function (req, res) {
  var item = sentenceParser.getItemFromSentence(req.body.text);
  var name = getItemName(item);
  stock.addToArray(name, stock.arr.indexOf(name));
  var targetStock = stock.getMostPossible(stock.getTargetStock(name));
  res.send({path: getPath(targetStock), name});
});

app.listen(3000, function () {
  console.log('App listening on port ', 3000);
})
