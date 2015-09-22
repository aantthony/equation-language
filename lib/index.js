'use strict'

var Expression = require('./expression')
var Context = require('./context')
var Definition = require('./definition')

var exports = module.exports = Context

exports.Context = Context
exports.Definition = Definition
exports.Expression = Expression
exports.builtin = require('./commands')

// Define extensions:
// Expression.prototype.inspect =
Expression.prototype.dump = function () {
  return require('./print')(this)
}

Expression.prototype.eval = function () {
  return require('./eval')(this)
}

Context.create = Context

// Shorthands to use base context
exports.parse = function (str, scope) {
  var context = new Context()
  return context.parse(str, scope)
}

exports.eval = function (str, scope) {
  return this.parse(str, scope).eval()
}
