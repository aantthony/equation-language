'use strict'

var Definition = require('../definition')
module.exports = new Definition(function (expr) {
  return expr && expr.head()
})
