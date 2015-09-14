// When you modify this file, use `npm run build-grammar`
%left ','
%left '//'
%left '/.'
%left '//.'
%left '->'
%left ':>'
%left '='
%left '=='
%left '+'
%left '-'
%right '@-'
%right '@+'
%left '*'
%left '.'
%left '/'
%left '[' ']'
%left '(' ')'
%left '{' '}'
%right DEFAULT
%left ':'
%left '@_'
%left '@_.'
%left '"'
%left '^'
%left '||'
%left '&&'
%left '!='
%left '<'
%left '<='
%left '>'
%left '>='
%right '=>'
%left '@-'
%left '?'
%left '@:_'
%left '@:_.'
%right '!'
%right '%'
%left '_'
%left VECTOR
%left MULTISET
%left NUMBER
%left STRING
%left IDENTIFIER
%left LETTER
%left ATOM
%left NUMBER
%left IDENTIFER
%start expression

%%

expression
//   : BUNCH EOF { return $1; }
    : e EOF { return $1; }
    | EOF { return null; }
    ;

e
    // : SPACE e %prec SPACE  -> $2
    // | e SPACE %prec SPACE2 -> $1
     : '(' e ')'   %prec BRAC        -> ['(', $2]
    | e '==' e           -> ['=', $1, $3]
    | e '=' e            -> ['=', $1, $3]
    | e '!=' e           -> ['!=', $1, $3]
    | e '<=' e           -> ['<=', $1, $3]
    | e '<' e            -> ['<', $1, $3]
    | e '>' e            -> ['>', $1, $3]
    | e '/.' e           -> ['default', 'ReplaceAll', ['[', $1, $3]]
    | e '//.' e          -> ['default', 'ReplaceRepeated', ['[', $1, $3]]
    | e '//' e           -> ['default', $3, ['[', $1]]
    | e '||' e           -> ['||', $1, $3]
    | e '&&' e           -> ['&&', $1, $3]
    | e '>=' e           -> ['>=', $1, $3]
    | e '=>' e           -> ['=>', $1, $3]
    | e '+' e            -> ['+', $1, $3]
    | e '-' e            -> ['+', $1, ['*', {number: '-1'}, $3]]
    | e '.' e            -> ['*', $1, $3]
    | e '*' e            -> ['*', $1, $3]
    | e '->' e           -> ['->', $1, $3]
    | e ':>' e           -> [':>', $1, $3]
    | e ':' e            -> [':', $1, $3]
    | e '/' e            -> ['*', $1, ['^', $3, {number: '-1'}]]
    | e '_' e            -> ['_', $1, $3]
    | e '@:_'            -> [':', $1, ['default', 'Blank', ['[']]]
    | e '@:_.'           -> [':', $1, ['default', 'Optional', ['[', ['default', 'Blank', ['[']]]]]
    | e '^' e            -> ['^', $1, $3]
    | e '!'              -> ['!', $1]
    | '@-' e             -> ['*', {number: '-1'}, $2]
    | '@+' e             -> ['+', $2]
    | '@_'               -> ['default', 'Blank', ['[']]
    | '@_.'              -> ['default', 'Optional', ['[', ['default', 'Blank', ['[']]]]
    | e e %prec DEFAULT  -> ['default', $1, $2]
    | VECTOR -> $1
    | MULTISET -> $1
    | ATOM -> $1
    | '"' STRING '"' -> {string: $2};
    | '"' '"' -> {string: ''};
    ;

ATOM
    : IDENTIFIER                        -> $1
    | LETTER                            -> $1
    | NUMBER                            -> {number: $1}
    ;

VECTOR
    : '[' CSL ']' -> ['['].concat($2)
    | '[' e ']'   -> ['[', $2]
    | '[' ']'   -> ['[']
    ;

MULTISET
    : '{' CSL '}' -> ['{'].concat($2)
    | '{' e '}'   -> ['{', $2]
    | '{' '}'   -> ['{']
    ;

CSL
    : CSL ',' e -> $1.concat([$3])
    | e ',' e -> [$1, $3]
    ;
