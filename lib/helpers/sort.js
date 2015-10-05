var Expression = require('../expression')

var Real = require('../commands/real')
var ESymbol = require('../commands/symbol')

function first (arr, fn) {
  for (var i = 0; i < arr.length; i++) {
    var r = fn(arr[i], i)
    if (r) return r
  }
}

function atomicPredicate (a, b) {
  if (a.def() && a.def() === b.def()) return 0
  if (a.head().def() === Real) {
    if (b.head().def() === Real) {
      // TODO: Upvalues
      var nA = Number(a._value)
      var nB = Number(b._value)
      return nA < nB ? -1 : 1
    }
    return 1
  }
  if (a.head().def() === ESymbol) {
    if (b.head().def() === ESymbol) {
      // TODO: Upvalues
      return a._value < b._value ? -1 : 1
    }
    return -1
  }
}

function treePredicate (a, b) {
  var argsA = a.args()
  var argsB = b.args()
  if (!argsA.length && !argsB.length) {
    return atomicPredicate(a, b)
  } else if (!argsA.length) {
    return -1
  } else if (!argsB.length) {
    return +1
  }

  return (
    treePredicate(a.head(), b.head())
  ) || (
    argsA.length !== argsB.length ? (argsA.length < argsB.length ? 1 : -1) : 0
  ) || (
    first(argsA, function (argA, index) {
      var argB = argsB[index]
      return treePredicate(argA, argB)
    })
  )
}

module.exports = function (expressions) {
  expressions.every(function (expr) {
    if (!(expr instanceof Expression)) {
      throw new TypeError('Expected array of expressions.')
    }
  })
  return expressions.sort(treePredicate)
}
