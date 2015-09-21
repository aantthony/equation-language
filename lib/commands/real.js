'use strict'

var Definition = require('../definition')
module.exports = new Definition()

module.exports.invoke = function (fn) {
  return fn
}
