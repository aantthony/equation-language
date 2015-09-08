'use strict'

/* global it */

var expect = require('expect')

var Context = global.Context
var Expression = global.Expression
var Definition = global.Definition

it('should have recursive .head()', function () {
  var context = new Context()

  var Symbol = context.parse('Symbol')
  var Head = context.parse('Head')

  expect(Symbol.def(context)).toExist()
  expect(Head.def(context)).toExist()

  var head = Symbol.head()
  expect(head).toBeAn(Expression)

  var symbolHead = Head(Symbol).eval(context)
  expect(symbolHead).toBeAn(Expression)
  expect(head.def(context) === Symbol.def(context)).toBe(true)
})
it('should bind to symbols', function () {
  var context = new Context()
  var sine = new Definition()
  var x = context.eval('x', {x: sine})
  var Symbol = new Expression.Symbol('Symbol')
  expect(x.head().def(context) === Symbol.def(context)).toBe(true)
  expect(x.symbolName).toBe('x')

  var unbounded = context.eval('y', {x: sine})
  expect(unbounded.head().def(context)).toBe(Symbol.def(context))
  expect(unbounded.symbolName).toBe('y')
})
