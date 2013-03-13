var ometa = require('ometajs'),
    OMeta = ometa.OMeta,
    Parser = ometa.Parser,
    BSJSParser = exports.BSJSParser = ometa.BSJSParser,
    BSJSTranslator = exports.BSJSTranslator = ometa.BSJSTranslator,
    xjst = require('xjst'),
    XJSTParser = xjst.XJSTParser,
    XJSTCompiler = xjst.XJSTCompiler;

var ometajs_ = require("ometajs");

var AbstractGrammar = ometajs_.grammars.AbstractGrammar;

var BSJSParser = ometajs_.grammars.BSJSParser;

var BSJSIdentity = ometajs_.grammars.BSJSIdentity;

var BSJSTranslator = ometajs_.grammars.BSJSTranslator;

var BEMHTMLParser = function BEMHTMLParser(source, opts) {
    XJSTParser.call(this, source, opts);
};

BEMHTMLParser.grammarName = "BEMHTMLParser";

BEMHTMLParser.match = XJSTParser.match;

BEMHTMLParser.matchAll = XJSTParser.matchAll;

exports.BEMHTMLParser = BEMHTMLParser;

require("util").inherits(BEMHTMLParser, XJSTParser);

BEMHTMLParser.prototype["isKeyword"] = function $isKeyword() {
    return this._atomic(function() {
        var x;
        return this._skip() && (x = this._getIntermediate(), true) && x === "applyCtx";
    }) || this._atomic(function() {
        return this._rule("isKeyword", false, [], XJSTParser, XJSTParser.prototype["isKeyword"]);
    });
};

BEMHTMLParser.prototype["bemMatch"] = function $bemMatch() {
    return this._atomic(function() {
        return this._rule("bemBlock", false, [], null, this["bemBlock"]);
    }) || this._atomic(function() {
        return this._rule("bemElem", false, [], null, this["bemElem"]);
    }) || this._atomic(function() {
        return this._rule("bemMod", false, [], null, this["bemMod"]);
    });
};

BEMHTMLParser.prototype["bemVal"] = function $bemVal() {
    var x, xs;
    return this._atomic(function() {
        return this._rule("letter", false, [], null, this["letter"]) && (x = this._getIntermediate(), true) && this._many(function() {
            return this._atomic(function() {
                return this._atomic(function() {
                    return this._rule("letter", false, [], null, this["letter"]);
                }) || this._atomic(function() {
                    return this._rule("digit", false, [], null, this["digit"]);
                }) || this._match("-");
            });
        }) && (xs = this._getIntermediate(), true) && this._exec([ "string", x + xs.join("") ]);
    }) || this._atomic(function() {
        return this._rule("asgnExpr", false, [], null, this["asgnExpr"]);
    });
};

BEMHTMLParser.prototype["bemPredic"] = function $bemPredic() {
    var n, nn;
    return this._skip() && (n = this._getIntermediate(), true) && this._rule("spaces", false, [], null, this["spaces"]) && this._rule("seq", false, [ n ], null, this["seq"]) && (nn = this._getIntermediate(), true) && this._many(function() {
        return this._atomic(function() {
            return this._rule("space", false, [], null, this["space"]);
        });
    }) && this._exec(nn);
};

BEMHTMLParser.prototype["bemBlock"] = function $bemBlock() {
    var n, v;
    return this._rule("bemPredic", false, [ "block" ], null, this["bemPredic"]) && (n = this._getIntermediate(), true) && this._rule("bemVal", false, [], null, this["bemVal"]) && (v = this._getIntermediate(), true) && this._exec([ "block", v ]);
};

BEMHTMLParser.prototype["bemElem"] = function $bemElem() {
    var v;
    return this._rule("bemPredic", false, [ "elem" ], null, this["bemPredic"]) && this._rule("bemVal", false, [], null, this["bemVal"]) && (v = this._getIntermediate(), true) && this._exec([ "elem", v ]);
};

