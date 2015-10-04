/* parser generated by jison 0.4.15 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,4],$V1=[1,6],$V2=[1,7],$V3=[1,8],$V4=[1,9],$V5=[1,12],$V6=[1,13],$V7=[1,14],$V8=[1,15],$V9=[1,17],$Va=[1,16],$Vb=[1,19],$Vc=[1,20],$Vd=[1,21],$Ve=[1,22],$Vf=[1,23],$Vg=[1,24],$Vh=[1,25],$Vi=[1,26],$Vj=[1,27],$Vk=[1,28],$Vl=[1,29],$Vm=[1,30],$Vn=[1,31],$Vo=[1,32],$Vp=[1,33],$Vq=[1,34],$Vr=[1,35],$Vs=[1,36],$Vt=[1,37],$Vu=[1,38],$Vv=[1,39],$Vw=[1,40],$Vx=[1,41],$Vy=[1,42],$Vz=[1,43],$VA=[1,44],$VB=[1,47],$VC=[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,43,45,46,47,48,50,51,52,53,54],$VD=[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,43,45,46,47,48,50,51,52,53,54],$VE=[5,7,8,9,10,11,12,13,14,15,16,17,18,19,22,23,26,27,50,53,54],$VF=[1,90],$VG=[1,92],$VH=[5,7,9,15,16,17,26,27,50,53,54],$VI=[50,53,54];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expression":3,"e":4,"EOF":5,"(":6,")":7,"==":8,"=":9,"!=":10,"<":11,"<=":12,">":13,">=":14,"/.":15,"//.":16,"//":17,"||":18,"&&":19,"ATOM":20,"=>":21,"+":22,"-":23,".":24,"*":25,"->":26,":>":27,":":28,"/":29,"_":30,"@:_":31,"@:_.":32,"^":33,"!":34,"@-":35,"@+":36,"@_":37,"@_.":38,"::":39,"FNCALL":40,"MULTISET":41,"VECTOR":42,"\"":43,"STRING":44,"IDENTIFIER":45,"LETTER":46,"NUMBER":47,"[":48,"CSL":49,"]":50,"@[":51,"{":52,"}":53,",":54,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"(",7:")",8:"==",9:"=",10:"!=",11:"<",12:"<=",13:">",14:">=",15:"/.",16:"//.",17:"//",18:"||",19:"&&",21:"=>",22:"+",23:"-",24:".",25:"*",26:"->",27:":>",28:":",29:"/",30:"_",31:"@:_",32:"@:_.",33:"^",34:"!",35:"@-",36:"@+",37:"@_",38:"@_.",39:"::",43:"\"",44:"STRING",45:"IDENTIFIER",46:"LETTER",47:"NUMBER",48:"[",50:"]",51:"@[",52:"{",53:"}",54:","},
productions_: [0,[3,2],[3,1],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,2],[4,3],[4,2],[4,2],[4,2],[4,1],[4,1],[4,3],[4,2],[4,2],[4,1],[4,1],[4,1],[4,3],[4,2],[20,1],[20,1],[20,1],[40,3],[40,3],[40,2],[42,3],[42,3],[42,2],[41,3],[41,3],[41,2],[49,3],[49,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1]; 
break;
case 2:
 return null; 
break;
case 3:
this.$ = ['(', $$[$0-1]];
break;
case 4: case 5:
this.$ = ['=', $$[$0-2], $$[$0]];
break;
case 6:
this.$ = ['!=', $$[$0-2], $$[$0]];
break;
case 7:
this.$ = ['<', $$[$0-2], $$[$0]];
break;
case 8:
this.$ = ['<=', $$[$0-2], $$[$0]];
break;
case 9:
this.$ = ['>', $$[$0-2], $$[$0]];
break;
case 10:
this.$ = ['>=', $$[$0-2], $$[$0]];
break;
case 11:
this.$ = ['default', 'ReplaceAll', ['[', $$[$0-2], $$[$0]]];
break;
case 12:
this.$ = ['default', 'ReplaceRepeated', ['[', $$[$0-2], $$[$0]]];
break;
case 13:
this.$ = ['default', $$[$0], ['[', $$[$0-2]]];
break;
case 14:
this.$ = ['||', $$[$0-2], $$[$0]];
break;
case 15:
this.$ = ['&&', $$[$0-2], $$[$0]];
break;
case 16:
this.$ = ['=>', $$[$0-2], $$[$0]];
break;
case 17:
this.$ = ['+', $$[$0-2], $$[$0]];
break;
case 18:
this.$ = ['+', $$[$0-2], ['*', {number: '-1'}, $$[$0]]];
break;
case 19:
this.$ = ['.', $$[$0-2], $$[$0]];
break;
case 20:
this.$ = ['*', $$[$0-2], $$[$0]];
break;
case 21:
this.$ = ['->', $$[$0-2], $$[$0]];
break;
case 22:
this.$ = [':>', $$[$0-2], $$[$0]];
break;
case 23:
this.$ = [':', $$[$0-2], $$[$0]];
break;
case 24:
this.$ = ['*', $$[$0-2], ['^', $$[$0], {number: '-1'}]];
break;
case 25:
this.$ = ['_', $$[$0-2], $$[$0]];
break;
case 26:
this.$ = [':', $$[$0-1], ['default', 'Blank', ['[']]];
break;
case 27:
this.$ = [':', $$[$0-1], ['default', 'Optional', ['[', ['default', 'Blank', ['[']]]]];
break;
case 28:
this.$ = ['^', $$[$0-2], $$[$0]];
break;
case 29:
this.$ = ['!', $$[$0-1]];
break;
case 30:
this.$ = ['*', {number: '-1'}, $$[$0]];
break;
case 31:
this.$ = ['+', $$[$0]];
break;
case 32:
this.$ = ['default', 'Blank', ['[']];
break;
case 33:
this.$ = ['default', 'Optional', ['[', ['default', 'Blank', ['[']]]];
break;
case 34:
this.$ = ['default', $$[$0-2], ['[', $$[$0]]];
break;
case 35: case 36:
this.$ = ['default', $$[$0-1], $$[$0]];
break;
case 37: case 38: case 39: case 42: case 43:
this.$ = $$[$0];
break;
case 40:
this.$ = {string: $$[$0-1]};;
break;
case 41:
this.$ = {string: ''};;
break;
case 44:
this.$ = {number: $$[$0]};
break;
case 45: case 48:
this.$ = ['['].concat($$[$0-1]);
break;
case 46: case 49:
this.$ = ['[', $$[$0-1]];
break;
case 47: case 50:
this.$ = ['['];
break;
case 51:
this.$ = ['{'].concat($$[$0-1]);
break;
case 52:
this.$ = ['{', $$[$0-1]];
break;
case 53:
this.$ = ['{'];
break;
case 54:
this.$ = $$[$0-2].concat([$$[$0]]);
break;
case 55:
this.$ = [$$[$0-2], $$[$0]];
break;
}
},
table: [{3:1,4:2,5:[1,3],6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{1:[3]},{4:45,5:[1,18],6:$V0,8:$Vb,9:$Vc,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:5,22:$Vn,23:$Vo,24:$Vp,25:$Vq,26:$Vr,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,40:46,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va},{1:[2,2]},{4:48,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},o($VC,[2,39],{21:[1,49]}),{4:50,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:51,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},o($VC,[2,32]),o($VC,[2,33]),o($VC,[2,37]),o($VC,[2,38]),{43:[1,53],44:[1,52]},o($VD,[2,42]),o($VD,[2,43]),o($VD,[2,44]),{4:55,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,49:54,51:$V9,52:$Va,53:[1,56]},{4:58,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,49:57,50:[1,59],51:$V9,52:$Va},{1:[2,1]},{4:60,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:61,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:62,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:63,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:64,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:65,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:66,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:67,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:68,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:69,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:70,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:71,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:72,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:73,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:74,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:75,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:76,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:77,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:78,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:79,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},{4:80,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},o($VC,[2,26]),o($VC,[2,27]),{4:81,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},o($VC,[2,29]),{4:82,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},o([5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,22,23,24,25,26,27,29,36,48,50,51,52,53,54],[2,35],{20:5,41:10,42:11,4:45,40:46,28:$Vt,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8}),o($VC,[2,36]),{4:84,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,49:83,50:[1,85],51:$V9,52:$Va},{4:45,6:$V0,7:[1,86],8:$Vb,9:$Vc,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:5,22:$Vn,23:$Vo,24:$Vp,25:$Vq,26:$Vr,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,40:46,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va},{4:87,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},o([5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,22,23,24,25,26,27,28,29,33,35,36,37,38,39,43,48,50,51,52,53,54],[2,30],{20:5,41:10,42:11,4:45,40:46,30:$Vv,31:$Vw,32:$Vx,34:$Vz,45:$V6,46:$V7,47:$V8}),o($VE,[2,31],{20:5,41:10,42:11,4:45,40:46,6:$V0,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),{43:[1,88]},o($VC,[2,41]),{53:[1,89],54:$VF},{4:45,6:$V0,8:$Vb,9:$Vc,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:5,22:$Vn,23:$Vo,24:$Vp,25:$Vq,26:$Vr,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,40:46,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va,53:[1,91],54:$VG},o($VC,[2,53]),{50:[1,93],54:$VF},{4:45,6:$V0,8:$Vb,9:$Vc,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:5,22:$Vn,23:$Vo,24:$Vp,25:$Vq,26:$Vr,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,40:46,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,50:[1,94],51:$V9,52:$Va,54:$VG},o($VC,[2,50]),o([5,7,8,9,15,16,17,26,27,50,53,54],[2,4],{20:5,41:10,42:11,4:45,40:46,6:$V0,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,18:$Vl,19:$Vm,22:$Vn,23:$Vo,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,9,50,53,54],[2,5],{20:5,41:10,42:11,4:45,40:46,6:$V0,8:$Vb,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,22:$Vn,23:$Vo,24:$Vp,25:$Vq,26:$Vr,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,8,9,10,15,16,17,18,19,26,27,50,53,54],[2,6],{20:5,41:10,42:11,4:45,40:46,6:$V0,11:$Ve,12:$Vf,13:$Vg,14:$Vh,22:$Vn,23:$Vo,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,8,9,10,11,15,16,17,18,19,26,27,50,53,54],[2,7],{20:5,41:10,42:11,4:45,40:46,6:$V0,12:$Vf,13:$Vg,14:$Vh,22:$Vn,23:$Vo,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,8,9,10,11,12,15,16,17,18,19,26,27,50,53,54],[2,8],{20:5,41:10,42:11,4:45,40:46,6:$V0,13:$Vg,14:$Vh,22:$Vn,23:$Vo,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,8,9,10,11,12,13,15,16,17,18,19,26,27,50,53,54],[2,9],{20:5,41:10,42:11,4:45,40:46,6:$V0,14:$Vh,22:$Vn,23:$Vo,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,8,9,10,11,12,13,14,15,16,17,18,19,26,27,50,53,54],[2,10],{20:5,41:10,42:11,4:45,40:46,6:$V0,22:$Vn,23:$Vo,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,9,15,17,50,53,54],[2,11],{20:5,41:10,42:11,4:45,40:46,6:$V0,8:$Vb,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,16:$Vj,18:$Vl,19:$Vm,22:$Vn,23:$Vo,24:$Vp,25:$Vq,26:$Vr,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,9,15,16,17,50,53,54],[2,12],{20:5,41:10,42:11,4:45,40:46,6:$V0,8:$Vb,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,18:$Vl,19:$Vm,22:$Vn,23:$Vo,24:$Vp,25:$Vq,26:$Vr,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,9,17,50,53,54],[2,13],{20:5,41:10,42:11,4:45,40:46,6:$V0,8:$Vb,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,15:$Vi,16:$Vj,18:$Vl,19:$Vm,22:$Vn,23:$Vo,24:$Vp,25:$Vq,26:$Vr,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,8,9,15,16,17,18,26,27,50,53,54],[2,14],{20:5,41:10,42:11,4:45,40:46,6:$V0,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,19:$Vm,22:$Vn,23:$Vo,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,8,9,15,16,17,18,19,26,27,50,53,54],[2,15],{20:5,41:10,42:11,4:45,40:46,6:$V0,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,22:$Vn,23:$Vo,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,8,9,10,11,12,13,14,15,16,17,18,19,22,26,27,50,53,54],[2,17],{20:5,41:10,42:11,4:45,40:46,6:$V0,23:$Vo,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o($VE,[2,18],{20:5,41:10,42:11,4:45,40:46,6:$V0,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,8,9,10,11,12,13,14,15,16,17,18,19,22,23,24,25,26,27,36,50,53,54],[2,19],{20:5,41:10,42:11,4:45,40:46,6:$V0,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,8,9,10,11,12,13,14,15,16,17,18,19,22,23,25,26,27,36,50,53,54],[2,20],{20:5,41:10,42:11,4:45,40:46,6:$V0,24:$Vp,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,7,9,15,16,17,26,50,53,54],[2,21],{20:5,41:10,42:11,4:45,40:46,6:$V0,8:$Vb,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,18:$Vl,19:$Vm,22:$Vn,23:$Vo,24:$Vp,25:$Vq,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o($VH,[2,22],{20:5,41:10,42:11,4:45,40:46,6:$V0,8:$Vb,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,18:$Vl,19:$Vm,22:$Vn,23:$Vo,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,22,23,24,25,26,27,28,29,33,36,39,48,50,51,52,53,54],[2,23],{20:5,41:10,42:11,4:45,40:46,30:$Vv,31:$Vw,32:$Vx,34:$Vz,35:$V1,37:$V3,38:$V4,43:$V5,45:$V6,46:$V7,47:$V8}),o([5,7,8,9,10,11,12,13,14,15,16,17,18,19,22,23,24,25,26,27,29,36,50,53,54],[2,24],{20:5,41:10,42:11,4:45,40:46,6:$V0,28:$Vt,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o([5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,43,48,50,51,52,53,54],[2,25],{20:5,41:10,42:11,4:45,40:46,45:$V6,46:$V7,47:$V8}),o([5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,22,23,24,25,26,27,29,33,36,39,48,50,51,52,53,54],[2,28],{20:5,41:10,42:11,4:45,40:46,28:$Vt,30:$Vv,31:$Vw,32:$Vx,34:$Vz,35:$V1,37:$V3,38:$V4,43:$V5,45:$V6,46:$V7,47:$V8}),o([5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,22,23,24,25,26,27,29,36,39,48,50,51,52,53,54],[2,34],{20:5,41:10,42:11,4:45,40:46,28:$Vt,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,37:$V3,38:$V4,43:$V5,45:$V6,46:$V7,47:$V8}),{50:[1,95],54:$VF},{4:45,6:$V0,8:$Vb,9:$Vc,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:5,22:$Vn,23:$Vo,24:$Vp,25:$Vq,26:$Vr,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,40:46,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,50:[1,96],51:$V9,52:$Va,54:$VG},o($VC,[2,47]),o($VC,[2,3]),o($VH,[2,16],{20:5,41:10,42:11,4:45,40:46,6:$V0,8:$Vb,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,18:$Vl,19:$Vm,22:$Vn,23:$Vo,24:$Vp,25:$Vq,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o($VC,[2,40]),o($VC,[2,51]),{4:97,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},o($VC,[2,52]),{4:98,6:$V0,20:5,35:$V1,36:$V2,37:$V3,38:$V4,41:10,42:11,43:$V5,45:$V6,46:$V7,47:$V8,51:$V9,52:$Va},o($VC,[2,48]),o($VC,[2,49]),o($VC,[2,45]),o($VC,[2,46]),o($VI,[2,54],{20:5,41:10,42:11,4:45,40:46,6:$V0,8:$Vb,9:$Vc,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,22:$Vn,23:$Vo,24:$Vp,25:$Vq,26:$Vr,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va}),o($VI,[2,55],{20:5,41:10,42:11,4:45,40:46,6:$V0,8:$Vb,9:$Vc,10:$Vd,11:$Ve,12:$Vf,13:$Vg,14:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,22:$Vn,23:$Vo,24:$Vp,25:$Vq,26:$Vr,27:$Vs,28:$Vt,29:$Vu,30:$Vv,31:$Vw,32:$Vx,33:$Vy,34:$Vz,35:$V1,36:$V2,37:$V3,38:$V4,39:$VA,43:$V5,45:$V6,46:$V7,47:$V8,48:$VB,51:$V9,52:$Va})],
defaultActions: {3:[2,2],18:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}