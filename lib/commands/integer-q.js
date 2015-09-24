var Definition = require('../definition')

var Real = require('./real')

var True = require('./true')
var False = require('./false')

module.exports = new Definition(function (expr) {
  if (!expr) return
  if (expr.head().def() === Real) {
    var str = expr._value
    if (/\.0*[1-9]/.test(str)) return False.symbol()
    return True.symbol()
  }
})
