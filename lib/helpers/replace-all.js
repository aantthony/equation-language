'use strict'
var Expression = require('../expression')

var replace = require('./replace')

function replaceAll (expression, rules) {
  if (expression.atomic()) return replace(expression, rules)
  var head = replaceAll(expression.head(), rules)
  var changedArgs = false
  var newArgs = expression.args().map(function (arg) {
    var n = replaceAll(arg, rules)
    if (n !== arg) changedArgs = true
    return n
  })
  if (!changedArgs && head === expression.head()) {
    return replace(expression, rules)
  }
  return replace(new Expression(head, newArgs), rules)
}

module.exports = function runReplacer (expression, rules, repeated) {
  if (!Array.isArray(rules)) {
    throw new Error('replaceAll expects an array of rules.')
  }

  var last = expression
  while (1) {
    var next = replaceAll(last, rules)
    if (!repeated || next === last) return next
    last = next
  }

  return last
}
