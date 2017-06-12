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
'vegetable': 'Type',
'soft': 'Hardness',
'standard': 'Hardness',
'hard': 'Hardness',
}

function getItemFromSentence(sentence) {
  var nlpLexicon = nlp(sentence, lexicon)
  var nlpLexiconNouns = nlp(nlp(sentence).nouns().toSingular().out('text'), lexicon)

  var itemType = nlpLexicon.match('#Type').normalize().toLowerCase().out();

  if (!itemType) {
    itemType = nlpLexiconNouns.match('#Type').normalize().toLowerCase().out()
  }

  return {
    color: nlpLexicon.match('#Color').normalize().toLowerCase().out(),
    size: nlpLexicon.match('#Size').normalize().toLowerCase().out(),
    type: itemType,
    hardness: nlpLexicon.match('#Hardness').normalize().toLowerCase().out()
  };
}

module.exports = {getItemFromSentence}
