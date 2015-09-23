'use strict'

var Definition = require('../definition')

var True = require('./true')
var False = require('./false')

function cast (b) {
  return b ? True.symbol('True') : False.symbol('False')
}

module.exports = new Definition(function (a, b) {
  if (a && b) {
    if (a === b) return cast(true)
    var ad = a.def()
    if (ad) {
      var bd = b.def()
      if (bd) return cast(ad === bd)
    }
  }
})
