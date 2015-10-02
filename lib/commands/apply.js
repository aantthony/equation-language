var Expression = require('../expression')
var Definition = require('../definition')
var FunctionQ = require('./function-q')
// var List = require('./list')
var True = require('./true')
module.exports = new Definition(function (expr, x) {
  if (!expr) return
  // TODO: return direct expression?
  if (new FunctionQ(expr).def() === True) {
    return new Expression(expr, [x])
  }
})
