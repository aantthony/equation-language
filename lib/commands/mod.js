var Expression = require('../expression')
var Definition = require('../definition')

var Real = require('./real')

var Times = require('./times')
var Plus = require('./plus')
var Power = require('./power')

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
  if (!a || !b) return
  if (isZero(a)) return a
  if (!a.head().def()) return
  if (a.head().def() === Real) {
    if (b.head().def() === Real) {
      return realMod(a, b)
    }
    return
  }

  var ahd = a.head().def()
  var bhd = b.head().def()

  if (ahd === Plus || ahd === Times) {
    var nReal = ahd === Plus ? '0' : '1'
    var other = []

    var zero = new Real(0)

    // Combine iteratively:
    if (a.args().some(function (arg) {
      var x = module.exports(arg, b)
      var e = new Equal(x, zero)
      if (e === true) return ahd === Times
      if (x.head().def() === Real && bhd === Real) {
        if (ahd === Plus) {
          nReal = strMod(strPlus(nReal, x._value), b._value)
        } else {
          nReal = strMod(strTimes(nReal, x._value), b._value)
        }
      } else {
        other.push(x)
      }
    })) return zero
    return new Expression(
      a.head(),
      other.concat([new Real(nReal)])
    ).eval()
  }
  if (a.head().def() === Power) {

  }
})
