var chalk = require('chalk')

var Real = require('../commands/real')
var ESymbol = require('../commands/symbol')
var EString = require('../commands/string')
var List = require('../commands/list')
var DerivativeN = require('../commands/derivative-n')
var Equal = require('../commands/equal')
var Dictionary = require('../commands/dictionary')
var True = require('../commands/true')

function isListOfRealOne (expr) {
  if (!expr) return
  if (expr.head().def() !== List) return false
  if (expr.args().length !== 1) return false
  return new Equal(expr.args()[0], new Real(1)).def() === True
}

function getValue (expr) {
  if (expr._get) return expr._get()._value
  return expr._value
}

function atomString (expr) {
  if (expr.head().def() === ESymbol) {
    if (expr.def()) {
      return getValue(expr)
    }
    return chalk.cyan(getValue(expr))
  }
  if (expr.head().def() === Real) {
    return chalk.yellow(getValue(expr))
  }
  if (expr.head().def() === EString) {
    return chalk.green(JSON.stringify(getValue(expr)))
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
  return '(#' + (getValue(expr.head()) || '???') + ')'
}

function print (expr, indent, isKey) {
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
    if (isKey) {
      return indent + headStr + getValue(args[0]) + ': ' + atomString(args[1])
    }
    return indent + headStr + '[' + args.map(atomString).join(', ') + ']'
  }
  if (expr.head().def() === Dictionary) {
    return '' +
    indent +
    '{\n' +
    args.map(function (arg) {
      if (arg.head().def() === List) {
        if (arg.args().length === 2) {
          if (arg.args()[0].head().def() === EString) {
            return print(arg, indent + chalk.grey('|   '), true)
          }
        }
      }
      return print(arg, indent + chalk.grey('|   '))
    }).join(',\n') + '\n' +
    indent + '}'
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
