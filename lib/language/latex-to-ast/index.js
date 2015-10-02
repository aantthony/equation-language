'use strict'

// Terminal tokens:
// var TOKEN_EOF = 'EOF'
var TOKEN_NUMBER = 'NUMBER'
// var TOKEN_LETTER = 'LETTER'
var TOKEN_IDENTIFIER = 'IDENTIFIER'
var TOKEN_SPACE = 'SPACE'
// var TOKEN_STRING = 'STRING'

var parser = require('../../../grammar/syntax.out').parser
var lexer = require('../string-to-ast/lex')

function isImmediateFunction (token) {
  if (token.type !== TOKEN_IDENTIFIER) return false
  switch (token.text) {
    case '\\sin':
    case '\\cos':
    case '\\tan':
    case '\\log':
    case '\\Gamma':
      return token.text[1].toUpperCase() + token.text.substring(2)
    default:
      return false
  }
}

function peekWhileNot (peek, fn) {
  var i = 0
  var next
  while ((next = peek(i++))) {
    if (fn(next)) break
  }
}

function readTokensForImmediateExpression (read, peek) {
  var toTransform = []
  var next
  // read until "adjacent" expression ends:
  var depthE = 0
  while ((next = peek())) {
    if (next.type === '(' || next.type === '{' || next.type === '[') {
      depthE++
    } else if (next.type === ')' || next.type === '}' || next.type === ']') {
      depthE--
      toTransform.push(read())
      continue
    }
    if (depthE > 0 || next.type === TOKEN_IDENTIFIER || next.type === TOKEN_NUMBER || next.type === '*' || next.type === '^') {
      toTransform.push(read())
    } else {
      // console.log('break on', next, depthE)
      break
    }
  }
  return toTransform
}

function transformTokens (read, peek, write) {
  var token
  while ((token = read())) {
    if (token.type === 'SKIP') {
      // do nothing
    } else if (token.type === TOKEN_IDENTIFIER && token.text[0] !== '\\') {
      var isFirst = true
      token.text.split('').forEach(function (letter) {
        if (!isFirst) {
          write({type: '*', text: '*'})
        }
        isFirst = false
        write({type: token.type, text: letter})
      })
    } else if (token.type === '{') {
      write({type: '(', text: '('})
    } else if (token.type === '}') {
      write({type: ')', text: ')'})
    } else if (token.type === TOKEN_IDENTIFIER) {
      if (token.text === '\\left' || token.text === '\\right') {
      // do nothing
      } else if (token.text === '\\le') {
        write({type: '<=', text: '<='})
      } else if (token.text === '\\lt') {
        write({type: '<', text: '<'})
      } else if (token.text === '\\ge') {
        write({type: '>=', text: '>='})
      } else if (token.text === '\\gt') {
        write({type: '>', text: '>'})
      } else if (token.text === '\\cdot') {
        write({type: '.', text: '.'})
      } else if (token.text === '\\pi') {
        write({type: TOKEN_IDENTIFIER, text: 'Pi'})
      } else if (token.text === '\\sqrt') {
        write({type: TOKEN_IDENTIFIER, text: 'Sqrt'})
        read() // read "{" character
        write({type: '[', text: '['})
        // find final "}" character and *change* it to a ]
        var cdepth = 1
        peekWhileNot(peek, function (next) {
          if (next.type === '{') {
            cdepth++
          } else if (next.type === '}') {
            cdepth--
            if (cdepth === 0) {
              next.type = next.text = ']'
              return true
            }
          }
        })
      } else if (token.text === '\\frac') {
        var sdepth = 0
        var count = 0
        write({type: TOKEN_IDENTIFIER, text: 'Fraction'})
        write({type: '[', text: '['})
        peekWhileNot(peek, function (next) {
          if (next.type === '{') {
            if (sdepth === 0) {
              next.type = 'SKIP'
            }
            sdepth++
          } else if (next.type === '}') {
            sdepth--
            if (sdepth === 0) {
              if (count === 0) {
                next.type = next.text = ','
              }
              if (count === 1) {
                next.type = next.text = ']'
                return true
              }
              count++
            }
          }
        })
      } else if (isImmediateFunction(token)) {
        var name = isImmediateFunction(token)
        write({type: TOKEN_IDENTIFIER, text: name})

        // consume "adjacent" expression:

        var next = read()
        while (next && next.type === TOKEN_SPACE) {
          next = read()
        }

        if (!next) return

        if (next.type === 'IDENTIFIER' && next.text === '\\left') {
          read() // read "(" character
          write({type: '[', text: '['})
          // find final ")" character and *change* it to a ]
          var depth = 1
          peekWhileNot(peek, function (next) {
            if (next.type === '(') {
              depth++
            } else if (next.type === ')') {
              depth--
              if (depth === 0) {
                next.type = next.text = ']'
                return true
              }
            }
          })
        } else {
          var toTransform = readTokensForImmediateExpression(read, peek)
          write({type: '[', text: '['})
          transformTokensArray([next]).forEach(write)
          transformTokensArray(toTransform).forEach(write)
          write({type: ']', text: ']'})
        }
      } else {
        write(token)
      }
    } else {
      write(token)
    }
  }
}

