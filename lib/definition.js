'use strict'

var Expression = require('./expression')
var ApplicativeExpression = Expression.ApplicativeExpression
var SymbolExpression = Expression.Symbol

Definition.PROTECTED = {name: 'PROTECTED'}
Definition.LOCKED = {name: 'LOCKED'}
Definition.READ_PROTECTED = {name: 'READ_PROTECTED'}
Definition.FLAT = {name: 'FLAT'}
Definition.ONE_IDENTITY = {name: 'ONE_IDENTITY'}
Definition.ORDERLESS = {name: 'ORDERLESS'}
Definition.LISTABLE = {name: 'LISTABLE'}
Definition.NUMERIC = {name: 'NUMERIC'}
Definition.HOLD_FIRST = {name: 'HOLD_FIRST'}
Definition.HOLD_REST = {name: 'HOLD_REST'}
Definition.HOLD_ALL = {name: 'HOLD_ALL'}
Definition.HOLD_ALL_COMPLETE = {name: 'HOLD_ALL_COMPLETE'}

module.exports = Definition

function wrap (fn, definition) {
  return function run (operands) {
    if (fn) {
      var result = fn.apply(null, operands)
      if (result !== undefined) {
        if (!(result instanceof Expression)) {
          throw new Error('Definition implementation returned object which is not an expression.')
        }
        return result
      }
    }
    var symbol = new SymbolExpression(null, definition)
    return new ApplicativeExpression(symbol, operands)
  }
}

function Definition (fn, attributes) {
  if (fn) {
    this.run = wrap(fn)
  }
  this.attributes = attributes || []
  this.attributes.forEach(function (attrib, index) {
    if (!attrib) throw new Error('Invalid attribute at index: ' + index + '.')
  })
}

// TODO: this module needs to apply the above attribute rules during evaluation.

var symbolDefinition = Definition.Symbol = new Definition()

Expression.Symbol.terminalSymbol = new Expression.Symbol('Symbol', symbolDefinition)

/**
 * Get a symbol which is guaranteed to point to a definition
 * @return {Expression}
 */
Definition.prototype.symbol = function (context) {
  return makeSymbol(this, context)
}

Definition.prototype.has = function (attribute) {
  return this.attributes.indexOf(attribute) !== -1
}

function makeSymbol (definition, context) {
  return context.symbolForDefinition(this)
}
