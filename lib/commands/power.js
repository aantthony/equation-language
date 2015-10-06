'use strict'

var Definition = require('../definition')
var Real = require('./real')
var match = require('../helpers/match')
var Less = require('./less')
var Indeterminate = require('./indeterminate')
var IntegerQ = require('./integer-q')
var True = require('./true')
module.exports = new Definition(function (x, y) {
  if (arguments.length !== 2) return
  var zero = new Real(0)
  var one = new Real(1)
  if (match(x, one)) {
    return x
  }
  if (match(x, zero)) {
    return Less(y, zero).apply(
      Indeterminate.symbol(),
      x
    )
  }
  if (match(y, zero)) {
    return new Real(1)
  }
  if (match(y, one)) {
    return x
  }
  if (x.head().def() === Real && y.head().def() === Real) {
    if (new IntegerQ(y).def() === True) {
      if (new Less(zero, y).def() === True) {
        return new Real(Math.pow(x._value, y._value))
      }
    }
  }
}, [
  Definition.NUMERIC
])

module.exports.javascript = Math.pow
