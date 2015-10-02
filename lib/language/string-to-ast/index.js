'use strict'

var parser = require('../../../grammar/syntax.out').parser
var lexer = require('./lex')

module.exports = function (str) {
  parser.lexer = lexer
  return parser.parse(str)
}
