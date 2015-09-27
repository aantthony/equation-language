'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

var List = require('./list')

module.exports = new Definition(function (head, args) {
  if (!head || !args) return
  if (args.head().def() !== List) return
  return new Expression(head, args.args()).eval()
}, [
  Definition.HOLD_ALL
])
