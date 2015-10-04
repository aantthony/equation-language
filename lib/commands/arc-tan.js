'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

var match = require('../helpers/match')

module.exports = new Definition(function (x, y) {
  if (y) return atan2(x, y)
  if (x) return atan(x)
}, [Definition.NUMERIC])

module.exports.javascript = function (x, y) {
  if (y !== undefined) return Math.atan2(y, x)
  return Math.atan(x)
}

var Power = require('./power')
var Times = require('./times')
var Plus = require('./plus')
var Real = require('./real')

var EInfintiy = require('./infinity')

function atan (x) {
  if (match(x, new Real(0))) {
    return x
  }
  if (x.def() === EInfintiy) return x
}

var Less = require('./less')
var Greater = require('./greater')
var Pi = require('./pi')
var Equal = require('./equal')
var Indeterminate = require('./indeterminate')

function atan2 (x, y) {
  var a = new Expression(function () {
    return module.exports(new Times(y, new Power(x, new Real(-1))))
  })
  var zero = new Real(0)
  return new Greater(x, zero).apply(
    a,
    new Equal(x, zero).apply(
      new Equal(y, zero).apply(
        Indeterminate.symbol(),
        new Less(y, zero).apply(
          new Times(new Real('-0.5'), Pi.symbol()),
          new Times(new Real('0.5'), Pi.symbol())
        )
      ),
      new Less(y, zero).apply(
        new Plus(a, new Times(new Real(-1), Pi.symbol())),
        new Plus(a, Pi.symbol())
      )
    )
  )
}
