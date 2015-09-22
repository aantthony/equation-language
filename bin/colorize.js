var lex = require('../lib/language/string-to-ast/lex')
var chalk = require('chalk')

var COLORS = {
  KEYWORD: chalk.bold.magenta,
  LETTER: chalk.cyan,
  IDENTIFIER: chalk.cyan,
  NUMBER: chalk.yellow,
  WHITE: chalk.white,
  STRING: chalk.green,
  '"': chalk.green
}

module.exports = function colorize (str, context) {
  var tokens = lex.tokenize(str)
  // console.log(tokens)
  var stack = []
  tokens.forEach(function (token, index) {
    if (token.type === '(' || token.type === '[' || token.type === '{') {
      token.bracStart = true
      stack.push(token)
      var left = tokens[index - 1]
      if (left) {
        token.left = left
        left.calling = true
        left.caller = token
      }
    } else if (token.type === ')' || token.type === ']' || token.type === '}') {
      token.bracEnd = true
      var closing = stack.pop()
      if (closing) {
        closing.closed = true
        if (closing.left) {
          closing.left.calling = false
        }
      }
    }
  })
  var top = stack[stack.length - 1]

  return tokens.map(function (token, index) {
    if (token.bracStart) {
      if (token === top) return chalk.magenta.bold.underline(token.text)
      if (!token.closed) return chalk.blue(token.text)
      return token.text
    }
    var col = COLORS[token.type] || chalk.white
    if (token.type === 'LETTER' || token.type === 'IDENTIFIER') {
      var def = context.get(token.text)
      if (def) {
        col = chalk.white
      } else {
        col = chalk.cyan
      }
      if (token.calling) col = col.bold
      if (token.calling && token.caller === top) col = col.underline
    }
    return col(token.text)
  }).join('')
}
