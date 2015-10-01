/* global it */

var Context = global.Context

function p (str, code) {
  return function test () {
    var e1 = Context.parse(str, {}, 'latex')
    var e2 = Context.parse(code, {})
    var match = new Context.builtin.Equal(e1, e2)
    if (match.def() !== Context.builtin.True) {
      throw new Error('Expression not === True:' + require('chalk').white('\n') + match.inspect())
    }
  }
}

it('should parse 3', p('3', '3'))
it('should parse sin', p('y = \\sin x', 'y = Sin[x]'))
it('should parse square roots', p('\\sqrt{x+y}', 'Sqrt[x*x + y*y]'))
it('should handle parens', p('y=\\sin\\left(x\\right)', 'y=Sin[x]'))
it('should handle implied function calls', p('y=\\sin x', 'y=Sin[x]'))
it('should handle fractions', p('\\frac{1}{2}', '1/2'))
it('should handle implied function calls in fractions', p('\\frac{\\sin x}{\cos y}', '(Sin[x])/(Cos[y])'))
it('should handle inequality signs', p('y\\le2', 'LessEqual[y, 2]'))
it('should handle products', p('z=x\\cdot y', 'z=Dot[x,y]'))
it('should handle implied products', p('z=xy', 'z=Times[x,y]'))
it('should handle short exponents', p('z=x^2', 'z=Power[x,2]'))
it('should handle long exponents', p('z=x^{2+1}', 'z=Power[x,2+1]'))
it('should handle long power expressions', p('\\left(x+1\\right)^{2+1}', 'Power[x+1, 2+1]'))
it('should handle pi', p('x=\\pi', 'x=Pi'))
it('should handle sums', p('\\sum_{_{n=0}}^{30}n^2', 'Sum[n^2, n, 0, 30]'))
it('should handle sums', p('\\sum_{_{n=0}}^{k}\\left(n^2+32\\right)', 'Sum[n^2+32, n, 0, k]'))
it('should handle vectors', p('\\left(0,1\\right)', '[0,1]'))
it('should handle long sine arguments', p('\\cos20u+\\sin y', 'Cos[20u]+Sin[y]'))
it('should handle log base 10', p('\\log_{10}x', 'LogN[10,x]'))
it('should handle log', p('\\log x', 'Log[x]'))
it('should handle spaces in log', p('\\log\ x', 'Log[x]'))
it('should handle derivatives', p('\\frac{d}{dx}\\left(x^2\\right)', 'D[x^2, x]'))
it('should handle derivatives of adjacents expressions', p('\\frac{d}{dx}x^2+y', 'D[x^2,x] + y'))
it('should handle postfix factorial operator', p('x!', 'Factorial[x]'))
it('should handle the gamma operator', p('\Gamma\left(x\right)'))
