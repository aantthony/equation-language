/* global describe */

function load (path) {
  describe(path, function () {
    require('./' + path)
  })
}

// Expression
load('symbol')

// Lexer

// Parser
load('parser')

// Expression manipulation
load('rules')

// Context

// Functions
load('compile-js')
