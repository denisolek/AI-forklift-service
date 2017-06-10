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

var dataArray = [];

function getTargetStock(targetItem) {
  if (dataArray.length == 0)
    dataArray = setDefaultDestination();

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

function removeFromArray(name, stockId) {
  var elementToRemove = dataArray.find((elem) => {
    if(elem.input[name] === 0 && elem.output[stockId] === 1) {
      return elem;
    }
  });
  var indexRemovedElement = dataArray.indexOf(elementToRemove);
  dataArray.splice(indexRemovedElement, 1);
}

function getMostPossible(percentages) {
  var highestValue = 0;
  var highestKey;
  Object.keys(percentages).map(function(elem) {
    if (highestValue < percentages[elem]) {
      highestValue = percentages[elem];
      highestKey = elem;
    }
  });
  return {
    key: highestKey,
    probability: highestValue
  }
}

module.exports = {getTargetStock, setDefaultDestination, createObject, addToArray, arr, getMostPossible, removeFromArray}
