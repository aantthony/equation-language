
var Expression = require('../expression')
var Definition = require('../definition')
var EFunction = require('./function')
var ESymbol = require('./symbol')
var List = require('./list')

var DerivativeN = require('./derivative-n')

function listFromArray (array) {
  return new Expression(
    List.symbol('List'),
    array
  )
}

module.exports = new Definition(function () {
  var list = listFromArray([].slice.call(arguments))
  var fn = new ESymbol('fn')
  fn._derivativePlaceholder = true
  return new EFunction(fn, new DerivativeN(list, fn))
})
