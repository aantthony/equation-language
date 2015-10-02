// Terminal tokens:
// var TOKEN_EOF = 'EOF'
// var TOKEN_NUMBER = 'NUMBER'
var TOKEN_IDENTIFIER = 'IDENTIFIER'
var TOKEN_SPACE = 'SPACE'
// var TOKEN_STRING = 'STRING'

var STATE_WHITESPACE = 'STATE_WHITESPACE'
var STATE_OPERATOR = 'STATE_OPERATOR'
var STATE_LONG = 'STATE_LONG'
var STATE_STRING = 'STATE_STRING'
var STATE_NUMBER = 'STATE_NUMBER'
var STATE_LETTER = 'STATE_LETTER'

var OPS_SINGLE_ONLY = '~`!@#$%*()-+[]{}"\',^'.split('')
var OPS = OPS_SINGLE_ONLY.concat([
  '=', '>', '<', ':', '_', '/',
  '_.',
  '!=', '>=', '<=', '=>', '->', '&&', '||', '^^', ':>', '==',
  '//', '/.', '//.'
])

var CHARS_OPS = OPS.join('').split('')
var CHARS_NUM = '1234567890'.split('')

var VALID_OPERATOR_STATES = CHARS_OPS.concat(OPS)

function isWhitespace (str) {
  return /^\s$/.test(str)
}

function canBeOperator (str) {
  return ~VALID_OPERATOR_STATES.indexOf(str)
}

function detectState (str) {
  if (isWhitespace(str)) {
    return STATE_WHITESPACE
  }
  if (str === '"') {
    return STATE_STRING
  }
  if (str === '\\') {
    return STATE_LONG
  }
  if (~CHARS_NUM.indexOf(str)) {
    return STATE_NUMBER
  }
  if (canBeOperator(str)) {
    return STATE_OPERATOR
  }
  return STATE_LETTER
}

module.exports = function transform (char, state, write) {
  if (state.state === null) {
    // Initial state
    state.text = char
    state.state = detectState(char)

    if (state.state === TOKEN_IDENTIFIER) {
      write(TOKEN_IDENTIFIER, state.text)
      state.state = null
    }
  } else if (state.state === STATE_WHITESPACE) {
    if (!isWhitespace(char)) {
      write(TOKEN_SPACE, null)
      state.state = null
      transform(char, state, write)
    }
  } else if (state.state === STATE_OPERATOR) {
    if (!canBeOperator(state.text + char)) {
      write(state.text, state.text)
      state.state = null
      transform(char, state, write)
    } else {
      state.text += char
    }
  } else if (state.state === STATE_LONG) {
    if (isWhitespace(char) || canBeOperator(char) || ~CHARS_NUM.indexOf(char)) {
      write(state.text, state.text)
      state.state = null
      transform(char, state, write)
    } else {
      state.text += char
    }
  } else if (state.state === STATE_NUMBER) {
    if (char === '.') {
    }
    if (!~CHARS_NUM.indexOf(char)) {
      return null
    }
  }
}
