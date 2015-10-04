'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

// TODO: rename to Rational
module.exports = new Definition()

function getRealParts (str) {
  var parts = str.split('.')
  parts[0] = parts[0].replace(/^0+/, '')
  parts[1] = (parts[1] || '').replace(/0+$/, '')
  return parts
}

module.exports.invoke = function (fn) {
  return fn
}

module.exports.construct = function (n) {
  var parts = getRealParts(String(n))
  var str = parts[0] || '0'
  if (parts[1]) str += '.' + parts[1]
  return new Expression(this.symbol(), str)
}
