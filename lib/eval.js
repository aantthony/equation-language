var ATTRIBUTE = require('./attribute')
var SymbolExpression = require('./expression').Symbol
var ApplicativeExpression = require('./expression').ApplicativeExpression

var List = require('./commands/list')

var sort = require('./sort')

function flatten (def, args) {
  var all = []
  args.forEach(function (arg) {
    if (arg.head().def() === def) {
      return flatten(def, arg.args())
      .forEach(function (e) {
        all.push(e)
      })
    }
    all.push(arg)
  })
  return all
}

function simplifyEvalCall (def, expr) {
  var head = expr.head()
  var args = expr.args()

  if (def.has(ATTRIBUTE.HOLD_ALL)) {
    if (def.run) return def.run(expr)
    return expr
  }

  if (def.has(ATTRIBUTE.ONE_IDENTITY) && args.length === 1) {
    return args[0].eval()
  }

  var newArgs = args

  if (def.has(ATTRIBUTE.FLAT)) {
    newArgs = flatten(def, newArgs)
  }

  if (def.has(ATTRIBUTE.ORDERLESS)) {
    newArgs = sort(newArgs)
  }

  if (!def.has(ATTRIBUTE.HOLD_LIST)) {
    var n = null
    if (newArgs.some(function (arg) {
      if (arg.head().def() === List) {
        n = arg.args().length
        return true
      }
      return false
    })) {
      var calls = []
      for (var i = 0; i < n; i++) {
        var call = newArgs.map(function (arg) {
          if (arg.head().def() === List) {
            var values = arg.args()
            if (values.length !== n) throw new Error('Dimensions mismatch.')
            return values[i]
          }
          return arg
        })
        calls.push(call)
      }
      var listSymbol = new SymbolExpression('List', List)
      return new ApplicativeExpression(listSymbol, calls.map(function (call) {
        return new ApplicativeExpression(head, call)
      }))
    }
    if (n !== null) {

    }
  }

  newArgs = newArgs.map(function (arg) {
    return arg.eval()
  })

  if (def.run) {
    return def.run(newArgs).eval()
  }

  return new ApplicativeExpression(head, newArgs.map(function (argument) {
    return argument.eval()
  }))
}

module.exports = function (expr) {
  if (expr instanceof ApplicativeExpression) {
    var existingHead = expr.head()
    var head = existingHead.eval()
    if (head instanceof SymbolExpression) {
      var headDef = expr.head().def()
      if (headDef) {
        var result = simplifyEvalCall(headDef, expr)
        // result.eval = noop
        return result
      }
    }
    if (head.head().def().invoke) {
      var resInvoke = head.head().def().invoke(head, expr.args())
      if (resInvoke) return resInvoke
    }
    var res = new ApplicativeExpression(head, expr.args().map(function (argument) {
      return argument.eval()
    }))

    // res.eval = noop

    return res
  }
  return expr
}
