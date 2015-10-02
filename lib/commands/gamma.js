'use strict'

var Definition = require('../definition')
module.exports = new Definition(function (x) {
  if (!x) return
}, [Definition.NUMERIC])
