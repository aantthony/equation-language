var chalk = require('chalk')

module.exports = function (Expression, SymbolExpression, ValueExpression, ApplicativeExpression) {
  return function dump () {
    var expr = this
    function atomString (expr) {
      if (expr instanceof SymbolExpression) {
        if (expr.def()) {
          return expr.symbolName
        }
        return chalk.cyan(expr.symbolName)
      }
      if (expr instanceof ValueExpression) {
        if (expr.head().symbolName === 'String') {
          return chalk.green(JSON.stringify(expr.value))
        }
        return chalk.yellow(expr.value)
      }
      if (expr instanceof ApplicativeExpression) {
        return atomString(expr.head()) + '(' + expr.args().map(atomString).join(', ') + ')'
      }
      if (!(expr instanceof Expression)) {
        return chalk.red(JSON.stringify(expr))
      }
      return '???'
    }

    function print (expr, indent) {
      if (!(expr instanceof Expression)) {
        return indent + chalk.red(JSON.stringify(expr))
      }
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
      return '' +
      indent +
      headStr + '[\n' +
      args.map(function (arg) {
        return print(arg, indent + chalk.grey('|   '))
      }).join(',\n') + '\n' +
      indent + ']'
    }
    return print(expr, '  ')
  }
}
