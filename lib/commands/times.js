'use strict'

var Definition = require('../definition')
module.exports = new Definition(null, [
  Definition.FLAT,
  Definition.LISTABLE,
  Definition.NUMERIC,
  Definition.ONE_IDENTITY,
  Definition.ORDERLESS
])

var Real = require('./real')
var SymbolExpression = require('../expression').Symbol
var ValueExpression = require('../expression').ValueExpression

module.exports.getDefaultValue = function () {
  var symbolReal = new SymbolExpression('Real', Real)
  return new ValueExpression(symbolReal, '1')
}
