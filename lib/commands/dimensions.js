'use strict'

var Definition = require('../definition')
var List = require('./list')
var Real = require('./real')
var Plus = require('./plus')
var Times = require('./times')
var Dot = require('./dot')
var Concat = require('./concat')
var Transpose = require('./transpose')
var Reverse = require('./reverse')
var Length = require('./length')
var ArrayTail = require('./array-tail')
var ArrayWithoutLast = require('./array-without-last')

// dim([1,2,3]) = [3]
// dim([[1,2,3]]) = [1,3]
// dim([[1,2,3]].[1,2,3]) = [1,1]
// dim([[]])
// dim([[1],[2],[3]]) = [3,1]
//
//       1 2 3     1 2 3 4                             a b c d
// dim ( 4 5 6  .  5 6 7 8    )  = f([2,3], [3,4]) = dim ( e f g h  ) = [2,4]
//                 9 0 1 2
//
// dim( [1,2,3] * [[1],[2],[3]]) = f( [3], [3, 1]  ) =
//
var dim = module.exports = new Definition(function (expr) {
  if (!expr || arguments.length > 1) return
  var hd = expr.head().def()
  if (!hd) return
  var firstArg = expr.args()[0]
  if (hd === Real) {
    return new List()
  }
  if (hd === List) {
    if (!firstArg) return
    var innerDim = dim(firstArg)
    var nOuter = new Length(expr)
    return new Concat(new List(new List(nOuter), innerDim))
  }
  if (hd === Plus) {
    return dim(firstArg)
  }
  if (hd === Transpose) {
    return new Reverse(dim(firstArg))
  }
  if (hd === Dot) {
    var dAll = dim(firstArg)
    expr.args().forEach(function (arg, i) {
      if (i === 0) return
      var d = new ArrayTail(dim(arg))
      dAll = new Concat(new List(new ArrayWithoutLast(dAll), d))
    })
    return dAll
  }
  if (hd === Times) {

  }

  if (!hd.has(Definition.HOLD_LIST) && firstArg) {
    return dim(firstArg)
  }
})
