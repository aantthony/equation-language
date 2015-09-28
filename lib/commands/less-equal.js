'use strict'

var Definition = require('../definition')
var Real = require('./real')
var ENegativeInfinity = require('./negative-infinity')
var EInfinity = require('./infinity')
var EBoolean = require('./boolean')

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
  if (a.head().def() === Real && b.head().def() === Real) {
    // TODO: implement in Real
    return new EBoolean(Number(a._value) <= Number(b._value))
  }
})
