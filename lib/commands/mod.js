var Expression = require('../expression')
var Definition = require('../definition')

var Real = require('./real')

var Times = require('./times')
var Plus = require('./plus')
var Power = require('./power')

function realMod (a, b) {
  return new Real(a._value % b._value)
}

// n % m
module.exports = new Definition(function (a, b) {
  if (!a || !b) return
  if (!a.head().def()) return
  if (a.head().def() === Real) {
    if (b.head().def() === Real) {
      return realMod(a, b)
    }
    return
  }
  if (a.head().def() === Plus || a.head().def() === Times) {
    return new Expression(
      a.head(),
      a.args().map(function (arg) {
        return module.exports(arg, b)
      })
    ).eval()
  }
  if (a.head().def() === Power) {

  }
})
