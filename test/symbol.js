'use strict'

/* global it */

var expect = require('expect')

var Context = global.Context
var Expression = global.Expression
var Definition = global.Definition

it('should have recursive .head()', function () {
  var context = new Context()

  var symbol = context.parse('Symbol')
  var head = context.parse('Head')

  expect(head).toBeAn(Expression)
  expect(symbol).toBeAn(Expression)

  expect(symbol.def()).toExist()
  expect(head.def()).toExist()

  expect(symbol.head().head().head().head()).toBe(symbol.head().head())

  var headOfSymbol = head.def()(symbol)
  expect(headOfSymbol).toBeAn(Expression)
  expect(headOfSymbol.def(context) === symbol.def()).toBe(true)
})
it('should bind to symbols', function () {
  var context = new Context()
  var sine = new Definition()
  var SymbolDefinition = Context.builtin.Symbol
  context.set('x', sine)
  var x = context.eval('x')
  expect(x.head().def()).toBe(SymbolDefinition)
  expect(x._value).toBe('x')

  var unbounded = context.eval('y')
  expect(unbounded.head().def()).toBe(SymbolDefinition)
  expect(unbounded._value).toBe('y')
})
