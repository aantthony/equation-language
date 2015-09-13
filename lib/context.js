'use strict'

var Expression = require('./expression')

module.exports = function (parentContext) {
  return new Context(parentContext)
}

function Context (parentContext) {
  this.parent = parentContext || this.root
  this.scope = {}
}

/**
 * Get a definition
 * @param  {String} name
 * @return {Definition}
 */
Context.prototype.get = function (name) {
  var active = this
  do {
    if (active.scope.hasOwnProperty(name)) return active.scope[name]
  } while ((active = active.parent))

  return null
}

Context.prototype.set = function (name, value) {
  this.scope[name] = value
}

/**
 * Parse a string using the Equation Language, but without evaluating it
 * @param  {String} string - expression to parse - e.g. "x+2+3"
 * @param  {String: SymbolExpression} [scope] - replacements before evaluation
 * @return {Expression} - resultant expression - e.g. Plus[Plus[x,2],3]
 */
Context.prototype.parse = function (string, scope) {
  return Expression.fromString(this, string, scope)
}

/**
 * Parse a string using the Equation Language
 * @param  {String} string - expression to parse - e.g. "x+2+3"
 * @param  {String: SymbolExpression} scope - replacements before evaluation
 * @return {Expression} - resultant expression - e.g. Plus[Plus[x,2],3]
 */
Context.prototype.eval = function (string, scope) {
  return this.parse(string, scope).eval()
}

Context.prototype.parent = null
Context.prototype.root = Context.prototype
Context.prototype.scope = require('./commands')
