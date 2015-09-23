'use strict'

var Definition = require('../definition')
module.exports = new Definition(null, [
  Definition.FLAT,
  Definition.NUMERIC,
  Definition.ONE_IDENTITY,
  Definition.ORDERLESS
])

var Real = require('./real')

module.exports.getDefaultValue = function () {
  return new Real(1)
}
