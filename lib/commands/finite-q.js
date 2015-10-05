'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

var True = require('./true')
var False = require('./false')
var EInfinity = require('./infinity')
var ENegativeInfinity = require('./negative-infinity')

var Real = require('./real')

// var Tan = require('./tan')

var And = require('./and')
var Or = require('./or')
var Not = require('./not')
var Less = require('./less')
var ZeroQ = require('./zero-q')

module.exports = new Definition(function (x) {
  // TODO: should be an interface
  var Plus = require('./plus')
  var Times = require('./times')
  var Power = require('./power')
  var Sin = require('./sin')
  var Cos = require('./cos')
  var Mod = require('./mod')
  var Log = require('./log')

  var E = require('./e')
  var Pi = require('./pi')
  var ImaginaryUnit = require('./i')

  if (arguments.length !== 1) return
  if (x.def() === EInfinity) return False.symbol()
  if (x.def() === ENegativeInfinity) return False.symbol()

  if (x.def() === E || x.def() === Pi || x.def() === ImaginaryUnit) return True.symbol()

  var hd = x.head().def()
  if (~[Real].indexOf(hd)) {
    return True.symbol()
  }

  if (~[Plus, Times].indexOf(hd)) {
    // All arguments
    return new Expression(And.symbol(), x.args().map(function (arg) {
      return new Expression(function () {
        return module.exports(arg)
      })
    }))
  }
  if (~[Mod].indexOf(hd)) {
    // any arguments
    return new Expression(Or.symbol(), x.args().map(function (arg) {
      return new Expression(function () {
        return module.exports(arg)
      })
    }))
  }
  if (~[Log].indexOf(hd)) {
    if (x.args().length < 1) return
    return new Not(new ZeroQ(x.args()[0]))
  }
  if (~[Sin, Cos].indexOf(hd)) {
    if (x.args().length < 1) return
    // First argument
    return new Expression(function () {
      return module.exports(x.args()[0])
    })
  }
  if (hd === Power) {
    if (x.args().length !== 2) return
    return new Or(
      new Not(new ZeroQ(x.args()[0])),
      Less(new Real(0), x.args()[1])
    )
  }
}, [Definition.LAZY])
