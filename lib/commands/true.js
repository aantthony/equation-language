'use strict'

var Definition = require('../definition')
module.exports = new Definition(function (x, y) {
  if (arguments.length !== 2) return
  return x
}, [Definition.LAZY])
module.exports.javascript = true
