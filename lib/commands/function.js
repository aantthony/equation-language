'use strict'

var Definition = require('../definition')
var ATTR = require('../attribute')

var replaceAll = require('../replace-all')

var RuleDelayed = require('./rule-delayed')
var Arguments = require('./arguments')
var Symbol = require('./symbol')

module.exports = new Definition(function (x, y) {
  var yargs = y.args()
  if (yargs[0] === x && yargs.length === 1) {
    if (y.head() === x) return
    return y.head()
  }
}, [
  ATTR.HOLD_ALL
])

module.exports.invoke = function (fn, args) {
  var y = fn.args()[1]
  var x = fn.args()[0]
  if (x.head().def() === Arguments) {
    if (x.args().length > args.length) return
    return replaceAll(y, x.args().map(function (arg, i) {
      return new RuleDelayed(arg, args[i])
    })).eval()
  } else if (x.head().def() === Symbol && args[0]) {
    return replaceAll(y, [
      new RuleDelayed(x, args[0])
    ]).eval()
  }
}
