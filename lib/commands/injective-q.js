var Definition = require('../definition')

var True = require('./true')
var List = require('./list')

module.exports = new Definition(function (expr) {
  if (!expr) return
  var def = expr.def()
  if (def) {
    if (def === List) return True.symbol()
    // if (def.has(Definition.ONE_IDENTITY)) {
    //   return True.symbol('True')
    // }
  }
})
