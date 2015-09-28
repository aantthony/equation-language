module.exports = evaluate

var ATTRIBUTE = require('../definition/attribute')
var Expression = require('../expression')

var sort = require('../helpers/sort')

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

function simplifyArgs (def, args) {
  if (!def) return args

  var newArgs = args

  if (def.has(ATTRIBUTE.FLAT)) {
    newArgs = flatten(def, newArgs)
  }

  if (def.has(ATTRIBUTE.ORDERLESS)) {
    newArgs = sort(newArgs)
  }

  // if (!def.has(ATTRIBUTE.HOLD_LIST)) {
  //   var n = null
  //   if (newArgs.some(function (arg) {
  //     if (arg.head().def() === List) {
  //       n = arg.args().length
  //       return true
  //     }
  //     return false
  //   })) {
  //     var calls = []
  //     for (var i = 0; i < n; i++) {
  //       var call = newArgs.map(function (arg) {
  //         if (arg.head().def() === List) {
  //           var values = arg.args()
  //           if (values.length !== n) throw new Error('Dimensions mismatch.')
  //           return values[i]
  //         }
  //         return arg
  //       })
  //       calls.push(call)
  //     }
  //     var listSymbol = new SymbolExpression('List', List)
  //     return new ApplicativeExpression(listSymbol, calls.map(function (call) {
  //       return new ApplicativeExpression(head, call)
  //     }))
  //   }
  //   if (n !== null) {
  //
  //   }
  // }

  return newArgs
}

/**
 *
 * Plus[x,y]            -> Plus[x,y]
 * Plus[f,g][y]         -> f[y] + g[y]
 * Identity[x, Sin][y]  -> x[y]
 * Identity[x +Sin][y]  -> x + Sin[y]
 * (x + f) [x]          -> (x + f)[x]
 * (3 + f) [x]          -> f[x] + 3
 * (3)[x]               -> (3)[x]
 * f[x]                 -> f[x]
 * Plus[f][x]           -> f[x]
 * (1+2+3+4+f)[x]       -> 1+2+3+4+f[x]
 * Plus[1,Plus[2,f]][x] -> 1+2+f[x]
 *
 * Sin[x=>x] [y]        -> Sin[f[x]]
 * Identity[x=>x][y]    -> y
 * Plus[x=>x][y]        -> y
 * (x=>x) [y]           -> y
 * (q=>q)[x=>x] [y]     -> y
 * Apply = Function[[a,b], a[b]]
 * Apply[q=>q, x=>x] [y]
 * = Apply[y, y] -> y[y] -> y
 * Plus[q=>q, x=>x] [y]
 * = Plus[y, y]  -> y + y
 * Potentially:
 *
 * (3)[x] = 3
 * (3 + f)[x] = 3[x] + f[x] = f[x]
 *
 *
 * Or:
 *
 * (3)[f][x] = f[f[f[x]]]
 * 3f[x] = Times[3, f[x]]
 */

/**
 * evaluateIn(x=>y, [3]) = 3
 * evaluateIn(2+x=>y, [3]) = 5
 * evaluateIn(Sin, [x]) = Sin[x]
 * evaluateIn(Sin[x], [y]) = Sin[x]
 * evaluateIn(x, [y]) = x
 * evaluateIn(Plus, [x,y]) = Plus[x,y]
 */
function evaluate (expr) {
  if (expr.atomic()) return expr
  var head = evaluate(expr.head())

  var headDef = head.def()

  var args = simplifyArgs(headDef, expr.args())

  if (args.length === 1 && headDef && headDef.has(ATTRIBUTE.ONE_IDENTITY)) {
    return args[0]
  }

  var headHead = head.head()
  var headHeadDef = headHead.def()

  if (headHeadDef && !headHeadDef.has(ATTRIBUTE.HOLD_FUNCTION)) {
    var headArgs = head.args()
    if (headArgs.some(function (arg) {
      var argHead = arg.head()
      var argHeadDef = argHead.def()
      if (argHeadDef && argHeadDef.invoke) {
        return true
      }
    })) {
      var newExpr = new Expression(headHead, headArgs.map(function (arg) {
        return evaluate(new Expression(arg, args))
      }))
      return evaluate(newExpr)
    }
  }

  headHead = head.head()
  headHeadDef = headHead.def()

  if (headHeadDef && headHeadDef.invoke) {
    return evaluate(headHeadDef.invoke(head, args))
  }

  headDef = head.def()
  if (headDef && headDef.run) {
    var runRes = headDef.run(args)
    if (runRes) {
      return evaluate(runRes)
    }
  }

  if (!headDef || !headDef.has(ATTRIBUTE.HOLD_ALL)) {
    args = args.map(evaluate)

    if (headDef && headDef.run) {
      var runRes2 = headDef.run(args)
      if (runRes2) return evaluate(runRes2)
    }
  }

  return new Expression(head, args)
}
