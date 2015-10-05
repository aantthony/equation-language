'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

var Real = require('./real')

var Plus = require('./plus')

var List = require('./list')
var Concat = require('./concat')
var ArrayTail = require('./array-tail')

module.exports = new Definition(function (expr) {
  if (!expr) return
  var hd = expr.head().def()
  if (hd === List) {
    return new Real(expr.args().length)
  }
  if (hd === Concat) {
    var target = expr.at(1)
    if (!target) return
    return new Expression(
      Plus.symbol(),
      target.args().map(module.exports)
    )
  }

  if (hd === ArrayTail) {
    var target2 = expr.at(1)
    if (!target2) return
    return new Expression(
      Plus.symbol(),
      [
        module.exports(target2),
        new Real('-1')
      ]
    )
  }
}, [Definition.LAZY])
