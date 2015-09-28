var Expression = require('../expression')
var Definition = require('../definition')

var List = require('./list')

var EString = require('./string')
var EBoolean = require('./boolean')
var ESymbol = require('./symbol')
var Null = require('./null')
var ExternalFunction = require('./external-function')
var Real = require('./real')

module.exports = new Definition()

function makeValue (value, context) {
  if (value instanceof Expression) return value
  if (typeof value === 'string') {
    return new EString(value)
  }
  if (Array.isArray(value)) {
    return new Expression(List.symbol(), value.map(function (v) {
      return make(v, context)
    }))
  }
  if (value === null) return Null.symbol()
  if (value === undefined) return Null.symbol()
  if (typeof value === 'object') {
    return new Expression(module.exports.symbol(), Object.keys(value).map(function (key) {
      return new List(new EString(key), make(value[key], context))
    }))
  }
  if (typeof value === 'boolean') {
    return new EBoolean(value)
  }
  if (typeof value === 'number') {
    return new Real(value)
  }
  if (typeof value === 'function') {
    return new ExternalFunction(value)
  }
  if (typeof value === 'symbol') {
    return new ESymbol(String(value))
  }
  throw new Error('Unknown type: ' + typeof value)
}

function make (value, context) {
  var values = context.values
  var expressions = context.expressions
  var index = values.indexOf(value)
  if (index !== -1) return expressions[index]
  var stackIndex = context.stack.indexOf(value)
  if (stackIndex !== -1) return new ESymbol('Circular').apply(new Real(context.stack.length - stackIndex - 1))
  context.stack.push(value)
  var newExpression = makeValue(value, context)
  context.stack.pop()
  values.push(value)
  expressions.push(newExpression)
  return newExpression
}

module.exports.construct = function (object) {
  return make(object, {values: [], expressions: [], stack: []})
}
