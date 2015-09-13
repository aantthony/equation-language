'use strict'

/**
 * Pattern matching
 */

var Expression = require('./expression')
var SymbolExpression = Expression.Symbol
var ValueExpression = Expression.ValueExpression
var ApplicativeExpression = Expression.ApplicativeExpression

var Pattern = require('./commands/pattern')
var Symbol = require('./commands/symbol')
var Blank = require('./commands/blank')
var BlankSequence = require('./commands/blank-sequence')
var Optional = require('./commands/optional')
var Definition = require('./definition')

var PRE = '__pre__'
var POST = '__post__'

function merge (target, object) {
  Object.keys(object).forEach(function (key) {
    target[key] = object[key]
  })
  return target
}

module.exports = function (expression, pattern, partial) {
  return match(expression, pattern, partial || false, {})
}

module.exports.PRE = PRE
module.exports.POST = POST

function match (expression, pattern, partial, scope) {
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
  var attrSet = headD

  if (headD) {
    if (headD === Pattern) {
      var symbol = pattern.at(1)
      if (symbol.head().def() !== Symbol) {
        throw new Error('Invalid argument in expression Pattern[x,...]: x must be a symbol.')
      }
      var existing = scope[symbol.symbolName]
      if (existing) {
        if (!match(expression, existing, true, scope)) {
          return
        }
        return match(expression, pattern.at(2), true, scope)
      } else {
        scope[symbol.symbolName] = expression
      }
      return match(expression, pattern.at(2), true, scope)
    }

    if (headD === Blank) return scope
    if (headD === BlankSequence) {
      if (expression.head() === pattern.at(1)) {
        return scope
      }
    }
    if (headD === Optional) {
      return match(expression, pattern.at(1), true, scope)
    }
  }

  if (expression.head().isEqual(head)) {
    if (attrSet && attrSet.has(Definition.ORDERLESS)) {
      if (attrSet.has(Definition.FLAT) && partial) {
        return orderlessMatch(expression, pattern, scope)
      }
      return orderlessFullMatch(expression, pattern, scope)
    } else if (attrSet && attrSet.has(Definition.FLAT) && partial) {
      return orderedAdjacentSubMatch(expression, pattern, scope)
    }

    return orderedFullMatch(expression, pattern, scope)
  }
  if (headD) {
    if (attrSet.has(Definition.ONE_IDENTITY)) {
      var expr2 = new ApplicativeExpression(pattern.head(), [expression])
      return orderedFullMatch(expr2, pattern, scope)
    }
  }
}

function optionalSymbol (pattern, symbol) {
  var hd = pattern.head().def()
  if (!hd) {
    return false
  }
  if (hd === Optional) {
    return symbol
  }
  var pargs = pattern.args()
  if (hd === Pattern) return optionalSymbol(pargs[1], pargs[0])
  return false
}

function getDefaultValue (def) {
  if (!def) return
  if (def.getDefaultValue) {
    return def.getDefaultValue()
  }
}

/**
 * Expression full matches the full pattern in order
 */
function orderedFullMatch (expression, pattern, scope) {
  var eargs = expression.args()
  var pargs = pattern.args().slice(0).sort(function (a, b) {
    if (optionalSymbol(a)) return 1
    return -1
  })
  var joined = {}
  for (var i = 0; i < pargs.length; i++) {
    var earg = eargs[i]
    var parg = pargs[i]
    var m = earg && match(earg, parg, false, scope)
    if (m) {
      joined = merge(joined, m)
    } else {
      var optSymbol = optionalSymbol(parg)
      if (optSymbol) {
        var head = expression.head()
        var defaultValue = getDefaultValue(head.def())
        if (defaultValue) {
          joined[optSymbol.symbolName] = defaultValue
        } else {
          return
        }
      } else {
        return
      }
    }
  }
  return joined
}

/**
 * Expression contains the pattern
 */
function orderedAdjacentSubMatch (expression, pattern, scope) {
  var eargs = expression.args()
  var pargs = pattern.args()
  for (var i = 0; i < eargs.length; i++) {
    var joined = {}
    var foundMismatch = false
    for (var j = 0; j < pargs.length; j++) {
      var parg = pargs[j]
      var earg = eargs[i + j]
      if (!earg) {
        // Could instead use 'break' here but since j is strictly decreasing in maxarg j eargs[i + j] for nondecreasing i
        // it will not match afterwards
        return
      }
      var m = match(earg, parg, false, scope)
      if (m) {
        joined = merge(joined, m)
      } else {
        foundMismatch = true
        break
      }
    }
    if (!foundMismatch) {
      joined[PRE] = eargs.slice(0, i)
      joined[POST] = eargs.slice(i + pargs.length)
      return joined
    }
  }
}

/**
 * Expression contains a permutation of the pattern
 */
function orderlessMatch (expression, pattern, scope) {
  var eargs = expression.args()
  var pargs = pattern.args()
  var joined = {}
  var alreadyUsed = []
  for (var j = 0; j < pargs.length; j++) {
    var parg = pargs[j]
    var foundMatch = false
    for (var i = 0; i < eargs.length; i++) {
      if (alreadyUsed.indexOf(i) !== -1) continue
      var earg = eargs[i]
      var m = match(earg, parg, false, scope)
      if (m) {
        joined = merge(joined, m)
        foundMatch = true
        alreadyUsed.push(i)
        break
      }
    }
    if (!foundMatch) return
  }
  joined[PRE] = eargs.filter(function (earg, i) {
    return alreadyUsed.indexOf(i) === -1
  })
  joined[POST] = []
  return joined
}

/**
 * Expression is a permutation of the pattern
 */
function orderlessFullMatch (expression, pattern, scope) {
  var eargs = expression.args()
  var pargs = pattern.args()
  if (eargs.length !== pargs.length) return
  var joined = {}
  var needsMatch = pargs.slice(0)
  for (var i = 0; i < eargs.length; i++) {
    var earg = eargs[i]
    var foundMatchForI = false
    for (var j = 0; j < needsMatch.length; j++) {
      var parg = needsMatch[j]
      var m = match(earg, parg, false, scope)
      if (m) {
        joined = merge(joined, m)
        foundMatchForI = true
        break
      }
    }
    if (!foundMatchForI) return
  }
  return joined
}
