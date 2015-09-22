'use strict'

var Definition = require('../definition')
var ATTR = Definition.Attribute

module.exports = new Definition(null, [
  ATTR.FLAT,
  ATTR.NUMERIC,
  ATTR.ONE_IDENTITY,
  ATTR.ORDERLESS
])

var Real = require('./real')
var SymbolExpression = require('../expression').Symbol
var ValueExpression = require('../expression').ValueExpression

module.exports.getDefaultValue = function () {
  var symbolReal = new SymbolExpression('Real', Real)
  return new ValueExpression(symbolReal, '0')
}
