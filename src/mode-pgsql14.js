define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var DocCommentHighlightRules = function () {
    this.$rules = {
        "start": [{
                token: "comment.doc.tag",
                regex: "@[\\w\\d_]+" // TODO: fix email addresses
            },
            DocCommentHighlightRules.getTagRule(),
            {
                defaultToken: "comment.doc",
                caseInsensitive: true
            }]
    };
};
oop.inherits(DocCommentHighlightRules, TextHighlightRules);
DocCommentHighlightRules.getTagRule = function (start) {
    return {
        token: "comment.doc.tag.storage.type",
        regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};
DocCommentHighlightRules.getStartRule = function (start) {
    return {
        token: "comment.doc",
        regex: "\\/\\*(?=\\*)",
        next: start
    };
};
DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token: "comment.doc",
        regex: "\\*\\/",
        next: start
    };
};
exports.DocCommentHighlightRules = DocCommentHighlightRules;

});

define("ace/mode/perl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var PerlHighlightRules = function () {
    var keywords = ("base|constant|continue|else|elsif|for|foreach|format|goto|if|last|local|my|next|" +
        "no|package|parent|redo|require|scalar|sub|unless|until|while|use|vars");
    var buildinConstants = ("ARGV|ENV|INC|SIG");
    var builtinFunctions = ("getprotobynumber|getprotobyname|getservbyname|gethostbyaddr|" +
        "gethostbyname|getservbyport|getnetbyaddr|getnetbyname|getsockname|" +
        "getpeername|setpriority|getprotoent|setprotoent|getpriority|" +
        "endprotoent|getservent|setservent|endservent|sethostent|socketpair|" +
        "getsockopt|gethostent|endhostent|setsockopt|setnetent|quotemeta|" +
        "localtime|prototype|getnetent|endnetent|rewinddir|wantarray|getpwuid|" +
        "closedir|getlogin|readlink|endgrent|getgrgid|getgrnam|shmwrite|" +
        "shutdown|readline|endpwent|setgrent|readpipe|formline|truncate|" +
        "dbmclose|syswrite|setpwent|getpwnam|getgrent|getpwent|ucfirst|sysread|" +
        "setpgrp|shmread|sysseek|sysopen|telldir|defined|opendir|connect|" +
        "lcfirst|getppid|binmode|syscall|sprintf|getpgrp|readdir|seekdir|" +
        "waitpid|reverse|unshift|symlink|dbmopen|semget|msgrcv|rename|listen|" +
        "chroot|msgsnd|shmctl|accept|unpack|exists|fileno|shmget|system|" +
        "unlink|printf|gmtime|msgctl|semctl|values|rindex|substr|splice|" +
        "length|msgget|select|socket|return|caller|delete|alarm|ioctl|index|" +
        "undef|lstat|times|srand|chown|fcntl|close|write|umask|rmdir|study|" +
        "sleep|chomp|untie|print|utime|mkdir|atan2|split|crypt|flock|chmod|" +
        "BEGIN|bless|chdir|semop|shift|reset|link|stat|chop|grep|fork|dump|" +
        "join|open|tell|pipe|exit|glob|warn|each|bind|sort|pack|eval|push|" +
        "keys|getc|kill|seek|sqrt|send|wait|rand|tied|read|time|exec|recv|" +
        "eof|chr|int|ord|exp|pos|pop|sin|log|abs|oct|hex|tie|cos|vec|END|ref|" +
        "map|die|uc|lc|do");
    var keywordMapper = this.createKeywordMapper({
        "keyword": keywords,
        "constant.language": buildinConstants,
        "support.function": builtinFunctions
    }, "identifier");
    this.$rules = {
        "start": [
            {
                token: "comment.doc",
                regex: "^=(?:begin|item)\\b",
                next: "block_comment"
            }, {
                token: "string.regexp",
                regex: "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"
            }, {
                token: "string",
                regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token: "string",
                regex: '["].*\\\\$',
                next: "qqstring"
            }, {
                token: "string",
                regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token: "string",
                regex: "['].*\\\\$",
                next: "qstring"
            }, {
                token: "constant.numeric",
                regex: "0x[0-9a-fA-F]+\\b"
            }, {
                token: "constant.numeric",
                regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token: keywordMapper,
                regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token: "keyword.operator",
                regex: "%#|\\$#|\\.\\.\\.|\\|\\|=|>>=|<<=|<=>|&&=|=>|!~|\\^=|&=|\\|=|\\.=|x=|%=|\\/=|\\*=|\\-=|\\+=|=~|\\*\\*|\\-\\-|\\.\\.|\\|\\||&&|\\+\\+|\\->|!=|==|>=|<=|>>|<<|,|=|\\?\\:|\\^|\\||x|%|\\/|\\*|<|&|\\\\|~|!|>|\\.|\\-|\\+|\\-C|\\-b|\\-S|\\-u|\\-t|\\-p|\\-l|\\-d|\\-f|\\-g|\\-s|\\-z|\\-k|\\-e|\\-O|\\-T|\\-B|\\-M|\\-A|\\-X|\\-W|\\-c|\\-R|\\-o|\\-x|\\-w|\\-r|\\b(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|xor)"
            }, {
                token: "comment",
                regex: "#.*$"
            }, {
                token: "lparen",
                regex: "[[({]"
            }, {
                token: "rparen",
                regex: "[\\])}]"
            }, {
                token: "text",
                regex: "\\s+"
            }
        ],
        "qqstring": [
            {
                token: "string",
                regex: '(?:(?:\\\\.)|(?:[^"\\\\]))*?"',
                next: "start"
            }, {
                token: "string",
                regex: '.+'
            }
        ],
        "qstring": [
            {
                token: "string",
                regex: "(?:(?:\\\\.)|(?:[^'\\\\]))*?'",
                next: "start"
            }, {
                token: "string",
                regex: '.+'
            }
        ],
        "block_comment": [
            {
                token: "comment.doc",
                regex: "^=cut\\b",
                next: "start"
            },
            {
                defaultToken: "comment.doc"
            }
        ]
    };
};
oop.inherits(PerlHighlightRules, TextHighlightRules);
exports.PerlHighlightRules = PerlHighlightRules;

});

