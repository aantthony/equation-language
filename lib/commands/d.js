var Expression = require('../expression')
var Definition = require('../definition')

var Real = require('./real')
var List = require('./list')
var EFunction = require('./function')

var DerivativeN = require('./derivative-n')

module.exports = new Definition(function (y, x) {
  var fn = new DerivativeN(
    new List(new Real(1)),
    new EFunction(x, y)
  )
  return new Expression(fn, [x]).eval()
})
