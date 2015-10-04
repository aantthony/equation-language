'use strict'

var Definition = require('../definition')

var ComplexCartesian = require('./complex-cartesian')
var Real = require('./real')
var At = require('./at')

module.exports = new Definition(function (z) {
  if (!z) return
  return new At(new ComplexCartesian(z), new Real(0))
})
