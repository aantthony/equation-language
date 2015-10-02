'use strict'

var Definition = require('../definition')
var Power = require('./power')
var Real = require('./real')
module.exports = new Definition(function (x) {
  if (!x) return
  return new Power(x, new Real('0.5'))
})
