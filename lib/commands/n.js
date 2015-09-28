'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

var Real = require('./real')
var List = require('./list')
var Dictionary = require('./dictionary')

function wrap (javascriptValue) {
  if (typeof javascriptValue === 'number') {
    return new Real(javascriptValue)
  }
  if (Array.isArray(javascriptValue)) {
    return new Expression(List, javascriptValue.map(wrap))
  }
  if (typeof javascriptValue === 'object') {
    return new Dictionary(javascriptValue)
  }
}

module.exports = new Definition(function (x) {
  // TODO: this should all be in Real/Plus/Pi etc
  var ed = x.def()
  if (ed && ed.javascript) {
    if (typeof ed.javascript === 'number') {
      return wrap(ed.javascript)
    }
    return
  }
  var hd = x.head().def()
  if (!hd) return
  if (hd === module.exports && x.args().length) return x.args()[0]
  if (hd === Real) {
    return x
  }

  var changed = false
  var args = x.args().map(function (arg) {
    var newArg = module.exports(arg)
    if (newArg !== arg) changed = true
    return newArg
  })

  if (hd.javascript) {
    if (args.every(function (arg) {
      return arg.head().def() === Real
    })) {
      return wrap(hd.javascript.apply(null, args.map(function (arg) {
        return Number(arg._value)
      })))
    }
    return new Expression(x.head(), args)
  }

  if (!changed) return
  return new Expression(x.head(), args)
})
