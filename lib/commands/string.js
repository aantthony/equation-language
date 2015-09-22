'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

module.exports = new Definition()

module.exports.construct = function (string) {
  if (typeof string === 'string') {
    return new Expression(this.symbol('String'), string)
  }
}
