'use strict'

var Definition = require('../definition')
var ExpressionSymbol = require('../expression').Symbol
var ApplicativeExpression = require('../expression').ApplicativeExpression
var Plus = require('./plus')
var Times = require('./times')

function expandProduct (a, b) {
  var defA = a.head().def()
  var defB = b.head().def()
  if (defA === Plus && defB === Plus) {
    var terms = []
    a.args().forEach(function (termA) {
      return b.args().forEach(function (termB) {
        terms.push(
          new ApplicativeExpression(
            new ExpressionSymbol('Times', Times),
            [termA, termB]
          )
        )
      })
    })

    return new ApplicativeExpression(
      new ExpressionSymbol('Plus', Plus),
      terms
    )
  } else if (defA === Plus) {
    return new ApplicativeExpression(
      new ExpressionSymbol('Plus', Plus),
      a.args().map(function (arg) {
        return new ApplicativeExpression(
          new ExpressionSymbol('Times', Times),
          [arg, b]
        )
      })
    )
  } else if (defB === Plus) {
    return expandProduct(b, a)
  }

  return new ApplicativeExpression(
    new ExpressionSymbol('Times', Times),
    [a, b]
  )
}

// \x x //. a_*(b_+c_) :> a.b + c.d
module.exports = new Definition(function (expr) {
  if (expr.atomic()) return expr
  var hd = expr.head().def()
  if (hd === Times) {
    var factors = expr.args().map(module.exports)
    while (factors.length > 1) {
      var a = factors[factors.length - 2]
      var b = factors[factors.length - 1]
      // merge the last two factors:
      factors[factors.length - 2] = expandProduct(a, b)
      factors.length--
    }

    return factors[0]
  }

  return new ApplicativeExpression(
    expr.head(),
    expr.args().map(module.exports)
  )
})
