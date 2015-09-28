'use strict'

var Definition = require('../definition')

var True = require('./true')
var False = require('./false')

module.exports = new Definition(function (x) {
  if (x.def() === False) return x
  return True.symbol()
})

module.exports.construct = function (v) {
  return v ? True.symbol() : False.symbol()
}
