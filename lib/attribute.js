exports.PROTECTED = {name: 'PROTECTED'}
exports.LOCKED = {name: 'LOCKED'}
exports.READ_PROTECTED = {name: 'READ_PROTECTED'}
exports.FLAT = {name: 'FLAT'}
exports.ONE_IDENTITY = {name: 'ONE_IDENTITY'}
exports.ORDERLESS = {name: 'ORDERLESS'}
exports.HOLD_LIST = {name: 'HOLD_LIST'}
exports.NUMERIC = {name: 'NUMERIC'}
exports.HOLD_FIRST = {name: 'HOLD_FIRST'}
exports.HOLD_REST = {name: 'HOLD_REST'}
exports.HOLD_ALL = {name: 'HOLD_ALL'}
exports.HOLD_ALL_COMPLETE = {name: 'HOLD_ALL_COMPLETE'}

// F[x=>x^2] :> x => F[x^2] unless HOLD_FUNCTION is set
exports.HOLD_FUNCTION = {name: 'AUTO_FUNCTION'}
