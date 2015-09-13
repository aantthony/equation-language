'use strict'

var Definition = require('../definition')
var List = require('./list')
var sort = require('../sort')

module.exports = new Definition(function (list) {
  if (list && list.head().def() === List) {
    return List.apply(List, sort(list.args()))
  }
})
