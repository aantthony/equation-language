/* global before it */

// var expect = require('expect')
var Context = global.Context
var context
before(function () {
  context = new Context()
})

function parseTest (expr) {
  return function () {
    context.parse(expr)
  }
}

it('should compile a+b', parseTest('a+b'))
it('should parse a+b+c', parseTest('a+b+c'))
it('should parse a+b+c+d', parseTest('a+b+c+d'))
