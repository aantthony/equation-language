'use strict'

var Definition = require('../definition')

var List = require('./list')
var Real = require('./real')

module.exports = new Definition(function (array, index) {
  if (!array || !index) return
  if (array.head().def() !== List) return
  if (index.head().def() !== Real) return

  var value = array.args()[index._value]
  if (!value) return
  return value
}, [Definition.LAZY])
