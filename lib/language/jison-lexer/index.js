exports.create = function (transform) {
  var i = 0
  var unshifted = []
  var out = []
  var state = {}
  var str = ''

  function read () {
    if (unshifted.length) return unshifted.pop()
    if (i >= str.length) return null
    return str[i++]
  }
  function write (token) { out.push(token) }

  return {
    yytext: '',
    yyloc: {
      first_column: 0,
      first_line: 1,
      last_line: 1,
      last_column: 0
    },
    setInput: function (input) {
      i = 0
      state = {}
      this.yyloc.first_column = 0
      this.yyloc.last_column = 0
      str = input
    },
    lex: function () {
      if (out.length) return out.shift()
      // Feed input until a token is recognised
      do {
        var char = read()
        transform(char, state, write)
        if (char === 'EOF') break
      } while (!out.length)
      return out.shift()
    }
  }
}
