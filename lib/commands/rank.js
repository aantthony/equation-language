'use strict'

var Definition = require('../definition')
var Dimension = require('./dimension')

var List = require('./list')
var Real = require('./real')

module.exports = new Definition(function (expr) {
  if (!expr) return
  var d = new Dimension(expr)
  var hd = d.head().def()
  if (hd === List) {
    return new Real(d.args().length)
  }
})
