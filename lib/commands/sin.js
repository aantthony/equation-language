'use strict'

var Definition = require('../definition')
var Pi = require('./pi')
var Real = require('./real')
module.exports = new Definition(function (x) {
  if (!x) return
  if (x.def() === Pi) return new Real(0)
})

module.exports.javascript = Math.sin
