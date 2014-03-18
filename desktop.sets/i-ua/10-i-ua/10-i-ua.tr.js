var BEMHTML = function() {
  var cache,
      exports = {},
      xjst = (function(exports) {
    function $1(__$ctx) {
        var __t = __$ctx._mode;
        if (__t === "default") {
            return $2(__$ctx);
        } else if (__t === "attrs") {
            return $36(__$ctx);
        } else if (__t === "tag") {
            return $83(__$ctx);
        } else if (__t === "mix") {
            return $111(__$ctx);
        } else if (__t === "js") {
            return $122(__$ctx);
        } else if (__t === "content") {
            return $135(__$ctx);
        } else {
            return $148(__$ctx);
        }
    }
    function $2(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "select") {
            return $3(__$ctx);
        } else if (__t === "button") {
            return $17(__$ctx);
        } else {
            return $148(__$ctx);
        }
    }
    function $3(__$ctx) {
        if (__$ctx.elem === "group") {
            return $4(__$ctx);
        } else {
            return $9(__$ctx);
        }
    }
    function $4(__$ctx) {
        if (!(__$ctx["__$anflg10"] !== true) === false) {
            {
                "";
                var __r97 = __$ctx["__$anflg10"];
                __$ctx["__$anflg10"] = true;
                {
                    "";
                    var __r98 = __$ctx._labelId;
                    __$ctx._labelId = __$ctx.generateId();
                    $4(__$ctx);
                    __$ctx._labelId = __r98;
                    "";
                }
                __$ctx["__$anflg10"] = __r97;
                "";
            }
            undefined;
            return;
        } else {
            return $9(__$ctx);
        }
    }
    function $9(__$ctx) {
        if (!(__$ctx["__$anflg7"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $12(__$ctx);
            } else {
                return $148(__$ctx);
            }
        } else {
            return $148(__$ctx);
        }
    }
    function $12(__$ctx) {
        var _$1octx = __$ctx.ctx, _$1oid = _$1octx.id || __$ctx.generateId();
        {
            "";
            var __r89 = __$ctx["__$anflg7"];
            __$ctx["__$anflg7"] = true;
            {
                "";
                var __r90 = __$ctx._controlAttrs;
                __$ctx._controlAttrs = {
                    id: _$1oid,
                    name: _$1octx.name || _$1oid,
                    tabindex: _$1octx.tabindex
                };
                var __r91 = __$ctx._formSelect;
                __$ctx._formSelect = {
                    block: __$ctx.block,
                    mods: __$ctx.mods,
                    tabindex: _$1octx.tabindex
                };
                $3(__$ctx);
                __$ctx._controlAttrs = __r90;
                __$ctx._formSelect = __r91;
                "";
            }
            __$ctx["__$anflg7"] = __r89;
            "";
        }
        undefined;
        return;
    }
    function $17(__$ctx) {
        if (!(__$ctx["__$anflg9"] !== true) === false) {
            if (!__$ctx._formSelect === false) {
                if (!!__$ctx.elem === false) {
                    return $21(__$ctx);
                } else {
                    return $26(__$ctx);
                }
            } else {
                return $26(__$ctx);
            }
        } else {
            return $26(__$ctx);
        }
    }
    function $21(__$ctx) {
        var _$1xctx = __$ctx.ctx, _$1xselectMods = __$ctx._formSelect.mods, _$1xtabindex = __$ctx._formSelect.tabindex, _$1xm = _$1xctx.mods || {};
        _$1xm.arrow = "down";
        _$1xselectMods.theme && (_$1xm.theme = _$1xselectMods.theme);
        _$1xselectMods.size && (_$1xm.size = _$1xselectMods.size);
        _$1xselectMods.disabled === "yes" && (_$1xm.disabled = "yes");
        _$1xctx.mods = _$1xm;
        _$1xtabindex && (_$1xctx.tabindex = _$1xtabindex);
        {
            "";
            var __r94 = __$ctx["__$anflg9"];
            __$ctx["__$anflg9"] = true;
            {
                "";
                var __r95 = __$ctx.ctx, __r96 = __r95._theme;
                __r95._theme = true;
                $17(__$ctx);
                __r95._theme = __r96;
                "";
            }
            __$ctx["__$anflg9"] = __r94;
            "";
        }
        undefined;
        return;
    }
    function $26(__$ctx) {
        if (!(__$ctx["__$anflg4"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                var _$1jmods = __$ctx.ctx.mods || {};
                _$1jmods.theme = _$1jmods.theme || "normal";
                {
                    "";
                    var __r82 = __$ctx["__$anflg4"];
                    __$ctx["__$anflg4"] = true;
                    {
                        "";
                        var __r83 = __$ctx.ctx, __r84 = __r83.mods;
                        __r83.mods = _$1jmods;
                        $17(__$ctx);
                        __r83.mods = __r84;
                        "";
                    }
                    __$ctx["__$anflg4"] = __r82;
                    "";
                }
                undefined;
                return;
            } else {
                return $148(__$ctx);
            }
        } else {
            return $148(__$ctx);
        }
    }
    function $36(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "select") {
            var __t = __$ctx.elem;
            if (__t === "group") {
                return {
                    role: "group",
                    "aria-labelledby": __$ctx._labelId
                };
                return;
            } else if (__t === "control") {
                var _$20attrs = [ "id", "name", "tabindex" ], _$20prop = {}, _$20p;
                while (_$20p = _$20attrs.pop()) {
                    __$ctx._controlAttrs[_$20p] && (_$20prop[_$20p] = __$ctx._controlAttrs[_$20p]);
                }
                __$ctx.mods.disabled === "yes" && (_$20prop.disabled = "disabled");
                _$20prop.tabindex = -1;
                _$20prop["aria-hidden"] = true;
                return __$ctx.ctx.controlAttrs || _$20prop;
                return;
            } else if (__t === "item") {
                return $42(__$ctx);
            } else {
                return $148(__$ctx);
            }
        } else if (__t === "button") {
            return $49(__$ctx);
        } else {
            return $148(__$ctx);
        }
    }
    function $42(__$ctx) {
        if (!(__$ctx["__$anflg8"] !== true) === false) {
            var __r92, __r93;
            var _$1va = ("", __r92 = __$ctx["__$anflg8"], __$ctx["__$anflg8"] = true, __r93 = $42(__$ctx), __$ctx["__$anflg8"] = __r92, "", __r93) || {};
            if ((__$ctx.ctx.elemMods || {}).label === "yes") {
                _$1va.id = __$ctx._labelId;
                _$1va["aria-hidden"] = true;
            } else {
                undefined;
            }
            return _$1va;
            return;
        } else {
            return {
                id: __$ctx.generateId()
            };
            return;
        }
    }
    function $49(__$ctx) {
        if (!__$ctx._formSelect === false) {
            if (!!__$ctx.elem === false) {
                return {
                    role: "listbox",
                    type: "button",
                    "aria-haspopup": true,
                    "aria-expanded": false
                };
                return;
            } else {
                return $55(__$ctx);
            }
        } else {
            return $55(__$ctx);
        }
    }
    function $55(__$ctx) {
        if (!(__$ctx["__$anflg6"] !== true) === false) {
            if (!__$ctx.ctx.url === false) {
                if (!!__$ctx.elem === false) {
                    var __r87, __r88;
                    var _$1mctx = __$ctx.ctx, _$1mp = ("", __r87 = __$ctx["__$anflg6"], __$ctx["__$anflg6"] = true, __r88 = $49(__$ctx), __$ctx["__$anflg6"] = __r87, "", __r88), _$1ma = {
                        href: _$1mctx.url
                    };
                    _$1mctx.target && (_$1ma.target = _$1mctx.target);
                    __$ctx.mods.disabled && (_$1ma["aria-disabled"] = true);
                    return __$ctx._.extend(_$1mp, _$1ma);
                    return;
                } else {
                    return $64(__$ctx);
                }
            } else {
                return $64(__$ctx);
            }
        } else {
            return $64(__$ctx);
        }
    }
    function $64(__$ctx) {
        if (!(__$ctx["__$anflg5"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                if (!!__$ctx.ctx.url === false) {
                    return $68(__$ctx);
                } else {
                    return $73(__$ctx);
                }
            } else {
                return $73(__$ctx);
            }
        } else {
            return $73(__$ctx);
        }
    }
    function $68(__$ctx) {
        var __r85, __r86;
        var _$1lctx = __$ctx.ctx, _$1lp = ("", __r85 = __$ctx["__$anflg5"], __$ctx["__$anflg5"] = true, __r86 = $49(__$ctx), __$ctx["__$anflg5"] = __r85, "", __r86), _$1la = {
            type: _$1lctx.type || "button"
        }, _$1lprops = [ "name", "value" ], _$1li;
        while (_$1li = _$1lprops.shift()) {
            _$1lctx[_$1li] && (_$1la[_$1li] = _$1lctx[_$1li]);
        }
        __$ctx.mods.disabled && (_$1la.disabled = "disabled");
        return __$ctx._.extend(_$1lp, _$1la);
        return;
    }
    function $73(__$ctx) {
        if (!true === false) {
            if (!!__$ctx.elem === false) {
                var _$1kctx = __$ctx.ctx, _$1ka = {
                    role: "button"
                };
                _$1kctx.tabindex && (_$1ka.tabindex = _$1kctx.tabindex);
                return _$1ka;
                return;
            } else {
                return $148(__$ctx);
            }
        } else {
            return $148(__$ctx);
        }
    }
    function $83(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "select") {
            var __t = __$ctx.elem;
            if (__t === "control") {
                return "select";
                return;
            } else if (__t === "text") {
                return "span";
                return;
            } else if (__t === "option-group") {
                return "optgroup";
                return;
            } else if (__t === "option") {
                return "option";
                return;
            } else {
                if (!!__$ctx.elem === false) {
                    return "span";
                    return;
                } else {
                    return $148(__$ctx);
                }
            }
        } else if (__t === "button") {
            if (!__$ctx.ctx.url === false) {
                if (!!__$ctx.elem === false) {
                    return "a";
                    return;
                } else {
                    return $104(__$ctx);
                }
            } else {
                return $104(__$ctx);
            }
        } else {
            return $148(__$ctx);
        }
    }
    function $104(__$ctx) {
        if (!!__$ctx.elem === false) {
            return "button";
            return;
        } else {
            return $148(__$ctx);
        }
    }
    function $111(__$ctx) {
        if (__$ctx.block === "button") {
            if (!__$ctx._formSelect === false) {
                if (!!__$ctx.elem === false) {
                    return [ {
                        block: __$ctx._formSelect.block,
                        elem: "button"
                    } ];
                    return;
                } else {
                    return $148(__$ctx);
                }
            } else {
                return $148(__$ctx);
            }
        } else {
            return $148(__$ctx);
        }
    }
    function $122(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "select" || __t === "button") {
            if (!!__$ctx.elem === false) {
                return true;
                return;
            } else {
                return $148(__$ctx);
            }
        } else {
            return $148(__$ctx);
        }
    }
    function $135(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "button") {
            if (!!__$ctx.elem === false) {
                return {
                    elem: "text",
                    tag: "span",
                    content: __$ctx.ctx.content
                };
                return;
            } else {
                return $148(__$ctx);
            }
        } else if (__t === "popup") {
            if (!!__$ctx.elem === false) {
                return [ {
                    elem: "under",
                    mods: __$ctx.ctx.underMods
                }, __$ctx.ctx.content ];
                return;
            } else {
                return $148(__$ctx);
            }
        } else {
            return $148(__$ctx);
        }
    }
    function $148(__$ctx) {
        if (__$ctx.block === "popup") {
            if (!!__$ctx.ctx._defaults === false) {
                if (!!__$ctx.elem === false) {
                    return $152(__$ctx);
                } else {
                    return $157(__$ctx);
                }
            } else {
                return $157(__$ctx);
            }
        } else {
            return $157(__$ctx);
        }
    }
    function $152(__$ctx) {
        __$ctx.ctx.mods = __$ctx._.extend({
            theme: "ffffff",
            autoclosable: "yes",
            adaptive: "yes",
            animate: "yes"
        }, __$ctx.ctx.mods);
        if (__$ctx.ctx.zIndex) {
            var _$1eattrs = __$ctx.ctx.attrs || (__$ctx.ctx.attrs = {});
            _$1eattrs.style = (_$1eattrs.style || "") + ";z-index:" + __$ctx.ctx.zIndex + ";";
        } else {
            undefined;
        }
        {
            "";
            var __r80 = __$ctx.ctx, __r81 = __r80._defaults;
            __r80._defaults = true;
            $1(__$ctx);
            __r80._defaults = __r81;
            "";
        }
        undefined;
        return;
    }
    function $157(__$ctx) {
        var __t = __$ctx._mode;
        if (__t === "content") {
            var __t = __$ctx.block;
            if (__t === "input") {
                var __t = __$ctx.elem;
                if (__t === "clear") {
                    if (!!__$ctx.ctx.content === false) {
                        return "";
                        return;
                    } else {
                        return $181(__$ctx);
                    }
                } else if (__t === "ahead") {
                    return [ {
                        elem: "ahead-filler"
                    }, {
                        elem: "ahead-hint"
                    } ];
                    return;
                } else {
                    return $181(__$ctx);
                }
            } else if (__t === "i-ua") {
                return $169(__$ctx);
            } else {
                return $181(__$ctx);
            }
        } else if (__t === "default") {
            var __t = __$ctx.block;
            if (__t === "input") {
                return $215(__$ctx);
            } else if (__t === "i-global") {
                return $232(__$ctx);
            } else {
                return $341(__$ctx);
            }
        } else if (__t === "mix") {
            if (__$ctx.block === "input") {
                if (__$ctx.elem === "ahead") {
                    return [ {
                        block: "input",
                        elem: "input"
                    } ];
                    return;
                } else {
                    return $268(__$ctx);
                }
            } else {
                return $268(__$ctx);
            }
        } else if (__t === "value") {
            if (__$ctx.block === "input") {
                return $270(__$ctx);
            } else {
                return $341(__$ctx);
            }
        } else if (__t === "js") {
            if (__$ctx.block === "input") {
                if (!!__$ctx.elem === false) {
                    if (__$ctx.mods.popup == "gradient") {
                        return {
                            live: false,
                            popupMods: {
                                gradient: "yes"
                            }
                        };
                    } else {
                        return {
                            live: false
                        };
                    }
                    return;
                } else {
                    return $299(__$ctx);
                }
            } else {
                return $299(__$ctx);
            }
        } else if (__t === "tag") {
            var __t = __$ctx.block;
            if (__t === "input") {
                var __t = __$ctx.elem;
                if (__t === "clear") {
                    return "span";
                    return;
                } else if (__t === "control") {
                    return "input";
                    return;
                } else if (__t === "ahead-hint" || __t === "ahead-filler") {
                    return "span";
                    return;
                } else {
                    if (!!__$ctx.elem === false) {
                        return "span";
                        return;
                    } else {
                        return $213(__$ctx);
                    }
                }
            } else if (__t === "i-ua") {
                if (!!__$ctx.elem === false) {
                    return "script";
                    return;
                } else {
                    return $213(__$ctx);
                }
            } else {
                return $213(__$ctx);
            }
        } else if (__t === "js-params") {
            if (__$ctx.block === "b-page") {
                if (!!__$ctx.elem === false) {
                    return $311(__$ctx);
                } else {
                    return $341(__$ctx);
                }
            } else {
                return $341(__$ctx);
            }
        } else if (__t === "public-params") {
            if (__$ctx.block === "i-global") {
                return $317(__$ctx);
            } else {
                return $341(__$ctx);
            }
        } else if (__t === "env") {
            if (__$ctx.block === "i-global") {
                return $325(__$ctx);
            } else {
                return $341(__$ctx);
            }
        } else if (__t === "") {
            return $332(__$ctx);
        } else if (__t === "jsAttr") {
            return undefined;
            return;
        } else if (__t === "attrs") {
            if (__$ctx.block === "input") {
                var __t = __$ctx.elem;
                if (__t === "clear") {
                    return {
                        unselectable: "on"
                    };
                    return;
                } else if (__t === "control") {
                    var _$19a = __$ctx._.extend({
                        id: __$ctx._inputId,
                        name: __$ctx._name
                    }, __$ctx.ctx.controlAttrs);
                    (__$ctx._value || __$ctx._value === 0) && (_$19a.value = __$ctx._value);
                    __$ctx.mods.disabled && (_$19a.disabled = "disabled");
                    _$19a["aria-labelledby"] = __$ctx._labelId + " " + __$ctx._hintId;
                    return _$19a;
                    return;
                } else {
                    return $191(__$ctx);
                }
            } else {
                return $191(__$ctx);
            }
        } else if (__t === "cls") {
            return undefined;
            return;
        } else if (__t === "bem") {
            if (__$ctx.block === "i-ua") {
                if (!!__$ctx.elem === false) {
                    return false;
                    return;
                } else {
                    return $307(__$ctx);
                }
            } else {
                return $307(__$ctx);
            }
        } else {
            return $341(__$ctx);
        }
    }
    function $169(__$ctx) {
        if (!(__$ctx["__$anflg1"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                var __r60, __r61;
                var _$xc = ("", __r60 = __$ctx["__$anflg1"], __$ctx["__$anflg1"] = true, __r61 = $169(__$ctx), __$ctx["__$anflg1"] = __r60, "", __r61);
                _$xc += [ ";(function(d,e,c,r,n,w,v,f){", "e=d.documentElement;", 'c="className";', 'r="replace";', 'n="createElementNS";', 'f="firstChild";', 'w="http://www.w3.org/2000/svg";', 'e[c]+=" i-ua_svg_"+(!!d[n]&&!!d[n](w,"svg").createSVGRect?"yes":"no");', 'v=d.createElement("div");', 'v.innerHTML="<svg/>";', 'e[c]+=" i-ua_inlinesvg_"+((v[f]&&v[f].namespaceURI)==w?"yes":"no");', "})(document);" ].join("");
                return _$xc;
                return;
            } else {
                return $175(__$ctx);
            }
        } else {
            return $175(__$ctx);
        }
    }
    function $175(__$ctx) {
        if (!!__$ctx.elem === false) {
            return [ ";(function(d,e,c,r){", "e=d.documentElement;", 'c="className";', 'r="replace";', 'e[c]=e[c][r]("i-ua_js_no","i-ua_js_yes");', 'if(d.compatMode!="CSS1Compat")', 'e[c]=e[c][r]("i-ua_css_standart","i-ua_css_quirks")', "})(document);" ].join("");
            return;
        } else {
            return $181(__$ctx);
        }
    }
    function $181(__$ctx) {
        return __$ctx.ctx.content;
        return;
    }
    function $191(__$ctx) {
        return undefined;
        return;
    }
    function $213(__$ctx) {
        return undefined;
        return;
    }
    function $215(__$ctx) {
        if (__$ctx.elem === "control") {
            if (!(__$ctx["__$anflg3"] !== true) === false) {
                if (!!__$ctx.mods.clear === false) {
                    return $219(__$ctx);
                } else {
                    return $224(__$ctx);
                }
            } else {
                return $224(__$ctx);
            }
        } else {
            return $224(__$ctx);
        }
    }
    function $219(__$ctx) {
        {
            "";
            var __r77 = __$ctx["__$anflg3"];
            __$ctx["__$anflg3"] = true;
            {
                "";
                var __r78 = __$ctx.ctx;
                __$ctx.ctx = {
                    elem: "box",
                    tag: "span",
                    content: [ __$ctx.ctx, {
                        elem: "clear",
                        elemMods: __$ctx._value || __$ctx._value === 0 ? {
                            visibility: "visible"
                        } : undefined
                    } ]
                };
                var __r79 = __$ctx._mode;
                __$ctx._mode = "";
                $332(__$ctx);
                __$ctx.ctx = __r78;
                __$ctx._mode = __r79;
                "";
            }
            __$ctx["__$anflg3"] = __r77;
            "";
        }
        undefined;
        return;
    }
    function $224(__$ctx) {
        if (!(__$ctx["__$anflg2"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $227(__$ctx);
            } else {
                return $341(__$ctx);
            }
        } else {
            return $341(__$ctx);
        }
    }
    function $227(__$ctx) {
        var __r62, __r63, __r64;
        var _$10value = ("", __r62 = __$ctx._mode, __$ctx._mode = "value", __r63 = __$ctx.ctx, __$ctx.ctx = __$ctx.ctx.value, __r64 = $270(__$ctx), __$ctx._mode = __r62, __$ctx.ctx = __r63, "", __r64), _$10id = __$ctx.ctx.id || __$ctx.generateId(), _$10mods = __$ctx.ctx.mods || {};
        _$10mods.theme = _$10mods.theme || "normal";
        {
            "";
            var __r65 = __$ctx["__$anflg2"];
            __$ctx["__$anflg2"] = true;
            {
                "";
                var __r66 = __$ctx._inputId;
                __$ctx._inputId = _$10id;
                var __r67 = __$ctx._labelId;
                __$ctx._labelId = "label" + _$10id;
                var __r68 = __$ctx._hintId;
                __$ctx._hintId = "hint" + _$10id;
                var __r69 = __$ctx._name;
                __$ctx._name = __$ctx.ctx.name || "";
                var __r70 = __$ctx._value;
                __$ctx._value = _$10value;
                var __r71 = __$ctx._inputLink;
                __$ctx._inputLink = true;
                var __r72 = __$ctx._disabled;
                __$ctx._disabled = __$ctx.mods.disabled;
                var __r73 = __$ctx.ctx, __r74 = __r73.mods;
                __r73.mods = _$10mods;
                $215(__$ctx);
                __$ctx._inputId = __r66;
                __$ctx._labelId = __r67;
                __$ctx._hintId = __r68;
                __$ctx._name = __r69;
                __$ctx._value = __r70;
                __$ctx._inputLink = __r71;
                __$ctx._disabled = __r72;
                __r73.mods = __r74;
                "";
            }
            __$ctx["__$anflg2"] = __r65;
            "";
        }
        undefined;
        return;
    }
    function $232(__$ctx) {
        var __t = __$ctx.elem;
        if (__t === "lego-static-host") {
            return "//yandex.st/lego/2.10-137";
            return;
        } else if (__t === "export-host") {
            return "//export.yandex.ru";
            return;
        } else if (__t === "social-host") {
            return "//social.yandex.ru";
            return;
        } else if (__t === "pass-host") {
            return "//pass.yandex.ru";
            return;
        } else if (__t === "passport-host") {
            return "https://passport.yandex.ru";
            return;
        } else if (__t === "click-host") {
            return "//clck.yandex.ru";
            return;
        } else if (__t === "content-region" || __t === "tld" || __t === "lang") {
            return "ru";
            return;
        } else {
            if (!__$ctx.elem === false) {
                return "";
                return;
            } else {
                if (!!__$ctx.elem === false) {
                    return $256(__$ctx);
                } else {
                    return $341(__$ctx);
                }
            }
        }
    }
    function $256(__$ctx) {
        var _$hparams = __$ctx.ctx.params || {}, _$hiGlobal = __$ctx["i-global"], _$hisTldChanged = _$hparams.tld && _$hparams.tld !== _$hiGlobal.tld, _$htld, _$hxYaDomain, _$hyaDomain;
        if (_$hisTldChanged) {
            _$htld = _$hparams.tld;
            _$hxYaDomain = _$htld === "tr" ? "yandex.com.tr" : "yandex." + _$htld;
            _$hyaDomain = [ "ua", "by", "kz" ].indexOf(_$htld) != -1 ? "yandex.ru" : _$hxYaDomain;
            _$hiGlobal["content-region"] = _$htld;
            _$hiGlobal["click-host"] = "//clck." + _$hyaDomain;
            _$hiGlobal["passport-host"] = "https://passport." + _$hyaDomain;
            _$hiGlobal["pass-host"] = "//pass." + _$hxYaDomain;
            _$hiGlobal["social-host"] = "//social." + _$hxYaDomain;
            _$hiGlobal["export-host"] = "//export." + _$hxYaDomain;
        } else {
            undefined;
        }
        for (var _$hp in _$hparams) {
            _$hiGlobal[_$hp] = _$hparams[_$hp];
        }
        return;
    }
    function $268(__$ctx) {
        return undefined;
        return;
    }
    function $270(__$ctx) {
        if (!__$ctx.isSimple(__$ctx.ctx) === false) {
            if (!!__$ctx.elem === false) {
                return __$ctx.ctx;
                return;
            } else {
                return $276(__$ctx);
            }
        } else {
            return $276(__$ctx);
        }
    }
    function $276(__$ctx) {
        if (!__$ctx.ctx === false) {
            if (!!__$ctx.elem === false) {
                var _$12value = [];
                {
                    "";
                    var __r75 = __$ctx._buf;
                    __$ctx._buf = _$12value;
                    var __r76 = __$ctx._mode;
                    __$ctx._mode = "";
                    $332(__$ctx);
                    __$ctx._buf = __r75;
                    __$ctx._mode = __r76;
                    "";
                }
                undefined;
                return _$12value.join("");
                return;
            } else {
                return $282(__$ctx);
            }
        } else {
            return $282(__$ctx);
        }
    }
    function $282(__$ctx) {
        if (!true === false) {
            if (!!__$ctx.elem === false) {
                return "";
                return;
            } else {
                return $341(__$ctx);
            }
        } else {
            return $341(__$ctx);
        }
    }
    function $299(__$ctx) {
        return undefined;
        return;
    }
    function $307(__$ctx) {
        return undefined;
        return;
    }
    function $311(__$ctx) {
        var __r56, __r57, __r58, __r59;
        var _$t_this = __$ctx["i-global"], _$tjs = {}, _$tblock = {
            block: "i-global",
            js: _$tjs
        }, _$te;
        for (_$te in _$t_this) {
            if (_$t_this.hasOwnProperty(_$te) && ("", __r56 = __$ctx._mode, __$ctx._mode = "public-params", __r57 = __$ctx.block, __$ctx.block = "i-global", __r58 = __$ctx.elem, __$ctx.elem = _$te, __r59 = $317(__$ctx), __$ctx._mode = __r56, __$ctx.block = __r57, __$ctx.elem = __r58, "", __r59)) {
                _$tjs[_$te] = _$t_this[_$te];
            } else {
                undefined;
            }
        }
        return _$tblock;
        return;
    }
    function $317(__$ctx) {
        if (!__$ctx.elem === false) {
            return {
                id: 1,
                lang: 1,
                tld: 1,
                "content-region": 1,
                "user-region": 1,
                login: 1,
                displayName: 1,
                index: 1,
                yandexuid: 1,
                "passport-host": 1,
                "pass-host": 1,
                "passport-msg": 1,
                "static-host": 1,
                "lego-static-host": 1,
                "social-host": 1,
                clck: 1,
                "click-host": 1,
                "export-host": 1,
                "i-host": 1,
                "social-retpath": 1,
                "lego-path": 1,
                sid: 1,
                retpath: 1,
                uid: 1
            }[__$ctx.elem] || false;
            return;
        } else {
            return $341(__$ctx);
        }
    }
    function $325(__$ctx) {
        if (!!__$ctx.elem === false) {
            return {};
            return;
        } else {
            return $341(__$ctx);
        }
    }
    function $332(__$ctx) {
        if (!!__$ctx["i-global"] === false) {
            return $334(__$ctx);
        } else {
            return $341(__$ctx);
        }
    }
    function $334(__$ctx) {
        var __r49, __r50, __r51, __r52, __r53, __r54, __r55;
        var _$fps = {}, _$fes = [ "lang", "tld", "content-region", "click-host", "passport-host", "pass-host", "social-host", "export-host", "login", "lego-static-host" ], _$fe;
        while (_$fe = _$fes.shift()) {
            _$fps[_$fe] = ("", __r49 = __$ctx._mode, __$ctx._mode = "default", __r50 = __$ctx.block, __$ctx.block = "i-global", __r51 = __$ctx.elem, __$ctx.elem = _$fe, __r52 = $232(__$ctx), __$ctx._mode = __r49, __$ctx.block = __r50, __$ctx.elem = __r51, "", __r52);
        }
        __$ctx["i-global"] = __$ctx._.extend(_$fps, ("", __r53 = __$ctx._mode, __$ctx._mode = "env", __r54 = __$ctx.block, __$ctx.block = "i-global", __r55 = $325(__$ctx), __$ctx._mode = __r53, __$ctx.block = __r54, "", __r55));
        applyc(__$ctx);
        undefined;
        return;
    }
    function $341(__$ctx) {
        if (!__$ctx.ctx === false) {
            if (!__$ctx.ctx.link === false) {
                if (!!__$ctx._.isSimple(__$ctx.ctx) === false) {
                    return $345(__$ctx);
                } else {
                    return $350(__$ctx);
                }
            } else {
                return $350(__$ctx);
            }
        } else {
            return $350(__$ctx);
        }
    }
    function $345(__$ctx) {
        var __r47, __r48;
        function _$6follow() {
            if (this.ctx.link === "no-follow") {
                return undefined;
            } else {
                undefined;
            }
            var data = this._links[this.ctx.link];
            return "", __r47 = this.ctx, this.ctx = data, __r48 = $1(__$ctx), this.ctx = __r47, "", __r48;
        }
        if (!cache || !__$ctx._cacheLog) {
            return _$6follow.call(__$ctx);
        } else {
            undefined;
        }
        var _$6contents = __$ctx._buf.slice(__$ctx._cachePos).join("");
        __$ctx._cachePos = __$ctx._buf.length;
        __$ctx._cacheLog.push(_$6contents, {
            log: __$ctx._localLog.slice(),
            link: __$ctx.ctx.link
        });
        var _$6res = _$6follow.call(__$ctx);
        __$ctx._cachePos = __$ctx._buf.length;
        return _$6res;
        return;
    }
    function $350(__$ctx) {
        if (!cache === false) {
            if (!__$ctx.ctx === false) {
                if (!__$ctx.ctx.cache === false) {
                    return $354(__$ctx);
                } else {
                    return $359(__$ctx);
                }
            } else {
                return $359(__$ctx);
            }
        } else {
            return $359(__$ctx);
        }
    }
    function $354(__$ctx) {
        var _$5cached;
        function _$5setProperty(obj, key, value) {
            if (key.length === 0) {
                return undefined;
            } else {
                undefined;
            }
            if (Array.isArray(value)) {
                var target = obj;
                for (var i = 0; i < value.length - 1; i++) {
                    target = target[value[i]];
                }
                value = target[value[i]];
            } else {
                undefined;
            }
            var host = obj, previous;
            for (var i = 0; i < key.length - 1; i++) {
                host = host[key[i]];
            }
            previous = host[key[i]];
            host[key[i]] = value;
            return previous;
        }
        if (_$5cached = cache.get(__$ctx.ctx.cache)) {
            var _$5oldLinks = __$ctx._links;
            if (__$ctx.ctx.links) {
                __$ctx._links = __$ctx.ctx.links;
            } else {
                undefined;
            }
            for (var _$5i = 0; _$5i < _$5cached.log.length; _$5i++) {
                if (typeof _$5cached.log[_$5i] === "string") {
                    __$ctx._buf.push(_$5cached.log[_$5i]);
                    continue;
                } else {
                    undefined;
                }
                var _$5log = _$5cached.log[_$5i], _$5reverseLog;
                _$5reverseLog = _$5log.log.map(function(entry) {
                    return {
                        key: entry[0],
                        value: _$5setProperty(this, entry[0], entry[1])
                    };
                }, __$ctx).reverse();
                {
                    "";
                    var __r37 = __$ctx.ctx, __r38 = __r37.cache;
                    __r37.cache = null;
                    var __r39 = __$ctx._cacheLog;
                    __$ctx._cacheLog = null;
                    var __r40 = __$ctx.ctx, __r41 = __r40.link;
                    __r40.link = _$5log.link;
                    $1(__$ctx);
                    __r37.cache = __r38;
                    __$ctx._cacheLog = __r39;
                    __r40.link = __r41;
                    "";
                }
                undefined;
                _$5reverseLog.forEach(function(entry) {
                    _$5setProperty(this, entry.key, entry.value);
                }, __$ctx);
            }
            __$ctx._links = _$5oldLinks;
            return _$5cached.res;
        } else {
            undefined;
        }
        var _$5cacheLog = [], _$5res;
        {
            "";
            var __r42 = __$ctx.ctx, __r43 = __r42.cache;
            __r42.cache = null;
            var __r44 = __$ctx._cachePos;
            __$ctx._cachePos = __$ctx._buf.length;
            var __r45 = __$ctx._cacheLog;
            __$ctx._cacheLog = _$5cacheLog;
            var __r46 = __$ctx._localLog;
            __$ctx._localLog = [];
            {
                _$5res = $1(__$ctx);
                var _$5tail = __$ctx._buf.slice(__$ctx._cachePos).join("");
                if (_$5tail) {
                    _$5cacheLog.push(_$5tail);
                } else {
                    undefined;
                }
            }
            __r42.cache = __r43;
            __$ctx._cachePos = __r44;
            __$ctx._cacheLog = __r45;
            __$ctx._localLog = __r46;
            "";
        }
        cache.set(__$ctx.ctx.cache, {
            log: _$5cacheLog,
            res: _$5res
        });
        return _$5res;
        return;
    }
    function $359(__$ctx) {
        var __t = __$ctx._mode;
        if (__t === "default") {
            return $361(__$ctx);
        } else if (__t === "") {
            if (!__$ctx._.isSimple(__$ctx.ctx) === false) {
                __$ctx._listLength--;
                var _$3ctx = __$ctx.ctx;
                (_$3ctx && _$3ctx !== true || _$3ctx === 0) && __$ctx._buf.push(_$3ctx);
                return;
            } else {
                if (!!__$ctx.ctx === false) {
                    __$ctx._listLength--;
                    return;
                } else {
                    if (!__$ctx._.isArray(__$ctx.ctx) === false) {
                        return $370(__$ctx);
                    } else {
                        if (!true === false) {
                            return $373(__$ctx);
                        } else {
                            return $e(__$ctx);
                        }
                    }
                }
            }
        } else {
            return $e(__$ctx);
        }
    }
    function $361(__$ctx) {
        var __r20, __r8, __r12, __r13, __r14, __r15, __r16, __r17, __r18, __r19, __r9, __r21, __r22, __r23, __r26, __r27, __r28, __r29, __r30, __r31;
        var _$4_this = __$ctx, _$4BEM_ = _$4_this.BEM, _$4v = __$ctx.ctx, _$4buf = __$ctx._buf, _$4tag;
        _$4tag = ("", __r8 = __$ctx._mode, __$ctx._mode = "tag", __r9 = $83(__$ctx), __$ctx._mode = __r8, "", __r9);
        typeof _$4tag != "undefined" || (_$4tag = _$4v.tag);
        typeof _$4tag != "undefined" || (_$4tag = "div");
        if (_$4tag) {
            var _$4jsParams, _$4js;
            if (__$ctx.block && _$4v.js !== false) {
                _$4js = ("", __r12 = __$ctx._mode, __$ctx._mode = "js", __r13 = $122(__$ctx), __$ctx._mode = __r12, "", __r13);
                _$4js = _$4js ? __$ctx._.extend(_$4v.js, _$4js === true ? {} : _$4js) : _$4v.js === true ? {} : _$4v.js;
                _$4js && ((_$4jsParams = {})[_$4BEM_.INTERNAL.buildClass(__$ctx.block, _$4v.elem)] = _$4js);
            } else {
                undefined;
            }
            _$4buf.push("<", _$4tag);
            var _$4isBEM = ("", __r14 = __$ctx._mode, __$ctx._mode = "bem", __r15 = $148(__$ctx), __$ctx._mode = __r14, "", __r15);
            typeof _$4isBEM != "undefined" || (_$4isBEM = typeof _$4v.bem != "undefined" ? _$4v.bem : _$4v.block || _$4v.elem);
            var _$4cls = ("", __r16 = __$ctx._mode, __$ctx._mode = "cls", __r17 = $148(__$ctx), __$ctx._mode = __r16, "", __r17);
            _$4cls || (_$4cls = _$4v.cls);
            var _$4addJSInitClass = _$4v.block && _$4jsParams;
            if (_$4isBEM || _$4cls) {
                _$4buf.push(' class="');
                if (_$4isBEM) {
                    _$4BEM_.INTERNAL.buildClasses(__$ctx.block, _$4v.elem, _$4v.elemMods || _$4v.mods, _$4buf);
                    var _$4mix = ("", __r18 = __$ctx._mode, __$ctx._mode = "mix", __r19 = $111(__$ctx), __$ctx._mode = __r18, "", __r19);
                    _$4v.mix && (_$4mix = _$4mix ? _$4mix.concat(_$4v.mix) : _$4v.mix);
                    if (_$4mix) {
                        var _$4visited = {};
                        function _$4visitedKey(block, elem) {
                            return (block || "") + "__" + (elem || "");
                        }
                        _$4visited[_$4visitedKey(__$ctx.block, __$ctx.elem)] = true;
                        if (!__$ctx._.isArray(_$4mix)) {
                            _$4mix = [ _$4mix ];
                        } else {
                            undefined;
                        }
                        for (var _$4i = 0; _$4i < _$4mix.length; _$4i++) {
                            var _$4mixItem = _$4mix[_$4i];
                            if (!_$4mixItem) {
                                continue;
                            } else {
                                undefined;
                            }
                            var _$4hasItem = _$4mixItem.block || _$4mixItem.elem, _$4block = _$4mixItem.block || _$4mixItem._block || _$4_this.block, _$4elem = _$4mixItem.elem || _$4mixItem._elem || _$4_this.elem;
                            _$4hasItem && _$4buf.push(" ");
                            _$4BEM_.INTERNAL[_$4hasItem ? "buildClasses" : "buildModsClasses"](_$4block, _$4mixItem.elem || _$4mixItem._elem || (_$4mixItem.block ? undefined : _$4_this.elem), _$4mixItem.elemMods || _$4mixItem.mods, _$4buf);
                            if (_$4mixItem.js) {
                                (_$4jsParams || (_$4jsParams = {}))[_$4BEM_.INTERNAL.buildClass(_$4block, _$4mixItem.elem)] = _$4mixItem.js === true ? {} : _$4mixItem.js;
                                _$4addJSInitClass || (_$4addJSInitClass = _$4block && !_$4mixItem.elem);
                            } else {
                                undefined;
                            }
                            if (_$4hasItem && !_$4visited[_$4visitedKey(_$4block, _$4elem)]) {
                                _$4visited[_$4visitedKey(_$4block, _$4elem)] = true;
                                var _$4nestedMix = ("", __r20 = __$ctx.block, __$ctx.block = _$4block, __r21 = __$ctx.elem, __$ctx.elem = _$4elem, __r22 = __$ctx._mode, __$ctx._mode = "mix", __r23 = $111(__$ctx), __$ctx.block = __r20, __$ctx.elem = __r21, __$ctx._mode = __r22, "", __r23);
                                if (_$4nestedMix) {
                                    for (var _$4j = 0; _$4j < _$4nestedMix.length; _$4j++) {
                                        var _$4nestedItem = _$4nestedMix[_$4j];
                                        if (!_$4nestedItem.block && !_$4nestedItem.elem || !_$4visited[_$4visitedKey(_$4nestedItem.block, _$4nestedItem.elem)]) {
                                            _$4nestedItem._block = _$4block;
                                            _$4nestedItem._elem = _$4elem;
                                            _$4mix.splice(_$4i + 1, 0, _$4nestedItem);
                                        } else {
                                            undefined;
                                        }
                                    }
                                } else {
                                    undefined;
                                }
                            } else {
                                undefined;
                            }
                        }
                    } else {
                        undefined;
                    }
                } else {
                    undefined;
                }
                _$4cls && _$4buf.push(_$4isBEM ? " " : "", _$4cls);
                _$4addJSInitClass && _$4buf.push(" i-bem");
                _$4buf.push('"');
            } else {
                undefined;
            }
            if (_$4jsParams) {
                var _$4jsAttr = ("", __r26 = __$ctx._mode, __$ctx._mode = "jsAttr", __r27 = $148(__$ctx), __$ctx._mode = __r26, "", __r27);
                _$4buf.push(" ", _$4jsAttr || "onclick", '="return ', __$ctx._.attrEscape(JSON.stringify(_$4jsParams)), '"');
            } else {
                undefined;
            }
            var _$4attrs = ("", __r28 = __$ctx._mode, __$ctx._mode = "attrs", __r29 = $36(__$ctx), __$ctx._mode = __r28, "", __r29);
            _$4attrs = __$ctx._.extend(_$4attrs, _$4v.attrs);
            if (_$4attrs) {
                var _$4name;
                for (_$4name in _$4attrs) {
                    if (_$4attrs[_$4name] === undefined) {
                        continue;
                    } else {
                        undefined;
                    }
                    _$4buf.push(" ", _$4name, '="', __$ctx._.attrEscape(_$4attrs[_$4name]), '"');
                }
            } else {
                undefined;
            }
        } else {
            undefined;
        }
        if (__$ctx._.isShortTag(_$4tag)) {
            _$4buf.push("/>");
        } else {
            _$4tag && _$4buf.push(">");
            var _$4content = ("", __r30 = __$ctx._mode, __$ctx._mode = "content", __r31 = $135(__$ctx), __$ctx._mode = __r30, "", __r31);
            if (_$4content || _$4content === 0) {
                var _$4isBEM = __$ctx.block || __$ctx.elem;
                {
                    "";
                    var __r32 = __$ctx._notNewList;
                    __$ctx._notNewList = false;
                    var __r33 = __$ctx.position;
                    __$ctx.position = _$4isBEM ? 1 : __$ctx.position;
                    var __r34 = __$ctx._listLength;
                    __$ctx._listLength = _$4isBEM ? 1 : __$ctx._listLength;
                    var __r35 = __$ctx.ctx;
                    __$ctx.ctx = _$4content;
                    var __r36 = __$ctx._mode;
                    __$ctx._mode = "";
                    $148(__$ctx);
                    __$ctx._notNewList = __r32;
                    __$ctx.position = __r33;
                    __$ctx._listLength = __r34;
                    __$ctx.ctx = __r35;
                    __$ctx._mode = __r36;
                    "";
                }
                undefined;
            } else {
                undefined;
            }
            _$4tag && _$4buf.push("</", _$4tag, ">");
        }
        return;
    }
    function $370(__$ctx) {
        var _$1v = __$ctx.ctx, _$1l = _$1v.length, _$1i = 0, _$1prevPos = __$ctx.position, _$1prevNotNewList = __$ctx._notNewList;
        if (_$1prevNotNewList) {
            __$ctx._listLength += _$1l - 1;
        } else {
            __$ctx.position = 0;
            __$ctx._listLength = _$1l;
        }
        __$ctx._notNewList = true;
        while (_$1i < _$1l) {
            var _$1newCtx = _$1v[_$1i++];
            {
                "";
                var __r7 = __$ctx.ctx;
                __$ctx.ctx = _$1newCtx == null ? "" : _$1newCtx;
                $148(__$ctx);
                __$ctx.ctx = __r7;
                "";
            }
            undefined;
        }
        _$1prevNotNewList || (__$ctx.position = _$1prevPos);
        return;
    }
    function $373(__$ctx) {
        var _$0vBlock = __$ctx.ctx.block, _$0vElem = __$ctx.ctx.elem, _$0block = __$ctx._currBlock || __$ctx.block;
        __$ctx.ctx || (__$ctx.ctx = {});
        {
            "";
            var __r0 = __$ctx._mode;
            __$ctx._mode = "default";
            var __r1 = __$ctx._links;
            __$ctx._links = __$ctx.ctx.links || __$ctx._links;
            var __r2 = __$ctx.block;
            __$ctx.block = _$0vBlock || (_$0vElem ? _$0block : undefined);
            var __r3 = __$ctx._currBlock;
            __$ctx._currBlock = _$0vBlock || _$0vElem ? undefined : _$0block;
            var __r4 = __$ctx.elem;
            __$ctx.elem = __$ctx.ctx.elem;
            var __r5 = __$ctx.mods;
            __$ctx.mods = (_$0vBlock ? __$ctx.ctx.mods : __$ctx.mods) || {};
            var __r6 = __$ctx.elemMods;
            __$ctx.elemMods = __$ctx.ctx.elemMods || {};
            {
                __$ctx.block || __$ctx.elem ? __$ctx.position = (__$ctx.position || 0) + 1 : __$ctx._listLength--;
                $2(__$ctx);
                undefined;
            }
            __$ctx._mode = __r0;
            __$ctx._links = __r1;
            __$ctx.block = __r2;
            __$ctx._currBlock = __r3;
            __$ctx.elem = __r4;
            __$ctx.mods = __r5;
            __$ctx.elemMods = __r6;
            "";
        }
        return;
    }
    function $e(__$ctx) {
        throw new Error(this);
        return;
    }
    !function oninit() {
        var BEM_ = {}, toString = Object.prototype.toString, SHORT_TAGS = {
            area: 1,
            base: 1,
            br: 1,
            col: 1,
            command: 1,
            embed: 1,
            hr: 1,
            img: 1,
            input: 1,
            keygen: 1,
            link: 1,
            meta: 1,
            param: 1,
            source: 1,
            wbr: 1
        };
        (function(BEM, undefined) {
            var MOD_DELIM = "_", ELEM_DELIM = "__", NAME_PATTERN = "[a-zA-Z0-9-]+";
            function buildModPostfix(modName, modVal, buffer) {
                buffer.push(MOD_DELIM, modName, MOD_DELIM, modVal);
            }
            function buildBlockClass(name, modName, modVal, buffer) {
                buffer.push(name);
                modVal && buildModPostfix(modName, modVal, buffer);
            }
            function buildElemClass(block, name, modName, modVal, buffer) {
                buildBlockClass(block, undefined, undefined, buffer);
                buffer.push(ELEM_DELIM, name);
                modVal && buildModPostfix(modName, modVal, buffer);
            }
            BEM.INTERNAL = {
                NAME_PATTERN: NAME_PATTERN,
                MOD_DELIM: MOD_DELIM,
                ELEM_DELIM: ELEM_DELIM,
                buildModPostfix: function(modName, modVal, buffer) {
                    var res = buffer || [];
                    buildModPostfix(modName, modVal, res);
                    return buffer ? res : res.join("");
                },
                buildClass: function(block, elem, modName, modVal, buffer) {
                    var typeOf = typeof modName;
                    if (typeOf == "string") {
                        if (typeof modVal != "string") {
                            buffer = modVal;
                            modVal = modName;
                            modName = elem;
                            elem = undefined;
                        } else {
                            undefined;
                        }
                    } else {
                        if (typeOf != "undefined") {
                            buffer = modName;
                            modName = undefined;
                        } else {
                            if (elem && typeof elem != "string") {
                                buffer = elem;
                                elem = undefined;
                            } else {
                                undefined;
                            }
                        }
                    }
                    if (!(elem || modName || buffer)) {
                        return block;
                    } else {
                        undefined;
                    }
                    var res = buffer || [];
                    elem ? buildElemClass(block, elem, modName, modVal, res) : buildBlockClass(block, modName, modVal, res);
                    return buffer ? res : res.join("");
                },
                buildModsClasses: function(block, elem, mods, buffer) {
                    var res = buffer || [];
                    if (mods) {
                        var modName;
                        for (modName in mods) {
                            if (!mods.hasOwnProperty(modName)) {
                                continue;
                            } else {
                                undefined;
                            }
                            var modVal = mods[modName];
                            if (modVal == null) {
                                continue;
                            } else {
                                undefined;
                            }
                            modVal = mods[modName] + "";
                            if (!modVal) {
                                continue;
                            } else {
                                undefined;
                            }
                            res.push(" ");
                            if (elem) {
                                buildElemClass(block, elem, modName, modVal, res);
                            } else {
                                buildBlockClass(block, modName, modVal, res);
                            }
                        }
                    } else {
                        undefined;
                    }
                    return buffer ? res : res.join("");
                },
                buildClasses: function(block, elem, mods, buffer) {
                    var res = buffer || [];
                    elem ? buildElemClass(block, elem, undefined, undefined, res) : buildBlockClass(block, undefined, undefined, res);
                    this.buildModsClasses(block, elem, mods, buffer);
                    return buffer ? res : res.join("");
                }
            };
        })(BEM_);
        var buildEscape = function() {
            var ts = {
                '"': "&quot;",
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;"
            }, f = function(t) {
                return ts[t] || t;
            };
            return function(r) {
                r = new RegExp(r, "g");
                return function(s) {
                    return ("" + s).replace(r, f);
                };
            };
        }();
        function BEMContext(context, apply_) {
            this.ctx = typeof context === null ? "" : context;
            this.apply = apply_;
            this._buf = [];
            this._ = this;
            this._start = true;
            this._mode = "";
            this._listLength = 0;
            this._notNewList = false;
            this.position = 0;
            this.block = undefined;
            this.elem = undefined;
            this.mods = undefined;
            this.elemMods = undefined;
        }
        BEMContext.prototype.isArray = function isArray(obj) {
            return toString.call(obj) === "[object Array]";
        };
        BEMContext.prototype.isSimple = function isSimple(obj) {
            var t = typeof obj;
            return t === "string" || t === "number" || t === "boolean";
        };
        BEMContext.prototype.isShortTag = function isShortTag(t) {
            return SHORT_TAGS.hasOwnProperty(t);
        };
        BEMContext.prototype.extend = function extend(o1, o2) {
            if (!o1 || !o2) {
                return o1 || o2;
            } else {
                undefined;
            }
            var res = {}, n;
            for (n in o1) {
                o1.hasOwnProperty(n) && (res[n] = o1[n]);
            }
            for (n in o2) {
                o2.hasOwnProperty(n) && (res[n] = o2[n]);
            }
            return res;
        };
        BEMContext.prototype.identify = function() {
            var cnt = 0, id = BEM_["__id"] = +(new Date), expando = "__" + id, get = function() {
                return "uniq" + id + ++cnt;
            };
            return function(obj, onlyGet) {
                if (!obj) {
                    return get();
                } else {
                    undefined;
                }
                if (onlyGet || obj[expando]) {
                    return obj[expando];
                } else {
                    return obj[expando] = get();
                }
            };
        }();
        BEMContext.prototype.xmlEscape = buildEscape("[&<>]");
        BEMContext.prototype.attrEscape = buildEscape('["&<>]');
        BEMContext.prototype.BEM = BEM_;
        BEMContext.prototype.isFirst = function isFirst() {
            return this.position === 1;
        };
        BEMContext.prototype.isLast = function isLast() {
            return this.position === this._listLength;
        };
        BEMContext.prototype.generateId = function generateId() {
            return this.identify(this.ctx);
        };
        exports.apply = BEMContext.apply = function _apply() {
            var ctx = new BEMContext(this, apply);
            ctx.apply();
            return ctx._buf.join("");
        };
    }();
    return exports;
    exports.apply = apply;
    function apply(ctx) {
        return applyc(ctx || this);
    }
    function applyc(__$ctx) {
        return $1(__$ctx);
    }
    return exports;
})(typeof exports === "undefined" ? {} : exports);;
  return function(options) {
    var context = this;
    if (!options) options = {};
    cache = options.cache;
    return function() {
      if (context === this) context = undefined;
      return xjst.apply.call(
[context]
      );
    }.call(null);
  };
}();
typeof exports === "undefined" || (exports.BEMHTML = BEMHTML);/*borschik:include:../../../../libs/bem-bl/blocks-common/i-jquery/__inherit/i-jquery__inherit.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-jquery/__identify/i-jquery__identify.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-jquery/__is-empty-object/i-jquery__is-empty-object.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-jquery/__debounce/i-jquery__debounce.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-jquery/__observable/i-jquery__observable.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-bem/i-bem.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-ecma/__object/i-ecma__object.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-ecma/__array/i-ecma__array.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-ecma/__function/i-ecma__function.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-bem/__internal/i-bem__internal.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-jquery/__cookie/i-jquery__cookie.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-jquery/__decodeuri/i-jquery__decodeuri.js*/;
/*borschik:include:../../../../libs/romochka/blocks-desktop/i-bem/html/i-bem__html.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-ecma/__json/i-ecma__json.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-bem/__dom/i-bem__dom.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-ecma/__string/i-ecma__string.js*/;
/*borschik:include:../../../../libs/romochka/blocks-common/i-common/check-session/i-common__check-session.js*/;
/*borschik:include:../../../../libs/romochka/blocks-common/i-global/i-global.js*/;
/*borschik:include:../../../../libs/romochka/blocks-common/i-counter/i-counter.js*/;
/*borschik:include:../../../../libs/romochka/blocks-common/i-common/cookie/i-common__cookie.js*/;
/*borschik:include:../../../../libs/romochka/blocks-common/i-common/init/i-common__init.js*/;
/*borschik:include:../../../../desktop.blocks/i-ua/i-ua.js*/;
/*borschik:include:../../../../libs/romochka/blocks-common/i-common/i-common.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-bem/__dom/_init/i-bem__dom_init_auto.js*/;
/*borschik:include:../../../../libs/romochka/blocks-desktop/i-oframebust/i-oframebust.js*/;
/*borschik:include:../../../../libs/romochka/blocks-desktop/i-oframebust/_type/i-oframebust_type_referrer.js*/;
/*borschik:include:../../../../common.blocks/link/link.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-desktop/i-jquery/__leftclick/i-jquery__leftclick.js*/;
/*borschik:include:../../../../common.blocks/button/button.js*/;
/*borschik:include:../../../../desktop.blocks/button/button.js*/;
/*borschik:include:../../../../libs/romochka/blocks-desktop/b-icon/b-icon.js*/;
/*borschik:include:../../../../common.blocks/checkbox/checkbox.js*/;
/*borschik:include:../../../../common.blocks/radiobox/radiobox.js*/;
/*borschik:include:../../../../common.blocks/input/input.js*/;
/*borschik:include:../../../../desktop.blocks/input/input.js*/;
/*borschik:include:../../../../libs/bem-bl/blocks-common/i-system/i-system.js*/;
/*borschik:include:../../../../common.blocks/input/__clear/input__clear.js*/;
/*borschik:include:../../../../common.blocks/popup/popup.js*/;
/*borschik:include:../../../../common.blocks/popup/_autoclosable/popup_autoclosable_yes.js*/;
/*borschik:include:../../../../common.blocks/popup/_adaptive/popup_adaptive_yes.js*/;
/*borschik:include:../../../../common.blocks/popup/_animate/popup_animate_yes.js*/;
/*borschik:include:../../../../common.blocks/popup/__under/popup__under.js*/;
/*borschik:include:../../../../common.blocks/popup/_autosize/popup_autosize_yes.js*/;
/*borschik:include:../../../../common.blocks/select/select.js*/;
/*borschik:include:../../../../desktop.blocks/select/select.js*/;
/*borschik:include:../../../../common.blocks/select/__ui/select__ui.js*/;
/*borschik:include:../../../../desktop.blocks/select/__ui/select__ui.js*/;
/*borschik:include:../../../../common.blocks/select/__popup/select__popup.js*/;
/*borschik:include:../../../../common.blocks/radio-button/radio-button.js*/;
/*borschik:include:../../../../common.blocks/check-button/check-button.js*/;
/*borschik:include:../../../../common.blocks/tumbler/tumbler.js*/;


