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

function match (expression, pattern, partial, parentScope) {
  if (!(expression instanceof Expression)) throw new Error('Expected an expression')
  if (!parentScope) throw new Error('Scope missing!')

  if (pattern.atomic()) {
    if (pattern === expression) return parentScope
    if (expression.head() === pattern.head()) {
      if (expression instanceof SymbolExpression) {
        return pattern.symbolName === expression.symbolName ? parentScope : null
      }
      if (expression instanceof ValueExpression) {
        return pattern.value === expression.value ? parentScope : null
      }
    }
    return pattern === expression ? parentScope : null
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
      var existing = parentScope[symbol.symbolName]
      if (existing) {
        if (!match(expression, existing, partial, parentScope)) {
          return
        }
        return match(expression, pattern.at(2), partial, parentScope)
      }
      var ss = subScope(parentScope)
      ss[symbol.symbolName] = expression
      return match(expression, pattern.at(2), partial, ss)
    }

    if (headD === Blank) return parentScope
    if (headD === BlankSequence) {
      if (expression.head() === pattern.at(1)) {
        return parentScope
      }
    }
    if (headD === Optional) {
      return match(expression, pattern.at(1), partial, parentScope)
    }
  }

  if (expression.head().isEqual(head)) {
    if (attrSet && attrSet.has(Definition.ORDERLESS)) {
      if (attrSet.has(Definition.FLAT) && partial) {
        return orderlessMatch(expression, pattern, parentScope)
      }
      return orderlessFullMatch(expression, pattern, parentScope)
    } else if (attrSet && attrSet.has(Definition.FLAT) && partial) {
      return orderedAdjacentSubMatch(expression, pattern, parentScope)
    }

    return orderedFullMatch(expression, pattern, parentScope)
  }
  if (headD) {
    if (attrSet.has(Definition.ONE_IDENTITY)) {
      var expr2 = new ApplicativeExpression(pattern.head(), [expression])
      return orderlessMatch(expr2, pattern, parentScope)
    }
  }
}

// function isExpandible (pattern) {
//   var hd = pattern.head().def()
//   if (!hd) {
//     return false
//   }
//   if (hd === Blank) return true
//   if (hd === Optional) return isExpandible(pattern.args()[0])
//   if (hd === Pattern) return isExpandible(pattern.args()[1])
//   return false
// }

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
 * Brings the required patterns to the front
 *
 * @param  {[type]} pattern [description]
 * @param  {[type]} ordered [description]
 * @return {[type]}         [description]
 */
function requiredFirst (pattern, ordered) {
  if (ordered) return pattern.args().slice(0)
  return pattern.args().slice(0).sort(function (a, b) {
    if (optionalSymbol(a)) return 1
    return -1
  })
}

/**
 * Expression full matches the full pattern in order
 */
function orderedFullMatch (expression, pattern, parentScope) {
  var eargs = expression.args()
  var pargs = requiredFirst(pattern, true)
  var joined = subScope(parentScope)
  for (var i = 0; i < pargs.length; i++) {
    var earg = eargs[i]
    var parg = pargs[i]
    var m = earg && match(earg, parg, false, joined)
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
function orderedAdjacentSubMatch (expression, pattern, parentScope) {
  var eargs = expression.args()
  var pargs = requiredFirst(pattern, true)
  for (var i = 0; i < eargs.length; i++) {
    var joined = subScope(parentScope)
    var foundMismatch = false
    for (var j = 0; j < pargs.length; j++) {
      var parg = pargs[j]
      var earg = eargs[i + j]
      if (!earg) {
        // Could instead use 'break' here but since j is strictly decreasing in maxarg j eargs[i + j] for nondecreasing i
        // it will not match afterwards
        return
      }
      var m = match(earg, parg, false, joined)
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

function subScope (parentScope) {
  return Object.create(parentScope)
}

/**
 * Expression contains a permutation of the pattern
 */
function orderlessMatch (expression, pattern, parentScope) {
  // console.log('orderless exprrrr:', expression.dump())
  // console.log('orderless pattern:', pattern.dump())

  var eargs = expression.args()
  var pargs = requiredFirst(pattern, false)
  var joined = subScope(parentScope)
  var alreadyUsed = []
  for (var j = 0; j < pargs.length; j++) {
    var parg = pargs[j]
    var foundMatch = false
    // console.log('testing', parg)
    for (var i = 0; i < eargs.length; i++) {
      // console.log('i', i)
      if (alreadyUsed.indexOf(i) !== -1) continue
      var earg = eargs[i]
      // console.log('test', earg.dump(), parg.dump(), joined)
      var m = match(earg, parg, false, joined)
      // console.log('->test', earg.dump(), parg.dump(), !!m)
      if (m) {
        joined = merge(joined, m)
        foundMatch = true
        alreadyUsed.push(i)
        break
      }
    }
    if (!foundMatch) {
      // console.log('no match: ', parg)
      // TODO: perhaps it should be greedy instead of lazy?
      // TODO: This is very complicated. Maybe leave this for now.
      // var prevArg = pargs[j-1]
      // if (prevArg && isExpandible(prevArg)) {
      //
      // }
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
  var pargs = requiredFirst(pattern, false)
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
