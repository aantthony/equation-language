'use strict'

var Less = require('./less')

var Definition = require('../definition')
module.exports = new Definition(function (a, b) {
  if (a && b) return new Less(b, a)
})
