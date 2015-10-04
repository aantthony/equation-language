'use strict'

/**
 * Scanner
 * @type {Jison.Scanner}
 */

// Terminal tokens:
var TOKEN_EOF = 'EOF'
var TOKEN_NUMBER = 'NUMBER'
var TOKEN_IDENTIFIER = 'IDENTIFIER'
var TOKEN_SPACE = 'SPACE'
var TOKEN_STRING = 'STRING'

var TYPE_OPERATOR = 'operator'
var TYPE_STRING = 'string'
var TYPE_STRING_START = 'string_start'
var TYPE_STRING_END = 'string_end'

var TYPE_NUMBER = 'number'
var TYPE_IDENTIFIER = 'identifier'

// Global mutable state:
var text = ''
var index = 0
var last = null
var lastText = null // last non-whitespace token

function read () {
  return text.charAt(index++)
}
function peek () {
  return text.charAt(index)
}

exports.yytext = ''

exports.yyloc = {
  first_column: 0,
  first_line: 1,
  last_line: 1,
  last_column: 0
}

exports.yylloc = exports.yyloc

exports.setInput = function (newText) {
  // Reset state:
  text = newText
  index = 0
  last = null
  lastText = null
  this.yyloc.first_column = 0
  this.yyloc.last_column = 0
}

var chalk = require('chalk')

exports.tokenize = function (str) {
  var tokens = []
  this.setInput(str)

  var index = 0
  do {
    var type = this.lex(true)
    if (type === 'EOF') return tokens
    var yyloc = this.yyloc
    var text = str.substring(index, yyloc.last_column)
    index = yyloc.last_column
    tokens.push({type: type, text: text})
  } while ((1))
}

exports.colorize = function (str) {
  var colors = {
    KEYWORD: chalk.bold.magenta,
    IDENTIFIER: chalk.cyan,
    NUMBER: chalk.yellow
  }
  var tokens = this.tokenize(str)
  return tokens.map(function (token) {
    var col = colors[token.type] || chalk.white
    return col(token.text)
  }).join('')
}

var OPS_SINGLE_ONLY = '~`!@#$%*()-+[]{}"\',^'.split('')
var OPS = OPS_SINGLE_ONLY.concat([
  '=', '>', '<', ':', '_', '/',
  '_.',
  '!=', '>=', '<=', '=>', '->', '&&', '||', '^^', ':>', '==', '::',
  '//', '/.', '//.'
])

var KEYWORDS = [
  'import',
  'export',
  'define',
  'all'
]

var CHARS_OPS = OPS.join('').split('')
var CHARS_NUM = '1234567890'.split('')

var VALID_OPERATOR_STATES = CHARS_OPS.concat(OPS)

// function throwSyntaxError (yyloc, text, index, message) {
//   throw new SyntaxError(
//     '(raw):' + yyloc.first_line + '\n' +
//     '       ' + text + '\n' +
//     '       ' + Array(yyloc.first_column + 1).join(' ') + '^' + Array(yyloc.last_column - yyloc.first_column).join('~') + '\n' +
//     message)
// }

var WHITESPACE_REGEXP = /^\s+$/

exports.consumeWhitespace = function () {
  var nCharsRead = 0
  var yyloc = this.yyloc
  if (peek() === '') return TOKEN_EOF
  var allRead = ''
  while (1) {
    var c = peek()
    // if (c === '') {
    // return TOKEN_EOF
    // }

    if (c === '\n') {
      yyloc.first_line++
      yyloc.last_line++
    } else if (c === '\t' || c === ' ') {
    } else {
      if (!nCharsRead) return
      yyloc.first_column += nCharsRead
      yyloc.last_column += nCharsRead
      this.yytext = allRead
      return TOKEN_SPACE
    }
    allRead += read()
    nCharsRead++
  }
}

function operatorIsPostfix (operator) {
  return [')', ']', '}', '_', '!', '@:_', '@:_.', '_'].indexOf(operator) !== -1
}

