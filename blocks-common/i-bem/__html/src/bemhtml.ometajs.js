var ometajs_ = require("ometajs");

var AbstractGrammar = ometajs_.grammars.AbstractGrammar;

var BSJSParser = ometajs_.grammars.BSJSParser;

var BSJSIdentity = ometajs_.grammars.BSJSIdentity;

var BSJSTranslator = ometajs_.grammars.BSJSTranslator;

var BEMHTMLParser = function BEMHTMLParser(source) {
    XJSTParser.call(this, source);
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
    return this._atomic(function() {
        return this._rule("bhDefault", false, [], null, this["bhDefault"]);
    }) || this._atomic(function() {
        return this._rule("bhTag", false, [], null, this["bhTag"]);
    }) || this._atomic(function() {
        return this._rule("bhAttrs", false, [], null, this["bhAttrs"]);
    }) || this._atomic(function() {
        return this._rule("bhClass", false, [], null, this["bhClass"]);
    }) || this._atomic(function() {
        return this._rule("bhBEM", false, [], null, this["bhBEM"]);
    }) || this._atomic(function() {
        return this._rule("bhJSAttr", false, [], null, this["bhJSAttr"]);
    }) || this._atomic(function() {
        return this._rule("bhJS", false, [], null, this["bhJS"]);
    }) || this._atomic(function() {
        return this._rule("bhMix", false, [], null, this["bhMix"]);
    }) || this._atomic(function() {
        return this._rule("bhContent", false, [], null, this["bhContent"]);
    });
};

BEMHTMLParser.prototype["bhPredic"] = function $bhPredic() {
    var n, nn;
    return this._skip() && (n = this._getIntermediate(), true) && this._rule("spaces", false, [], null, this["spaces"]) && this._rule("seq", false, [ n ], null, this["seq"]) && (nn = this._getIntermediate(), true) && this._exec(nn);
};

BEMHTMLParser.prototype["bhDefault"] = function $bhDefault() {
    var n;
    return this._rule("bhPredic", false, [ "default" ], null, this["bhPredic"]) && (n = this._getIntermediate(), true) && this._exec([ n ]);
};

BEMHTMLParser.prototype["bhTag"] = function $bhTag() {
    var n;
    return this._rule("bhPredic", false, [ "tag" ], null, this["bhPredic"]) && (n = this._getIntermediate(), true) && this._exec([ n ]);
};

BEMHTMLParser.prototype["bhAttrs"] = function $bhAttrs() {
    var n;
    return this._rule("bhPredic", false, [ "attrs" ], null, this["bhPredic"]) && (n = this._getIntermediate(), true) && this._exec([ n ]);
};

BEMHTMLParser.prototype["bhClass"] = function $bhClass() {
    var n;
    return this._rule("bhPredic", false, [ "cls" ], null, this["bhPredic"]) && (n = this._getIntermediate(), true) && this._exec([ n ]);
};

BEMHTMLParser.prototype["bhBEM"] = function $bhBEM() {
    var n;
    return this._rule("bhPredic", false, [ "bem" ], null, this["bhPredic"]) && (n = this._getIntermediate(), true) && this._exec([ n ]);
};

BEMHTMLParser.prototype["bhJS"] = function $bhJS() {
    var n;
    return this._rule("bhPredic", false, [ "js" ], null, this["bhPredic"]) && (n = this._getIntermediate(), true) && this._exec([ n ]);
};

BEMHTMLParser.prototype["bhJSAttr"] = function $bhJSAttr() {
    var n;
    return this._rule("bhPredic", false, [ "jsAttr" ], null, this["bhPredic"]) && (n = this._getIntermediate(), true) && this._exec([ n ]);
};

BEMHTMLParser.prototype["bhMix"] = function $bhMix() {
    var n;
    return this._rule("bhPredic", false, [ "mix" ], null, this["bhPredic"]) && (n = this._getIntermediate(), true) && this._exec([ n ]);
};

BEMHTMLParser.prototype["bhContent"] = function $bhContent() {
    var n;
    return this._rule("bhPredic", false, [ "content" ], null, this["bhPredic"]) && (n = this._getIntermediate(), true) && this._exec([ n ]);
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
            return BEMHTMLParser._applyPredicates(this.predicates, BEMHTMLBEMHTMLParser._concatChildren(t, [ "sub", ts ]));
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
    ts.forEach(function(t) {
        var isBlock = false, isElemOrCustom = false;
        t.forEach(function(p) {
            isBlock || (isBlock = p[0] === "block");
            isElemOrCustom || (isElemOrCustom = p[0] == "elem" || p[0] == "xjst");
        });
        isBlock && !isElemOrCustom && t.unshift([ "xjst", [ "unop", "!", [ "getp", [ "string", "elem" ], [ "this" ] ] ] ]);
    });
    return ts;
};

var BEMHTMLToXJST = function BEMHTMLToXJST(source) {
    XJSTCompiler.call(this, source);
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
    var ps, b;
    return this._list(function() {
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("bhPredic", false, [], null, this["bhPredic"]);
            });
        }) && (ps = this._getIntermediate(), true) && this._rule("bhBody", false, [], null, this["bhBody"]) && (b = this._getIntermediate(), true);
    }) && this._exec(function() {
        return "template(" + ps.join(" && ") + ") " + b;
    }.call(this));
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