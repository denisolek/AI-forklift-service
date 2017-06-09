var synaptic = require('synaptic');

module.exports = function(trainingData, itemName) {

  var myDeepNetwork = new synaptic.Architect.Perceptron( 5, 20, 5 );


  var myTrainer = new synaptic.Trainer(myDeepNetwork);
  myTrainer.train(trainingData, {
      rate: 0.1,
      iterations: 100000,
      shuffle: true
  });


  var cFruits = convertFruitToBinaryArray(itemName);
  var recommendations = myDeepNetwork.activate(cFruits);

  console.log("GRUSZKI: " + (recommendations[0] * 100).toFixed() + "%");
  console.log("WINOGRONA: " + (recommendations[1] * 100).toFixed() + "%");
  console.log("BANANY: " + (recommendations[2] * 100).toFixed() + "%");
  console.log("JABLKA: " + (recommendations[3] * 100).toFixed() + "%");
  console.log("TRUSKAWKI: " + (recommendations[3] * 100).toFixed() + "%");
}





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
