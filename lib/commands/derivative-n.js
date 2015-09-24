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
var EArguments = require('./arguments')
var ESymbol = require('./symbol')
var IntegerQ = require('./integer-q')

var Mod = require('./mod')

var Equal = require('./equal')
var True = require('./true')
var False = require('./false')

function isNEqual (expr, n) {
  var res = new Equal(expr, new Real(n))
  if (res.def() === True) return true
}

function getMod (expr, m) {
  var res = new Mod(expr, new Real(m))
  if (res.head().def() === Real) return Number(res._value)
}

function castToFunction (expr) {
  if (expr.head().def() === EFunction) {
    return expr
  }
}

function derivativeWRT (expr, x) {
  if (expr === x) return new Real(1)
  if (expr.head().def() === Real) return new Real(0)
  console.log('derivativeWRT', expr, x)
  var hd = expr.head().def()
  if (hd) {
    if (hd === Plus) {
      return new Expression(
        expr.head(),
        expr.args().map(function (arg) {
          return derivativeWRT(arg, x)
        })
      ).eval()
    }
  }
  return new Expression(
    module.exports.symbol(),
    [
      new List(new Real(1)),
      new EFunction(x, expr)
    ]
  )
}

module.exports = new Definition(function (nths, expr) {
  if (!nths) return
  if (nths.head().def() !== List) return

  if (nths.args().every(function (arg) {
    return isNEqual(arg, 0)
  })) {
    return expr
  }

  if (nths.args().some(function (arg) {
    var isInt = new IntegerQ(arg)
    if (isInt.def() === False) return true
  })) {
    return
  }
  // TODO: need a better way
  if (expr._derivativePlaceholder) return
  var ed = expr.def()
  if (!ed) {
    var fn = castToFunction(expr)
    if (fn) {
      var res = derivativeWRT(fn.args()[1], fn.args()[0])
      return new EFunction(fn.args()[0], res)
    }
    return
  }
  var firstN = nths.args()[0]
  if (!firstN) return
  if (firstN.head().def() !== Real) {
    return
  }
  if (nths.args().length === 1) {
    if (ed.has(Definition.ONE_IDENTITY)) return expr
  }
  if (ed === Sin) {
    var n = getMod(firstN, 4)
    if (n === 0) return expr
    if (n === 1) return Cos.symbol()
    if (n === 2) return new Times(new Real(-1), expr)
    if (n === 3) return new Times(new Real(-1), Cos.symbol())
  }
  if (ed === Cos) {
    var n = getMod(firstN, 4)
    if (n === 0) return expr
    if (n === 1) return new Times(new Real(-1), Sin.symbol())
    if (n === 2) return new Times(new Real(-1), expr)
    if (n === 3) return Sin.symbol()
  }
  if (ed === Power) {
    var x = new ESymbol('x')
    var y = new ESymbol('y')
    return new EFunction(new EArguments(x, y))
  }
})
