'use strict'

var Definition = require('../definition')
var True = require('./true')
var False = require('./false')

var EFunction = require('./function')

module.exports = new Definition(function (expr) {
  if (!expr) return
  if (expr.def()) return True.symbol()
  var hd = expr.head().def()
  if (hd === EFunction) return True.symbol()
  return False.symbol()
})
