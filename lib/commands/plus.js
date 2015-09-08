'use strict'

var Definition = require('../definition')
module.exports = new Definition(null, [
  Definition.FLAT,
  Definition.LISTABLE,
  Definition.NUMERIC,
  Definition.ONE_IDENTITY,
  Definition.ORDERLESS
])