exports.lex = function (includeWhitespace) {
  var whitespaceResult = this.consumeWhitespace()
  if (includeWhitespace && whitespaceResult) return whitespaceResult
  if (whitespaceResult === TOKEN_EOF) {
    return whitespaceResult
  }
  var yyloc = this.yyloc

  var current
  var finished = false

  var start = index

  // Consume the first character of the token:
  var firstChar = read()
  var length = 1
  var stringState = 0
  var hasDot = false
  var startsWithBackslash = false

  // Find type:
  if (firstChar === '"') {
    if (last === TYPE_STRING_START || last === TYPE_STRING) {
      current = TYPE_STRING_END
    } else {
      current = TYPE_STRING_START
    }
    finished = true
  } else if (last === TYPE_STRING_START) {
    current = TYPE_STRING
    if (firstChar === '\\') stringState = 1
  } else if (OPS_SINGLE_ONLY.indexOf(firstChar) !== -1) {
    current = TYPE_OPERATOR
    finished = true
  } else if (CHARS_OPS.indexOf(firstChar) !== -1) {
    current = TYPE_OPERATOR
  } else if (CHARS_NUM.indexOf(firstChar) !== -1) {
    current = TYPE_NUMBER
  } else if (firstChar === '.') {
    current = TYPE_NUMBER
    hasDot = true
  } else if (firstChar === '\\') {
    current = TYPE_IDENTIFIER
    startsWithBackslash = true
  } else {
    current = TYPE_IDENTIFIER
    finished = false
  }
  var include = !finished
  var operatorString = firstChar

  // Continuation phase:
  while (include) {
    // Read the next character:
    var c = peek()
    if (c === '') break

    if (current === TYPE_STRING) {
      if (stringState === 1) {
        stringState = 0
      } else if (c === '\\') {
        stringState = 1
      } else if (c === '"') {
        include = false
      }
    // From any state except strings, whitespace can end the token.
    } else if (WHITESPACE_REGEXP.test(c)) {
      include = false
    } else if (current === TYPE_OPERATOR) {
      if (VALID_OPERATOR_STATES.indexOf(operatorString + c) === -1) {
        include = false
      } else {
        operatorString += c
      }
    } else if (current === TYPE_NUMBER) {
      if (hasDot) {
        if (c === '.') {
          include = false
        } else if (CHARS_NUM.indexOf(c) === -1) {
          include = false
        }
      } else {
        if (c === '.') {
          hasDot = true
        } else if (CHARS_NUM.indexOf(c) === -1) {
          include = false
        }
      }
    } else if (current === TYPE_IDENTIFIER) {
      if (c === '.' || c === '\\' || CHARS_OPS.indexOf(c) !== -1) {
        include = false
      }
      if (startsWithBackslash && CHARS_NUM.indexOf(c) !== -1) {
        include = false
      }
    }

    if (include === true) {
      read()
      length++
    }
  }

  var tokenText = text.substring(start, start + length)

  yyloc.last_column += length

  if (current === TYPE_OPERATOR) {
    if (OPS.indexOf(tokenText) === -1) {
      // throwSyntaxError(yyloc, text, index, 'Unknown operator: "' + tokenText + '".')
    }
    if (last === TYPE_IDENTIFIER) {
      if (tokenText === '_') {
        tokenText = '@:_'
      } else if (tokenText === '_.') {
        tokenText = '@:_.'
      }
    }
    if (last === TYPE_OPERATOR || last === null) {
      // An operator after a non-postfix operator implies that the current operator is prefix.
      // If the last operator is not postfix, then use the prefix specific variant:
      if (!last || !operatorIsPostfix(lastText) && lastText !== '@_') {
        if (['(', ')', ']', '{', '}'].indexOf(tokenText) === -1) {
          // console.log('inserting @ because', lastText, 'is not postfix')
          tokenText = '@' + tokenText
        }
      }
    }
  // if (!lastWhitespace && isNotWhitespace(peek())) {
  // if (['^', '*', '/'].indexOf(tokenText) !== -1) {
  // tokenText = 'b' + tokenText
  // }
  // }
  } else if (current === TYPE_IDENTIFIER && tokenText[0] === '\\') {
    tokenText = tokenText.substring(1)
  } else if (current === TYPE_STRING) {
    if (stringState === 1) {
      tokenText = null
    } else {
      tokenText = tokenText.replace(/\\(.)/g, function (match, code) {
        if (code === 'n') return '\n'
        if (code === 'r') return '\r'
        if (code === '"') return '"'
        if (code === '\\') return '\\'
        return code
      })
    }
  } else if (current === TYPE_NUMBER) {
    if (tokenText === '.') {
      current = TYPE_OPERATOR
      tokenText = '*'
    }
  }

  this.yytext = tokenText
  // console.log('TOKEN:', tokenText, current)
  yyloc.first_column += length
  last = current
  lastText = tokenText
  if (current === TYPE_STRING) {
    return TOKEN_STRING
  }
  if (current === TYPE_NUMBER) {
    // if (isNotWhitespace(peek())) {
    //   return TOKEN_COEFF
    // }
    return TOKEN_NUMBER
  }
  if (current === TYPE_IDENTIFIER) {
    if (KEYWORDS.indexOf(tokenText) !== -1) return tokenText
    return TOKEN_IDENTIFIER
  }
  return tokenText
}
