'use strict'
var replace = require('../replace')

var Definition = require('../definition')
var List = require('./list')

module.exports = new Definition(function (expr, rulesExpr) {
  var rules = (rulesExpr.head().def() === List)
    ? rulesExpr.args()
    : [rulesExpr]
  return replace(expr, rules)
})