function transformTokensArray (tokens) {
  var i = 0

  function read () { return tokens[i++] }
  function peek (n) { return tokens[i + (n || 0)] }

  var newTokens = []
  function write (token) {
    if (token.text === '\\left') throw new Error('eft')
    if (!token) throw new Error('Invalid token.')
    newTokens.push(token)
  }
  transformTokens(read, peek, write)
  return newTokens
}

function productFactors (node) {
  if (!Array.isArray(node)) return [node]
  var res = []
  if (node[0] === '*') {
    node.forEach(function (factor, i) {
      if (!i) return
      productFactors(factor).forEach(function (f) {
        res.push(f)
      })
    })
  }
  return res
}

/**
 * Is it the derivative operator?
 * @param  {AST} node
 * @return {[String]} variables to differentiate wrt
 */
function makeDerivativeOperator (node) {
  // console.log('check', node)
  if (node[0] !== 'default' || node[1] !== 'Fraction') return
  var farg = node[2]
  if (!Array.isArray(farg)) return
  if (farg[0] !== '[') return
  var n = farg[1]
  var m = farg[2]

  var nth

  if (n === 'd') {
    nth = 1
  } else if (Array.isArray(n) && n.length === 3 && n[0] === '^' && n[1] === 'd' && n[2].number !== undefined) {
    nth = Number(n[2].number)
  }

  if (!nth) return

  if (!Array.isArray(m)) return
  var dfactors = productFactors(m)
  var res = []
  var needed = nth
  // console.log('needed', dfactors)
  if (dfactors.some(function (x) {
    if (x === 'd') {
      needed--
    } else if (typeof x === 'string') {
      res.push(x)
    } else {
      return true
    }
  })) return
  if (needed !== 0) return
  if (res.length !== nth) return
  return res
}

function transformTree (node) {
  if (Array.isArray(node)) {
    // console.log(require('util').inspect(node, {depth: null}))
    if (node[0] === 'default') {
      var d = makeDerivativeOperator(node[1])
      if (d) {
        var expr = node[2]
        d.forEach(function (dd) {
          expr = ['default', 'D', ['[', expr, dd]]
        })
        return expr
      }
    }
    return node.map(transformTree)
  }
  return node
}

module.exports = function (str) {
  if (typeof str !== 'string') throw new Error('Not a string.')
  var tokens = lexer.tokenize(str)
  // console.log('tokens', tokens)

  var newTokens = transformTokensArray(tokens)

  var newStr = newTokens.map(function (token) {
    return token.text
  }).join(' ')

  // console.log('new str', newStr)

  parser.lexer = lexer
  var ast = parser.parse(newStr)
  return transformTree(ast)
}
