var inherits = require('util').inherits

module.exports = Expression

function Expression (head, args, def) {
  if (Array.isArray(args)) {
    return new ApplicativeExpression(head, args)
  }
  return new ValueExpression(head, args, def)
}

Expression.Recursive = function (value, def) {
  var expr = new ValueExpression(null, value, def)
  expr._command = expr
  return expr
}

/**
 * Get the the expression describing the construction of this expression.
 * @return {Expression}
 */
Expression.prototype.head = function () { return this._command }

Expression.prototype.args = function () { return [] }

Expression.prototype.atomic = function () { return true }

Expression.prototype.isEqual = function (other) {
  return this === other
}

Expression.prototype.at = function (index) {
  if (index === 0) return this.head()
  return this.args()[index - 1]
}

// Only SymbolExpressions are associated with definitions
Expression.prototype.def = function () { return null }

Expression.prototype.apply = function () {
  return new ApplicativeExpression(this, arguments)
}

inherits(ApplicativeExpression, Expression)
function ApplicativeExpression (command, args) {
  if (!command) throw Error('Missing command.')
  if (!args) throw Error('Missing args.')
  this._command = command
  this._args = [].slice.call(args)
}

ApplicativeExpression.prototype.atomic = function () {
  return false
}

ApplicativeExpression.prototype.args = function () {
  return this._args
}

inherits(ValueExpression, Expression)
function ValueExpression (head, value, def) {
  this._command = head
  this._value = value
  this._def = def

  if (head === 'self') this._command = this
}

ValueExpression.prototype.def = function () {
  return this._def
}

ValueExpression.prototype.isEqual = function (other) {
  if (this._def) return this._def === other.def()
  return this === other
}

inherits(LazyExpression, Expression)
function LazyExpression (provider) {
  this._provider = provider
}
LazyExpression.prototype._get = function () {
  if (!this._v) {
    this._v = this._provider()
  }
  return this._v
}

var names = ['def', 'head', 'atomic', 'args', 'apply', 'at']

names.forEach(function (name) {
  LazyExpression.prototype[name] = function () {
    var val = this._get()
    return val[name].apply(val, arguments)
  }
})
