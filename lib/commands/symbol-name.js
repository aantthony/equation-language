var symbol = require('./symbol')
var string = require('./string')

module.exports = function symbolName (expr) {
  if (expr.head() === symbol) return string(expr.name)
}
