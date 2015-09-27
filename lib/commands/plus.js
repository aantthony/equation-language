'use strict'

var Expression = require('../expression')
var Definition = require('../definition')
var ATTR = Definition.Attribute

var Equal = require('./equal')
var Real = require('./real')
var True = require('./true')
var Times = require('./times')

function argumentsAllSame (args) {
  for (var i = 0; i < args.length; i++) {
    if (new Equal(args[0], args[i]).def() !== True) return false
  }
  return true
}

module.exports = new Definition(function () {
  var zero = new Real(0)
  var args
  if (!arguments.length) return zero
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i]
    // TODO: collect Real terms
    // console.log('ise', arg.dump())
    var ise = new Equal(zero, arg)
    if (ise.def() === True) {
      if (!args) args = [].slice.call(arguments, 0, i)
    } else {
      if (args) args.push(arguments[i])
    }
  }

  var a = args || arguments
  if (a.length === 0) return zero
  if (a.length === 1) return a[0]

  if (argumentsAllSame(a)) {
    return new Expression(
      Times.symbol(),
      [
        new Real(a.length),
        a[0]
      ]
    ).eval()
  }

  if (args) {
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
