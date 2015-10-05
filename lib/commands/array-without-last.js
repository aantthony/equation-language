'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

var List = require('./list')

module.exports = new Definition(function (expr) {
  if (!expr) return
  if (expr.head().def() === List) {
    var sliced = expr.args().slice(0, expr.args().length - 1)

    return new Expression(
      List.symbol('List'),
      sliced
    )
  }
}, [Definition.LAZY])
