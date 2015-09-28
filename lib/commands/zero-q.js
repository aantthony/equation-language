'use strict'

var Definition = require('../definition')

var Equal = require('./equal')
var Real = require('./real')

module.exports = new Definition(function (x) {
  return new Equal(x, new Real(0))
})
