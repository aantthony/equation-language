'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

var List = require('./list')

var Real = require('./real')

var Sin = require('./sin')
var Cos = require('./cos')
var Tan = require('./tan')
var Power = require('./power')
var Times = require('./times')
var Plus = require('./plus')
var Dot = require('./dot')
var EFunction = require('./function')
var ESymbol = require('./symbol')

var Equal = require('./equal')
var True = require('./true')

function isNEqual (expr, n) {
  var res = new Equal(expr, new Real(n))
  if (res.def() === True) return true
}

function getRealParts (n) {
  var parts = n._value.split('.')
  parts[0] = parts[0].replace(/^0+/, '')
  parts[1] = (parts[1] || '').replace(/0+$/, '')
  return parts
}

function mod (a, b) {
  var base = 10
  for (var i = 0; i < a.length; i++) {
    var c= a[i.length - 1 - i]
  }
}

function getMod (expr, m) {
  var parts = getRealParts(expr)
  var str = parts[0]
  return mod(str, String(m))
  // var current = 0
  // var x = 0
  // base = 10
  // for (var i = str.length - 1; i >= 0; i++) {
  //   var c = str[i]
  //   // x += base^i * c
  //   // x += (base^i * c % m)
  //   // x += (base^i)
  // }
  // return current
}

var NthDerivative = new Definition(function (nths, expr) {
  if (!nths) return
  if (nths.head().def() !== List) return
  var hd = expr.def()
  if (!hd) return
  var firstN = nths.args()[0]
  if (!firstN) return
  if (firstN.head().def() !== Real) {
    return
  }
  if (hd === Sin) {
    var n = getMod(firstN, 4)
    if (n === 0) return expr
    if (n === 1) return Cos
    if (n === 2) return new Times(new Real(-1), expr)
    if (n === 3) return new Times(new Real(-1), Cos.def('Cos'))
  }
  if (hd === Cos) {
    var n = getMod(firstN, 4)
    if (n === 0) return expr
    if (n === 1) return new Times(new Real(-1), Sin.def('Sin'))
    if (n === 2) return new Times(new Real(-1), expr)
    if (n === 3) return Sin
  }
  if (hd === Power) {
    var x = new ESymbol('x')
    var y = new ESymbol('y')
    return new EFunction(new EArguments())
  }
})

NthDerivative.symbolName = 'Derivative$$NthDerivative'

function listFromArray (array) {
  return new Expression(
    List.symbol('List'),
    array
  )
}

module.exports = new Definition(function () {
  var list = listFromArray([].slice.call(arguments))
  var fn = new ESymbol('fn')
  return new EFunction(fn, new NthDerivative(list, fn))
})