BEMHTMLParser.prototype["bemMod"] = function $bemMod() {
    var m, v, m, v;
    return this._atomic(function() {
        return this._rule("bemPredic", false, [ "mod" ], null, this["bemPredic"]) && this._rule("bemVal", false, [], null, this["bemVal"]) && (m = this._getIntermediate(), true) && this._many(function() {
            return this._atomic(function() {
                return this._rule("space", false, [], null, this["space"]);
            });
        }) && this._rule("bemVal", false, [], null, this["bemVal"]) && (v = this._getIntermediate(), true) && this._exec([ "blockMod", m, v ]);
    }) || this._atomic(function() {
        return this._rule("bemPredic", false, [ "elemMod" ], null, this["bemPredic"]) && this._rule("bemVal", false, [], null, this["bemVal"]) && (m = this._getIntermediate(), true) && this._many(function() {
            return this._atomic(function() {
                return this._rule("space", false, [], null, this["space"]);
            });
        }) && this._rule("bemVal", false, [], null, this["bemVal"]) && (v = this._getIntermediate(), true) && this._exec([ "elemMod", m, v ]);
    });
};

BEMHTMLParser.prototype["bemCustom"] = function $bemCustom() {
    var e;
    return this._rule("asgnExpr", false, [], null, this["asgnExpr"]) && (e = this._getIntermediate(), true) && this._exec([ "xjst", e ]);
};

BEMHTMLParser.prototype["bemhtmlSet"] = function $bemhtmlSet() {
    var nn;
    return this._rule("spaces", false, [], null, this["spaces"]) && this._list(function() {
        return this._rule("letter", false, [], null, this["letter"]) && this._any(function() {
            return this._atomic(function() {
                return this._atomic(function() {
                    return this._rule("letter", false, [], null, this["letter"]);
                }) || this._atomic(function() {
                    return this._rule("digit", false, [], null, this["digit"]);
                }) || this._match("-") || this._match("_");
            });
        });
    }, true) && (nn = this._getIntermediate(), true) && this._atomic(function() {
        return this._rule("spaces", false, [], null, this["spaces"]) && (this._match("{") || this._match(":") || this._match(","));
    }, true) && !BEMHTMLParser._isPrimitive(nn) && this._exec([ nn ]);
};

BEMHTMLParser.prototype["bemMatchAndSet"] = function $bemMatchAndSet() {
    return this._atomic(function() {
        return this._rule("bemMatch", false, [], null, this["bemMatch"]);
    }) || this._atomic(function() {
        return this._rule("bemhtmlSet", false, [], null, this["bemhtmlSet"]);
    }) || this._atomic(function() {
        return this._rule("bemCustom", false, [], null, this["bemCustom"]);
    });
};

BEMHTMLParser.prototype["listBemMatchAndSet"] = function $listBemMatchAndSet() {
    var $l0, $l1;
    return ($l0 = this, $l1 = $l0.predicates, $l0.predicates = [], true) && ((this._atomic(function() {
        var t, ts;
        return this._rule("bemMatchAndSet", false, [], null, this["bemMatchAndSet"]) && (t = this._getIntermediate(), true) && this._match(",") && this._rule("listBemMatchAndSet", false, [], null, this["listBemMatchAndSet"]) && (ts = this._getIntermediate(), true) && this._exec(function() {
            return BEMHTMLParser._applyPredicates(this.predicates, BEMHTMLParser._concatChildren(t, ts));
        }.call(this));
    }) || this._atomic(function() {
        var t, ts;
        return this._rule("bemMatchAndSet", false, [], null, this["bemMatchAndSet"]) && (t = this._getIntermediate(), true) && this._rule("spaces", false, [], null, this["spaces"]) && this._match("{") && this._rule("spaces", false, [], null, this["spaces"]) && this._many(function() {
            return this._atomic(function() {
                return this._rule("listBemMatchAndSet", false, [], null, this["listBemMatchAndSet"]);
            });
        }) && (ts = this._getIntermediate(), true) && this._rule("spaces", false, [], null, this["spaces"]) && this._match("}") && this._rule("spaces", false, [], null, this["spaces"]) && this._exec(function() {
            return BEMHTMLParser._applyPredicates(this.predicates, BEMHTMLParser._concatChildren(t, [ "sub", ts ]));
        }.call(this));
    }) || this._atomic(function() {
        var t, c;
        return this._rule("bemMatchAndSet", false, [], null, this["bemMatchAndSet"]) && (t = this._getIntermediate(), true) && this._match(":") && (this._atomic(function() {
            var e;
            return this._rule("asgnExpr", false, [], null, this["asgnExpr"]) && (e = this._getIntermediate(), true) && this._exec([ "return", e ]);
        }) || this._atomic(function() {
            return this._rule("stmt", false, [], null, this["stmt"]);
        })) && (c = this._getIntermediate(), true) && this._optional(function() {
            return this._match(",");
        }) && this._exec(function() {
            return BEMHTMLParser._applyPredicates(this.predicates, [ t, [ "body", c ] ]);
        }.call(this));
    }) || this._atomic(function() {
        var r;
        return this._rule("stmt", false, [], null, this["stmt"]) && (r = this._getIntermediate(), true) && this._exec([ "stmt", r ]);
    })) && ($l0.predicates = $l1, true) || ($l0.predicates = $l1, false));
};