/* global BEM, i18n */
(function(global_, bem_, undefined) {

// Check if BEM.I18N was already initialized
if(typeof bem_.I18N === 'function' && bem_.I18N._proto) {
    return bem_.I18N;
}

/**
 * Support tanker-like syntax of keys in `i-bem__i18n`
 * @example
 *  i18n['prj']['keyset']['key'](params)
 */
if(typeof i18n === 'undefined') {
    /* jshint -W020 */
    i18n = {};
    /* jshint +W020 */
}

/* jshint -W020 */
BEM = bem_;
/* jshint +W020 */

var MOD_DELIM = '_',
    ELEM_DELIM = '__',
    DEFAULT_LANG = 'ru',
    cache = {},
    // {String[]} A stack used for restoring context of dynamic keysets
    stack = [],
    debug = false,
    // @see http://whattheheadsaid.com/2011/04/internet-explorer-9s-problematic-console-object
    hasConsole = typeof console !== 'undefined' && typeof console.log === 'function';

function log() {
    if(debug && hasConsole) {
        console.log.apply(console, arguments);
    }
}

function bemName(decl) {
    typeof decl === 'string' && (decl = { block: decl });

    return decl.block +
        (decl.elem ? (ELEM_DELIM + decl.elem) : '') +
        (decl.modName ? MOD_DELIM + decl.modName + MOD_DELIM + decl.modVal : '');
}

function bemParse(name) {
    var bemitem = {};

    name.split(ELEM_DELIM).forEach(function(item, i) {
        var keys = [ i ? 'elem' : 'block', 'mod', 'val' ];

        item.split(MOD_DELIM).forEach(function(part, j) {
            bemitem[keys[j]] = part;
        });
    });

    return bemitem;
}

function _pushStack(name) {
    if(!name) return false;
    return stack.push(name);
}

function _popStack() {
    return stack.length && stack.pop();
}


/**
 * @constructor
 */
function _i18n() {
    this._lang = '';
    this._prj = 'lego'; // FIXME: bem-bl?
    this._keyset = '';
    this._key = '';
}

_i18n.prototype = {

    lang : function(name) {
        this._lang = name;
        return this;
    },

    project : function(name) {
        this._prj = name;
        return this;
    },

    keyset : function(name, saveCtx) {
        saveCtx && _pushStack(this._keyset);

        this._keyset = bemName(name);
        return this;
    },

    key : function(name) {
        this._key = name;
        return this;
    },

    /**
     * FIXME: Move legacy-syntax support into separat method
     * @param {Object|Function} v
     */
    decl : function(v) {
        var bemitem = bemParse(this._keyset),
            // tanker legacy syntax
            prj = bemitem.block === 'i-tanker' ? 'tanker' : this._prj,
            keyset = bemitem.elem || this._keyset,
            key = this._key;

        prj = i18n[prj] || (i18n[prj] = {});
        keyset = prj[keyset] || (prj[keyset] = {});
        keyset[key] = typeof v === 'function' ? v : (function(p) { return (v); });

        // `BEM.I18N` syntax
        var l = cache[this._lang] || (cache[this._lang] = {}),
            k = l[this._keyset] || (l[this._keyset] = {});

        k[key] = v;
    },

    val : function(params, ctx) {
        var value = cache[this._lang] && cache[this._lang][this._keyset],
            debugString = 'keyset: ' + this._keyset + ' key: ' + this._key + ' (lang: ' + this._lang + ')';

        if(!value) {
            log('[I18N_NO_KEYSET] %s', debugString);
            return '';
        }

        value = value[this._key];

        var valtype = typeof value;
        if(valtype === 'undefined') {
            log("[I18N_NO_VALUE] %s", debugString);
            return '';
        }

        if(valtype === 'string') {
            return value;
        }

        ctx || (ctx = this);
        // TODO: try/catch
        return value.call(ctx, params);
    },

    _cache : function() { return cache; }

};

/**
 * @namespace
 * @lends BEM.I18N
 */
bem_.I18N = (function(base) {

    /**
     * Shortcut to get key value
     *
     * @param {String|Object} keyset
     * @param {String} key
     * @param {Object} [params]
     * @returns {String}
     */
    var klass = function(keyset, key, params) {
        return klass.keyset(keyset).key(key, params);
    };

    klass._proto = base;

    /**
     * @param {String} name
     * @returns {BEM.I18N}
     */
    klass.project = function(name) {
        this._proto.project(name);
        return this;
    };

    /**
     * @param {String} name
     * @returns {BEM.I18N}
     */
    klass.keyset = function(name) {
        this._proto.keyset(name, true);
        return this;
    };

    /**
     * @param {String} name Key name
     * @param {Object} params
     * @returns {String}
     */
    klass.key = function(name, params) {
        var proto = this._proto,
            result,
            ksetRestored;

        proto.lang(this._lang).key(name);

        // TODO: kiss
        result = proto.val.call(proto, params, klass);

        // restoring keyset's context
        // NOTE: should not save current ctx, `saveCtx = false`
        ksetRestored = _popStack();
        ksetRestored && proto.keyset(ksetRestored, false);

        return result;
    };

    /**
     * Declaration of translations
     *
     * @param {String|Object} bemitem
     * @param {Object} keysets
     * @param {Object} [params] declaration params
     * @returns {BEM.I18N}
     */
    klass.decl = function(bemitem, keysets, params) {
        var proto = this._proto,
            k;

        params || (params = {});
        params.lang && proto.lang(params.lang);

        proto.keyset(bemitem);

        for(k in keysets) {
            if(keysets.hasOwnProperty(k)) {
                proto.key(k).decl(keysets[k]);
            }
        }

        return this;
    };

    /**
     * Get/set current language
     *
     * @param {String} [lang]
     * @returns {String}
     */
    klass.lang = function(lang) {
        typeof lang !== 'undefined' && (this._lang = lang);
        return this._lang;
    };

    klass.debug = function(flag) {
        debug = !!flag;
    };

    klass.lang(DEFAULT_LANG);

    return klass;

}(new _i18n()));

})(this, typeof BEM === 'undefined' ? {} : BEM);


BEM.I18N.decl('tumbler', {"off": 'Kapat',"on": 'Aç'}, {
"lang": "tr"
});

BEM.I18N.lang('tr');
