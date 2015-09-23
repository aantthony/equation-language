var Expression = require('../expression')
var Definition = require('../definition')

var List = require('./list')
var ESymbol = require('./symbol')

var attributes = {
  AttributeFlat: Definition.FLAT,
  AttributeOrderless: Definition.ORDERLESS,
  AttributesOneIdentity: Definition.ONE_IDENTITY,
  AttributeHoldList: Definition.HOLD_LIST,
  AttributeNumeric: Definition.NUMERIC,
  AttributeHoldFirst: Definition.HOLD_FIRST,
  AttributeHoldAll: Definition.HOLD_ALL
}

module.exports = new Definition(function (expr) {
  var def = expr && expr.def()
  if (def) {
    var symbols = Object.keys(attributes)
    .map(function (attributeName) {
      var attr = attributes[attributeName]
      if (def.has(attr)) return new ESymbol(attributeName)
    })
    .filter(Boolean)

    return new Expression(List.symbol('List'), symbols)
  }
})
