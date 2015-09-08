'use strict'

var parse = require('./parse')

var operators = require('./operators')
var infix = operators.infix

module.exports = function (Expression, SymbolExpression, ValueExpression, ApplicativeExpression) {
  function isExplicitCall (node) {
    var args = node[2]
    if (Array.isArray(args) && args[0] === '[') return true
    return false
  }

  function spread (node) {
    if (Array.isArray(node) && node[0] === '[') {
      return node.slice(1)
    }
    return [node]
  }

  function build (recurse, node, context, find, symbolNumber, symbolString) {
    if (typeof node === 'string') return find(node)
    if (Array.isArray(node)) {
      var operatorName = node[0]

      if (operatorName === 'default') {
        var left = recurse(node[1])
        if (isExplicitCall(node)) {
          var right = spread(node[2])
          var args = right.map(recurse)
          return new ApplicativeExpression(left, args)
        } else {
          operatorName = '*'
        }
      }
      if (operatorName === '{') operatorName = '['
      if (operatorName === '(') {
        return recurse(node[1])
      }

      var commandName = infix[operatorName]
      if (!commandName) {
        throw new Error('Unrecognised infix operator: "' + operatorName + '".')
      }

      return new ApplicativeExpression(
        find(commandName),
        node.slice(1).map(recurse)
      )
    }
    if (node.number !== undefined) {
      return new ValueExpression(symbolNumber, node.number)
    }
    if (node.string !== undefined) {
      return new ValueExpression(symbolString, node.string)
    }
    throw new Error('Error while parsing syntax tree: Unrecognised node encountered.')
  }

  // NOTE: will this cause x = parse('x + ""', {x: x}) to leak?
  return function buildExpresssionFromString (context, string, scope) {
    var vars = {}
    var bound = {}

    var symbolReal = new SymbolExpression('Real', context.get('Real'))
    var symbolString = new SymbolExpression('String', context.get('String'))

    function buildInContext (node) {
      return build(buildInContext, node, context, find, symbolReal, symbolString)
    }

    function find (name) {
      var definition = context.get(name)
      if (!definition) {
        if (!vars[name]) {
          // Create a free variable:
          vars[name] = new SymbolExpression(name)
        }
        return vars[name]
      } else {
        if (!bound[name]) {
          bound[name] = new SymbolExpression(name, definition)
        }
        return bound[name]
      }
    }

    var ast = parse(string)
    // console.log(require('util').inspect(ast, {color: true, depth: null}))

    var expr = buildInContext(ast)

    expr.vars = vars
    expr.bound = bound

    return expr
  }
}
