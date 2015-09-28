'use strict'

var Expression = require('../expression')
var Definition = require('../definition')
var ATTR = Definition.Attribute

var Equal = require('./equal')
var Real = require('./real')
var True = require('./true')
var Times = require('./times')

function addReals (reals) {
  var sum = 0
  reals.forEach(function (r) {
    sum += Number(r._value)
  })
  return new Real(sum)
}

module.exports = new Definition(function () {
  var zero = new Real(0)
  var reals = []
  var exprs = []
  var counts = []
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i]
    if (arg.head().def() === Real) {
      reals.push(arg)
      continue
    }
    if (exprs.some(function (alreadySeen, j) {
      if (new Equal(alreadySeen, arg).def() === True) {
        counts[j]++
        return true
      }
    })) {
      continue
    }
    exprs.push(arg)
    counts.push(1)
  }

  var args = exprs.map(function (expr, j) {
    if (counts[j] === 1) return expr
    return new Times(expr, new Real(counts[j]))
  })

  if (reals.length) args.push(addReals(reals))

  if (args.length === 0) return zero
  if (args.length === 1) return args[0]

  if (args.length === arguments.length) {
    var oargs = arguments
    if (args.every(function (arg, i) {
      return arg === oargs[i]
    })) {
      // TODO: should this be detected by eval?
      // Not changed
      return
    }
  }
  return new Expression(module.exports.symbol(), args)
}, [
  ATTR.FLAT,
  ATTR.NUMERIC,
  ATTR.ONE_IDENTITY,
  ATTR.ORDERLESS
])

module.exports.getDefaultValue = function () {
  return new Real(0)
}
