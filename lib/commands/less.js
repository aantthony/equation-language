'use strict'

var Definition = require('../definition')
var Real = require('./real')
var ENegativeInfinity = require('./negative-infinity')
var EInfinity = require('./infinity')
var EBoolean = require('./boolean')

var E = require('./e')
var Pi = require('./pi')

function getMockComparisonValue (x) {
  if (x.head().def() === Real) {
    return x._value
  }
  if (x.def() === Pi) return Math.PI
  if (x.def() === E) return Math.E
}

module.exports = new Definition(function (a, b) {
  if (arguments.length !== 2) return
  if (a.def() === ENegativeInfinity) {
    return new EBoolean(true)
  }
  if (a.def() === EInfinity) {
    return new EBoolean(false)
  }
  if (b.def() === ENegativeInfinity) {
    return new EBoolean(false)
  }
  if (b.def() === EInfinity) {
    return new EBoolean(true)
  }
  var x = getMockComparisonValue(a)
  if (!x) return
  var y = getMockComparisonValue(b)
  if (!y) return

  return new EBoolean(Number(x) < Number(y))
})
