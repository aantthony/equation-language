'use strict'

var Definition = require('../definition')
var List = require('./list')
var True = require('./true')
var False = require('./false')
var match = require('../match')

function cast (bool) {
  return bool ? True.symbol() : False.symbol()
}
module.exports = new Definition(function (expr, rulesExpr) {
  if (rulesExpr.head().def() === List) {
    return cast(
      rulesExpr.args().some(function (rule) {
        return match(expr, rule)
      })
    )
  }

  return cast(match(expr, rulesExpr))
})
