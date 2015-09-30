/* global before it */

// var expect = require('expect')
var Context = global.Context
var context
before(function () {
  context = new Context()
})

var exprs = require('fs').readFileSync(require.resolve('./exprs.eql'), 'utf8').split('\n')
.filter(Boolean)
.filter(function (expr) {
  return !/^\/\//.test(expr)
})

function truthTest (expr) {
  var res = context.eval(expr)
  if (res.def() !== Context.builtin.True) {
    throw new Error('Expression not === True:' + require('chalk').white('\n') + res.inspect())
  }
}

exprs.forEach(function (expr) {
  it(expr, function () {
    truthTest(expr)
  })
})
