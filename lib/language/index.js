var makeAST = require('./string-to-ast')
var makeExpression = require('./ast-to-expression')

exports.parse = function (string, find) {
  return makeExpression(makeAST(string), find)
}
