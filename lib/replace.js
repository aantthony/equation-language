'use strict'

var match = require('./match')

var Expression = require('./expression')
var SymbolExpression = Expression.Symbol
var ApplicativeExpression = Expression.ApplicativeExpression

function instantiateResults (haystack, matchResult) {
  if (haystack.atomic()) {
    if (haystack instanceof SymbolExpression) {
      if (matchResult[haystack.symbolName]) return matchResult[haystack.symbolName]
    }
    return haystack
  }
  var newHead = instantiateResults(haystack.head(), matchResult)
  var newArgs = haystack.args().map(function (arg) {
    return instantiateResults(arg, matchResult)
  })
  return new ApplicativeExpression(newHead, newArgs)
}

/**
 * Applies rules to expression
 * @param  {Expression} expression
 * @param  {[Rule | RuleDelayed]} rules
 * @return {Expression}
 */
module.exports = function replace (expression, rules) {
  if (!Array.isArray(rules)) throw new Error('replace() expects an array of rules.')
  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i]
    var pattern = rule.at(1)
    var m = match(expression, pattern)

    var sub = rule.at(2)

    if (m) return instantiateResults(sub, m)
  }
  return expression
}
