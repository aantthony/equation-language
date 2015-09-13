'use strict'

var Expression = require('./expression')
var ApplicativeExpression = Expression.ApplicativeExpression
var SymbolExpression = Expression.Symbol

var Attribute = require('./attribute')
for (var i in Attribute) {
  Definition[i] = Attribute[i]
}

var PROTO = '__proto__'

module.exports = Definition

function wrap (fn, definition) {
  return function run (operands) {
    var result = fn.apply(null, operands)
    if (result !== undefined) {
      if (!(result instanceof Expression)) {
        throw new Error('Definition implementation returned object which is not an expression.')
      }
      return result
    }
    var symbol = makeSymbol(definition)
    return new ApplicativeExpression(symbol, [].slice.call(operands))
  }
}

function Definition (fn, attributes) {
  if (fn) {
    apply.run = wrap(fn, apply)
  }
  apply.attributes = attributes || []
  apply.attributes.forEach(function (attrib, index) {
    if (!attrib) throw new Error('Invalid attribute at index: ' + index + '.')
  })

  apply[PROTO] = Definition.prototype
  apply.apply = Function.prototype.apply

  return apply

  function apply () {
    if (apply.run) return apply.run(arguments)
    var symbol = apply.symbol()
    return new ApplicativeExpression(symbol, [].slice.call(arguments))
  }
}

// TODO: this module needs to apply the above attribute rules during evaluation.

var symbolDefinition = Definition.Symbol = new Definition()

Expression.Symbol.terminalSymbol = new Expression.Symbol('Symbol', symbolDefinition)

/**
 * Get a symbol which is guaranteed to point to a definition
 * @return {Expression}
 */
Definition.prototype.symbol = function () {
  return makeSymbol(this)
}

Definition.prototype.has = function (attribute) {
  return this.attributes.indexOf(attribute) !== -1
}

function makeSymbol (definition) {
  return new SymbolExpression(definition.symbolName || null, definition)
}
