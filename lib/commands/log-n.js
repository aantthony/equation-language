var Definition = require('../definition')
var Log = require('./log')
var Times = require('./times')
var Real = require('./real')
var Power = require('./power')
module.exports = new Definition(function (n, x) {
  if (!n || !x) return
  return new Times(new Log(x), new Power(new Log(n), new Real(-1)))
})
