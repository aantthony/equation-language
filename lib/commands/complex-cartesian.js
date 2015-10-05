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

var At = require('./at')

function at (expr, n) {
  return new At(expr, new Real(n))
}


function power (z) {
  var cartB = new ComplexCartesian(z.at(1))
  var cartE = new ComplexCartesian(z.at(2))
  var a = at(cartB, 0)
  var b = at(cartB, 1)
  var c = at(cartE, 0)
  var d = at(cartE, 1)
  var two = new Real(2)
  var hlm = new Times(new Real('0.5'), new Log(new Plus(new Power(a, two), new Power(b, two))))
  var theta = new ArcTan(a, b)
  var hmld_tc = new Plus(
    new Times(hlm, d),
    new Times(theta, c)
  )
  var e_hmlc_td = new Power(
    E.symbol(),
    new Plus(
      new Times(hlm, c),
      new Times(new Real(-1), theta, d)
    )
  )
  return new Times(
    e_hmlc_td,
    new List(
      new Cos(hmld_tc),
      new Sin(hmld_tc)
    )
  )
}

module.exports = new Definition(function (z) {
  var d = z.def()
  if (d === E || d === Pi || z.head().def() === Real) return new List(z, new Real(0))
  if (d === I) return new List(new Real(0), new Real(1))
  var hd = z.head().def()
  if (hd === Plus) {
    var terms = z.args().map(function (term) {
      return module.exports(term)
    })
    return new List(
      new Expression(z.head(), terms.map(function (term) { return at(term, 0) })),
      new Expression(z.head(), terms.map(function (term) { return at(term, 1) }))
    )
  }
  if (hd === Times) {
    // (a+bi)(c+di) = ac + adi + bci - bd
    //              = (ac - bd) + (ad + bc)
    var a = new Real(1)
    var b = new Real(0)
    z.args().forEach(function (factor) {
      var parts = module.exports(factor)
      var c = at(parts, 0)
      var d = at(parts, 1)
      var newA = new Plus(new Times(a, c), new Times(new Real(-1), b, d))
      var newB = new Plus(new Times(a, d), new Times(b, c))
      a = newA
      b = newB
    })
    return new List(a, b)
  }
  if (hd === Power) {
    // (a+bi) ^ (c+di)
    return power(z)
  }
  // return new List(new Real(99), new Real(892))
})
