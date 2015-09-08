'use strict'

/**
 * Pattern matching
 */

var Expression = require('./expression')
var SymbolExpression = Expression.Symbol
var ValueExpression = Expression.ValueExpression

var Pattern = require('./commands/pattern')
var Symbol = require('./commands/symbol')
var Blank = require('./commands/blank')
var BlankSequence = require('./commands/blank-sequence')

function merge (target, object) {
  Object.keys(object).forEach(function (key) {
    target[key] = object[key]
  })
  return target
}

module.exports = function (expression, pattern) {
  return match(expression, pattern, {})
}

function match (expression, pattern, scope) {
  if (!(expression instanceof Expression)) throw new Error('Expected an expression')
  if (!scope) throw new Error('Scope missing!')

  if (pattern.atomic()) {
    if (pattern === expression) return scope
    if (expression.head() === pattern.head()) {
      if (expression instanceof SymbolExpression) {
        return pattern.symbolName === expression.symbolName ? scope : null
      }
      if (expression instanceof ValueExpression) {
        return pattern.value === expression.value ? scope : null
      }
    }
    return pattern === expression ? scope : null
  }

  var head = pattern.head()
  var headD = head.def()

  if (headD === Pattern) {
    var symbol = pattern.at(1)
    if (symbol.head().def() !== Symbol) {
      throw new Error('Invalid argument in expression Pattern[x,...]: x must be a symbol.')
    }
    var existing = scope[symbol.symbolName]
    if (existing) {
      if (!match(expression, existing, scope)) {
        return
      }
      return match(expression, pattern.at(2), scope)
    } else {
      scope[symbol.symbolName] = expression
    }
    return match(expression, pattern.at(2), scope)
  }

  if (headD === Blank) return scope
  if (headD === BlankSequence) {
    if (expression.head() === pattern.at(1)) {
      return scope
    }
  }

  if (expression.head().isEqual(head)) {
    var eargs = expression.args()
    var pargs = pattern.args()
    if (eargs.length !== pargs.length) return
    var joined = {}
    for (var i = 0; i < eargs.length; i++) {
      var earg = eargs[i]
      var parg = pargs[i]
      var m = match(earg, parg, scope)
      if (m) {
        joined = merge(joined, m)
      } else {
        return
      }
    }
    return joined
  }
}
