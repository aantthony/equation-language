/* global describe */

var CAS = require('../')

global.Expression = CAS.Expression
global.Context = CAS.Context
global.Definition = CAS.Definition

CAS.Definition.DEBUG_MODE = true

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
load('latex')

// Expression manipulation
load('rules')

// Context

// Functions
load('compile-js')

load('exprs')
