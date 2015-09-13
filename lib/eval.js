var ATTRIBUTE = require('./attribute')
var SymbolExpression = require('./expression').Symbol
var ApplicativeExpression = require('./expression').ApplicativeExpression

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

function simplifyEvalCall (head, def, args) {
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
        var result = simplifyEvalCall(head, headDef, expr._args)
        // result.eval = noop
        return result
      }
    }
    var res = new ApplicativeExpression(head, expr.args().map(function (argument) {
      return argument.eval()
    }))

    // res.eval = noop

    return res
  }
  return expr
}
