var Definition = require('../definition')

var Real = require('./real')

var LessEqual = require('./less-equal')
var Equal = require('./equal')
var True = require('./true')

function strMod (a, b) {
  return Math.abs(Number(a) % Number(b))
}

function realMod (a, b) {
  return new Real(strMod(a._value, b._value))
}

function isZero (a) {
  return new Equal(a, new Real(0)).def() === True
}

// n % m
module.exports = new Definition(function (a, b) {
  if (!a || !b) return
  if (isZero(a)) return a

  var ahd = a.head().def()

  if (!ahd) return

  if (a.head().def() === Real) {
    if (b.head().def() === Real) {
      return realMod(a, b)
    }
    return
  }

  if (ahd === module.exports) {
    if (a.expr().args().length !== 2) return
    var ib = a.expr().args()[1]
    if (new LessEqual(ib, b).def() === True) {
      return a.expr().args()[0]
    }
  }
}, [Definition.LAZY])
