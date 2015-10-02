var makeAST = require('./string-to-ast')
var makeASTFromLatex = require('./latex-to-ast')
var makeExpression = require('./ast-to-expression')

exports.parse = function (string, find, format) {
  if (format === 'latex') {
    return makeExpression(makeASTFromLatex(string), find, 'ApplyLatex')
  }
  return makeExpression(makeAST(string), find)
}
