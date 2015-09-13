var CAS = require('./')

var builtin = CAS.builtin

function throwError (message) {
  throw new Error(message)
}

var defSymbol = builtin.Symbol || throwError('Missing Symbol.')
var defReal = builtin.Real || throwError('Missing Real.')
var defString = builtin.String || throwError('Missing String.')
var defPlus = builtin.Plus || throwError('Missing Plus.')
var defTimes = builtin.Times || throwError('Missing Times.')
var defPower = builtin.Power || throwError('Missing Power.')
var defSin = builtin.Sin || throwError('Missing Sin.')

function applyDefault (a, b) {
  if (Array.isArray(a) || Array.isArray(b)) {
    var res = 0
    var l = a.length || b.length
    for (var i = 0; i < l; i++) {
      res = res + applyDefault(a[i] || a, b[i] || b)
    }
    return res
  }
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return a * b
    }
  }
  return NaN
}

var common = {
  applyDefault: applyDefault
}

function newFunction (body) {
  return new Function('common', 'def', body) // eslint-disable-line no-new-func
}

module.exports = function (expr, args) {
  args = args || []
  var varsByName = {common: true}
  function makeVariableName (name) {
    name = name || 'x'
    if (!varsByName[name]) {
      varsByName[name] = true
      return name
    }
    for (var i = 1;; i++) {
      if (!varsByName[name + i]) {
        varsByName[name + i] = true
        return name + i
      }
    }
  }

  const argNames = args.map(function (arg) {
    return makeVariableName(arg.symbolName)
  })

  var def = {}

  function define (value, description) {
    var jsName = makeVariableName(description)
    def[jsName] = value
    return 'def.' + jsName
  }
  function get (symbol) {
    var index = args.indexOf(symbol)
    if (index !== -1) return argNames[index]

    var d = symbol.def()
    if (d) {
      if (d.javascript === undefined) throw new Error(symbol.symbolName + ' has no .javascript implementations set.')
      return define(d.javascript, symbol.symbolName)
    }
  }

  var str = compile(expr, define, get)
  var fn = newFunction('return function (' + argNames.join(', ') + ') {\n\treturn ' + str + ';\n}')
  return fn(common, def)
}

function getFunctionName (expr, define, get) {
  var def = expr.def()
  if (def === defPower) return 'Math.power'
  if (def === defSin) return 'Math.sin'
  return compile(expr, define, get)
}

function compile (expr, define, get) {
  function all (args) {
    return args.map(function (arg) { return '(' + compile(arg, define, get) + ')' })
  }

  var hd = expr.head().def()
  if (expr.atomic()) {
    if (!hd) throw new Error('Missing definition for: ' + expr.head().symbolName)
    switch (hd) {
      case defSymbol: return get(expr) || throwError('Unbound symbol: ' + expr.symbolName)
      case defReal: return String(expr.value)
      case defString: return String(expr.value)
      default: throw new Error('Unrecognised atomic expression: ' + expr.head().symbolName)
    }
  }

  switch (hd) {
    case defPlus: return all(expr.args()).join(' + ')
    case defTimes: return all(expr.args()).join(' * ')
    default: return getFunctionName(expr.head(), define, get) + '(' + all(expr.args()).join(', ') + ')'
  }
}
