'use strict'
var ApplicativeExpression = require('./expression').ApplicativeExpression

var replace = require('./replace')

module.exports = function replaceAll (expression, rules) {
  if (!Array.isArray(rules)) {
    throw new Error('replaceAll expects an array of rules.')
  }
  if (expression.atomic()) return replace(expression, rules)
  var head = replaceAll(expression.head(), rules)
  var newArgs = expression.args().map(function (arg) {
    return replaceAll(arg, rules)
  })
  return replace(new ApplicativeExpression(head, newArgs), rules)
}
