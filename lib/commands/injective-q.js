var Definition = require('../definition')

// var True = require('./true')

module.exports = new Definition(function (expr) {
  if (!expr) return
  var def = expr.def()
  if (def) {
    // if (def.has(Definition.ONE_IDENTITY)) {
    //   return True.symbol('True')
    // }
  }
})
