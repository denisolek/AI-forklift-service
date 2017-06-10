var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var treeOperations = require('./treeOperations');
var getPath = require('./getPath');
var stock = require('./chooseStock');
var sentenceParser = require('./sentenceParser');
let STARTING_POINT = 20;
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

app.post('/route', function (req, res) {
  var item = sentenceParser.getItemFromSentence(req.body.text);
  var name = treeOperations.getItemName(item)['item'];

  var isCorrectStock = false;
  var route = [];
  var targetStock = stock.getTargetStock(name);
  var currentPosition = STARTING_POINT;
  var mostPossibleStock;

  while (!isCorrectStock) {
    mostPossibleStock = stock.getMostPossible(targetStock)
    console.log(mostPossibleStock['key']);
    console.log(mostPossibleStock['probability']);
    if (treeOperations.isCorrectStock(name, mostPossibleStock['key'])) {
      stock.addToArray(name, stock.arr.indexOf(name));
      stock.removeFromArray(name, stock.arr.indexOf(name));
      isCorrectStock = true;
   }

   delete targetStock[mostPossibleStock['key']];
   route.push({path: getPath(currentPosition, mostPossibleStock['key']), targetStock: mostPossibleStock['key'], probability: mostPossibleStock['probability']});
   currentPosition = mostPossibleStock['key'];
  }
  route.push({path: getPath(currentPosition, STARTING_POINT), targetStock: 'starting point'});
  res.send({route, name, htmlTree: treeOperations.getItemName(item)['htmlTree']});
});

app.listen(3000, function () {
  console.log('App listening on port ', 3000);
})
