'use strict'

var Definition = require('../definition')
var SymbolExpression = require('../expression').Symbol

// var NUMERIC = Definition.NUMERIC

var True = require('./true')
var False = require('./false')

function cast (bool) {
  return bool ? SymbolExpression('True', True) : SymbolExpression('False', False)
}

function isSameAtomicSymbol (a, b) {
  if (a instanceof SymbolExpression && b instanceof SymbolExpression) {
    var ad = a.def()
    if (ad && ad === b.def()) return true
    return a.symbolName === b.symbolName
  }
  return false
}

function freeQ (expr, x) {
  if (isSameAtomicSymbol(expr, x)) return true
  return expr.args().every(function (arg) {
    return freeQ(arg, x)
  })
}

module.exports = new Definition(function (expr, x) {
  return cast(freeQ(expr, x))
})