BEMHTMLParser.prototype["applyMode"] = function $applyMode() {
    var type, e, modded_e, r;
    return this._skip() && (type = this._getIntermediate(), true) && this._rule("token", true, [ "apply" ], null, this["token"]) && this._rule("token", true, [ "(" ], null, this["token"]) && this._rule("expr", false, [], null, this["expr"]) && (e = this._getIntermediate(), true) && this._rule("token", true, [ ")" ], null, this["token"]) && this._exec(BEMHTMLParser._transMode(e)) && (modded_e = this._getIntermediate(), true) && this._rule("applyFactory", false, [ [ type, modded_e ] ], null, this["applyFactory"]) && (r = this._getIntermediate(), true) && this._exec(r);
};

BEMHTMLParser.prototype["applyCtx"] = function $applyCtx() {
    var type, ctx, modded_e, r;
    return this._skip() && (type = this._getIntermediate(), true) && this._rule("token", true, [ "applyCtx" ], null, this["token"]) && this._rule("token", true, [ "(" ], null, this["token"]) && this._rule("expr", false, [], null, this["expr"]) && (ctx = this._getIntermediate(), true) && this._rule("token", true, [ ")" ], null, this["token"]) && this._skip() && this._exec(BEMHTMLParser._transMode([ "binop", ",", [ "set", [ "getp", [ "string", "ctx" ], [ "this" ] ], ctx ], [ "string", "" ] ])) && (modded_e = this._getIntermediate(), true) && this._rule("applyFactory", false, [ [ type, "next", modded_e ] ], null, this["applyFactory"]) && (r = this._getIntermediate(), true) && this._exec(r);
};

BEMHTMLParser.prototype["primExprHd"] = function $primExprHd() {
    return this._atomic(function() {
        var r;
        return this._rule("applyMode", false, [ "expr" ], null, this["applyMode"]) && (r = this._getIntermediate(), true) && this._exec(r);
    }) || this._atomic(function() {
        var r;
        return this._rule("applyCtx", false, [ "expr" ], null, this["applyCtx"]) && (r = this._getIntermediate(), true) && this._exec(r);
    }) || this._atomic(function() {
        return this._rule("primExprHd", false, [], XJSTParser, XJSTParser.prototype["primExprHd"]);
    });
};

BEMHTMLParser.prototype["stmt"] = function $stmt() {
    return this._atomic(function() {
        var r;
        return this._rule("applyMode", false, [ "stmt" ], null, this["applyMode"]) && (r = this._getIntermediate(), true) && this._exec(r);
    }) || this._atomic(function() {
        var r;
        return this._rule("applyCtx", false, [ "stmt" ], null, this["applyCtx"]) && (r = this._getIntermediate(), true) && this._exec(r);
    }) || this._atomic(function() {
        return this._rule("stmt", false, [], XJSTParser, XJSTParser.prototype["stmt"]);
    });
};

BEMHTMLParser.prototype["topLevel"] = function $topLevel() {
    var ts;
    return this._any(function() {
        return this._atomic(function() {
            return this._rule("listBemMatchAndSet", false, [], null, this["listBemMatchAndSet"]);
        });
    }) && (ts = this._getIntermediate(), true) && this._rule("spaces", false, [], null, this["spaces"]) && this._rule("end", false, [], null, this["end"]) && this._exec(function() {
        return BEMHTMLParser._addElemPredic(BEMHTMLParser._dropAllSubs(ts));
    }.call(this));
};

