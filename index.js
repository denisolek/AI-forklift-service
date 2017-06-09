var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const PORT = 3000;
var logger = require('morgan');
var waypoints = require('./waypoints');
var PF = require('pathfinding');
var dt = require('./decision-tree');
var nt = require('./neural-network');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var matrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

app.get('/neural', function(req, res) {
  function convertFruitToBinaryArray(text) {

    if(text == "TRUSKAWKI") {
      return [0, 0, 0, 0, 1];
    }
    if(text == "JABLKA") {
      return [0, 0, 0, 1, 0];
    }
    if(text == "BANANY") {
      return [0, 0, 1, 0, 0];
    }
    if(text == "WINOGRONA") {
      return [0, 1, 0, 0, 0];
    }
    if(text == "GRUSZKI") {
      return [1, 0, 0, 0, 0];
    }
  }

  var trainingData = [];
  trainingData.push({ input: convertFruitToBinaryArray("TRUSKAWKI"), output: [0,0,0,0,1] });
  trainingData.push({ input: convertFruitToBinaryArray("JABLKA"), output: [0,0,0, 1, 0] });
  trainingData.push({ input: convertFruitToBinaryArray("BANANY"), output: [0,0,1,0,0] });
  trainingData.push({ input: convertFruitToBinaryArray("WINOGRONA"), output: [0,1,0,0,0] });
  trainingData.push({ input: convertFruitToBinaryArray("GRUSZKI"), output: [1,0,0,0,0]});

console.log(trainingData);
  nt(trainingData, "TRUSKAWKI");

  res.send('hi');
});

app.get('/tree', function (req, res) {

  // Training set
  var data =
      [{person: 'Homer', hairLength: 0, weight: 250, age: 36, sex: 'male'},
       {person: 'Marge', hairLength: 10, weight: 150, age: 34, sex: 'female'},
       {person: 'Bart', hairLength: 2, weight: 90, age: 10, sex: 'male'},
       {person: 'Lisa', hairLength: 6, weight: 78, age: 8, sex: 'female'},
       {person: 'Maggie', hairLength: 4, weight: 20, age: 1, sex: 'female'},
       {person: 'Abe', hairLength: 1, weight: 170, age: 70, sex: 'male'},
       {person: 'Selma', hairLength: 8, weight: 160, age: 41, sex: 'female'},
       {person: 'Otto', hairLength: 10, weight: 180, age: 38, sex: 'male'},
       {person: 'Krusty', hairLength: 6, weight: 200, age: 45, sex: 'male'}];

/*
  NAME: [
    FRUITS: apple, lemon, banana, grape, strawberry, raspberry, peach, watermelon, coconout, orange
    VEGETABLES: cucumber, onion, garlic, carrot, cabbage, radish, pepper, broccoli, potato, pumpkin, mushroom
  ]
  COLOR: green, red, yellow, orange, black, brown, white,
  SIZE: small, medium, big
  TYPE: fruit, vegetable
  HARDNESS: soft, medium, hard
*/

  var fruits =
  [
    {name: 'apple', color: 'green', size: 'medium', type: 'fruit', hardness: 'medium'},
    {name: 'apple', color: 'red', size: 'medium', type: 'fruit', hardness: 'medium'},

    // {name: 'lemon', color: 'yellow', size: 'medium', type: 'fruit', hardness: 'medium'},

    {name: 'banana', color: 'yellow', size: 'medium', type: 'fruit', hardness: 'medium'},

    {name: 'grape', color: 'yellow', size: 'medium', type: 'fruit', hardness: 'medium'},

  ]

  // Configuration
  var config = {
      trainingSet: data,
      categoryAttr: 'sex',
      ignoredAttributes: ['person']
  };

  // Building Decision Tree
  var decisionTree = new dt.DecisionTree(config);

  // Testing Decision Tree and Random Forest
  var comic = {person: 'Comic guy', hairLength: 8, weight: 290, age: 38};

  var decisionTreePrediction = decisionTree.predict(comic);
  res.send(decisionTreePrediction);
});

app.post('/path', function (req, res) {
  var grid = new PF.Grid(matrix);
  var finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  });
  var gridBackup = grid.clone();
  var path = finder.findPath(1, 8, 12, 1, grid);

  var waypointPath = [];

  path.forEach(elem => {
    waypointPath.push({
      x: elem[0]*100+100,
      y: elem[1]*100+150
    })
  });

  waypointPath.push({
    wait: true,
    fruit: 'banana'
  });

  path.forEach(elem => {
    waypointPath.push({
      x: elem[0]*100+100,
      y: elem[1]*100+150
    })
  });

  res.send(waypointPath);
})

app.listen(PORT, function () {
  console.log('App listening on port ', PORT);
})
