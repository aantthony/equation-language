'use strict'

var Definition = require('../definition')
var Equal = require('./equal')
var Real = require('./real')
var True = require('./true')
module.exports = new Definition(function () {
  var zero = new Real(0)
  for (var i = 0; i < arguments.length; i++) {
    var ise = new Equal(zero, arguments[i])
    if (ise.def() === True) return zero
  }
}, [
  Definition.FLAT,
  Definition.NUMERIC,
  Definition.ONE_IDENTITY,
  Definition.ORDERLESS
])

module.exports.getDefaultValue = function () {
  return new Real(1)
}
