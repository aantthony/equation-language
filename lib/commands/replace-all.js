'use strict'
var replaceAll = require('../helpers/replace-all')
var Definition = require('../definition')
var List = require('./list')

module.exports = new Definition(function (expr, rulesExpr) {
  if (!expr || !rulesExpr) return
  var rules = (rulesExpr.head().def() === List)
    ? rulesExpr.args()
    : [rulesExpr]
  return replaceAll(expr, rules, false).eval()
})
