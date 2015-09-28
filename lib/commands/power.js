'use strict'

var Definition = require('../definition')
var Equal = require('./equal')
var True = require('./true')
var Real = require('./real')
module.exports = new Definition(function (x, y) {
  if (arguments.length !== 2) return
  var zero = new Real(0)
  var one = new Real(1)
  if (new Equal(x, one).def() === True) {
    return x
  }
  if (new Equal(x, zero).def() === True) {
    if (new Equal(y, zero).def() === True) return
    return x
  }
  if (new Equal(y, zero).def() === True) {
    return new Real(1)
  }
  if (new Equal(y, one).def() === True) {
    return x
  }
  if (x.head().def() === Real && y.head().def() === Real) {
    // return new Real(Math.pow(x._value, y._value))
  }
}, [
  Definition.NUMERIC
])

module.exports.javascript = Math.pow