BEMHTMLParser._primitives = {
    "true": true,
    "false": true,
    "null": true,
    "undefined": true,
    NaN: true,
    Infinity: true
};

BEMHTMLParser._isPrimitive = function(name) {
    return BEMHTMLParser._primitives[name];
};

BEMHTMLParser._transMode = function transMode(e) {
    function traverse(e) {
        if (e[0] !== "binop" && e[1] !== ",") return [ e ];
        return [].concat(traverse(e[2]), traverse(e[3]));
    }
    return traverse(e).map(function(e) {
        if (e[0] !== "string") return e;
        return [ "set", [ "getp", [ "string", "_mode" ], [ "this" ] ], e ];
    }).reduce(function(acc, current) {
        return [ "binop", ",", acc, current ];
    });
};

BEMHTMLParser._applyPredicates = function(predicates, to) {
    if (predicates.length != 0) to.unshift([ "xjst", predicates ]);
    return to;
};

BEMHTMLParser._concatChildren = function(p, cs) {
    if (cs[0] === "sub") {
        var res = [], i = 0, c;
        while (c = cs[1][i++]) {
            var cc = BEMHTMLParser._concatChildren(p, c);
            BEMHTMLParser._dropSub(res, cc);
        }
        return [ "sub", res ];
    } else return [ p ].concat(cs);
};

BEMHTMLParser._dropSub = function(buf, t) {
    t[0] === "sub" ? buf.push.apply(buf, t[1]) : buf.push(t);
};

BEMHTMLParser._dropAllSubs = function(ts) {
    var res = [], i = 0, t;
    while (t = ts[i++]) BEMHTMLParser._dropSub(res, t);
    return res;
};

BEMHTMLParser._addElemPredic = function(ts) {
    function isSafePredic(p) {
        switch (p[0]) {
          case "get":
          case "string":
          case "number":
            return true;
          case "getp":
            return p[2][0] === "this" ? p[1][0] !== "call" && (p[1][0] !== "string" || p[1][1] !== "elem") : p[2][0] !== "call";
          case "unop":
            return isSafePredic(p[2]);
          case "binop":
            return isSafePredic(p[2]) && isSafePredic(p[3]);
          default:
            return false;
        }
    }
    ts.forEach(function(t) {
        var isBlock, isNotElem;
        isBlock = t.some(function(p) {
            return p[0] === "block";
        });
        if (!isBlock) return;
        isNotElem = t.every(function(p) {
            if (p[0] === "elem" || p[0] === "xjst" && !isSafePredic(p[1])) {
                return false;
            }
            return true;
        });
        if (!isNotElem) return;
        t.unshift([ "xjst", [ "unop", "!", [ "getp", [ "string", "elem" ], [ "this" ] ] ] ]);
    });
    return ts;
};

var BEMHTMLToXJST = function BEMHTMLToXJST(source, opts) {
    XJSTCompiler.call(this, source, opts);
};

BEMHTMLToXJST.grammarName = "BEMHTMLToXJST";

BEMHTMLToXJST.match = XJSTCompiler.match;

BEMHTMLToXJST.matchAll = XJSTCompiler.matchAll;

exports.BEMHTMLToXJST = BEMHTMLToXJST;

require("util").inherits(BEMHTMLToXJST, XJSTCompiler);

