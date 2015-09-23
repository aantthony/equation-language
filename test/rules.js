/* global beforeEach it */

var expect = require('expect')
var Context = global.Context
var context
beforeEach(function () {
  context = new Context()
})

it('shold not replace non-matches on symbols', function () {
  var replace = Context.builtin.Replace
  var ruleDelayed = Context.builtin.RuleDelayed
  var Symbol = Context.builtin.Symbol
  var x = new Symbol('x')
  var y = new Symbol('y')
  var two = context.eval('2')
  var rule = ruleDelayed(x, two)
  var result = replace(y, rule).eval(context)
  expect(result).toBe(y)
})

it('should replace symbols', function () {
  var replace = Context.builtin.Replace
  var ruleDelayed = Context.builtin.RuleDelayed
  var two = context.eval('2')
  var x = context.eval('x')
  var rule = ruleDelayed(x, two)
  var result = replace(x, rule).eval(context)
  expect(result).toBe(two)
})

it('should replace exact symbols in expression string', function () {
  var expr = context.eval('Replace[x, x :> 2]')
  var result = expr.eval(context)
  expect(result._value).toBe('2')
})

it('should replace blanks', function () {
  var expr = context.eval('Replace[x, x:_ :> 2]')
  var result = expr.eval()
  expect(result._value).toBe('2')
})

it('should replace blanks with different symbols', function () {
  var expr = context.eval('Replace[y, x:_ :> 2]')
  var result = expr.eval(context)
  expect(result._value).toBe('2')
})

it('should replace exact symbols in addition pattern', function () {
  var expr = context.parse('Replace[x+y, x:_ + y:_ :> 2]')
  var result = expr.eval()
  expect(result.atomic()).toBe(true)
  expect(result._value).toBe('2')
})

it('should instantiate symbols matching addition pattern', function () {
  var expr = context.parse('Replace[a+b, x:_ + y:_ :> Sin[x, y]]')
  var result = expr.eval()
  expect(result.at(0)._value).toBe('Sin')
  expect(result.at(1)._value).toBe('a')
  expect(result.at(2)._value).toBe('b')
  expect(result.args().length).toBe(2)
})

it('should instantiate symbols matching addition pattern (ordered)', function () {
  var expr = context.parse('Replace[b+a, x:_ + y:_ :> Sin[x, y]]')
  var result = expr.eval()
  expect(result.at(0)._value).toBe('Sin')
  expect(result.at(1)._value).toBe('a')
  expect(result.at(2)._value).toBe('b')
  expect(result.args().length).toBe(2)
})

it('should evaluate MatchQ', function () {
  var expr = context.eval('MatchQ[a*b, Times[n_, x_]]')
  expect(expr.def()).toBe(context.eval('True').def())
})

it('should work with OneIdentity attribute', function () {
  var expr = context.eval('MatchQ[x, x_n_.]')
  expect(expr.def()).toBe(Context.builtin.True)
})
