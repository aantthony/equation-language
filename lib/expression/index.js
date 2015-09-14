'use strict'

// Probably the most important part of the codebase, the Expression type
// defines the structure of all objects.

var PROTO = '__proto__'

var inherits = require('util').inherits
exports = module.exports = Expression

// TODO: Should these be private?
exports.Symbol = SymbolExpression
exports.Expression = Expression
exports.SymbolExpression = SymbolExpression
exports.ApplicativeExpression = ApplicativeExpression
exports.ValueExpression = ValueExpression

function Expression (str) {
  throw new Error('Not implemented yet.')
}

Expression.fromString = require('./language')(
  Expression,
  SymbolExpression,
  ValueExpression,
  ApplicativeExpression
)

Expression.prototype.inspect =
Expression.prototype.dump = require('./print')(
  Expression,
  SymbolExpression,
  ValueExpression,
  ApplicativeExpression
)

/**
 * Get the the expression describing the construction of this expression.
 * @return {Expression}
 */
Expression.prototype.head = function () { return this._command }

Expression.prototype.args = function () { return [] }

Expression.prototype.atomic = function () { return false }

Expression.prototype.isEqual = function (other) {
  return this === other
}

// Only SymbolExpressions are associated with definitions
Expression.prototype.def = function () { return null }

Expression.prototype.apply = function () {
  return new ApplicativeExpression(this, arguments)
}

inherits(AtomExpression, Expression)
function AtomExpression () {
  throw new Error('Attempted to instantiate abstract class AtomExpression.')
}
AtomExpression.prototype.atomic = function () { return true }

inherits(ApplicativeExpression, Expression)
function ApplicativeExpression (command, args) {
  if (!command) throw Error('Missing command.')
  if (!args) throw Error('Missing args.')
  this._command = command
  this._args = [].slice.call(args)
}

ApplicativeExpression.prototype.args = function () {
  return this._args
}

ApplicativeExpression.prototype.at = function (index) {
  if (index === 0) return this._command
  return this._args[index - 1]
}

inherits(ValueExpression, AtomExpression)
function ValueExpression (command, value) {
  this._command = command
  this.value = value
}

inherits(SymbolExpression, AtomExpression)
function SymbolExpression (name, definition) {
  // Symbols are actually functions in that they can be invoked
  // as a short-hand to create expression trees:
  function symbolInstance () {
    return new ApplicativeExpression(symbolInstance, arguments)
  }

  symbolInstance._def = definition

  // symbolName is for debugging / printing statements only.
  // It should NOT imply any semantic quality.
  symbolInstance.symbolName = name

  // However, the fact that this is a *reference* to def
  // rather than def itself *is* does have meaning.

  symbolInstance[PROTO] = SymbolExpression.prototype

  return symbolInstance
}

SymbolExpression.prototype.def = function () {
  return this._def
}

SymbolExpression.prototype.head = function () {
  return SymbolExpression.terminalSymbol
}

SymbolExpression.prototype.isEqual = function (otherSymbol) {
  if (this === otherSymbol) return true
  if (this._def) return this._def === otherSymbol.def()
  return false
}