BEMHTMLToXJST.prototype["bhPredic"] = function $bhPredic() {
    var e, m, v, e, m, v, e, m;
    return this._atomic(function() {
        return this._list(function() {
            return this._match("block") && this._rule("trans", false, [], null, this["trans"]) && (e = this._getIntermediate(), true);
        }) && this._exec(function() {
            return "this.block === (" + e + " )";
        }.call(this));
    }) || this._atomic(function() {
        return this._list(function() {
            return this._match("blockMod") && this._rule("trans", false, [], null, this["trans"]) && (m = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (v = this._getIntermediate(), true);
        }) && this._exec(function() {
            return "this.mods && this.mods[" + m + "] === (" + v + ")";
        }.call(this));
    }) || this._atomic(function() {
        return this._list(function() {
            return this._match("elem") && this._rule("trans", false, [], null, this["trans"]) && (e = this._getIntermediate(), true);
        }) && this._exec(function() {
            return "this.elem === (" + e + ")";
        }.call(this));
    }) || this._atomic(function() {
        return this._list(function() {
            return this._match("elemMod") && this._rule("trans", false, [], null, this["trans"]) && (m = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (v = this._getIntermediate(), true);
        }) && this._exec(function() {
            return "this.elemMods && this.elemMods[" + m + "] === (" + v + ")";
        }.call(this));
    }) || this._atomic(function() {
        return this._list(function() {
            return this._match("xjst") && this._rule("trans", false, [], null, this["trans"]) && (e = this._getIntermediate(), true);
        }) && this._exec(function() {
            return "(" + e + ")";
        }.call(this));
    }) || this._atomic(function() {
        return this._list(function() {
            return this._skip() && (m = this._getIntermediate(), true);
        }) && this._exec(function() {
            return 'this._mode === "' + m + '"';
        }.call(this));
    });
};

BEMHTMLToXJST.prototype["bhBody"] = function $bhBody() {
    var b;
    return this._list(function() {
        return this._match("body") && this._rule("tBody", false, [], null, this["tBody"]) && (b = this._getIntermediate(), true);
    }) && this._exec(function() {
        return "{ " + b + " }";
    }.call(this));
};

BEMHTMLToXJST.prototype["bhTemplate"] = function $bhTemplate() {
    return this._atomic(function() {
        var ps, b;
        return this._list(function() {
            return this._many(function() {
                return this._atomic(function() {
                    return this._rule("bhPredic", false, [], null, this["bhPredic"]);
                });
            }) && (ps = this._getIntermediate(), true) && this._rule("bhBody", false, [], null, this["bhBody"]) && (b = this._getIntermediate(), true);
        }) && this._exec(function() {
            return "template((" + ps.join(") && (") + ")) " + b;
        }.call(this));
    }) || this._atomic(function() {
        var r;
        return this._list(function() {
            return this._match("stmt") && this._rule("trans", false, [], null, this["trans"]) && (r = this._getIntermediate(), true);
        }) && this._exec(r + ";\n");
    });
};

BEMHTMLToXJST.prototype["topLevel"] = function $topLevel() {
    var ts, t;
    return this._atomic(function() {
        return this._list(function() {
            return this._many(function() {
                return this._atomic(function() {
                    return this._rule("bhTemplate", false, [], null, this["bhTemplate"]);
                });
            }) && (ts = this._getIntermediate(), true);
        }) && this._exec(ts.join("\n\n"));
    }) || this._atomic(function() {
        return this._rule("bhTemplate", false, [], null, this["bhTemplate"]) && (t = this._getIntermediate(), true) && this._exec(t);
    }) || this._atomic(function() {
        return this._rule("empty", false, [], null, this["empty"]) && this._exec("template(true){}");
    });
};

var BXJSTIdentity = function BXJSTIdentity(source, opts) {
    BSJSIdentity.call(this, source, opts);
};

BXJSTIdentity.grammarName = "BXJSTIdentity";

BXJSTIdentity.match = BSJSIdentity.match;

BXJSTIdentity.matchAll = BSJSIdentity.matchAll;

exports.BXJSTIdentity = BXJSTIdentity;

require("util").inherits(BXJSTIdentity, BSJSIdentity);

BXJSTIdentity.prototype["const"] = function $const() {
    var s, n;
    return this._list(function() {
        return this._match("string") && this._skip() && (s = this._getIntermediate(), true);
    }) || this._list(function() {
        return this._match("number") && this._skip() && (n = this._getIntermediate(), true);
    });
};

BXJSTIdentity.prototype["extends"] = function $extends() {
    var filename;
    return this._skip() && (filename = this._getIntermediate(), true) && this._exec([ "extends", filename ]);
};

BXJSTIdentity.prototype["superStmt"] = function $superStmt() {
    var op;
    return this._skip() && (op = this._getIntermediate(), true) && this._exec([ "superStmt", op ]);
};

BXJSTIdentity.prototype["superExpr"] = function $superExpr() {
    var op;
    return this._skip() && (op = this._getIntermediate(), true) && this._exec([ "superExpr", op ]);
};

BXJSTIdentity.prototype["nhApplyStmt"] = function $nhApplyStmt() {
    var p;
    return this._skip() && (p = this._getIntermediate(), true) && this._exec([ "nhApplyStmt", p ]);
};

BXJSTIdentity.prototype["nhApplyExpr"] = function $nhApplyExpr() {
    return this._exec([ "nhApplyExpr" ]);
};

BXJSTIdentity.prototype["applyStmt"] = function $applyStmt() {
    var p;
    return this._skip() && (p = this._getIntermediate(), true) && this._exec([ "applyStmt", p ]);
};

BXJSTIdentity.prototype["localStmt"] = function $localStmt() {
    var as, t;
    return this._rule("trans", false, [], null, this["trans"]) && (as = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (t = this._getIntermediate(), true) && this._exec([ "localStmt", as, t ]);
};

BXJSTIdentity.prototype["localExpr"] = function $localExpr() {
    var as, t;
    return this._rule("trans", false, [], null, this["trans"]) && (as = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (t = this._getIntermediate(), true) && this._exec([ "localExpr", as, t ]);
};

BXJSTIdentity.prototype["template"] = function $template() {
    var m, b;
    return this._rule("trans", false, [], null, this["trans"]) && (m = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (b = this._getIntermediate(), true) && this._exec([ "template", m, b ]);
};

var BEMHTMLLogLocal = function BEMHTMLLogLocal(source, opts) {
    BXJSTIdentity.call(this, source, opts);
};

BEMHTMLLogLocal.grammarName = "BEMHTMLLogLocal";

BEMHTMLLogLocal.match = BXJSTIdentity.match;

BEMHTMLLogLocal.matchAll = BXJSTIdentity.matchAll;

exports.BEMHTMLLogLocal = BEMHTMLLogLocal;

require("util").inherits(BEMHTMLLogLocal, BXJSTIdentity);

BEMHTMLLogLocal.prototype["localStmt"] = function $localStmt() {
    var a, t, log;
    return this._rule("trans", false, [], null, this["trans"]) && (a = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (t = this._getIntermediate(), true) && this._rule("logChanges", false, [ "stmt", a, t ], null, this["logChanges"]) && (log = this._getIntermediate(), true) && this._exec(function() {
        return [ "if", [ "getp", [ "string", "_localLog" ], [ "get", "__this" ] ], log, [ "begin", [ "localStmt", a, t ] ] ];
    }.call(this));
};

BEMHTMLLogLocal.prototype["localExpr"] = function $localExpr() {
    var a, t, log;
    return this._rule("trans", false, [], null, this["trans"]) && (a = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (t = this._getIntermediate(), true) && this._rule("logChanges", false, [ "expr", a, t ], null, this["logChanges"]) && (log = this._getIntermediate(), true) && this._exec(function() {
        return [ "condExpr", [ "getp", [ "string", "_localLog" ], [ "get", "__this" ] ], log, [ "localExpr", a, t ] ];
    }.call(this));
};

BEMHTMLLogLocal.prototype["transChange"] = function $transChange() {
    var v, e;
    return this._list(function() {
        return this._match("set") && this._list(function() {
            return this._atomic(function() {
                var v;
                return this._match("get") && this._skip() && (v = this._getIntermediate(), true);
            }) || this._atomic(function() {
                var p, v;
                return this._match("getp") && this._skip() && (p = this._getIntermediate(), true) && this._skip() && (v = this._getIntermediate(), true);
            });
        }) && this._skip() && (v = this._getIntermediate(), true);
    }) && (e = this._getIntermediate(), true) && this._exec(e);
};

BEMHTMLLogLocal.prototype["transJsonChange"] = function $transJsonChange() {
    var k, v, r;
    return this._list(function() {
        return this._match("binding") && this._skip() && (k = this._getIntermediate(), true) && this._skip() && (v = this._getIntermediate(), true);
    }) && this._rule("transChange", false, [ [ "set", [ "getp", [ "string", k ], [ "get", "__this" ] ], v ] ], null, this["transChange"]) && (r = this._getIntermediate(), true) && this._exec(r);
};

BEMHTMLLogLocal.prototype["transChanges"] = function $transChanges() {
    return this._atomic(function() {
        var pairs;
        return this._list(function() {
            return this._match("json") && this._any(function() {
                return this._atomic(function() {
                    return this._rule("transJsonChange", false, [], null, this["transJsonChange"]);
                });
            }) && (pairs = this._getIntermediate(), true);
        }) && this._exec(pairs);
    }) || this._atomic(function() {
        var left, right;
        return this._list(function() {
            return this._match("binop") && this._match(",") && this._rule("transChanges", false, [], null, this["transChanges"]) && (left = this._getIntermediate(), true) && this._rule("transChange", false, [], null, this["transChange"]) && (right = this._getIntermediate(), true);
        }) && this._exec(function() {
            return left.concat([ right ]);
        }.call(this));
    }) || this._atomic(function() {
        var r;
        return this._rule("transChange", false, [], null, this["transChange"]) && (r = this._getIntermediate(), true) && this._exec([ r ]);
    });
};

BEMHTMLLogLocal.prototype["logChanges"] = function $logChanges() {
    var type, changes, body;
    return this._skip() && (type = this._getIntermediate(), true) && this._rule("transChanges", false, [], null, this["transChanges"]) && (changes = this._getIntermediate(), true) && this._skip() && (body = this._getIntermediate(), true) && this._exec(function() {
        var self = this, localLog = [ "getp", [ "string", "_localLog" ], [ "get", "__this" ] ], prelude = [], args = [];
        changes = changes.map(function(change) {
            function flatten(property) {
                var result = [], curr = property;
                while (true) {
                    if (curr[0] !== "getp" && curr[0] !== "this" && (curr[0] !== "get" || curr[1] !== "__this")) {
                        return false;
                    }
                    if (curr[0] === "get" || curr[0] === "this" || curr[0] === "string") {
                        break;
                    }
                    result.push(curr[1]);
                    curr = curr[2];
                }
                return result.reverse();
            }
            var property = flatten(change[1]), value = change[2];
            if (!property || property.length === 0 || property[0][0] === "string" && property[0][1] === "ctx") {
                return change;
            }
            property = property.map(function(property) {
                if (property[0] === "string") return property;
                var tmp = self.getVar();
                prelude.push([ "set", tmp, property ]);
                return tmp;
            });
            var propValue = flatten(value);
            if (propValue) {
                args.push([ "arr", [ "arr" ].concat(property), [ "arr" ].concat(propValue) ]);
            } else {
                if (value[0] !== "string" && value[0] !== "get") {
                    var tmp = self.getVar();
                    prelude.push([ "set", tmp, value ]);
                    value = tmp;
                }
                args.push([ "arr", [ "arr" ].concat(property), value ]);
            }
            return [ "set", property.reduce(function(acc, curr) {
                return [ "getp", curr, acc ];
            }, [ "get", "__this" ]), value ];
        });
        var local = [ type === "stmt" ? "localStmt" : "localExpr", changes.reduce(function(prev, curr) {
            return [ "binop", ",", prev, curr ];
        }), body ];
        var call = [ "call", [ "getp", [ "string", "push" ], localLog ] ].concat(args);
        var result;
        if (args.length !== 0) {
            var reverse = [ "set", localLog, [ "call", [ "getp", [ "string", "slice" ], localLog ], [ "number", 0 ], [ "number", -args.length ] ] ], tmp = this.getVar();
            if (type === "expr") {
                result = prelude.concat([ call, [ "set", tmp, local ], reverse, tmp ]);
            } else {
                result = prelude.concat([ call, local, reverse ]);
            }
        } else {
            result = prelude.concat([ local ]);
        }
        if (type == "expr") {
            return result.reduce(function(prev, curr) {
                return [ "binop", ",", prev, curr ];
            });
        } else {
            return [ "begin" ].concat(result);
        }
    }.call(this));
};

BEMHTMLLogLocal.prototype["topLevel"] = function $topLevel() {
    var ts;
    return this._exec(this._vars = []) && this._list(function() {
        return this._any(function() {
            return this._atomic(function() {
                return this._rule("trans", false, [], null, this["trans"]);
            });
        }) && (ts = this._getIntermediate(), true);
    }) && this._exec([ this._vars, ts ]);
};

BEMHTMLLogLocal.prototype.getVar = function getVar() {
    var i = this._vars.length, name = "__bv" + i;
    this._vars.push(name);
    return [ "get", name ];
};