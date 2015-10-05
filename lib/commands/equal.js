'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

var True = require('./true')
var False = require('./false')
var EBoolean = require('./boolean')

var InjectiveQ = require('./injective-q')

var And = require('./and')
var Real = require('./real')
var Pi = require('./pi')
var E = require('./e')
var ImaginaryUnit = require('./i')

function getRealParts (n) {
  // TODO: implement in Real
  var parts = n._value.split('.')
  parts[0] = parts[0].replace(/^0+/, '')
  parts[1] = (parts[1] || '').replace(/0+$/, '')
  return parts
}

function realIsEqual (a, b) {
  // TODO: implement in Real
  var nas = getRealParts(a)
  var nbs = getRealParts(b)

  return nas[0] === nbs[0] && nas[1] === nbs[1]
}

// Defines the strictest equivalence class apart from definitional equality
// That is, this takes into account objects which have no definition but are identical
module.exports = new Definition(function (a, b) {
  if (arguments.length !== 2) return
  if (a === b) return True.symbol()
  var ad = a.def()
  if (ad) {
    var bd = b.def()
    if (bd) return new EBoolean(ad === bd)
    if (b.head().def() === Real) {
      if (ad === Pi || ad === E || ad === ImaginaryUnit) return False.symbol()
    }
    return
  }

  if (a.atomic() || b.atomic()) {
    if (a.atomic() && b.atomic()) {
      var ahd = a.head().def()
      var bhd = a.head().def()
      if (bhd && bhd === ahd) {
        if (bhd === Real) {
          return new EBoolean(realIsEqual(a, b))
        }
      }
    }
    return
  }

  var head = a.head()

  var aArgs = a.args()
  var bArgs = b.args()

  var argLength = a.args().length
  var injE = new InjectiveQ(head)
  var bArgLength = b.args().length
  var inj = injE && injE.def() === True
  if (!inj && argLength !== bArgLength) return
  if (inj && argLength !== bArgLength) return False.symbol()

  var headIsEqual = module.exports(head, b.head())
  if (headIsEqual.def() === True) {
    if (inj) {
      var questionbles = []
      for (var i2 = 0; i2 < argLength; i2++) {
        var res = module.exports(aArgs[i2], bArgs[i2])
        if (res.def() === False) {
          return res
        } else if (res.def() === True) {
          continue
        } else {
          questionbles.push(res)
        }
      }

      if (questionbles.length) {
        return new Expression(And.symbol(), questionbles)
      }
      return True.symbol()
    }
    if (aArgs.every(function (arg, i) {
      return module.exports(arg, bArgs[i]).def() === True
    })) {
      return True.symbol()
    }
  }
}, [Definition.LAZY])
