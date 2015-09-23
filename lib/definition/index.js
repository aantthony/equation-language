'use strict'

var Expression = require('../expression')

var Attribute = require('./attribute')
for (var i in Attribute) {
  Definition[i] = Attribute[i]
}

var PROTO = '__proto__'

Definition.Attribute = Attribute

module.exports = Definition

function wrap (fn, definition) {
  return function run (operands) {
    return fn.apply(null, operands)
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
    if (apply.construct) {
      var value = apply.construct.apply(apply, arguments)
      if (value !== undefined) {
        if (!(value instanceof Expression)) {
          throw new Error('Definition construct implementation returned object which is not an expression.')
        }
        return value
      }
    }

    var operands = [].slice.call(arguments)
    if (apply.run) {
      var runRes = apply.run(operands)
      if (runRes !== undefined) {
        if (!(runRes instanceof Expression)) {
          throw new Error('Definition implementation returned object which is not an expression.')
        }
        return runRes
      }
    }
    return new Expression(apply.symbol(), operands)
  }
}

/**
 * Get a symbol which is guaranteed to point to a definition
 * @return {Expression}
 */
Definition.prototype.symbol = function (name) {
  return Definition.Symbol.construct(name || this.symbolName || null, this)
}

Definition.prototype.has = function (attribute) {
  return this.attributes.indexOf(attribute) !== -1
}

Definition.Symbol = new Definition()
var symbol = new Expression.Recursive('Symbol', Definition.Symbol)

Definition.Symbol.construct = function (name, definition) {
  return new Expression(symbol, name, definition)
}
