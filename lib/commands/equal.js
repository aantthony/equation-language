'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

var True = require('./true')
var False = require('./false')

var InjectiveQ = require('./injective-q')

var And = require('./and')
var Real = require('./real')

function stop (a, b) {
  return new Expression(module.exports.symbol(), [a, b])
}

function getRealParts (n) {
  var parts = n._value.split('.')
  parts[0] = parts[0].replace(/^0+/, '')
  parts[1] = (parts[1] || '').replace(/0+$/, '')
  return parts
}

function realIsEqual (a, b) {
  var nas = getRealParts(a)
  var nbs = getRealParts(b)

  return nas[0] === nbs[0] && nas[1] === nbs[1]
}

function isEqual (a, b) {
  var Plus = require('./plus')
  if (a === b) return true
  var ad = a.def()
  if (ad) {
    var bd = b.def()
    if (bd) return ad === bd
    return stop(a, b)
  }

  if (a.atomic() || b.atomic()) {
    if (a.atomic() && b.atomic()) {
      var ahd = a.head().def()
      var bhd = a.head().def()
      if (bhd && bhd === ahd) {
        if (bhd === Real) {
          return realIsEqual(a, b)
        }
      }
    }
    return stop(a, b)
  }

  var head = a.head()

  var aArgs = a.args()
  var bArgs = b.args()
  if (head.def() === Plus) {
    var termsA = aArgs.slice(0)
    var termsB = bArgs.slice(0)
    aArgs.forEach(function (ta) {
      for (var i = 0; i < termsB.length; i++) {
        var tb = termsB[i]
        if (isEqual(ta, tb) === true) {
          // remove from both:
          var iA = termsA.indexOf(ta)
          termsA.splice(iA, 1)
          termsB.splice(i, 1)
        }
      }
    })

    if (termsA.length > termsB.length) {
      var tmp = termsA
      termsA = termsB
      termsB = tmp
    }

    if (!termsA.length && !termsB.length) return true
    if (!termsA.length) {
      return new Expression(
        module.exports.symbol(),
        [
          new Real(0),
          new Expression(
            head,
            termsB
          ).eval()
        ]
      )
    }

    return new Expression(
      module.exports.symbol(),
      [
        new Expression(
          head,
          termsA
        ).eval(),
        new Expression(
          head,
          termsB
        ).eval()
      ]
    )
  }

  var argLength = a.args().length
  if (argLength !== b.args().length) return stop(a, b)

  // TODO: isStrictEqual
  if (isEqual(head, b.head()) === true) {
    if (argLength === 0) return true
    var inj = new InjectiveQ(head)
    if (inj.def() === True) {
      var questionbles = []
      for (var i2 = 0; i2 < argLength; i2++) {
        var res = isEqual(aArgs[i2], bArgs[i2])
        if (res === false) {
          return false
        } else if (res !== true) {
          questionbles.push(res)
        }
      }

      if (questionbles.length) {
        return new Expression(And.symbol(), questionbles)
      }
      return true
    }
  }

  return stop(a, b)
}

// Defines the strictest equivalence class apart from definitional equality
// That is, this takes into account objects which have no definition but are identical
module.exports = new Definition(function (a, b) {
  if (a && b) {
    var res = isEqual(a, b)
    if (res === true) return True.symbol('True')
    if (res === false) return False.symbol('False')
    return res
  }
})
