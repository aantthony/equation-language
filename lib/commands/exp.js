'use strict'

var Definition = require('../definition')
var Power = require('./power')
var E = require('./e')
module.exports = new Definition(function (x) {
  if (!x) return
  return new Power(E.symbol(), x)
})
