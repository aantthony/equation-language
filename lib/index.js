'use strict'

var Expression = require('./expression')
var Context = require('./context')
var Definition = require('./definition')

var exports = module.exports = Context

exports.create = function (parentContext) {
  return new Context(parentContext)
}

exports.Context = Context
exports.Definition = Definition
exports.Expression = Expression

exports.builtin = require('./commands')

// Shorthands to use base context
exports.parse = function (str, scope) {
  var context = new Context()
  return Expression.fromString(context, str, scope)
}
exports.eval = function (str, scope) {
  return this.parse(str, scope).eval()
}
