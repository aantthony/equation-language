'use strict'

var Definition = require('../definition')

var Dimensions = require('./dimensions')
var Length = require('./length')

module.exports = new Definition(function (expr) {
  if (!expr) return
  return new Length(new Dimensions(expr))
})
