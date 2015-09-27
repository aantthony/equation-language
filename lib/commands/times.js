'use strict'

var Expression = require('../expression')
var Definition = require('../definition')
var Equal = require('./equal')
var Real = require('./real')
var True = require('./true')
var Power = require('./power')

function argumentsAllSame (args) {
  for (var i = 0; i < args.length; i++) {
    if (new Equal(args[0], args[i]).def() !== True) return false
  }
  return true
}

module.exports = new Definition(function () {
  var zero = new Real(0)
  var one = new Real(1)

  function isEqual (expr, real2) {
    var ise = new Equal(expr, real2)
    return ise.def() === True
  }

  var newArgs
  if (!arguments.length) return one
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i]
    if (isEqual(arg, zero)) return zero
    if (isEqual(arg, one)) {
      if (!newArgs) {
        newArgs = [].slice.call(arguments, 0, i)
        continue
      }
    } else {
      if (newArgs) newArgs.push(arg)
    }
  }

  var args = newArgs || arguments

  if (args.length === 0) return one
  if (args.length === 1) return newArgs[0]

  if (args.length && argumentsAllSame(args)) {
    return new Power(args[0], new Real(args.length))
  }

  if (newArgs) {
    // TODO: -> Power
    return new Expression(
      module.exports.symbol(),
      newArgs
    )
  }
}, [
  Definition.FLAT,
  Definition.NUMERIC,
  Definition.ONE_IDENTITY,
  Definition.ORDERLESS
])

module.exports.getDefaultValue = function () {
  return new Real(1)
}
