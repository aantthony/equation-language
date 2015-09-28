var Expression = require('../expression')
var Definition = require('../definition')

var Real = require('./real')

var LessEqual = require('./less-equal')
var Equal = require('./equal')
var True = require('./true')

function strPlus (a, b) {
  return Number(a) + Number(b)
}
function strMod (a, b) {
  return Math.abs(Number(a) % Number(b))
}
function strTimes (a, b) {
  return Number(a) * Number(b)
}

function realMod (a, b) {
  return new Real(strMod(a._value, b._value))
}

function isZero (a) {
  return new Equal(a, new Real(0)).def() === True
}

// n % m
module.exports = new Definition(function (a, b) {
  var Times = require('./times')
  var Plus = require('./plus')
  var Power = require('./power')

  if (!a || !b) return
  if (isZero(a)) return a

  var ahd = a.head().def()
  var bhd = b.head().def()

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

  if (ahd === Plus || ahd === Times) {
    var initial = ahd === Plus ? '0' : '1'
    var nReal = initial
    var other = []

    var zero = new Real(0)

    // Combine iteratively:
    if (a.args().some(function (arg) {
      var x = module.exports(arg, b)
      var e = new Equal(x, zero)
      if (e === true) return ahd === Times
      if (x.head().def() === Real && bhd === Real) {
        // TODO: move to Real
        if (ahd === Plus) {
          nReal = strMod(strPlus(nReal, x._value), b._value)
        } else {
          nReal = strMod(strTimes(nReal, x._value), b._value)
        }
      } else {
        other.push(x)
      }
    })) return zero
    if (nReal !== initial) {
      other.push(new Real(nReal))
    }
    return new Expression(
      a.head(),
      other
    )
  }
  if (a.head().def() === Power) {

  }
})
