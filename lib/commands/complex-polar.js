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

module.exports = new Definition(function (z) {
  var d = z.def()
  if (d === E || d === Pi || z.head().def() === Real) return new List(z, new Real(0))
  if (d === I) return new List(new Real(1), new Times(Pi.symbol(), new Real(0.5)))
  var hd = z.head().def()
  if (hd === Plus) {
    var terms = z.args().map(function (term) {
      return module.exports(term)
    })
    return new List(
      new Expression(z.head(), terms.map(function (term) { return term.at(1) })),
      new Expression(z.head(), terms.map(function (term) { return term.at(2) }))
    )
  }
  if (hd === Times) {
    // (a+bi)(c+di) = ac + adi + bci - bd
    //              = (ac - bd) + (ad + bc)
    var a = new Real(1)
    var b = new Real(0)
    z.args().forEach(function (factor) {
      var parts = module.exports(factor)
      var c = parts.at(1)
      var d = parts.at(2)
      var newA = new Plus(new Times(a, c), new Times(new Real(-1), b, d))
      var newB = new Plus(new Times(a, d), new Times(b, c))
      a = newA
      b = newB
    })
    return new List(a, b)
  }
  if (hd === Power) {
    // (a+bi) ^ (c+di)
  }
  return new List(new Real(99), new Real(892))
})
