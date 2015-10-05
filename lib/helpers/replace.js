'use strict'

var match = require('./match')

var Expression = require('../expression')
var ESymbol = require('../commands/symbol')

/**
 * Perform replacement on found match
 * @param  {Expression} expr
 * @param  {SymbolMap} matchResult
 * @return {[type]}             [description]
 */
function instantiateResults (expr, matchResult) {
  if (expr.atomic()) {
    if (expr.head().def() === ESymbol) {
      return matchResult.get(expr) || expr
    }
    return expr
  }
  var newHead = instantiateResults(expr.head(), matchResult)
  var newArgs = expr.args().map(function (arg) {
    return instantiateResults(arg, matchResult)
  })
  return new Expression(newHead, newArgs)
}

/**
 * Applies rules to expression
 * @param  {Expression} expression
 * @param  {[Rule | RuleDelayed]} rules
 * @return {Expression}
 */
module.exports = function replace (expression, rules, repeated) {
  if (!Array.isArray(rules)) throw new Error('replace() expects an array of rules.')
  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i]
    var pattern = rule.at(1)
    if (!pattern) return
    var matchResult = match(expression, pattern, true)

    var sub = rule.at(2)

    if (matchResult) {
      // console.log('matchResult', matchResult)
      var pre = matchResult[match.PRE]
      var post = matchResult[match.POST]

      var res = instantiateResults(sub, matchResult)

      if (pre && pre.length) {
        res = new Expression(
          expression.head(),
          pre
          .concat([res])
          .concat(post)
        )
      }
      if (repeated) return replace(res, rules, true)
      return res
    }
  }
  return expression
}