define("ace/mode/python_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module){/*
 * TODO: python delimiters
 */
"use strict";
var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var PythonHighlightRules = function () {
    var keywords = ("and|as|assert|break|class|continue|def|del|elif|else|except|exec|" +
        "finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|" +
        "raise|return|try|while|with|yield|async|await|nonlocal");
    var builtinConstants = ("True|False|None|NotImplemented|Ellipsis|__debug__");
    var builtinFunctions = ("abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|" +
        "eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|" +
        "binfile|bin|iter|property|tuple|bool|filter|len|range|type|bytearray|" +
        "float|list|raw_input|unichr|callable|format|locals|reduce|unicode|" +
        "chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|" +
        "cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|" +
        "__import__|complex|hash|min|apply|delattr|help|next|setattr|set|" +
        "buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|" +
        "ascii|breakpoint|bytes");
    var keywordMapper = this.createKeywordMapper({
        "invalid.deprecated": "debugger",
        "support.function": builtinFunctions,
        "variable.language": "self|cls",
        "constant.language": builtinConstants,
        "keyword": keywords
    }, "identifier");
    var strPre = "[uU]?";
    var strRawPre = "[rR]";
    var strFormatPre = "[fF]";
    var strRawFormatPre = "(?:[rR][fF]|[fF][rR])";
    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var octInteger = "(?:0[oO]?[0-7]+)";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var binInteger = "(?:0[bB][01]+)";
    var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + ")";
    var exponent = "(?:[eE][+-]?\\d+)";
    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" + intPart + ")" + exponent + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";
    var stringEscape = "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";
    this.$rules = {
        "start": [{
                token: "comment",
                regex: "#.*$"
            }, {
                token: "string",
                regex: strPre + '"{3}',
                next: "qqstring3"
            }, {
                token: "string",
                regex: strPre + '"(?=.)',
                next: "qqstring"
            }, {
                token: "string",
                regex: strPre + "'{3}",
                next: "qstring3"
            }, {
                token: "string",
                regex: strPre + "'(?=.)",
                next: "qstring"
            }, {
                token: "string",
                regex: strRawPre + '"{3}',
                next: "rawqqstring3"
            }, {
                token: "string",
                regex: strRawPre + '"(?=.)',
                next: "rawqqstring"
            }, {
                token: "string",
                regex: strRawPre + "'{3}",
                next: "rawqstring3"
            }, {
                token: "string",
                regex: strRawPre + "'(?=.)",
                next: "rawqstring"
            }, {
                token: "string",
                regex: strFormatPre + '"{3}',
                next: "fqqstring3"
            }, {
                token: "string",
                regex: strFormatPre + '"(?=.)',
                next: "fqqstring"
            }, {
                token: "string",
                regex: strFormatPre + "'{3}",
                next: "fqstring3"
            }, {
                token: "string",
                regex: strFormatPre + "'(?=.)",
                next: "fqstring"
            }, {
                token: "string",
                regex: strRawFormatPre + '"{3}',
                next: "rfqqstring3"
            }, {
                token: "string",
                regex: strRawFormatPre + '"(?=.)',
                next: "rfqqstring"
            }, {
                token: "string",
                regex: strRawFormatPre + "'{3}",
                next: "rfqstring3"
            }, {
                token: "string",
                regex: strRawFormatPre + "'(?=.)",
                next: "rfqstring"
            }, {
                token: "keyword.operator",
                regex: "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|@|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
            }, {
                token: "punctuation",
                regex: ",|:|;|\\->|\\+=|\\-=|\\*=|\\/=|\\/\\/=|%=|@=|&=|\\|=|^=|>>=|<<=|\\*\\*="
            }, {
                token: "paren.lparen",
                regex: "[\\[\\(\\{]"
            }, {
                token: "paren.rparen",
                regex: "[\\]\\)\\}]"
            }, {
                token: ["keyword", "text", "entity.name.function"],
                regex: "(def|class)(\\s+)([\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w]+)"
            }, {
                token: "text",
                regex: "\\s+"
            }, {
                include: "constants"
            }],
        "qqstring3": [{
                token: "constant.language.escape",
                regex: stringEscape
            }, {
                token: "string",
                regex: '"{3}',
                next: "start"
            }, {
                defaultToken: "string"
            }],
        "qstring3": [{
                token: "constant.language.escape",
                regex: stringEscape
            }, {
                token: "string",
                regex: "'{3}",
                next: "start"
            }, {
                defaultToken: "string"
            }],
        "qqstring": [{
                token: "constant.language.escape",
                regex: stringEscape
            }, {
                token: "string",
                regex: "\\\\$",
                next: "qqstring"
            }, {
                token: "string",
                regex: '"|$',
                next: "start"
            }, {
                defaultToken: "string"
            }],
        "qstring": [{
                token: "constant.language.escape",
                regex: stringEscape
            }, {
                token: "string",
                regex: "\\\\$",
                next: "qstring"
            }, {
                token: "string",
                regex: "'|$",
                next: "start"
            }, {
                defaultToken: "string"
            }],
        "rawqqstring3": [{
                token: "string",
                regex: '"{3}',
                next: "start"
            }, {
                defaultToken: "string"
            }],
        "rawqstring3": [{
                token: "string",
                regex: "'{3}",
                next: "start"
            }, {
                defaultToken: "string"
            }],
        "rawqqstring": [{
                token: "string",
                regex: "\\\\$",
                next: "rawqqstring"
            }, {
                token: "string",
                regex: '"|$',
                next: "start"
            }, {
                defaultToken: "string"
            }],
        "rawqstring": [{
                token: "string",
                regex: "\\\\$",
                next: "rawqstring"
            }, {
                token: "string",
                regex: "'|$",
                next: "start"
            }, {
                defaultToken: "string"
            }],
        "fqqstring3": [{
                token: "constant.language.escape",
                regex: stringEscape
            }, {
                token: "string",
                regex: '"{3}',
                next: "start"
            }, {
                token: "paren.lparen",
                regex: "{",
                push: "fqstringParRules"
            }, {
                defaultToken: "string"
            }],
        "fqstring3": [{
                token: "constant.language.escape",
                regex: stringEscape
            }, {
                token: "string",
                regex: "'{3}",
                next: "start"
            }, {
                token: "paren.lparen",
                regex: "{",
                push: "fqstringParRules"
            }, {
                defaultToken: "string"
            }],
        "fqqstring": [{
                token: "constant.language.escape",
                regex: stringEscape
            }, {
                token: "string",
                regex: "\\\\$",
                next: "fqqstring"
            }, {
                token: "string",
                regex: '"|$',
                next: "start"
            }, {
                token: "paren.lparen",
                regex: "{",
                push: "fqstringParRules"
            }, {
                defaultToken: "string"
            }],
        "fqstring": [{
                token: "constant.language.escape",
                regex: stringEscape
            }, {
                token: "string",
                regex: "'|$",
                next: "start"
            }, {
                token: "paren.lparen",
                regex: "{",
                push: "fqstringParRules"
            }, {
                defaultToken: "string"
            }],
        "rfqqstring3": [{
                token: "string",
                regex: '"{3}',
                next: "start"
            }, {
                token: "paren.lparen",
                regex: "{",
                push: "fqstringParRules"
            }, {
                defaultToken: "string"
            }],
        "rfqstring3": [{
                token: "string",
                regex: "'{3}",
                next: "start"
            }, {
                token: "paren.lparen",
                regex: "{",
                push: "fqstringParRules"
            }, {
                defaultToken: "string"
            }],
        "rfqqstring": [{
                token: "string",
                regex: "\\\\$",
                next: "rfqqstring"
            }, {
                token: "string",
                regex: '"|$',
                next: "start"
            }, {
                token: "paren.lparen",
                regex: "{",
                push: "fqstringParRules"
            }, {
                defaultToken: "string"
            }],
        "rfqstring": [{
                token: "string",
                regex: "'|$",
                next: "start"
            }, {
                token: "paren.lparen",
                regex: "{",
                push: "fqstringParRules"
            }, {
                defaultToken: "string"
            }],
        "fqstringParRules": [{
                token: "paren.lparen",
                regex: "[\\[\\(]"
            }, {
                token: "paren.rparen",
                regex: "[\\]\\)]"
            }, {
                token: "string",
                regex: "\\s+"
            }, {
                token: "string",
                regex: "'[^']*'"
            }, {
                token: "string",
                regex: '"[^"]*"'
            }, {
                token: "function.support",
                regex: "(!s|!r|!a)"
            }, {
                include: "constants"
            }, {
                token: 'paren.rparen',
                regex: "}",
                next: 'pop'
            }, {
                token: 'paren.lparen',
                regex: "{",
                push: "fqstringParRules"
            }],
        "constants": [{
                token: "constant.numeric",
                regex: "(?:" + floatNumber + "|\\d+)[jJ]\\b"
            }, {
                token: "constant.numeric",
                regex: floatNumber
            }, {
                token: "constant.numeric",
                regex: integer + "[lL]\\b"
            }, {
                token: "constant.numeric",
                regex: integer + "\\b"
            }, {
                token: ["punctuation", "function.support"],
                regex: "(\\.)([a-zA-Z_]+)\\b"
            }, {
                token: keywordMapper,
                regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }]
    };
    this.normalizeRules();
};
oop.inherits(PythonHighlightRules, TextHighlightRules);
exports.PythonHighlightRules = PythonHighlightRules;

});

define("ace/mode/json_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var JsonHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "variable",
                regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'
            }, {
                token: "string",
                regex: '"',
                next: "string"
            }, {
                token: "constant.numeric",
                regex: "0[xX][0-9a-fA-F]+\\b"
            }, {
                token: "constant.numeric",
                regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token: "constant.language.boolean",
                regex: "(?:true|false)\\b"
            }, {
                token: "text",
                regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token: "comment",
                regex: "\\/\\/.*$"
            }, {
                token: "comment.start",
                regex: "\\/\\*",
                next: "comment"
            }, {
                token: "paren.lparen",
                regex: "[[({]"
            }, {
                token: "paren.rparen",
                regex: "[\\])}]"
            }, {
                token: "punctuation.operator",
                regex: /[,]/
            }, {
                token: "text",
                regex: "\\s+"
            }
        ],
        "string": [
            {
                token: "constant.language.escape",
                regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
            }, {
                token: "string",
                regex: '"|$',
                next: "start"
            }, {
                defaultToken: "string"
            }
        ],
        "comment": [
            {
                token: "comment.end",
                regex: "\\*\\/",
                next: "start"
            }, {
                defaultToken: "comment"
            }
        ]
    };
};
oop.inherits(JsonHighlightRules, TextHighlightRules);
exports.JsonHighlightRules = JsonHighlightRules;

});

