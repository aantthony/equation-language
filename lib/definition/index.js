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
    if (Definition.DEBUG_MODE) {
      operands.forEach(function (arg, i) {
        validate(arg, ['arg ' + i])
      })
    }
    var res = fn.apply(null, operands)
    if (res && Definition.DEBUG_MODE) validate(res, ['run: ' + fn.toString()])
    return res
  }
}

Definition.DEBUG_MODE = 0

function validate (expr, path) {
  if (!expr) throw new Error('Missing - ' + path.join(', '))
  if (!(expr instanceof Expression)) {
    throw new Error('Not an expression!: ' + expr + ' - ' + path.join(', '))
  }
  path = path.concat([expr.head()._value || 'Anonymous'])
  expr.def()
  expr.args().forEach(function (arg, i) {
    if (!arg) throw new Error('Missing value at index: ' + i + ' of ' + expr.args().length + ' - ' + path.join(','))
    validate(arg, path.concat([i]))
  })
  var head = expr.head()
  if (!head) throw new Error('Missing head.')
  if (head === expr) return
  validate(head, path.concat(['head']))
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
        if (Definition.DEBUG_MODE) validate(value, [])
        return value
      }
    }

    var operands = [].slice.call(arguments)
    if (Definition.DEBUG_MODE) {
      operands.forEach(function (arg, i) {
        validate(arg, ['user ' + i])
      })
    }
    if (apply.run) {
      var runRes = apply.run(operands)
      if (runRes !== undefined) {
        if (Definition.DEBUG_MODE) validate(runRes, [])
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
