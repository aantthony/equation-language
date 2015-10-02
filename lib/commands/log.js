var Expression = require('../expression')
var Definition = require('../definition')

var Plus = require('./plus')
var Times = require('./times')
var Power = require('./power')
var Real = require('./real')
var E = require('./e')
var Equal = require('./equal')
var True = require('./true')
var EInfinity = require('./infinity')

module.exports = new Definition(function (x) {
  if (arguments.length !== 1) return
  var ox = x
  var hd = x.head().def()
  if (!hd) {
    return
  }

  if (!hd) {
    if (x === ox) return
    return new Expression(module.exports.symbol(), x)
  }

  if (x.def() === E) return new Real(1)
  if (x.def() === EInfinity) return x

  if (new Equal(x, new Real(1)).def() === True) return new Real(0)

  if (hd === Times) {
    return new Expression(
      Plus.symbol(),
      x.args().map(function (arg) {
        return module.exports(arg)
      })
    )
  }
  if (hd === Power) {
    if (x.args().length !== 2) return
    return new Times(x.args()[1], module.exports(x.args()[0]))
  }
}, [
  Definition.NUMERIC
])
