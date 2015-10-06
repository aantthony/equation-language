var Expression = require('../expression')
var Definition = require('../definition')

var List = require('./list')

var Real = require('./real')

var E = require('./e')
var Pi = require('./pi')
var I = require('./i')

var Plus = require('./plus')
var Times = require('./times')
var Power = require('./power')

var Less = require('./less')

var Log = require('./log')
var Cos = require('./cos')
var Sin = require('./sin')

var ComplexCartesian = require('./complex-cartesian')
var ArcTan = require('./arc-tan')
var At = require('./at')

function at (expr, n) {
  return new At(expr, new Real(n))
}

function plus (z) {
  var cart = new ComplexCartesian(z)
  var a = at(cart, 0)
  var b = at(cart, 1)
  var half = new Real('0.5')
  var two = new Real(2)
  return new List(
    new Power(
      new Plus(new Power(a, two), new Power(b, two)),
      half
    ),
    new ArcTan(a, b)
  )
}
function times (z) {
  // a exp(i b) * c exp (i d) = ac exp (i (b+d))
  var a = new Real(1)
  var b = new Real(0)
  z.args().forEach(function (factor) {
    var parts = module.exports(factor)
    var c = at(parts, 0)
    var d = at(parts, 1)
    var newA = new Times(a, c)
    var newB = new Plus(b, d)
    a = newA
    b = newB
  })
  return new List(a, b)
}

function power (z) {
  var polB = module.exports(z.at(1))
  var cartE = new ComplexCartesian(z.at(2))
  var a = at(polB, 0)
  var b = at(polB, 1)
  var c = at(cartE, 0)
  var d = at(cartE, 1)
  // z = f * g
  // g = exp(i * (b+d))
  // f = a^(c-bd) = a^y = (a^2)^(y/2) exp(i y * arg(a))
  var argA = new Less(a, new Real(0)).apply(
    Pi.symbol(),
    new Real(0)
  )

  var y = new Plus(
    c,
    new Times(
      new Real(-1),
      b,
      d
    )
  )
  var argF = new Times(y, argA)
  var magF = new Power(
    new Power(a, new Real(2)),
    new Times(
      y,
      new Real('0.5')
    )
  )
  return new List(
    magF,
    new Plus(b, d, argF)
  )
}

module.exports = new Definition(function (z) {
  var d = z.def()
  if (d === E || d === Pi || z.head().def() === Real) return new List(z, new Real(0))
  if (d === I) return new List(new Real(1), new Times(Pi.symbol(), new Real('0.5')))
  var hd = z.head().def()
  if (hd === Plus) return plus(z)
  if (hd === Times) return times(z)
  if (hd === Power) return power(z)
  // return new List(new Real(99), new Real(892))
})
