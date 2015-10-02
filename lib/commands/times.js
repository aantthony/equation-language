'use strict'

var Expression = require('../expression')
var Definition = require('../definition')
var ATTR = Definition.Attribute

var Equal = require('./equal')
var Real = require('./real')
var True = require('./true')
var Less = require('./less')
var EInfinity = require('./infinity')
var ENegativeInfinity = require('./negative-infinity')
var Power = require('./power')
var FiniteQ = require('./finite-q')
var Indeterminate = require('./indeterminate')

function addReals (reals) {
  var sum = 1
  reals.forEach(function (r) {
    sum *= Number(r._value)
  })
  return new Real(sum)
}

module.exports = new Definition(function () {
  var one = new Real(1)
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
    return new Power(expr, new Real(counts[j]))
  })

  if (reals.length) {
    var realsResult = addReals(reals)
    if (new Equal(realsResult, new Real(0)).def() === True) {
      var otherFactors = new Expression(module.exports.symbol(), args)
      return new FiniteQ(otherFactors).apply(new Real(0), Indeterminate.symbol())
    }
    if (new Equal(realsResult, one).def() !== True) {
      args.push(realsResult)
    }
  }

  if (args.length === 0) return one
  if (args.length === 1) return args[0]
  if (args.length === arguments.length) {
    if (args.length === 2) {
      if (args[0].def() === EInfinity) {
        return new Expression(
          new Less(args[1], new Real(0)),
          [ENegativeInfinity.symbol(), args[0]]
        )
      }
      if (args[0].def() === ENegativeInfinity) {
        return new Less(args[1], new Real(0)).apply(args[0], EInfinity.symbol())
      }
    }
    return
  }

  return new Expression(module.exports.symbol(), args)
}, [
  ATTR.FLAT,
  ATTR.NUMERIC,
  ATTR.ONE_IDENTITY,
  ATTR.ORDERLESS
])

module.exports.getDefaultValue = function () {
  return new Real(1)
}
