'use strict'

var LessEqual = require('./less-equal')

var Definition = require('../definition')
module.exports = new Definition(function (a, b) {
  if (a && b) return new LessEqual(b, a)
})
