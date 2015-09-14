'use strict'

var Definition = require('../definition')
var List = require('./list')
var True = require('./true')
var False = require('./false')
var match = require('../match')

function cast (bool) {
  return bool ? True.symbol() : False.symbol()
}

function isTruthy (expr) {
  if (!expr) return null
  var def = expr.def()
  if (def === True) return true
  if (def === False) return false
  return undefined
}

module.exports = new Definition(function (expr, rulesExpr, includePartial) {
  var includePartialB = isTruthy(includePartial)
  if (includePartialB === undefined) return
  if (rulesExpr.head().def() === List) {
    return cast(
      rulesExpr.args().some(function (rule) {
        return match(expr, rule, includePartialB || false)
      })
    )
  }

  return cast(match(expr, rulesExpr, includePartialB || false))
})
