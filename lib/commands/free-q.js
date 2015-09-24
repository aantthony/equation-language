'use strict'

var Definition = require('../definition')

// var NUMERIC = Definition.NUMERIC

var True = require('./true')
var False = require('./false')

function cast (bool) {
  return bool ? True.symbol() : False.symbol()
}

function isSameAtomicSymbol (a, b) {
  var ad = a.def()
  if (ad && ad === b.def()) return true
  return a === b
}

function freeQ (expr, x) {
  if (isSameAtomicSymbol(expr, x)) return false
  return expr.args().every(function (arg) {
    return freeQ(arg, x)
  })
}

module.exports = new Definition(function (expr, x) {
  return cast(freeQ(expr, x))
})
