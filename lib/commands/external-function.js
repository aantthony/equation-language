'use strict'

var Expression = require('../expression')
var Definition = require('../definition')
module.exports = new Definition(null)
module.exports.construct = function (fn) {
  return new Expression(module.exports.symbol(), fn)
}
