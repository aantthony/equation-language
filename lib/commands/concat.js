var Definition = require('../definition')
var Expression = require('../expression')

var List = require('./list')

// [[a]] => [a]
module.exports = new Definition(function (expr) {
  if (expr && expr.head().def() === List) {
    var args = expr.args()
    if (args.every(function (arg) {
      return arg.head().def() === List
    })) {
      var combined = []
      expr.args().forEach(function (arg) {
        combined = combined.concat(arg.args())
      })
      return new Expression(
        List.symbol('List'),
        combined
      )
    }
  }
})
