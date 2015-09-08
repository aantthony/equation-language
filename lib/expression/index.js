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

Expression.prototype.atomic = function () {return false }

Expression.prototype.isEqual = function (other) {
  // Really shouldn't rely on this behaviour
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
AtomExpression.prototype.atomic = function () {return true }
AtomExpression.prototype.eval = function () {
  return this
}

inherits(ApplicativeExpression, Expression)
function ApplicativeExpression (command, args) {
  if (!command) throw Error('Missing command.')
  if (!args) throw Error('Missing args.')
  this._command = command
  this._args = [].slice.call(args)
}

ApplicativeExpression.prototype.eval = function () {
  var existingHead = this.head()
  var head = existingHead.eval()
  if (head instanceof SymbolExpression) {
    var headDef = this.head().def()
    if (headDef) {
      if (headDef.run) {
        return headDef.run(this._args)
      }
    }
  }
  return new ApplicativeExpression(head, this._args.map(function (argument) {
    return argument.eval()
  }))
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
  function instance () {
    return new ApplicativeExpression(instance, arguments)
  }

  instance._def = definition

  // symbolName is for debugging / printing statements only.
  // It should NOT imply any semantic quality.
  instance.symbolName = name

  // However, the fact that this is a *reference* to def
  // rather than def itself *is* does have meaning.

  instance[PROTO] = SymbolExpression.prototype

  return instance
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
