var Expression = require('../expression')
var Definition = require('../definition')

var List = require('./list')

module.exports = new Definition(function (expr) {
  if (expr && expr.head().def() === List) {
    return new Expression(expr.head(), expr.args().slice(0).reverse())
  }
})
