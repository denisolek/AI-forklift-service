/*
  NAME: [
    FRUITS: apple, lemon, banana, grape, strawberry, peach, watermelon, coconout, orange
    VEGETABLES: cucumber, onion, garlic, carrot, cabbage, radish, pepper, broccoli, potato, pumpkin, mushroom
  ]
  COLOR: green, red, yellow, orange, black, brown, white,
  SIZE: small, medium, big
  TYPE: fruit, vegetable
  HARDNESS: soft, medium, hard
*/
var dtDataset = require('./dtDataset');
var dt = require('./decision-tree');

function getItemName(item) {
  var config = {
      trainingSet: dtDataset,
      categoryAttr: 'name',
      ignoredAttributes: ['stockId']
  };

  var decisionTree = new dt.DecisionTree(config);
  return decisionTree.predict(item);
};

function isCorrectStock(name, stockId) {
  var config = {
    trainingSet: dtDataset,
    categoryAttr: 'stockId',
    ignoredAttributes: ['color', 'size', 'type', 'hardness']
  }

  var decisionTree = new dt.DecisionTree(config);
  if (stockId == parseInt(decisionTree.predict({name: name}))) {
    return true;
  } else {
    return false;
  }
}

module.exports = {getItemName, isCorrectStock}
