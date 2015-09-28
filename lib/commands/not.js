'use strict'

var Expression = require('../expression')
var Definition = require('../definition')

var True = require('./true')
var False = require('./false')

var And = require('./and')
var Or = require('./or')

var Less = require('./less')
var LessEqual = require('./less-equal')

module.exports = new Definition(function (x) {
  if (arguments.length !== 1) return
  if (x.def() === True) return False.symbol()
  if (x.def() === False) return True.symbol()
  if (x.head().def() === module.exports && x.args().length === 1) {
    return x.args()[0]
  }
  if (x.head().def() === Less && x.args().length === 2) {
    // NOT(a<b) <=> a>=b
    return new LessEqual(x.args()[1], x.args()[0])
  }
  if (x.head().def() === LessEqual && x.args().length === 2) {
    // NOT(a<=b) <=> a>b
    return new Less(x.args()[1], x.args()[0])
  }
  if (x.head().def() === And) {
    // NOT(a AND b) = NOT a OR NOT b
    return new Expression(
      Or.symbol(),
      x.args().map(function (arg) {
        return new Expression(function () {
          return module.exports(arg)
        })
      })
    )
  }
  if (x.head().def() === Or) {
    // NOT(a OR b) = NOT a AND NOT b
    return new Expression(
      And.symbol(),
      x.args().map(function (arg) {
        return new Expression(function () {
          return module.exports(arg)
        })
      })
    )
  }
})
