'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

module.exports = new Definition()

module.exports.invoke = function (fn) {
  return fn
}

module.exports.construct = function (n) {
  return new Expression(this.symbol(), String(n))
}
