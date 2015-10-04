/* global it */

var Context = global.Context

function validateSame (str, code) {
  var e1 = Context.parse(str, {}, 'latex')

  var scope = e1.unbound
  var e2 = Context.parse(code, scope)

  var match = new Context.builtin.Equal(e1, e2)
  if (match.def() !== Context.builtin.True) {
    throw new Error('Expression not === True:' + require('chalk').white('\n') + match.inspect())
  }
}

function t (description, latex, code, scopegen) {
  it(description + ': ' + latex + ' = ' + code, function () {
    validateSame(latex, code)
  })
}

// Could run same lexer and parser
t('should parse 3', '3', '3')
// Requires a different lexer
t('should imply products', 'xy', 'x*y')
t('should imply multiplication', 'y=f\\left(x\\right)', 'y=ApplyLatex[f,x]')
// it could modify the code AST and iterate through `Times` calls
// Probably better for things like y=\\sin
t('should parse sin', 'y = \\sin x', 'y = Sin[x]')
// implied function call
t('should handle parens', 'y=\\sin\\left(x\\right)', 'y=Sin[x]')
t('should not catch + in implied sine call', '\\sin x+y', 'Sin[x]+y')
t('should catch factor in sine call', '\\sin\\left(x+y\\right)', 'Sin[x+y]')
t('should parse square roots', '\\sqrt{x+y}', 'Sqrt[x+y]')
t('should handle implied function calls', 'y=\\sin x', 'y=Sin[x]')
t('should handle fractions', '\\frac{1}{2}', 'Fraction[1,2]')
t('should handle implied function calls in fractions', '\\frac{\\sin x}{\\cos y}', 'Fraction[Sin[x], Cos[y]]')
t('should handle inequality signs', 'y\\le2', 'LessEqual[y, 2]')
t('should handle products', 'z=x\\cdot y', 'z=Dot[x,y]')
t('should handle implied products', 'z=xy', 'z=Times[x,y]')
t('should handle short exponents', 'z=x^2', 'z=Power[x,2]')
t('should handle long exponents', 'z=x^{2+1}', 'z=Power[x,2+1]')
t('should handle long power expressions', '\\left(x+1\\right)^{2+1}', 'Power[x+1, 2+1]')
t('should handle pi', 'x=\\pi', 'x=Pi')
// t('should handle sums', '\\sum_{_{n=0}}^{30}n^2', 'Sum[n^2, n, 0, 30]')
// t('should handle sums', '\\sum_{_{n=0}}^{k}\\left(n^2+32\\right)', 'Sum[n^2+32, n, 0, k]')
// t('should handle vectors', '\\left(0,1\\right)', '[0,1]')
t('should handle long sine arguments', '\\cos20u+\\sin y', 'Cos[20u]+Sin[y]')
// t('should handle log base 10', '\\log_{10}x', 'LogN[10,x]')
t('should handle log', '\\log x', 'Log[x]')
t('should handle spaces in log', '\\log\ x', 'Log[x]')
t('should handle derivatives', '\\frac{d}{dx}\\left(x^2\\right)', 'D[x^2, x]')
t('should handle derivatives of adjacent expressions', '\\frac{d}{dx}x^2+y', 'D[x^2,x] + y')
t('should handle postfix factorial operator', 'x!', 'Factorial[x]')
t('should handle the gamma operator', '\\Gamma\\left(x\\right)', 'Gamma[x]')
t('should imply multiplication (?)', '(x)(y)', 'ApplyLatex[x,y]')
t('should imply function calls', 'y=f\\left(x\\right)', 'y=ApplyLatex[f,x]')
