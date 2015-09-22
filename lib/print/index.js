var chalk = require('chalk')

var dReal = require('../commands/real')
var dSymbol = require('../commands/symbol')
var dString = require('../commands/string')

function atomString (expr) {
  if (expr.head().def() === dSymbol) {
    if (expr.def()) {
      return expr._value
    }
    return chalk.cyan(expr._value)
  }
  if (expr.head().def() === dReal) {
    return chalk.yellow(expr._value)
  }
  if (expr.head().def() === dString) {
    return chalk.green(JSON.stringify(expr._value))
  }
  if (!expr.atomic()) {
    return atomString(expr.head()) + '(' + expr.args().map(atomString).join(', ') + ')'
  }
  return '(#' + (expr.head()._value || '???') + ')'
}

function print (expr, indent) {
  if (expr.atomic()) {
    return indent + atomString(expr)
  }
  var args = expr.args()
  var headStr = chalk.bold(atomString(expr.head()))
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
