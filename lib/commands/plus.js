'use strict'

var Expression = require('../expression')
var Definition = require('../definition')
var ATTR = Definition.Attribute

var Equal = require('./equal')
var Real = require('./real')
var True = require('./true')

module.exports = new Definition(function () {
  var zero = new Real(0)
  var args
  for (var i = 0; i < arguments.length; i++) {
    var ise = new Equal(zero, arguments[i])
    if (ise.def() === True) {
      if (!args) args = [].slice.call(arguments, 0, i)
    } else {
      if (args) args.push(arguments[i])
    }
  }

  if (args) {
    if (args.length === 1) return args[0]
    return new Expression(
      module.exports.symbol(),
      args
    )
  }
}, [
  ATTR.FLAT,
  ATTR.NUMERIC,
  ATTR.ONE_IDENTITY,
  ATTR.ORDERLESS
])

var SymbolExpression = require('../expression').Symbol
var ValueExpression = require('../expression').ValueExpression

module.exports.getDefaultValue = function () {
  var symbolReal = new SymbolExpression('Real', Real)
  return new ValueExpression(symbolReal, '0')
}
