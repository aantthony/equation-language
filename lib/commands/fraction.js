'use strict'

var Definition = require('../definition')
var Power = require('./power')
var Times = require('./times')
var Real = require('./real')

module.exports = new Definition(function (x, y) {
  if (!x || !y) return
  return new Times(x, new Power(y, new Real(-1)))
})
