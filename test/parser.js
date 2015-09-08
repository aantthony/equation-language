/* global it */

var Context = global.Context

var exprs = [
  'a+b',
  'a+b+c',
  'a+b+c+d',
  'a*b',
  'a*b*c',
  'a+b+c*d',
  'a/b',
  'a/ (b+c)',
  'a / (b+c)',
  'a/(b+c)',
  'a*(b+c)',
  'a(b+c)',
  'Sin[a+b]',
  'Sin[]',
  'a + b',
  ' a + b',
  ' a + b ',
  'a +b',
  'a+ b',
  'a+ b ',
  '1+2',
  '3(2)',
  '3( 2)',
  '3 (2 )',
  ' 2 (   1) ',
  '1+sin(x)',
  '1-3',
  '1/8',
  'x_',
  'x:_',
  'x_+y_ :> Sin[x]',
  'x=y',
  '1',
  '-1',
  '+2',
  '++3',
  '----4',
  '3--2',
  '3---3',
  '3----4',
  '3++2',
  '3+++3',
  '3++++4',
  '(8)',
  '(+8)',
  '+(8)',
  '-(8)-3',
  '[1,2,3]',
  'Replace[x, x:_ :> 2]',
  'Plus[1,2,3,43,45,5]',
  '_',
  '_.',
  'MatchQ[x, Times[n_. , x_]]',
  'sin u',
  'sin u cos v',
  'sin a+b + cos c+d',
  'sin a+b+cos c+d',
  'sin(u+v) - cos(c+d)',
  'Sin(u+v) * cos(e*d)',
  'f[x] + g[x]',
  'f[x]+g[x]'
]

exprs.forEach(function (str) {
  it(str, function () {
    var context = new Context()
    return context.parse(str)
  })
})
