'use strict'

var jisonParser = require('../../../grammar/syntax.out').parser
jisonParser.lexer = require('./lex')

module.exports = function (str) {
  return jisonParser.parse(str)
}
