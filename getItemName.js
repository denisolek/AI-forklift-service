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

module.exports = function(item) {
  var config = {
      trainingSet: dtDataset,
      categoryAttr: 'name'
  };

  var decisionTree = new dt.DecisionTree(config);
  return decisionTree.predict(item);
};
