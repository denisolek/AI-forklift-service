var brain = require('brain');
var arr = [
  'apple',
  'lemon',
  'banana',
  'grape',
  'strawberry',
  'peach',
  'watermelon',
  'coconout',
  'orange',
  'cucumber',
  'onion',
  'garlic',
  'carrot',
  'cabbage',
  'radish',
  'pepper',
  'broccoli',
  'potato',
  'pumpkin',
  'mushroom',
];

var dataArray = setDefaultDestination();

function getTargetStock(targetItem) {
  var net = new brain.NeuralNetwork();
  net.train(dataArray ,{
      errorThresh: 0.005,
      iterations: 20000,
      log: false,
      logPeriod: 10,
      learningRate: 0.3
  });
  return net.run(Object.assign(createObject(arr), {[targetItem]: 1}));
}

function setDefaultDestination() {
    var result = [];
    arr.map(function (element, index) {
      result.push({input: createObject(arr), output: { [index]: 1 }})
    });
    return result;
}

function createObject(arr) {
  var object = {};
  arr.map(function(el) {
    Object.assign(object, {[el]: 0});
  });
  return object;
}

function addToArray(name, stockId) {
  dataArray.push({input: Object.assign(createObject(arr), {[name]: 1}), output: { [stockId]: 1 }});
}

function getMostPossible(percentages) {
  var highestValue = 0;
  var highestKey;
  Object.keys(percentages).map(function(elem) {
    console.log(percentages[elem]);
    if (highestValue < percentages[elem]) {
      highestValue = percentages[elem];
      highestKey = elem;
    }
  });
  return highestKey;
}

module.exports = {getTargetStock, setDefaultDestination, createObject, addToArray, arr, getMostPossible}
