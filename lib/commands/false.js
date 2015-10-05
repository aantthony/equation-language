'use strict'

var Definition = require('../definition')
module.exports = new Definition(function (x, y) {
  if (arguments.length !== 2) return
  return y
}, [Definition.LAZY])
module.exports.javascript = false
