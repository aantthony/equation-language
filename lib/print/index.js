var chalk = require('chalk')

var Real = require('../commands/real')
var ESymbol = require('../commands/symbol')
var dString = require('../commands/string')
var List = require('../commands/list')
var DerivativeN = require('../commands/derivative-n')
var Equal = require('../commands/equal')
var True = require('../commands/true')

function isListOfRealOne (expr) {
  if (!expr) return
  if (expr.head().def() !== List) return false
  if (expr.args().length !== 1) return false
  return new Equal(expr.args()[0], new Real(1)).def() === True
}

function atomString (expr) {
  if (expr.head().def() === ESymbol) {
    if (expr.def()) {
      return expr._value
    }
    return chalk.cyan(expr._value)
  }
  if (expr.head().def() === Real) {
    return chalk.yellow(expr._value)
  }
  if (expr.head().def() === dString) {
    return chalk.green(JSON.stringify(expr._value))
  }
  if (expr.head().def() === DerivativeN) {
    if (expr.args().length === 2) {
      var fnSymbol = expr.args()[1]
      if (fnSymbol.head().def() === ESymbol) {
        if (isListOfRealOne(expr.args()[0])) {
          return atomString(fnSymbol) + '\''
        }
      }
    }
  }
  if (!expr.atomic()) {
    return atomString(expr.head()) + '[' + expr.args().map(atomString).join(', ') + ']'
  }
  return '(#' + (expr.head()._value || '???') + ')'
}

function print (expr, indent) {
  if (expr.atomic()) {
    return indent + atomString(expr)
  }
  var args = expr.args()
  var headStr
  if (expr.head().def() === List) {
    headStr = ''
  } else {
    headStr = chalk.bold(atomString(expr.head()))
  }
  if (args.length === 0) {
    return '' +
    indent +
    headStr + '[]'
  }
  if (args.every(function (arg) { return arg.atomic() })) {
    return '' +
    indent + headStr + '[' + args.map(atomString).join(', ') + ']'
  }
  return '' +
  indent +
  headStr + '[\n' +
  args.map(function (arg) {
    return print(arg, indent + chalk.grey('|   '))
  }).join(',\n') + '\n' +
  indent + ']'
}

module.exports = function inspect (expr) {
  return print(expr, '  ')
}
