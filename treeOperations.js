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

function treeToHtml(tree) {
    // only leafs containing category
    if (tree.category) {
        return  ['<ul>',
                    '<li>',
                        '<a href="#">',
                            '<b>', tree.category, '</b>',
                        '</a>',
                    '</li>',
                 '</ul>'].join('');
    }

    return  ['<ul>',
                '<li>',
                    '<a href="#">',
                        '<b>', tree.attribute, ' ', tree.predicateName, ' ', tree.pivot, ' ?</b>',
                    '</a>',
                    '<ul>',
                        '<li>',
                            '<a href="#">yes</a>',
                            treeToHtml(tree.match),
                        '</li>',
                        '<li>',
                            '<a href="#">no</a>',
                            treeToHtml(tree.notMatch),
                        '</li>',
                    '</ul>',
                '</li>',
             '</ul>'].join('');
}

function getItemName(item) {
  var config = {
      trainingSet: dtDataset,
      categoryAttr: 'name',
      ignoredAttributes: ['stockId']
  };

  var decisionTree = new dt.DecisionTree(config);
  return {
      item: decisionTree.predict(item),
      htmlTree: treeToHtml(decisionTree.root)
  }
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
