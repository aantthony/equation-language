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

Context.prototype.parse = function (string, scope) {
  return Expression.fromString(this, string, scope || {})
}
Context.prototype.eval = function (string, scope) {
  return this.parse(string, scope).eval()
}

Context.prototype.parent = null
Context.prototype.root = Context.prototype
Context.prototype.scope = require('./commands')