define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*";
var JavaScriptHighlightRules = function (options) {
    var keywordMapper = this.createKeywordMapper({
        "variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|" + // Constructors
            "Namespace|QName|XML|XMLList|" + // E4X
            "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|" +
            "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|" +
            "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|" + // Errors
            "SyntaxError|TypeError|URIError|" +
            "decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|" + // Non-constructor functions
            "isNaN|parseFloat|parseInt|" +
            "JSON|Math|" + // Other
            "this|arguments|prototype|window|document",
        "keyword": "const|yield|import|get|set|async|await|" +
            "break|case|catch|continue|default|delete|do|else|finally|for|function|" +
            "if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|" +
            "__parent__|__count__|escape|unescape|with|__proto__|" +
            "class|enum|extends|super|export|implements|private|public|interface|package|protected|static",
        "storage.type": "const|let|var|function",
        "constant.language": "null|Infinity|NaN|undefined",
        "support.function": "alert",
        "constant.language.boolean": "true|false"
    }, "identifier");
    var kwBeforeRe = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void";
    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
        "u[0-9a-fA-F]{4}|" + // unicode
        "u{[0-9a-fA-F]{1,6}}|" + // es6 unicode
        "[0-2][0-7]{0,2}|" + // oct
        "3[0-7][0-7]?|" + // oct
        "[4-7][0-7]?|" + //oct
        ".)";
    this.$rules = {
        "no_regex": [
            DocCommentHighlightRules.getStartRule("doc-start"),
            comments("no_regex"),
            {
                token: "string",
                regex: "'(?=.)",
                next: "qstring"
            }, {
                token: "string",
                regex: '"(?=.)',
                next: "qqstring"
            }, {
                token: "constant.numeric",
                regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/
            }, {
                token: "constant.numeric",
                regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
            }, {
                token: [
                    "storage.type", "punctuation.operator", "support.function",
                    "punctuation.operator", "entity.name.function", "text", "keyword.operator"
                ],
                regex: "(" + identifierRe + ")(\\.)(prototype)(\\.)(" + identifierRe + ")(\\s*)(=)",
                next: "function_arguments"
            }, {
                token: [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text", "storage.type", "text", "paren.lparen"
                ],
                regex: "(" + identifierRe + ")(\\.)(" + identifierRe + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: [
                    "entity.name.function", "text", "keyword.operator", "text", "storage.type",
                    "text", "paren.lparen"
                ],
                regex: "(" + identifierRe + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text",
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex: "(" + identifierRe + ")(\\.)(" + identifierRe + ")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: [
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex: "(function)(\\s+)(" + identifierRe + ")(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: [
                    "entity.name.function", "text", "punctuation.operator",
                    "text", "storage.type", "text", "paren.lparen"
                ],
                regex: "(" + identifierRe + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: [
                    "text", "text", "storage.type", "text", "paren.lparen"
                ],
                regex: "(:)(\\s*)(function)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: "keyword",
                regex: "from(?=\\s*('|\"))"
            }, {
                token: "keyword",
                regex: "(?:" + kwBeforeRe + ")\\b",
                next: "start"
            }, {
                token: ["support.constant"],
                regex: /that\b/
            }, {
                token: ["storage.type", "punctuation.operator", "support.function.firebug"],
                regex: /(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/
            }, {
                token: keywordMapper,
                regex: identifierRe
            }, {
                token: "punctuation.operator",
                regex: /[.](?![.])/,
                next: "property"
            }, {
                token: "storage.type",
                regex: /=>/,
                next: "start"
            }, {
                token: "keyword.operator",
                regex: /--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,
                next: "start"
            }, {
                token: "punctuation.operator",
                regex: /[?:,;.]/,
                next: "start"
            }, {
                token: "paren.lparen",
                regex: /[\[({]/,
                next: "start"
            }, {
                token: "paren.rparen",
                regex: /[\])}]/
            }, {
                token: "comment",
                regex: /^#!.*$/
            }
        ],
        property: [{
                token: "text",
                regex: "\\s+"
            }, {
                token: [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text",
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex: "(" + identifierRe + ")(\\.)(" + identifierRe + ")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: "punctuation.operator",
                regex: /[.](?![.])/
            }, {
                token: "support.function",
                regex: /(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/
            }, {
                token: "support.function.dom",
                regex: /(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/
            }, {
                token: "support.constant",
                regex: /(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/
            }, {
                token: "identifier",
                regex: identifierRe
            }, {
                regex: "",
                token: "empty",
                next: "no_regex"
            }
        ],
        "start": [
            DocCommentHighlightRules.getStartRule("doc-start"),
            comments("start"),
            {
                token: "string.regexp",
                regex: "\\/",
                next: "regex"
            }, {
                token: "text",
                regex: "\\s+|^$",
                next: "start"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "regex": [
            {
                token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "string.regexp",
                regex: "/[sxngimy]*",
                next: "no_regex"
            }, {
                token: "invalid",
                regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
            }, {
                token: "constant.language.escape",
                regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
            }, {
                token: "constant.language.delimiter",
                regex: /\|/
            }, {
                token: "constant.language.escape",
                regex: /\[\^?/,
                next: "regex_character_class"
            }, {
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp"
            }
        ],
        "regex_character_class": [
            {
                token: "regexp.charclass.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "constant.language.escape",
                regex: "]",
                next: "regex"
            }, {
                token: "constant.language.escape",
                regex: "-"
            }, {
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp.charachterclass"
            }
        ],
        "function_arguments": [
            {
                token: "variable.parameter",
                regex: identifierRe
            }, {
                token: "punctuation.operator",
                regex: "[, ]+"
            }, {
                token: "punctuation.operator",
                regex: "$"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "qqstring": [
            {
                token: "constant.language.escape",
                regex: escapedRe
            }, {
                token: "string",
                regex: "\\\\$",
                consumeLineEnd: true
            }, {
                token: "string",
                regex: '"|$',
                next: "no_regex"
            }, {
                defaultToken: "string"
            }
        ],
        "qstring": [
            {
                token: "constant.language.escape",
                regex: escapedRe
            }, {
                token: "string",
                regex: "\\\\$",
                consumeLineEnd: true
            }, {
                token: "string",
                regex: "'|$",
                next: "no_regex"
            }, {
                defaultToken: "string"
            }
        ]
    };
    if (!options || !options.noES6) {
        this.$rules.no_regex.unshift({
            regex: "[{}]", onMatch: function (val, state, stack) {
                this.next = val == "{" ? this.nextState : "";
                if (val == "{" && stack.length) {
                    stack.unshift("start", state);
                }
                else if (val == "}" && stack.length) {
                    stack.shift();
                    this.next = stack.shift();
                    if (this.next.indexOf("string") != -1 || this.next.indexOf("jsx") != -1)
                        return "paren.quasi.end";
                }
                return val == "{" ? "paren.lparen" : "paren.rparen";
            },
            nextState: "start"
        }, {
            token: "string.quasi.start",
            regex: /`/,
            push: [{
                    token: "constant.language.escape",
                    regex: escapedRe
                }, {
                    token: "paren.quasi.start",
                    regex: /\${/,
                    push: "start"
                }, {
                    token: "string.quasi.end",
                    regex: /`/,
                    next: "pop"
                }, {
                    defaultToken: "string.quasi"
                }]
        });
        if (!options || options.jsx != false)
            JSX.call(this);
    }
    this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("no_regex")]);
    this.normalizeRules();
};
oop.inherits(JavaScriptHighlightRules, TextHighlightRules);
function JSX() {
    var tagRegex = identifierRe.replace("\\d", "\\d\\-");
    var jsxTag = {
        onMatch: function (val, state, stack) {
            var offset = val.charAt(1) == "/" ? 2 : 1;
            if (offset == 1) {
                if (state != this.nextState)
                    stack.unshift(this.next, this.nextState, 0);
                else
                    stack.unshift(this.next);
                stack[2]++;
            }
            else if (offset == 2) {
                if (state == this.nextState) {
                    stack[1]--;
                    if (!stack[1] || stack[1] < 0) {
                        stack.shift();
                        stack.shift();
                    }
                }
            }
            return [{
                    type: "meta.tag.punctuation." + (offset == 1 ? "" : "end-") + "tag-open.xml",
                    value: val.slice(0, offset)
                }, {
                    type: "meta.tag.tag-name.xml",
                    value: val.substr(offset)
                }];
        },
        regex: "</?" + tagRegex + "",
        next: "jsxAttributes",
        nextState: "jsx"
    };
    this.$rules.start.unshift(jsxTag);
    var jsxJsRule = {
        regex: "{",
        token: "paren.quasi.start",
        push: "start"
    };
    this.$rules.jsx = [
        jsxJsRule,
        jsxTag,
        { include: "reference" },
        { defaultToken: "string" }
    ];
    this.$rules.jsxAttributes = [{
            token: "meta.tag.punctuation.tag-close.xml",
            regex: "/?>",
            onMatch: function (value, currentState, stack) {
                if (currentState == stack[0])
                    stack.shift();
                if (value.length == 2) {
                    if (stack[0] == this.nextState)
                        stack[1]--;
                    if (!stack[1] || stack[1] < 0) {
                        stack.splice(0, 2);
                    }
                }
                this.next = stack[0] || "start";
                return [{ type: this.token, value: value }];
            },
            nextState: "jsx"
        },
        jsxJsRule,
        comments("jsxAttributes"),
        {
            token: "entity.other.attribute-name.xml",
            regex: tagRegex
        }, {
            token: "keyword.operator.attribute-equals.xml",
            regex: "="
        }, {
            token: "text.tag-whitespace.xml",
            regex: "\\s+"
        }, {
            token: "string.attribute-value.xml",
            regex: "'",
            stateName: "jsx_attr_q",
            push: [
                { token: "string.attribute-value.xml", regex: "'", next: "pop" },
                { include: "reference" },
                { defaultToken: "string.attribute-value.xml" }
            ]
        }, {
            token: "string.attribute-value.xml",
            regex: '"',
            stateName: "jsx_attr_qq",
            push: [
                { token: "string.attribute-value.xml", regex: '"', next: "pop" },
                { include: "reference" },
                { defaultToken: "string.attribute-value.xml" }
            ]
        },
        jsxTag
    ];
    this.$rules.reference = [{
            token: "constant.language.escape.reference.xml",
            regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        }];
}
function comments(next) {
    return [
        {
            token: "comment",
            regex: /\/\*/,
            next: [
                DocCommentHighlightRules.getTagRule(),
                { token: "comment", regex: "\\*\\/", next: next || "pop" },
                { defaultToken: "comment", caseInsensitive: true }
            ]
        }, {
            token: "comment",
            regex: "\\/\\/",
            next: [
                DocCommentHighlightRules.getTagRule(),
                { token: "comment", regex: "$|^", next: next || "pop" },
                { defaultToken: "comment", caseInsensitive: true }
            ]
        }
    ];
}
exports.JavaScriptHighlightRules = JavaScriptHighlightRules;

});

define("ace/mode/pgsql14_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules","ace/mode/perl_highlight_rules","ace/mode/python_highlight_rules","ace/mode/json_highlight_rules","ace/mode/javascript_highlight_rules"], function(require, exports, module){var oop = require("../lib/oop");
var lang = require("../lib/lang");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var PerlHighlightRules = require("./perl_highlight_rules").PerlHighlightRules;
var PythonHighlightRules = require("./python_highlight_rules").PythonHighlightRules;
var JsonHighlightRules = require("./json_highlight_rules").JsonHighlightRules;
var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;
var PgsqlHighlightRules = function () {
    var keywords = ('aardvark14|a|abort|abs|absent|absolute|access|according|acos|action|ada|add|admin|after|aggregate|all|allocate|also|alter|always|analyse|analyze|and|any|are|array|array_agg|array_max_cardinality|as|asc|asensitive|asin|assertion|assignment|asymmetric|at|atan|atomic|attach|attribute|attributes|authorization|avg|backward|base64|before|begin|begin_frame|begin_partition|bernoulli|between|bigint|binary|bit|bit_length|blob|blocked|bom|boolean|both|breadth|by|c|cache|call|called|cardinality|cascade|cascaded|case|cast|catalog|catalog_name|ceil|ceiling|chain|chaining|char|character|characteristics|characters|character_length|character_set_catalog|character_set_name|character_set_schema|char_length|check|checkpoint|class|classifier|class_origin|clob|close|cluster|coalesce|cobol|collate|collation|collation_catalog|collation_name|collation_schema|collect|column|columns|column_name|command_function|command_function_code|comment|comments|commit|committed|compression|concurrently|condition|conditional|condition_number|configuration|conflict|connect|connection|connection_name|constraint|constraints|constraint_catalog|constraint_name|constraint_schema|constructor|contains|content|continue|control|conversion|convert|copy|corr|corresponding|cos|cosh|cost|count|covar_pop|covar_samp|create|cross|csv|cube|cume_dist|current|current_catalog|current_date|current_default_transform_group|current_path|current_role|current_row|current_schema|current_time|current_timestamp|current_transform_group_for_type|current_user|cursor|cursor_name|cycle|data|database|datalink|date|datetime_interval_code|datetime_interval_precision|day|db|deallocate|dec|decfloat|decimal|declare|default|defaults|deferrable|deferred|define|defined|definer|degree|delete|delimiter|delimiters|dense_rank|depends|depth|deref|derived|desc|describe|descriptor|detach|deterministic|diagnostics|dictionary|disable|discard|disconnect|dispatch|distinct|dlnewcopy|dlpreviouscopy|dlurlcomplete|dlurlcompleteonly|dlurlcompletewrite|dlurlpath|dlurlpathonly|dlurlpathwrite|dlurlscheme|dlurlserver|dlvalue|do|document|domain|double|drop|dynamic|dynamic_function|dynamic_function_code|each|element|else|empty|enable|encoding|encrypted|end|end-exec|end_frame|end_partition|enforced|enum|equals|error|escape|event|every|except|exception|exclude|excluding|exclusive|exec|execute|exists|exp|explain|expression|extension|external|extract|false|family|fetch|file|filter|final|finalize|finish|first|first_value|flag|float|floor|following|for|force|foreign|format|fortran|forward|found|frame_row|free|freeze|from|fs|fulfill|full|function|functions|fusion|g|general|generated|get|global|go|goto|grant|granted|greatest|group|grouping|groups|handler|having|header|hex|hierarchy|hold|hour|id|identity|if|ignore|ilike|immediate|immediately|immutable|implementation|implicit|import|in|include|including|increment|indent|index|indexes|indicator|inherit|inherits|initial|initially|inline|inner|inout|input|insensitive|insert|instance|instantiable|instead|int|integer|integrity|intersect|intersection|interval|into|invoker|is|isnull|isolation|join|json|json_array|json_arrayagg|json_exists|json_object|json_objectagg|json_query|json_table|json_table_primitive|json_value|k|keep|key|keys|key_member|key_type|label|lag|language|large|last|last_value|lateral|lead|leading|leakproof|least|left|length|level|library|like|like_regex|limit|link|listagg|listen|ln|load|local|localtime|localtimestamp|location|locator|lock|locked|log|log10|logged|lower|m|map|mapping|match|matched|matches|match_number|match_recognize|materialized|max|maxvalue|measures|member|merge|message_length|message_octet_length|message_text|method|min|minute|minvalue|mod|mode|modifies|module|month|more|move|multiset|mumps|name|names|namespace|national|natural|nchar|nclob|nested|nesting|new|next|nfc|nfd|nfkc|nfkd|nil|no|none|normalize|normalized|not|nothing|notify|notnull|nowait|nth_value|ntile|null|nullable|nullif|nulls|number|numeric|object|occurrences_regex|octets|octet_length|of|off|offset|oids|old|omit|on|one|only|open|operator|option|options|or|order|ordering|ordinality|others|out|outer|output|over|overflow|overlaps|overlay|overriding|owned|owner|p|pad|parallel|parameter|parameter_mode|parameter_name|parameter_ordinal_position|parameter_specific_catalog|parameter_specific_name|parameter_specific_schema|parser|partial|partition|pascal|pass|passing|passthrough|password|past|path|pattern|per|percent|percentile_cont|percentile_disc|percent_rank|period|permission|permute|placing|plan|plans|pli|policy|portion|position|position_regex|power|precedes|preceding|precision|prepare|prepared|preserve|primary|prior|private|privileges|procedural|procedure|procedures|program|prune|ptf|public|publication|quote|quotes|range|rank|read|reads|real|reassign|recheck|recovery|recursive|ref|references|referencing|refresh|regr_avgx|regr_avgy|regr_count|regr_intercept|regr_r2|regr_slope|regr_sxx|regr_sxy|regr_syy|reindex|relative|release|rename|repeatable|replace|replica|requiring|reset|respect|restart|restore|restrict|result|return|returned_cardinality|returned_length|returned_octet_length|returned_sqlstate|returning|returns|revoke|right|role|rollback|rollup|routine|routines|routine_catalog|routine_name|routine_schema|row|rows|row_count|row_number|rule|running|savepoint|scalar|scale|schema|schemas|schema_name|scope|scope_catalog|scope_name|scope_schema|scroll|search|second|section|security|seek|select|selective|self|sensitive|sequence|sequences|serializable|server|server_name|session|session_user|set|setof|sets|share|show|similar|simple|sin|sinh|size|skip|smallint|snapshot|some|source|space|specific|specifictype|specific_name|sql|sqlcode|sqlerror|sqlexception|sqlstate|sqlwarning|sqrt|stable|standalone|start|state|statement|static|statistics|stddev_pop|stddev_samp|stdin|stdout|storage|stored|strict|string|strip|structure|style|subclass_origin|submultiset|subscription|subset|substring|substring_regex|succeeds|sum|support|symmetric|sysid|system|system_time|system_user|t|table|tables|tablesample|tablespace|table_name|tan|tanh|temp|template|temporary|text|then|through|ties|time|timestamp|timezone_hour|timezone_minute|to|token|top_level_count|trailing|transaction|transactions_committed|transactions_rolled_back|transaction_active|transform|transforms|translate|translate_regex|translation|treat|trigger|trigger_catalog|trigger_name|trigger_schema|trim|trim_array|true|truncate|trusted|type|types|uescape|unbounded|uncommitted|unconditional|under|unencrypted|union|unique|unknown|unlink|unlisten|unlogged|unmatched|unnamed|unnest|until|untyped|update|upper|uri|usage|user|user_defined_type_catalog|user_defined_type_code|user_defined_type_name|user_defined_type_schema|using|utf16|utf32|utf8|vacuum|valid|validate|validator|value|values|value_of|varbinary|varchar|variadic|varying|var_pop|var_samp|verbose|version|versioning|view|views|volatile|when|whenever|where|whitespace|width_bucket|window|with|within|without|work|wrapper|write|xml|xmlagg|xmlattributes|xmlbinary|xmlcast|xmlcomment|xmlconcat|xmldeclaration|xmldocument|xmlelement|xmlexists|xmlforest|xmliterate|xmlnamespaces|xmlparse|xmlpi|xmlquery|xmlroot|xmlschema|xmlserialize|xmltable|xmltext|xmlvalidate|year|yes|zone');
    var builtinFunctions = ("interval_le|macaddr_cmp|range_gt|array_lower|lag|varcharsend|int82eq|makeaclitem|nameeq|mode|num_nulls|pg_stat_get_db_xact_rollback|set_config|to_jsonb|json_array_elements_text|pg_relation_filepath|pg_event_trigger_ddl_commands|bpcharout|float84eq|pg_dependencies_out|inetmi_int8|cidr|language_handler_in|tsquerysend|cash_ne|timestamp_ge_timestamptz|pt_contained_circle|poly_same|amvalidate|datemultirange|numeric_mod|clock_timestamp|brin_summarize_range|timestamptz|hash_range|enum_smaller|pg_get_statisticsobjdef|btint24cmp|make_date|path_n_ge|pg_stat_get_db_checksum_failures|int4inc|namene|jsonb_each_text|multirange_ne|regexp_split_to_table|namege|circle_sub_pt|inet_client_addr|pg_wal_lsn_diff|time_ne|pg_identify_object|character_length|float4|pg_ndistinct_send|path_in|numeric_larger|jsonb_array_elements|date_trunc|first_value|hash_aclitem_extended|interval_accum_inv|lo_creat|npoints|jsonb_hash_extended|json_object_field|pg_stat_get_bgwriter_stat_reset_time|interval_avg|circle_mul_pt|lseg_parallel|jsonb_path_match|float8_regr_sxx|int24eq|pg_lsn_lt|int48mi|int2abs|txid_snapshot_out|int84gt|normalize|xid8ge|float8abs|date_pli|timestamp_cmp_date|float48mi|btarraycmp|pg_stat_get_db_conflict_bufferpin|int4_avg_accum|box_overright|pg_advisory_lock_shared|multirange_overright_multirange|circle_eq|box_overabove|record_gt|uuid_out|jsonpath_out|bpchareq|macaddr8_send|bpcharge|pg_control_system|regexp_replace|byteagt|numeric_out|timestamp_cmp|numeric_ge|daterange|to_regrole|dist_pc|box_below|tand|bool_or|pg_stat_get_last_vacuum_time|rtrim|int4ge|numrange|int8dec|sin|xid8out|timestamptz_eq_date|lseg_eq|dist_ls|lseg_out|has_sequence_privilege|current_schema|float84div|jsonb_build_array|cash_div_flt4|lseg_length|textsend|pg_visible_in_snapshot|circle_overabove|degrees|bit_out|poly_above|abs|circle_below|get_byte|pg_lsn_cmp|text_ge|multirange_overlaps_range|xid8ne|timestamp_le_timestamptz|pg_lsn_hash|dist_sp|timeofday|pg_logical_slot_peek_binary_changes|interval_larger|getdatabaseencoding|pg_get_replica_identity_index|array_ne|range_contained_by|int2mi|has_type_privilege|float8_corr|regr_sxx|btrecordcmp|charne|json_to_recordset|float4mul|nummultirange|power|textlename|pg_relation_filenode|xid|btint8cmp|uuid_ge|hashint8extended|dpow|jsonb_populate_recordset|pg_stat_get_last_autovacuum_time|float8_regr_accum|json_populate_recordset|bpcharregexeq|close_ls|timestamptz_le|jsonb_insert|pg_listening_channels|int8_avg|cash_pl|numeric_sub|pg_xact_status|float8div|pg_my_temp_schema|macaddr8_eq|bpchariclike|pg_sleep|dist_sb|int48le|bpcharin|database_to_xml_and_xmlschema|pg_node_tree_send|bound_box|boollt|circle_in|text_pattern_lt|int4multirange|pg_available_extension_versions|on_pl|timestamp_gt_timestamptz|setseed|time|decode|pg_get_object_address|RI_FKey_setdefault_upd|current_database|pg_current_wal_flush_lsn|int4send|pg_sleep_for|pg_type_is_visible|chareq|regnamespacesend|has_schema_privilege|pg_stat_get_db_stat_reset_time|int4|lseg_distance|pg_stat_get_subscription|cash_div_flt8|float8_covar_samp|box_contained|multirange_union|pg_stat_get_backend_wait_event_type|pg_stat_get_vacuum_count|btint4cmp|void_out|float4ge|path_contain_pt|circle_center|float8_regr_slope|substring|texticlike|box_above_eq|float84lt|date_cmp_timestamptz|querytree|encode|col_description|pt_contained_poly|int42ne|hashname|regconfigin|pg_prepared_statement|dist_bl|pg_database_size|macaddr8_not|pg_lsn_ne|int8pl|pg_current_wal_lsn|pg_stat_get_snapshot_timestamp|boolsend|cstring_in|bpchar_pattern_gt|varbit_out|make_timestamp|float48ge|pg_column_is_updatable|network_le|int8range|timestamptz_ne|network_gt|regtypeout|pg_mcv_list_items|lpad|float84ne|pg_stat_get_backend_userid|json_each|pg_stat_get_function_self_time|interval_hash|justify_interval|lowrite|multirange_overleft_multirange|namele|array_ge|percentile_disc|line_interpt|sinh|fmgr_internal_validator|varbit_in|float48le|enum_ne|pg_statistics_obj_is_visible|pg_stat_get_xact_tuples_returned|enum_cmp|boolin|md5|inter_lb|timestamp_le_date|regr_sxy|json_populate_record|varchar|jsonb_contained|elem_contained_by_range|macaddr_le|pg_rotate_logfile_old|circle_contain|pg_index_column_has_property|tidout|pg_stat_get_db_blk_read_time|multirange_in|namelttext|int4le|point_send|txid_status|dist_cpoly|line_perp|text_larger|timestamp_pl_interval|array_remove|macaddr_or|pg_advisory_xact_lock_shared|btint84cmp|bit_send|array_prepend|int4mod|range_overlaps_multirange|host|regtypesend|xmlvalidate|ts_rank|bitshiftleft|pg_xact_commit_timestamp|hashfloat8|range_overright_multirange|point_sub|pg_tablespace_databases|cash_div_int2|regconfigsend|oidge|pg_safe_snapshot_blocking_pids|xidneq|path_n_le|dsqrt|lseg_horizontal|circle_contained|box_contain_pt|int48eq|int82ge|pg_stat_get_xact_tuples_hot_updated|macaddr_and|pg_create_physical_replication_slot|numeric_gt|jsonb_delete|circle_overbelow|float8_regr_syy|jsonb_typeof|varbit_send|intervaltypmodin|time_le|jsonb_pretty|varbitlt|bpcharicnlike|int2_mul_cash|path_mul_pt|acosd|pg_advisory_unlock|path_out|textgename|intervaltypmodout|tan|gin_cmp_tslexeme|path_n_eq|time_send|pg_is_other_temp_schema|int8in|timestamptz_lt_timestamp|pg_get_multixact_members|upper|multirange_overleft_range|dround|box_send|pg_stat_get_progress_info|multirange_contains_elem|inetand|record_in|left|nameregexne|round|pg_ts_parser_is_visible|btnamecmp|count|lo_truncate|float4um|div|transaction_timestamp|int2not|pg_stat_get_analyze_count|float4send|bpchartypmodin|cash_words|namenetext|poly_right|float8le|jsonb_strip_nulls|timestamptz_larger|box_in|jsonb_out|atan2|txid_snapshot_xip|int4xor|macaddr8_gt|float84le|cash_mul_int2|pg_stat_get_db_blk_write_time|dist_lp|has_database_privilege|multirange_contained_by_multirange|inet_same_family|box_out|int82div|time_larger|xml_send|btbpchar_pattern_cmp|atanh|circle_same|atand|bpcharne|poly_overleft|pg_xact_commit_timestamp_origin|record_image_ne|octet_length|hashtext|uuid_send|texteq|int8ge|anymultirange_in|abbrev|hashtidextended|index_am_handler_in|jsonb_each|timestamptz_gt|btfloat4cmp|lo_close|tidsend|path_inter|poly_overbelow|int4or|point_eq|current_query|unknownsend|float48eq|json_build_object|bpcharregexne|pg_control_checkpoint|xml_is_well_formed_document|oidin|pg_stat_get_blocks_fetched|varbitne|mxid_age|tsvector_ne|dist_lb|macaddr8_cmp|bitcmp|int2eq|pg_encoding_to_char|int2div|byteacat|macaddr|json_object_agg|timestamptz_eq_timestamp|range_lt|int2send|pg_stat_get_db_conflict_snapshot|lseg_lt|jsonb_path_exists_tz|length|_pg_numeric_scale|asind|oidne|ts_stat|point|path_npoints|jsonb_populate_record|RI_FKey_cascade_del|tsquery_gt|point_out|nameeqtext|acldefault|range_contains_elem|floor|bytealt|pg_get_triggerdef|path_send|regprocedureout|height|int42le|binary_upgrade_set_next_pg_type_oid|float4div|macaddr8_out|pg_sequence_last_value|starts_with|inet_out|aclitemeq|regexp_match|int4_mul_cash|line_in|brin_bloom_summary_send|json_array_elements|pg_get_ruledef|pg_backup_start_time|date_ge_timestamptz|pg_stat_get_last_autoanalyze_time|numeric_in|hash_multirange_extended|tsq_mcontains|trigger_in|brin_summarize_new_values|enum_send|jsonb_path_match_tz|macaddr8_le|pg_get_publication_tables|pg_stat_get_db_conflict_tablespace|hashfloat4|regclasssend|sind|int2mod|convert_from|pg_stat_get_backend_idset|bitcat|line_parallel|network_cmp|isclosed|json_object_field_text|int2shl|hashfloat8extended|float8_stddev_pop|radians|percentile_cont|table_am_handler_in|textlike|box_overlap|array_replace|hashmacaddr8extended|multirange_contained_by_range|interval_out|lseg|binary_upgrade_set_next_toast_pg_class_oid|nth_value|timetz_smaller|timestamptz_lt_date|acosh|num_nonnulls|pg_collation_actual_version|txid_snapshot_send|pg_lsn_mi|pg_total_relation_size|float84ge|int8larger|btfloat48cmp|int82gt|pg_get_serial_sequence|bpcharnlike|dist_ppoly|xid8send|multirange_before_range|like_escape|int8le|masklen|macaddr_ne|bpchar_pattern_le|numeric_uminus|network|json_in|inetnot|network_sup|cotd|box_left|circle|date_cmp_timestamp|lo_from_bytea|xid8lt|point_horiz|plpgsql_validator|pg_stat_get_tuples_deleted|version|hashenum|point_ne|trim_array|aclexplode|binary_upgrade_create_empty_extension|timestamp_smaller|pg_get_function_arguments|pg_stat_get_replication_slot|satisfies_hash_partition|pg_last_xact_replay_timestamp|range_contains_multirange|anyarray_send|tanh|regnamespacein|poly_contain|point_in|int28le|dist_bp|int42lt|xideqint4|pg_available_extensions|chargt|anycompatiblenonarray_in|charin|spg_poly_quad_compress|bittypmodin|box|float84gt|array_smaller|pg_opclass_is_visible|cosh|jsonb_exists|jsonb_send|int4range|box_gt|pg_get_function_result|timestamptz_cmp_timestamp|record_image_eq|hash_array_extended|pg_extension_update_paths|timetztypmodout|int4larger|bitand|regnamespaceout|cidr_out|ts_match_vq|xidout|float8_regr_avgx|close_ps|pg_get_constraintdef|table_to_xmlschema|brin_minmax_multi_summary_out|gin_compare_jsonb|cidsend|int4shr|jsonb_to_record|RI_FKey_setnull_del|text_smaller|record_ge|lseg_ne|position|date_pl_interval|bpchar_smaller|unistr|pg_jit_available|array_to_string|pg_stat_get_db_tuples_updated|nameicregexeq|pg_get_replication_slots|path_distance|sha512|xmlcomment|circle_contain_pt|path_sub_pt|float4mi|charout|pg_lsn_in|int4out|cash_ge|width|inetpl|pg_stat_get_bgwriter_timed_checkpoints|cashlarger|pg_stat_get_db_conflict_all|to_timestamp|int8or|jsonpath_in|regr_intercept|textanycat|anyelement_out|date|RI_FKey_noaction_del|namesend|jsonb_array_elements_text|get_bit|factorial|circle_right|int8multirange|extract|range_minus|int2vectorout|btint42cmp|bpchargt|regroleout|close_lb|range_after_multirange|pg_relation_is_updatable|bit_and|box_above|hashint2extended|date_ge|binary_upgrade_set_next_array_pg_type_oid|regrolesend|float84mi|range_adjacent|line_send|pg_stat_get_backend_xact_start|float84pl|nameletext|pg_current_wal_insert_lsn|pg_get_function_identity_arguments|translate|txid_current_snapshot|interval_div|pg_char_to_encoding|macaddr_not|unnest|string_to_table|enum_out|float84mul|brin_minmax_multi_summary_in|timestamptz_ne_timestamp|booland_statefunc|float4out|pg_is_in_backup|pg_client_encoding|range_agg|path_add|int2int4_sum|range_merge|macaddr8_ge|timestamp_ne|float8_regr_intercept|charge|lead|jsonb_array_element|circle_gt|oidvectorlt|multirange_intersect|anycompatiblerange_in|pg_ts_config_is_visible|hostmask|path_div_pt|cidin|interval_gt|pg_stat_clear_snapshot|float48mul|box_lt|domain_in|pg_lsn_le|timetz_ge|diagonal|inet_merge|trunc|box_same|textnename|tsquery_eq|pg_lsn_hash_extended|pg_encoding_max_length|hashoid|_pg_char_octet_length|jsonb_build_object|int8abs|box_right|jsonb_path_match_opr|jsonb_array_length|max|int42mul|hashinet|age|bpcharicregexne|multirange_gt|pg_stat_get_dead_tuples|hash_numeric_extended|regclassout|network_subeq|pg_get_statisticsobjdef_columns|tsvector_gt|int82le|tsqueryin|lseg_ge|aclitemin|anyarray_in|int84ge|pg_stat_get_wal_receiver|network_smaller|json_typeof|lseg_le|int8mi|array_eq|line_distance|row_to_json|btfloat8cmp|pg_node_tree_in|timestamp_eq_timestamptz|int2_avg_accum_inv|int8_sum|int2_sum|isfinite|int42gt|circle_send|range_in|regoperatorin|anyenum_out|float4pl|pg_lsn_gt|quote_ident|tsvector_to_array|covar_pop|int84ne|pg_get_expr|int42ge|range_adjacent_multirange|pg_lsn_out|date_ge_timestamp|int28ge|timestamp_ne_date|multirange_after_multirange|pg_conversion_is_visible|aclitemout|int42eq|trigger_out|bpcharlike|ascii|upper_inf|regexp_matches|ts_delete|netmask|cot|pg_dependencies_in|regclass|tidgt|pg_lsn_larger|uuid_hash_extended|sum|box_below_eq|json_object_keys|uuid_cmp|numerictypmodin|jsonb_path_exists|regrolein|pg_stat_get_activity|int24ne|pg_stat_get_buf_alloc|tsvector_le|timestamp_lt_date|point_left|event_trigger_in|has_table_privilege|pg_last_committed_xact|macaddr_send|circle_left|textin|range_overright|date_lt_timestamptz|fmgr_c_validator|cash_eq|jsonb_contains|point_above|point_vert|family|namegttext|jsonb_to_tsvector|nameregexeq|tidlarger|cash_cmp|regr_r2|date_larger|cidr_in|timestamptz_mi_interval|point_div|bpchar_larger|bit|poly_in|int48gt|pg_stat_get_db_checksum_last_failure|text_pattern_le|numeric_add|pg_export_snapshot|pg_try_advisory_xact_lock_shared|string_agg|pg_advisory_unlock_shared|pg_stat_get_backend_client_port|unique_key_recheck|anyrange_in|numeric_cmp|timestamp_ge_date|jsonb_path_query_array_tz|timestamp_in|scale|float8_covar_pop|now|xml_is_well_formed|interval_ne|anycompatiblenonarray_out|gcd|numeric_send|path_add_pt|plainto_tsquery|cosd|pg_column_size|has_function_privilege|ts_rewrite|textgtname|bitgt|int42div|pg_ddl_command_send|varchartypmodin|last_value|cash_mul_int8|statement_timestamp|interval_pl_date|cash_send|btint48cmp|varbittypmodin|ts_debug|int8xor|poly_out|inetor|byteanlike|float4le|int48ne|btoidvectorcmp|float8_avg|has_foreign_data_wrapper_privilege|_pg_truetypid|point_distance|int4range_subdiff|btcharcmp|string_to_array|pg_stat_get_db_active_time|brin_desummarize_range|box_intersect|pg_isolation_test_session_is_blocked|strip|tstzrange|pg_get_partkeydef|timetz_in|tidge|pg_stat_get_db_idle_in_transaction_time|reverse|text_pattern_gt|pg_stat_get_wal|bit_or|daterange_canonical|plpgsql_call_handler|datetimetz_pl|pg_nextoid|float8eq|int48mul|bpcharcmp|tsm_handler_out|daterange_subdiff|jsonb_hash|pg_indexam_has_property|timestamp_ge|float48gt|tsrange|date_le|ts_parse|dtrunc|pg_partition_root|json_to_record|network_overlap|cash_mi|pg_postmaster_start_time|hash_aclitem|int2mul|gin_clean_pending_list|pg_event_trigger_table_rewrite_oid|int82mul|bitnot|int42mi|varbitle|lcm|binary_upgrade_set_next_multirange_pg_type_oid|int8inc|pg_last_wal_replay_lsn|has_column_privilege|multirange_le|to_regnamespace|range_intersect_agg_transfn|pg_tablespace_location|pg_stat_get_bgwriter_requested_checkpoints|RI_FKey_check_ins|close_sb|varbittypmodout|float4lt|overlaps|lower_inc|jsonb_ne|var_samp|pg_stat_get_bgwriter_buf_written_checkpoints|pg_stat_get_db_conflict_startup_deadlock|namegetext|pg_table_size|has_language_privilege|anycompatiblearray_send|bitlt|schema_to_xmlschema|regr_avgy|pg_stat_get_db_sessions_fatal|pg_lsn_smaller|texticnlike|int48ge|int4and|timestamptz_pl_interval|lower_inf|pg_stat_get_backend_wait_event|sqrt|pg_stat_get_tuples_updated|dist_pathp|_pg_datetime_precision|pg_collation_is_visible|min_scale|pg_typeof|has_any_column_privilege|pg_stat_get_buf_written_backend|json_to_tsvector|atan|bpcharsend|pg_stat_get_checkpoint_write_time|oidle|set_masklen|tsmultirange|poly_center|pg_stat_get_xact_tuples_updated|range_intersect|bool_and|interval_pl|to_char|int8send|anyarray_out|regtypein|isperp|hashoidvector|macaddr_in|txid_current|pg_stat_get_xact_function_self_time|jsonb_path_query|int24div|byteage|regdictionaryout|pg_mcv_list_out|arrayoverlap|ts_token_type|boolge|text_lt|split_part|pg_blocking_pids|int8not|cash_div_cash|pg_conf_load_time|jsonb_exists_all|to_number|float4in|cideq|bitge|flt8_mul_cash|hashmacaddrextended|interval_pl_timestamptz|setval|shell_out|boolgt|every|bitxor|binary_upgrade_set_next_multirange_array_pg_type_oid|pg_try_advisory_xact_lock|pg_is_in_recovery|oidlt|pg_replication_slot_advance|format|row_number|int2pl|int8smaller|center|cash_mul_flt4|regoperin|jsonb_object_field|atan2d|substr|pg_size_bytes|asin|numeric_mul|lo_unlink|float4larger|pg_advisory_xact_lock|ltrim|pg_stat_get_last_analyze_time|int4not|cash_out|pg_import_system_collations|box_sub|tsquery_ge|enum_le|pg_stat_get_backend_activity|concat|pg_snapshot_out|to_regtype|range_eq|jsonb_concat|aclremove|int8div|float8send|ln|pg_notification_queue_usage|binary_upgrade_set_missing_value|broadcast|hashint2|hashmacaddr8|oidvectorsend|textlen|timestamp|regconfigout|varbitcmp|time_eq|numeric|int48pl|box_overbelow|float8ne|textne|tsquery_cmp|pg_get_statisticsobjdef_expressions|multirange_eq|poly_send|regcollationout|int4_avg_combine|cardinality|btnametextcmp|int2vectorin|multirange_send|lseg_in|stddev_pop|circle_ge|network_ne|btint82cmp|time_cmp|float8smaller|json_each_text|oidout|dense_rank|int2le|float8larger|float8in|int8and|box_mul|timetz_hash|date_mi_interval|pg_stat_get_checkpoint_sync_time|index_am_handler_out|lo_put|pg_get_function_arg_default|pg_stat_get_bgwriter_maxwritten_clean|sha384|multirange_cmp|pg_identify_object_as_address|binary_upgrade_set_next_pg_enum_oid|aclinsert|tsquery_lt|timestamptypmodout|tsquery_ne|jsonb_in|json_array_element|float8mul|int2or|bpcharle|inter_sb|sha256|xideq|ts_rank_cd|close_pl|get_current_ts_config|to_regoperator|range_cmp|pg_stat_get_function_total_time|point_below|numeric_power|anymultirange_out|pg_snapshot_xmax|numeric_lt|RI_FKey_check_upd|pg_snapshot_xip|isparallel|date_gt_timestamptz|strpos|xml_out|chr|pg_sequence_parameters|hashint4extended|textcat|_pg_char_max_length|byteaout|hashenumextended|pg_relation_size|int42pl|int8dec_any|texticregexeq|pg_event_trigger_table_rewrite_reason|tsqueryout|date_mi|pg_index_has_property|text_pattern_ge|date_gt|pg_describe_object|record_ne|pg_snapshot_in|to_regprocedure|interval_in|pg_stat_get_function_calls|timestamptz_cmp|diameter|_pg_index_position|txid_visible_in_snapshot|int82lt|any_in|textout|replace|session_user|hashchar|timetypmodin|dist_pl|time_mi_time|polygon|dlog10|pg_indexam_progress_phasename|poly_npoints|pg_lsn_eq|jsonb_set_lax|void_in|timestamp_eq_date|int84mul|float8_accum|tsvector_ge|box_eq|dist_polyp|range_out|pg_current_xact_id_if_assigned|int2ge|pg_stat_get_bgwriter_buf_written_clean|pg_stat_get_autoanalyze_count|pg_lsn|dist_pb|interval_ge|pg_get_keywords|hashinetextended|tsvector_concat|regoperatorout|hashnameextended|bttidcmp|tstzrange_subdiff|timetz_lt|range_send|anyelement_in|int4gt|pg_stat_get_xact_tuples_fetched|interval_mul|rank|bpchar_pattern_lt|enum_range|int4_avg_accum_inv|boolne|nameiclike|oidvectorout|quote_nullable|_pg_numeric_precision|float8_regr_sxy|array_gt|int8um|date_cmp|anycompatiblemultirange_in|pg_stat_get_ins_since_vacuum|bit_count|pg_stat_get_xact_tuples_deleted|date_smaller|RI_FKey_noaction_upd|cash_gt|record_image_lt|numrange_subdiff|timestamp_hash|pg_timezone_abbrevs|array_larger|interval_eq|jsonb_eq|tsvectorout|gtsvectorin|event_trigger_out|right|variance|int28ne|poly_contain_pt|make_timestamptz|cashsmaller|int8shl|float8lt|int4pl|range_contained_by_multirange|box_distance|range_overlaps|time_lt|inet_in|macaddr8_in|overlay|int2xor|xml_is_well_formed_content|pg_stat_get_db_conflict_lock|pg_logical_slot_get_changes|macaddr8_or|oidlarger|cidr_send|fdw_handler_out|avg|int28eq|nameicnlike|float8pl|pg_column_compression|varbitge|anytextcat|timetz_cmp|cash_mul_flt8|is_normalized|int24mul|point_mul|interval_pl_timestamp|timestamptz_eq|area|dist_ps|network_ge|macaddr8|stddev_samp|record_image_gt|enum_last|array_send|date_out|like|box_div|lo_open|hash_numeric|numeric_smaller|texticregexne|uuid_hash|jsonb_array_element_text|enum_lt|int4lt|txid_snapshot_xmin|tidsmaller|int4_sum|pg_stat_get_db_sessions_abandoned|similar_to_escape|xid8eq|int2um|text|texteqname|on_ps|range_overleft|numeric_eq|width_bucket|timetz_eq|lseg_center|int4ne|lo_tell|timetz_le|pg_partition_ancestors|jsonb_object|array_upper|enum_in|int4up|on_sl|ts_headline|oidsend|log10|bpcharlt|hashtid|set_byte|enum_gt|tsrange_subdiff|language_handler_out|dexp|inet_client_port|xpath|pg_snapshot_send|interval_hash_extended|int4div|numeric_abs|int8_mul_cash|pg_trigger_depth|float8_stddev_samp|char_length|jsonb_lt|ts_match_tt|pg_prepared_xact|numeric_log|network_sub|gen_random_uuid|range_before_multirange|poly_distance|pg_stat_get_wal_senders|charlt|oidvectortypes|multirange_ge|circle_add_pt|anynonarray_in|inet_server_addr|int8pl_inet|anycompatiblearray_out|pg_stat_get_slru|oidvectorge|cos|fdw_handler_in|multirange_after_range|obj_description|timestamptz_ne_date|bit_in|hashint8|uuid_gt|float48pl|brin_bloom_summary_in|btequalimage|pg_lsn_ge|line_eq|pclose|cbrt|int2|uuid_ne|database_to_xml|int8range_subdiff|oidvectorle|percent_rank|macaddr8_set7bit|jsonb_path_query_first_tz|shobj_description|array_position|arraycontained|byteacmp|RI_FKey_setnull_upd|RI_FKey_restrict_upd|pg_stat_get_tuples_hot_updated|byteane|int82mi|to_regoper|internal_in|date_eq|int24mi|int2and|time_pl_interval|xid8gt|time_smaller|timestamptztypmodout|pg_relation_is_publishable|path|tstzmultirange|jsonb_object_keys|hashtextextended|booleq|tsquery_le|array_lt|poly_contained|timedate_pl|boolor_statefunc|in_range|to_tsquery|float8out|pg_ddl_command_in|cash_le|lseg_send|bitne|float8_combine|binary_upgrade_set_next_pg_authid_oid|date_le_timestamptz|int2lt|int28mul|xidsend|regr_avgx|elem_contained_by_multirange|timestamptz_cmp_date|pg_create_logical_replication_slot|poly_below|pg_lsn_mii|timetypmodout|int84eq|range_ne|timetz_send|date_mii|to_ascii|cidout|inet_send|pg_get_viewdef|box_contain|xidin|cstring_out|regprocedurein|tsquery_phrase|jsonb_ge|timestamp_gt_date|dist_sl|database_to_xmlschema|pg_lsn_send|pg_stat_get_db_temp_files|pg_stat_get_buf_fsync_backend|concat_ws|int8lt|jsonb_extract_path_text|line_vertical|tsm_handler_in|tidle|jsonb_agg|pg_last_wal_receive_lsn|date_le_timestamp|nameconcatoid|timestamp_ne_timestamptz|tideq|int84le|query_to_xmlschema|int8inc_float8_float8|ceiling|query_to_xml|tsvector_cmp|pg_read_file_old|array_in|macaddr_out|jsonb_to_recordset|cursor_to_xml|int8gt|numeric_ln|binary_upgrade_set_next_index_pg_class_oid|date_part|path_n_lt|tsvector_eq|gtsvectorout|table_am_handler_out|pg_stat_get_db_tuples_inserted|timetzdate_pl|to_regcollation|interval_pl_time|close_pb|pg_snapshot_xmin|macaddr_eq|btrim|int28mi|timestamptztypmodin|RI_FKey_setdefault_del|pg_size_pretty|poly_overright|to_regclass|pg_stat_get_xact_blocks_fetched|pg_options_to_table|btvarstrequalimage|jsonb_path_query_first|pg_get_functiondef|charle|varbit|int28pl|fmgr_sql_validator|oid|timestamptz_out|pg_table_is_visible|hash_range_extended|lo_lseek64|int24gt|pg_try_advisory_lock_shared|pg_stat_get_backend_pid|float8up|brin_bloom_summary_out|regprocin|covar_samp|network_lt|float8gt|random|pg_advisory_unlock_all|to_date|interval_cmp|multirange_adjacent_range|hashfloat4extended|enum_larger|pg_stat_get_xact_tuples_inserted|pg_is_wal_replay_paused|poly_left|int48lt|pg_event_trigger_dropped_objects|int82ne|_pg_truetypmod|_pg_interval_type|repeat|timestamp_cmp_timestamptz|pg_stat_get_backend_client_addr|path_length|ts_lexize|pg_stat_get_mod_since_analyze|brin_minmax_multi_summary_send|ntile|numeric_pl_pg_lsn|pg_ddl_command_out|xpath_exists|pg_control_init|asinh|time_ge|name|pg_terminate_backend|int24lt|lower|int28gt|numeric_sqrt|circle_overright|row_security_active|int2_avg_accum|int8mul|uuid_in|circle_lt|box_le|timestamp_lt|pg_stat_get_db_tuples_fetched|pg_get_catalog_foreign_keys|timetz_out|bttextnamecmp|int2gt|pg_stat_get_tuples_returned|varbiteq|multirange_contains_multirange|int8|json_extract_path|range_contains|ts_match_qv|tsvector_update_trigger|on_sb|regexp_split_to_array|numerictypmodout|pg_stat_get_db_session_time|json_build_array|timetz_ne|range_le|timestamptz_lt|poly_overabove|circle_overleft|unknownin|int2smaller|xmlagg|pg_stat_get_backend_activity_start|suppress_redundant_updates_trigger|convert_to|int28lt|numeric_ne|xidneqint4|sign|bytealike|pg_cursor|pg_stat_get_db_temp_bytes|bttext_pattern_cmp|tsq_mcontained|upper_inc|timestamptz_gt_date|tsquery_not|pg_indexes_size|pg_current_xact_id|varcharin|timestamptypmodin|ceil|lseg_gt|current_user|record_lt|int8mod|pg_stat_get_archiver|isempty|network_larger|xmlexists|timetz|schema_to_xml_and_xmlschema|shell_in|binary_upgrade_set_record_init_privs|isopen|cash_div_int8|numeric_le|float48div|enum_eq|bit_xor|int24le|range_intersect_agg|pg_logical_slot_get_binary_changes|array_to_json|datetime_pl|oidvectorin|pg_stat_get_tuples_inserted|hashoidvectorextended|pg_show_all_settings|_pg_expandarray|int4mi|multirange_adjacent_multirange|range_after|pg_drop_replication_slot|regr_syy|dist_cpoint|record_le|uuid_eq|pi|macaddr8_and|date_ne_timestamp|path_center|pg_stat_get_db_blocks_fetched|varcharout|int84mi|box_add|int4smaller|currval|time_mi_interval|timestamp_hash_extended|enum_ge|log|date_ne|float4smaller|timestamp_gt|float48lt|float4eq|cstring_send|mul_d_interval|jsonb_path_exists_opr|exp|float4abs|pg_cancel_backend|set_bit|cash_in|regoperatorsend|phraseto_tsquery|timestamp_mi|int8up|hash_multirange|line_out|pg_collation_for|btint2cmp|cursor_to_xmlschema|numeric_div_trunc|hash_array|txid_snapshot_xmax|textregexne|jsonb_object_field_text|hashoidextended|regcollationsend|textnlike|dist_polyc|array_le|macaddr_gt|namelt|int8out|pg_logical_emit_message|record_image_ge|byteale|acos|pg_current_snapshot|pg_copy_logical_replication_slot|array_length|jsonb_object_agg|to_json|json_out|pg_mcv_list_in|numeric_exp|has_tablespace_privilege|int2vectorsend|bool|popen|query_to_xml_and_xmlschema|jsonb_set|pg_get_userbyid|lo_create|pg_notify|record_send|jsonb_gt|int2ne|pg_has_role|varbitgt|jsonb_path_query_tz|range_ge|boolle|tsvector_update_trigger_column|anycompatiblemultirange_out|numeric_inc|float8_regr_r2|array_append|sha224|int82pl|float8ge|jsonb_path_query_array|charsend|hashint4|macaddr_ge|int48div|pg_node_tree_out|int24pl|int4range_canonical|anyenum_in|int28div|lo_truncate64|int4in|interval_combine|box_overleft|hashcharextended|binary_upgrade_set_next_heap_pg_class_oid|int8range_canonical|network_eq|circle_out|pg_stat_get_db_blocks_hit|biteq|timestamptz_ge_date|inetmi|to_hex|json_send|array_fill|interval_um|int8eq|inter_sl|pg_lock_status|timestamptz_in|date_in|xid8in|btoidcmp|cash_mul_int4|rpad|pg_function_is_visible|float8_regr_avgy|date_send|timestamp_larger|format_type|pg_filenode_relation|pg_logical_slot_peek_changes|textregexeq|currtid2|flt4_mul_cash|point_right|float8um|regclassin|min|regprocout|bitor|anynonarray_out|void_send|float8_var_samp|int2up|timestamp_out|int8shr|anycompatible_in|cume_dist|line_horizontal|uuid_lt|circle_le|range_union|time_out|multirange|pg_stat_get_tuples_fetched|oidvectorgt|timestamptz_smaller|multirange_contains_range|box_center|array_agg|xid8cmp|table_to_xml_and_xmlschema|interval|dcbrt|pg_get_wal_replay_pause_state|timetz_larger|cash_lt|timestamptz_mi|time_gt|varchartypmodout|tidin|jsonb_exists_any|anycompatiblearray_in|quote_literal|xml|timetz_mi_interval|boolout|_pg_numeric_precision_radix|circle_overlap|char|json_array_element_text|timestamp_send|pg_ndistinct_in|lo_lseek|dlog1|timetz_gt|record_eq|tsquery_or|regoperout|stddev|lastval|float8|xid8le|hashbpcharextended|pg_get_function_sqlbody|unknownout|pg_stat_get_live_tuples|oidgt|money|tidlt|int84div|tsvector_lt|array_positions|pg_stat_get_xact_blocks_hit|jsonb_cmp|int84lt|network_supeq|on_ppath|timestamptz_gt_timestamp|macaddr8_lt|nameicregexne|pg_partition_tree|bitle|int2larger|int2out|on_pb|int8ne|byteain|array_out|array_cat|float8_regr_combine|pg_get_indexdef|numeric_uplus|aclcontains|setweight|pg_get_partition_constraintdef|interval_mi|text_le|timetztypmodin|float4_accum|float48ne|hashbpchar|record_out|timezone|anycompatible_out|uuid_le|pg_operator_is_visible|pg_stat_get_xact_numscans|xml_in|timestamp_le|btboolcmp|line_intersect|lo_get|array_dims|nameout|line|lseg_interpt|bit_length|txid_current_if_assigned|json_object|byteaeq|notlike|convert|bpchartypmodout|RI_FKey_restrict_del|pg_copy_physical_replication_slot|tsvectorin|json_array_length|pg_stat_get_db_tuples_returned|text_gt|btfloat84cmp|pg_ts_template_is_visible|float8mi|multirange_before_multirange|pg_stat_get_xact_function_calls|pg_opfamily_is_visible|interval_smaller|btrecordimagecmp|arraycontains|pg_control_recovery|similar_escape|pg_sleep_until|regdictionaryin|hashmacaddr|int8inc_any|has_server_privilege|regproceduresend|int84pl|pg_stat_get_db_numbackends|json_strip_nulls|regcollationin|int4mul|date_gt_timestamp|circle_div_pt|ts_match_tq|float4ne|loread|pow|bpchar|any_out|close_sl|namein|timestamptz_ge_timestamp|box_ge|pg_stat_get_backend_start|oidvectoreq|namelike|regdictionarysend|hash_record|date_lt_timestamp|anyrange_out|timestamptz_le_date|to_regproc|pg_stat_get_db_deadlocks|timestamptz_le_timestamp|ts_filter|table_to_xml|multirange_lt|trim_scale|lseg_intersect|var_pop|pg_mcv_list_send|hash_record_extended|date_lt|make_interval|interval_accum|generate_series|pg_stat_get_blocks_hit|parse_ident|pg_advisory_lock|byteasend|macaddr8_ne|multirange_overright_range|pg_lsn_pli|numnode|pg_stat_get_db_sessions|ishorizontal|getpgusername|poly_overlap|tidne|pg_ts_dict_is_visible|timetz_hash_extended|make_time|anycompatiblerange_out|justify_hours|int4um|int2in|json_agg|array_ndims|float4up|generate_subscripts|multirange_intersect_agg_transfn|enum_first|pg_timezone_names|oidvectorne|timestamp_lt_timestamptz|inet_server_port|multirange_overlaps_multirange|timestamp_mi_interval|multirange_minus|macaddr_lt|regprocsend|array_to_tsvector|initcap|date_ne_timestamptz|date_bin|numeric_div|pg_walfile_name|time_in|int24ge|current_setting|circle_ne|timetz_pl_interval|dist_bs|radius|multirange_out|pg_stat_get_db_xact_commit|range_overleft_multirange|interval_lt|jsonb_delete_path|regr_count|bpcharicregexeq|pg_backend_pid|justify_days|circle_above|regr_slope|time_hash|xmlconcat2|namegt|oidsmaller|pg_log_backend_memory_contexts|bittypmodout|float4gt|json_extract_path_text|bitshiftright|schema_to_xml|postgresql_fdw_validator|circle_distance|isvertical|lo_tell64|pg_stat_get_numscans|cash_div_int4|pg_try_advisory_lock|int4abs|integer_pl_date|path_n_gt|tsquery_and|pg_walfile_name_offset|slope|int4shl|timestamptz_send|date_eq_timestamp|interval_send|mod|namenlike|bpchar_pattern_ge|bttextcmp|oideq|range_before|timestamp_eq|current_schemas|txid_snapshot_in|close_lseg|regopersend|dist_ppath|jsonb_extract_path|lseg_perp|nextval|corr|pg_stat_get_autovacuum_count|timestamptz_ge|pg_extension_config_dump|to_tsvector|jsonb_le|pg_stat_get_db_tuples_deleted|date_eq_timestamptz|pg_tablespace_size|pg_stat_get_backend_dbid|btint28cmp|pg_stat_get_xact_function_total_time|interval_pl_timetz|point_add|int2shr|lseg_vertical|pg_stat_get_db_sessions_killed|RI_FKey_cascade_upd|record_image_le|websearch_to_tsquery|pg_dependencies_send|time_hash_extended|jsonpath_send|pg_ndistinct_out|textltname|int4eq|tsvectorsend|float8_var_pop");
    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "keyword": keywords
    }, "identifier", true);
    var sqlRules = [{
            token: "string",
            regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
        }, {
            token: "variable.language",
            regex: '".*?"'
        }, {
            token: "constant.numeric",
            regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
            token: keywordMapper,
            regex: "[a-zA-Z_][a-zA-Z0-9_$]*\\b" // TODO - Unicode in identifiers
        }, {
            token: "keyword.operator",
            regex: "!|!!|!~|!~\\*|!~~|!~~\\*|#|##|#<|#<=|#<>|#=|#>|#>=|%|\\&|\\&\\&|\\&<|\\&<\\||\\&>|\\*|\\+|" +
                "\\-|/|<|<#>|<\\->|<<|<<=|<<\\||<=|<>|<\\?>|<@|<\\^|=|>|>=|>>|>>=|>\\^|\\?#|\\?\\-|\\?\\-\\||" +
                "\\?\\||\\?\\|\\||@|@\\-@|@>|@@|@@@|\\^|\\||\\|\\&>|\\|/|\\|>>|\\|\\||\\|\\|/|~|~\\*|~<=~|~<~|" +
                "~=|~>=~|~>~|~~|~~\\*"
        }, {
            token: "paren.lparen",
            regex: "[\\(]"
        }, {
            token: "paren.rparen",
            regex: "[\\)]"
        }, {
            token: "text",
            regex: "\\s+"
        }
    ];
    this.$rules = {
        "start": [{
                token: "comment",
                regex: "--.*$"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token: "comment",
                regex: "\\/\\*",
                next: "comment"
            }, {
                token: "keyword.statementBegin",
                regex: "[a-zA-Z]+",
                next: "statement"
            }, {
                token: "support.buildin",
                regex: "^\\\\[\\S]+.*$"
            }
        ],
        "statement": [{
                token: "comment",
                regex: "--.*$"
            }, {
                token: "comment",
                regex: "\\/\\*",
                next: "commentStatement"
            }, {
                token: "statementEnd",
                regex: ";",
                next: "start"
            }, {
                token: "string",
                regex: "\\$perl\\$",
                next: "perl-start"
            }, {
                token: "string",
                regex: "\\$python\\$",
                next: "python-start"
            }, {
                token: "string",
                regex: "\\$json\\$",
                next: "json-start"
            }, {
                token: "string",
                regex: "\\$(js|javascript)\\$",
                next: "javascript-start"
            }, {
                token: "string",
                regex: "\\$\\$$",
                next: "dollarSql"
            }, {
                token: "string",
                regex: "\\$[\\w_0-9]*\\$",
                next: "dollarStatementString"
            }
        ].concat(sqlRules),
        "dollarSql": [{
                token: "comment",
                regex: "--.*$"
            }, {
                token: "comment",
                regex: "\\/\\*",
                next: "commentDollarSql"
            }, {
                token: ["keyword", "statementEnd", "text", "string"],
                regex: "(^|END)(;)?(\\s*)(\\$\\$)",
                next: "statement"
            }, {
                token: "string",
                regex: "\\$[\\w_0-9]*\\$",
                next: "dollarSqlString"
            }
        ].concat(sqlRules),
        "comment": [{
                token: "comment",
                regex: "\\*\\/",
                next: "start"
            }, {
                defaultToken: "comment"
            }
        ],
        "commentStatement": [{
                token: "comment",
                regex: "\\*\\/",
                next: "statement"
            }, {
                defaultToken: "comment"
            }
        ],
        "commentDollarSql": [{
                token: "comment",
                regex: "\\*\\/",
                next: "dollarSql"
            }, {
                defaultToken: "comment"
            }
        ],
        "dollarStatementString": [{
                token: "string",
                regex: ".*?\\$[\\w_0-9]*\\$",
                next: "statement"
            }, {
                token: "string",
                regex: ".+"
            }
        ],
        "dollarSqlString": [{
                token: "string",
                regex: ".*?\\$[\\w_0-9]*\\$",
                next: "dollarSql"
            }, {
                token: "string",
                regex: ".+"
            }
        ]
    };
    this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
    this.embedRules(PerlHighlightRules, "perl-", [{ token: "string", regex: "\\$perl\\$", next: "statement" }]);
    this.embedRules(PythonHighlightRules, "python-", [{ token: "string", regex: "\\$python\\$", next: "statement" }]);
    this.embedRules(JsonHighlightRules, "json-", [{ token: "string", regex: "\\$json\\$", next: "statement" }]);
    this.embedRules(JavaScriptHighlightRules, "javascript-", [{ token: "string", regex: "\\$(js|javascript)\\$", next: "statement" }]);
};
oop.inherits(PgsqlHighlightRules, TextHighlightRules);
exports.Pgsql14HighlightRules = PgsqlHighlightRules;

});

define("ace/mode/pgsql14",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/pgsql14_highlight_rules"], function(require, exports, module){var oop = require("../lib/oop");
var TextMode = require("../mode/text").Mode;
var PgsqlHighlightRules = require("./pgsql14_highlight_rules").Pgsql14HighlightRules;
var Mode = function () {
    this.HighlightRules = PgsqlHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);
(function () {
    this.lineCommentStart = "--";
    this.blockComment = { start: "/*", end: "*/" };
    this.getNextLineIndent = function (state, line, tab) {
        if (state == "start" || state == "keyword.statementEnd") {
            return "";
        }
        else {
            return this.$getIndent(line); // Keep whatever indent the previous line has
        }
    };
    this.$id = "ace/mode/pgsql14";
}).call(Mode.prototype);
exports.Mode = Mode;

});                (function() {
                    window.require(["ace/mode/pgsql14"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            