'use strict'

var language = require('../language')
var Expression = require('../expression')
var evaluate = require('../eval')

module.exports = Context

function Context (parentContext) {
  if (!(this instanceof Context)) return new Context(parentContext)
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
Context.prototype.parse = function (string, scope, format) {
  scope = scope || {}
  var context = this
  var vars = {}
  var bound = {}

  var dSymbol = this.get('Symbol')

  var symbol = new Expression.Recursive('Symbol', dSymbol)

  function findInContextOrScope (name) {
    var scopeValue = scope[name]
    if (scopeValue) {
      return scopeValue
    }
    var definition = context.get(name)
    if (!definition) {
      if (!vars[name]) {
        // Create a free variable:
        vars[name] = new Expression(symbol, name)
      }
      return vars[name]
    } else {
      if (!bound[name]) {
        bound[name] = new Expression(symbol, name, definition)
      }
      return bound[name]
    }
  }

  var expr = language.parse(string, findInContextOrScope, format)
  if (!expr) return expr

  expr.unbound = vars
  expr.bound = bound

  return expr
}

/**
 * Parse a string using the Equation Language
 * @param  {String} string - expression to parse - e.g. "x+2+3"
 * @param  {String: SymbolExpression} scope - replacements before evaluation
 * @return {Expression} - resultant expression - e.g. Plus[Plus[x,2],3]
 */
Context.prototype.eval = function (string, scope, format) {
  var expr = this.parse(string, scope, format)
  if (!expr) return expr
  return evaluate(expr)
}

Context.prototype.parent = null
Context.prototype.root = Context.prototype
Context.prototype.scope = require('../commands')
