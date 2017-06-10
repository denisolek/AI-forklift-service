var nlp = require('compromise')

var lexicon = {
'green': 'Color',
'red': 'Color',
'yellow': 'Color',
'white': 'Color',
'black': 'Color',
'orange': 'Color',
'white': 'Color',
'small': 'Size',
'medium': 'Size',
'big': 'Size',
'fruit': 'Type',
'fruits': 'Type',
'vegetable': 'Type',
'vegetables': 'Type',
'soft': 'Hardness',
'standard': 'Hardness',
'hard': 'Hardness',
}

function getItemFromSentence(sentence) {
  var nlpLexicon = nlp(sentence, lexicon)
  var nlpRegular = nlp(sentence)
  var nlpLexiconNouns = nlp(nlpRegular.nouns().toSingular().out('text'), lexicon)
  
  return {
    color: nlpLexicon.match('#Color').normalize().toLowerCase().out(),
    size: nlpLexicon.match('#Size').normalize().toLowerCase().out(),
    type: nlpLexiconNouns.match('#Type').normalize().toLowerCase().out(),
    hardness: nlpLexicon.match('#Hardness').normalize().toLowerCase().out()
  };
}

module.exports = {getItemFromSentence}
