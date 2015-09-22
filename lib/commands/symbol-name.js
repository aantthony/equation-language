var ESymbol = require('./symbol')
var EString = require('./string')

var Definition = require('../definition')

module.exports = new Definition(function symbolName (expr) {
  if (expr && expr.head().def() === ESymbol) {
    return new EString(expr._value)
  }
})
