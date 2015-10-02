var operators = require('./operators')
var infix = operators.infix

var Expression = require('../../expression')

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

function build (recurse, node, find, defaultOperator) {
  if (node === null) return null
  if (typeof node === 'string') return find(node)
  if (Array.isArray(node)) {
    var operatorName = node[0]
    if (operatorName === 'default') {
      var left = recurse(node[1])
      if (isExplicitCall(node)) {
        var right = spread(node[2])
        var args = right.map(recurse)
        return new Expression(left, args)
      } else {
        if (defaultOperator) {
          if (node[1].number === undefined) {
            return new Expression(find(defaultOperator), node.slice(1).map(recurse))
          }
        }
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

    return new Expression(
      find(commandName),
      node.slice(1).map(recurse)
    )
  }

  if (node.number !== undefined) {
    return find('Real').def()(node.number)
  }

  if (node.string !== undefined) {
    return find('String').def()(node.string)
  }
  throw new Error('Error while parsing syntax tree: Unrecognised node encountered: ' + JSON.stringify(node))
}

module.exports = function (ast, find, defaultOperator) {
  if (ast === null) return null

  function recurse (node) {
    return build(recurse, node, find, defaultOperator)
  }

  return recurse(ast)
}
