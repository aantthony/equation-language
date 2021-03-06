'use strict'

// And and Or have a symmetry corresponding to swapping False for True
module.exports = function (True, False) {
  var Expression = require('../expression')
  var Definition = require('../definition')
  var d = new Definition(function () {
    var args = [].slice.call(arguments)

    if (!args.length) return True.symbol()
    var nArgs = []
    for (var i = 0; i < args.length; i++) {
      var f = args[i]
      if (f.def() === False) return f
      if (f.def() === True) continue
      nArgs.push(f)
    }

    if (nArgs.length === 0) return True.symbol()
    if (nArgs.length === 1) return nArgs[0]
    if (nArgs.length === arguments.length) return
    return new Expression(
      d.symbol(),
      nArgs
    )
  }, [Definition.ONE_IDENTITY, Definition.FLAT, Definition.LAZY])

  return d
}
