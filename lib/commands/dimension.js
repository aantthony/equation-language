'use strict'

var Definition = require('../definition')
var List = require('./list')
var Real = require('./real')
var Plus = require('./plus')
var Times = require('./times')
var Concat = require('./concat')
var Transpose = require('./transpose')
var Reverse = require('./reverse')

// dim([1,2,3]) = [3,1]
// dim([[1,2,3]]) = [1,3]
// dim([[1,2,3]].[1,2,3]) = [1,1]
// dim([[]])
// dim()
//
var dim = module.exports = new Definition(function (expr) {
  if (!expr) return
  var hd = expr.head().def()
  if (!hd) return
  var firstArg = expr.args()[0]
  if (hd === Real) {
    return new List()
  }
  if (hd === List) {
    var innerDim = dim(firstArg)
    var nOuter = new Real(expr.args().length)
    return new Concat(new List(new List(nOuter), innerDim))
  }
  if (hd === Plus) {
    return dim(firstArg)
  }
  if (hd === Transpose) {
    return new Reverse(dim(firstArg))
  }
  if (hd === Times) {
    var dAll = dim(firstArg)
    expr.args().forEach(function (arg, i) {
      if (i === 0) return
      var d = dim(arg)

    })
    return dAll
  }
  if (!hd.has(Definition.HOLD_LIST) && firstArg) {
    return dim(firstArg)
  }
})
