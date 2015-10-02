var Definition = require('../definition')

var Gamma = require('./gamma')
var Real = require('./real')
var Plus = require('./plus')

module.exports = new Definition(function (n) {
  if (!n) return
  // https://en.wikipedia.org/wiki/Gamma_function
  return new Gamma(new Plus(n, new Real(1)))
})
