javascript-cas
==============

[![NPM Version](https://img.shields.io/npm/v/javascript-cas.svg)](https://www.npmjs.com/package/javascript-cas)
[![Build Status](https://img.shields.io/travis/aantthony/javascript-cas/master.svg)](https://travis-ci.org/aantthony/javascript-cas)
[![Coverage Status](https://img.shields.io/coveralls/aantthony/javascript-cas/master.svg)](https://coveralls.io/r/aantthony/javascript-cas?branch=master)
[![NPM Downloads](https://img.shields.io/npm/dm/javascript-cas.svg)](https://www.npmjs.com/package/javascript-cas)
[![License](https://img.shields.io/npm/l/javascript-cas.svg)](https://www.npmjs.com/package/javascript-cas)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Javascript CAS is a simple computer algebra system designed for client-side use in web apps (and node.js).

```javascript
var CAS = require('javascript-cas')

var math = new CAS.Context()

var y = math.eval('x^2 + 3')
var x = y.vars.x

// Differentiate with respect to x
var diff = CAS.builtin.D
var dy = D(y, x)

// Compile a javascript function
var compile = require('javascript-cas/compile')
var fn = compile(dy, [x])

// now evaluation of the derivative is fast:
var x = fn(3.1) // Returns a javascript number.
```

### Features
- Parsing latex expressions efficiently
- Differentiation
- Export expressions to javascript
- Export expressions to GLSL
- Export expressions to LaTeX
- Complex Numbers
- Sums
- Vectors (dot products, cross products, gradient/curl etc).
- Finding roots (intersections) (Not yet implemented)
- Finding singularities (Not yet implemented)


https://chrome.google.com/webstore/detail/graphtk/nkhkaamdeplibnmodcgodlkghphdbahk?utm_source=chrome-ntp-launcher
