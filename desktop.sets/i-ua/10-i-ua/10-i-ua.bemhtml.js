var BEMHTML = function() {
  var cache,
      exports = {},
      xjst = (function(exports) {
    function $1(__$ctx) {
        var __t = __$ctx._mode;
        if (__t === "default") {
            return $2(__$ctx);
        } else if (__t === "attrs") {
            return $113(__$ctx);
        } else if (__t === "tag") {
            return $174(__$ctx);
        } else if (__t === "value") {
            if (__$ctx.block === "tumbler") {
                if (__$ctx.elem === "option") {
                    return $224(__$ctx);
                } else {
                    return $300(__$ctx);
                }
            } else {
                return $300(__$ctx);
            }
        } else if (__t === "content") {
            return $229(__$ctx);
        } else if (__t === "js") {
            return $261(__$ctx);
        } else if (__t === "mix") {
            return $284(__$ctx);
        } else {
            return $300(__$ctx);
        }
    }
    function $2(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "i-jquery") {
            if (!(__$ctx["__$anflg30"] !== true) === false) {
                if (!!__$ctx.elem === false) {
                    return $6(__$ctx);
                } else {
                    return $9(__$ctx);
                }
            } else {
                return $9(__$ctx);
            }
        } else if (__t === "tumbler") {
            return $17(__$ctx);
        } else if (__t === "check-button") {
            return $70(__$ctx);
        } else if (__t === "radio-button") {
            return $78(__$ctx);
        } else if (__t === "button") {
            return $92(__$ctx);
        } else if (__t === "select") {
            return $103(__$ctx);
        } else {
            return $300(__$ctx);
        }
    }
    function $6(__$ctx) {
        var __r202, __r206, __r203, __r204, __r205;
        return "", __r202 = __$ctx["__$anflg30"], __$ctx["__$anflg30"] = true, __r206 = ("", __r203 = __$ctx.ctx, __$ctx.ctx = {
            block: "b-page",
            elem: "js",
            url: __$ctx.ctx.url || (__$ctx.ctx.protocol ? __$ctx.ctx.protocol + ":" : "") + "//yandex.st/jquery/" + __$ctx.mods.version + "/jquery.min.js"
        }, __r204 = __$ctx._mode, __$ctx._mode = "", __r205 = $821(__$ctx), __$ctx.ctx = __r203, __$ctx._mode = __r204, "", __r205), __$ctx["__$anflg30"] = __r202, "", __r206;
        return;
    }
    function $9(__$ctx) {
        if (!(__$ctx["__$anflg29"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $12(__$ctx);
            } else {
                return $300(__$ctx);
            }
        } else {
            return $300(__$ctx);
        }
    }
    function $12(__$ctx) {
        var __r197, __r201, __r198, __r199, __r200;
        return "", __r197 = __$ctx["__$anflg29"], __$ctx["__$anflg29"] = true, __r201 = ("", __r198 = __$ctx.ctx, __$ctx.ctx = {
            block: "b-page",
            elem: "js",
            url: __$ctx.ctx.url || (__$ctx.ctx.protocol ? __$ctx.ctx.protocol + ":" : "") + "//yandex.st/jquery/" + __$ctx.mods.version + "/jquery.min.js"
        }, __r199 = __$ctx._mode, __$ctx._mode = "", __r200 = $821(__$ctx), __$ctx.ctx = __r198, __$ctx._mode = __r199, "", __r200), __$ctx["__$anflg29"] = __r197, "", __r201;
        return;
    }
    function $17(__$ctx) {
        if (__$ctx.elem === "option") {
            if (__$ctx.ctx.side === "left") {
                if (!(__$ctx["__$anflg26"] !== true) === false) {
                    {
                        "";
                        var __r190 = __$ctx["__$anflg26"];
                        __$ctx["__$anflg26"] = true;
                        {
                            "";
                            var __r191 = __$ctx.ctx;
                            __$ctx.ctx = [ __$ctx.ctx, {
                                elem: "box"
                            } ];
                            var __r192 = __$ctx._mode;
                            __$ctx._mode = "";
                            $821(__$ctx);
                            __$ctx.ctx = __r191;
                            __$ctx._mode = __r192;
                            "";
                        }
                        __$ctx["__$anflg26"] = __r190;
                        "";
                    }
                    undefined;
                    return;
                } else {
                    return $24(__$ctx);
                }
            } else {
                return $24(__$ctx);
            }
        } else {
            return $32(__$ctx);
        }
    }
    function $24(__$ctx) {
        if (!(__$ctx["__$anflg25"] !== true) === false) {
            if (!true === false) {
                return $27(__$ctx);
            } else {
                return $32(__$ctx);
            }
        } else {
            return $32(__$ctx);
        }
    }
    function $27(__$ctx) {
        var __r185, __r186;
        var _$4lvalue = ("", __r185 = __$ctx._mode, __$ctx._mode = "value", __r186 = $224(__$ctx), __$ctx._mode = __r185, "", __r186);
        {
            "";
            var __r187 = __$ctx["__$anflg25"];
            __$ctx["__$anflg25"] = true;
            {
                "";
                var __r188 = __$ctx.ctx;
                __$ctx.ctx = {
                    elem: "label",
                    content: [ {
                        elem: "input",
                        name: __$ctx._name,
                        value: _$4lvalue,
                        disabled: __$ctx._disabled,
                        elemMods: {
                            side: __$ctx.ctx.side
                        }
                    }, {
                        elem: "text",
                        tag: "span",
                        elemMods: {
                            side: __$ctx.ctx.side
                        },
                        content: __$ctx.ctx.content
                    } ]
                };
                var __r189 = __$ctx._mode;
                __$ctx._mode = "";
                $821(__$ctx);
                __$ctx.ctx = __r188;
                __$ctx._mode = __r189;
                "";
            }
            __$ctx["__$anflg25"] = __r187;
            "";
        }
        undefined;
        return;
    }
    function $32(__$ctx) {
        if ((__$ctx.ctx.mods || {}).disabled === "yes") {
            if (!(__$ctx["__$anflg23"] !== true) === false) {
                if (!!__$ctx.elem === false) {
                    {
                        "";
                        var __r181 = __$ctx["__$anflg23"];
                        __$ctx["__$anflg23"] = true;
                        {
                            "";
                            var __r182 = __$ctx._disabled;
                            __$ctx._disabled = "disabled";
                            $17(__$ctx);
                            __$ctx._disabled = __r182;
                            "";
                        }
                        __$ctx["__$anflg23"] = __r181;
                        "";
                    }
                    undefined;
                    return;
                } else {
                    return $41(__$ctx);
                }
            } else {
                return $41(__$ctx);
            }
        } else {
            return $41(__$ctx);
        }
    }
    function $41(__$ctx) {
        if ((__$ctx.ctx.mods || {}).checked === "yes") {
            if (!(__$ctx["__$anflg22"] !== true) === false) {
                if (!!__$ctx.elem === false) {
                    {
                        "";
                        var __r179 = __$ctx["__$anflg22"];
                        __$ctx["__$anflg22"] = true;
                        {
                            "";
                            var __r180 = __$ctx._checked;
                            __$ctx._checked = "checked";
                            $17(__$ctx);
                            __$ctx._checked = __r180;
                            "";
                        }
                        __$ctx["__$anflg22"] = __r179;
                        "";
                    }
                    undefined;
                    return;
                } else {
                    return $50(__$ctx);
                }
            } else {
                return $50(__$ctx);
            }
        } else {
            return $50(__$ctx);
        }
    }
    function $50(__$ctx) {
        if (!(__$ctx["__$anflg21"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                if (!!(__$ctx.ctx.mods || {}).theme === false) {
                    {
                        "";
                        var __r176 = __$ctx["__$anflg21"];
                        __$ctx["__$anflg21"] = true;
                        {
                            "";
                            var __r177 = __$ctx.ctx, __r178 = __r177.mods;
                            __r177.mods = __$ctx._.extend(__$ctx.ctx.mods || {}, {
                                theme: "normal"
                            });
                            $17(__$ctx);
                            __r177.mods = __r178;
                            "";
                        }
                        __$ctx["__$anflg21"] = __r176;
                        "";
                    }
                    undefined;
                    return;
                } else {
                    return $59(__$ctx);
                }
            } else {
                return $59(__$ctx);
            }
        } else {
            return $59(__$ctx);
        }
    }
    function $59(__$ctx) {
        if (!(__$ctx["__$anflg20"] !== true) === false) {
            if (!true === false) {
                if (!!__$ctx.elem === false) {
                    return $63(__$ctx);
                } else {
                    return $300(__$ctx);
                }
            } else {
                return $300(__$ctx);
            }
        } else {
            return $300(__$ctx);
        }
    }
    function $63(__$ctx) {
        var _$4bid = __$ctx.generateId(), _$4bleftId = "left" + _$4bid, _$4brightId = "right" + _$4bid, _$4bsideId = null;
        if (__$ctx.ctx.content) {
            _$4bsideId = __$ctx.ctx.content[0].side === "left" ? _$4bleftId : _$4brightId;
        } else {
            undefined;
        }
        {
            "";
            var __r171 = __$ctx["__$anflg20"];
            __$ctx["__$anflg20"] = true;
            {
                "";
                var __r172 = __$ctx._name;
                __$ctx._name = __$ctx.ctx.name || (__$ctx.ctx.name = _$4bid);
                var __r173 = __$ctx._leftId;
                __$ctx._leftId = _$4bleftId;
                var __r174 = __$ctx._rightId;
                __$ctx._rightId = _$4brightId;
                var __r175 = __$ctx._sideId;
                __$ctx._sideId = _$4bsideId;
                $17(__$ctx);
                __$ctx._name = __r172;
                __$ctx._leftId = __r173;
                __$ctx._rightId = __r174;
                __$ctx._sideId = __r175;
                "";
            }
            __$ctx["__$anflg20"] = __r171;
            "";
        }
        return;
    }
    function $70(__$ctx) {
        if (!(__$ctx["__$anflg19"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $73(__$ctx);
            } else {
                return $300(__$ctx);
            }
        } else {
            return $300(__$ctx);
        }
    }
    function $73(__$ctx) {
        var _$41ctx = __$ctx.ctx, _$41id = (_$41ctx.controlAttrs || {}).id || __$ctx.generateId(), _$41mods = _$41ctx.mods || {};
        _$41mods.theme = _$41mods.theme || "normal";
        {
            "";
            var __r168 = __$ctx["__$anflg19"];
            __$ctx["__$anflg19"] = true;
            {
                "";
                var __r169 = __$ctx._control;
                __$ctx._control = {
                    elem: "control",
                    attrs: _$41ctx.controlAttrs,
                    id: _$41id,
                    labelledby: "text" + _$41id,
                    name: _$41ctx.name,
                    tabindex: _$41ctx.tabindex,
                    checked: __$ctx.mods.checked,
                    disabled: __$ctx.mods.disabled,
                    value: _$41ctx.value || _$41ctx.content
                };
                var __r170 = _$41ctx.mods;
                _$41ctx.mods = _$41mods;
                $70(__$ctx);
                __$ctx._control = __r169;
                _$41ctx.mods = __r170;
                "";
            }
            __$ctx["__$anflg19"] = __r168;
            "";
        }
        undefined;
        return;
    }
    function $78(__$ctx) {
        if (!(__$ctx["__$anflg18"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $81(__$ctx);
            } else {
                return $84(__$ctx);
            }
        } else {
            return $84(__$ctx);
        }
    }
    function $81(__$ctx) {
        var _$3ymods = __$ctx.ctx.mods || {};
        _$3ymods.theme = _$3ymods.theme || "normal";
        {
            "";
            var __r161 = __$ctx["__$anflg18"];
            __$ctx["__$anflg18"] = true;
            {
                "";
                var __r162 = __$ctx.ctx, __r163 = __r162.mods;
                __r162.mods = _$3ymods;
                var __r164 = __$ctx._modsDisabled;
                __$ctx._modsDisabled = __$ctx.ctx.mods && __$ctx.ctx.mods.disabled;
                var __r165 = __$ctx._name;
                __$ctx._name = __$ctx.ctx.name;
                var __r166 = __$ctx._value;
                __$ctx._value = __$ctx.ctx.value;
                var __r167 = __$ctx._nextForChecked;
                __$ctx._nextForChecked = false;
                $78(__$ctx);
                __r162.mods = __r163;
                __$ctx._modsDisabled = __r164;
                __$ctx._name = __r165;
                __$ctx._value = __r166;
                __$ctx._nextForChecked = __r167;
                "";
            }
            __$ctx["__$anflg18"] = __r161;
            "";
        }
        undefined;
        return;
    }
    function $84(__$ctx) {
        if (__$ctx.elem === "radio") {
            if (!(__$ctx["__$anflg17"] !== true) === false) {
                return $87(__$ctx);
            } else {
                return $300(__$ctx);
            }
        } else {
            return $300(__$ctx);
        }
    }
    function $87(__$ctx) {
        var __r156, __r160, __r157, __r158, __r159;
        var _$3rctx = __$ctx.ctx, _$3relemMods = _$3rctx.elemMods || {}, _$3rctxControlAttrs = _$3rctx.controlAttrs || {}, _$3rvaluesMatched = _$3rctxControlAttrs.value != undefined && _$3rctxControlAttrs.value == __$ctx._value, _$3rcontrolAttrs = __$ctx._.extend(_$3rctxControlAttrs, {
            checked: (_$3rvaluesMatched || _$3relemMods.checked) && (__$ctx._nextForChecked = true),
            disabled: __$ctx._modsDisabled || _$3relemMods.disabled
        });
        _$3rcontrolAttrs.id || (_$3rcontrolAttrs.id = __$ctx.generateId());
        return "", __r156 = __$ctx["__$anflg17"], __$ctx["__$anflg17"] = true, __r160 = ("", __r157 = __$ctx._controlAttrs, __$ctx._controlAttrs = _$3rcontrolAttrs, __r158 = __$ctx._valuesMatched, __$ctx._valuesMatched = _$3rvaluesMatched, __r159 = $78(__$ctx), __$ctx._controlAttrs = __r157, __$ctx._valuesMatched = __r158, "", __r159), __$ctx["__$anflg17"] = __r156, "", __r160;
        return;
    }
    function $92(__$ctx) {
        if (!(__$ctx["__$anflg16"] !== true) === false) {
            if (!__$ctx._formSelect === false) {
                if (!!__$ctx.elem === false) {
                    return $96(__$ctx);
                } else {
                    return $300(__$ctx);
                }
            } else {
                return $300(__$ctx);
            }
        } else {
            return $300(__$ctx);
        }
    }
    function $96(__$ctx) {
        var _$3nctx = __$ctx.ctx, _$3nselectMods = __$ctx._formSelect.mods, _$3ntabindex = __$ctx._formSelect.tabindex, _$3nm = _$3nctx.mods || {};
        _$3nm.arrow = "down";
        _$3nselectMods.theme && (_$3nm.theme = _$3nselectMods.theme);
        _$3nselectMods.size && (_$3nm.size = _$3nselectMods.size);
        _$3nselectMods.disabled === "yes" && (_$3nm.disabled = "yes");
        _$3nctx.mods = _$3nm;
        _$3ntabindex && (_$3nctx.tabindex = _$3ntabindex);
        {
            "";
            var __r153 = __$ctx["__$anflg16"];
            __$ctx["__$anflg16"] = true;
            {
                "";
                var __r154 = __$ctx.ctx, __r155 = __r154._theme;
                __r154._theme = true;
                $92(__$ctx);
                __r154._theme = __r155;
                "";
            }
            __$ctx["__$anflg16"] = __r153;
            "";
        }
        undefined;
        return;
    }
    function $103(__$ctx) {
        if (!(__$ctx["__$anflg14"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $106(__$ctx);
            } else {
                return $300(__$ctx);
            }
        } else {
            return $300(__$ctx);
        }
    }
    function $106(__$ctx) {
        var _$3ectx = __$ctx.ctx, _$3eid = _$3ectx.id || __$ctx.generateId();
        {
            "";
            var __r148 = __$ctx["__$anflg14"];
            __$ctx["__$anflg14"] = true;
            {
                "";
                var __r149 = __$ctx._controlAttrs;
                __$ctx._controlAttrs = {
                    id: _$3eid,
                    name: _$3ectx.name || _$3eid,
                    tabindex: _$3ectx.tabindex
                };
                var __r150 = __$ctx._formSelect;
                __$ctx._formSelect = {
                    block: __$ctx.block,
                    mods: __$ctx.mods,
                    tabindex: _$3ectx.tabindex
                };
                $103(__$ctx);
                __$ctx._controlAttrs = __r149;
                __$ctx._formSelect = __r150;
                "";
            }
            __$ctx["__$anflg14"] = __r148;
            "";
        }
        undefined;
        return;
    }
    function $113(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "tumbler") {
            var __t = __$ctx.elem;
            if (__t === "sticker") {
                return $115(__$ctx);
            } else if (__t === "text") {
                return $120(__$ctx);
            } else if (__t === "input") {
                var _$4pside = __$ctx.elemMods.side, _$4pchecked;
                if (_$4pside === "left") {
                    _$4pchecked = __$ctx._checked ? undefined : "checked";
                } else {
                    _$4pchecked = __$ctx._checked;
                }
                return {
                    type: "radio",
                    name: __$ctx.ctx.name,
                    value: __$ctx.ctx.value,
                    checked: _$4pchecked,
                    disabled: __$ctx.ctx.disabled,
                    "aria-labelledby": _$4pside === "left" ? __$ctx._leftId : __$ctx._rightId
                };
                return;
            } else if (__t === "button") {
                return $127(__$ctx);
            } else {
                return $300(__$ctx);
            }
        } else if (__t === "check-button") {
            var __t = __$ctx.elem;
            if (__t === "control") {
                var _$48ctx = __$ctx.ctx, _$48a = {
                    type: "checkbox"
                }, _$48props = [ "tabindex", "name", "value", "id" ], _$48p;
                while (_$48p = _$48props.pop()) {
                    _$48ctx[_$48p] && (_$48a[_$48p] = _$48ctx[_$48p]);
                }
                _$48ctx.checked && (_$48a.checked = "checked");
                _$48ctx.disabled && (_$48a.disabled = "disabled");
                _$48a["aria-lebelledby"] = _$48ctx.labelledby;
                return _$48a;
                return;
            } else if (__t === "text") {
                return {
                    id: __$ctx._control.labelledby
                };
                return;
            } else {
                if (!!__$ctx.elem === false) {
                    return {
                        "for": __$ctx._control.id
                    };
                    return;
                } else {
                    return $300(__$ctx);
                }
            }
        } else if (__t === "radio-button") {
            var __t = __$ctx.elem;
            if (__t === "control") {
                var _$3xa = __$ctx._controlAttrs;
                if (!_$3xa.disabled) {
                    delete _$3xa.disabled;
                } else {
                    _$3xa.disabled = "disabled";
                    _$3xa.tabindex = "-1";
                }
                if (!_$3xa.checked) {
                    delete _$3xa.checked;
                } else {
                    _$3xa.checked = "checked";
                }
                _$3xa.type = "radio";
                _$3xa.name = __$ctx._name;
                typeof _$3xa.value === "undefined" && delete _$3xa.value;
                return _$3xa;
                return;
            } else if (__t === "radio") {
                return {
                    "for": __$ctx._controlAttrs.id
                };
                return;
            } else {
                return $300(__$ctx);
            }
        } else if (__t === "select") {
            var __t = __$ctx.elem;
            if (__t === "control") {
                var _$3qattrs = [ "id", "name", "tabindex" ], _$3qprop = {}, _$3qp;
                while (_$3qp = _$3qattrs.pop()) {
                    __$ctx._controlAttrs[_$3qp] && (_$3qprop[_$3qp] = __$ctx._controlAttrs[_$3qp]);
                }
                __$ctx.mods.disabled === "yes" && (_$3qprop.disabled = "disabled");
                _$3qprop.tabindex = -1;
                _$3qprop["aria-hidden"] = true;
                return __$ctx.ctx.controlAttrs || _$3qprop;
                return;
            } else if (__t === "item") {
                return $157(__$ctx);
            } else {
                return $300(__$ctx);
            }
        } else if (__t === "button") {
            return $164(__$ctx);
        } else {
            return $300(__$ctx);
        }
    }
    function $115(__$ctx) {
        if (!(__$ctx["__$anflg28"] !== true) === false) {
            var __r195, __r196;
            var _$4ra = ("", __r195 = __$ctx["__$anflg28"], __$ctx["__$anflg28"] = true, __r196 = $115(__$ctx), __$ctx["__$anflg28"] = __r195, "", __r196) || {};
            _$4ra["aria-hidden"] = true;
            return _$4ra;
            return;
        } else {
            return $300(__$ctx);
        }
    }
    function $120(__$ctx) {
        if (!(__$ctx["__$anflg27"] !== true) === false) {
            var __r193, __r194;
            var _$4qa = ("", __r193 = __$ctx["__$anflg27"], __$ctx["__$anflg27"] = true, __r194 = $120(__$ctx), __$ctx["__$anflg27"] = __r193, "", __r194) || {};
            side = __$ctx.elemMods.side;
            _$4qa.id = side === "left" ? __$ctx._leftId : __$ctx._rightId;
            _$4qa["aria-hidden"] = true;
            return _$4qa;
            return;
        } else {
            return $300(__$ctx);
        }
    }
    function $127(__$ctx) {
        if (!(__$ctx["__$anflg24"] !== true) === false) {
            if (!__$ctx._sideId === false) {
                var __r183, __r184;
                var _$4ja = ("", __r183 = __$ctx["__$anflg24"], __$ctx["__$anflg24"] = true, __r184 = $127(__$ctx), __$ctx["__$anflg24"] = __r183, "", __r184) || {};
                _$4ja["aria-labelledby"] = __$ctx._sideId;
                return _$4ja;
                return;
            } else {
                return $300(__$ctx);
            }
        } else {
            return $300(__$ctx);
        }
    }
    function $157(__$ctx) {
        if (!(__$ctx["__$anflg15"] !== true) === false) {
            var __r151, __r152;
            var _$3la = ("", __r151 = __$ctx["__$anflg15"], __$ctx["__$anflg15"] = true, __r152 = $157(__$ctx), __$ctx["__$anflg15"] = __r151, "", __r152) || {};
            if ((__$ctx.ctx.elemMods || {}).label === "yes") {
                _$3la.id = __$ctx._labelId;
                _$3la["aria-hidden"] = true;
            } else {
                undefined;
            }
            return _$3la;
            return;
        } else {
            return {
                id: __$ctx.generateId()
            };
            return;
        }
    }
    function $164(__$ctx) {
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
                return $300(__$ctx);
            }
        } else {
            return $300(__$ctx);
        }
    }
    function $174(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "tumbler") {
            var __t = __$ctx.elem;
            if (__t === "input") {
                return "input";
                return;
            } else if (__t === "label") {
                return "label";
                return;
            } else if (__t === "box") {
                return "span";
                return;
            } else {
                if (!!__$ctx.elem === false) {
                    return "span";
                    return;
                } else {
                    return $300(__$ctx);
                }
            }
        } else if (__t === "check-button") {
            if (__$ctx.elem === "control") {
                return "input";
                return;
            } else {
                if (!!__$ctx.elem === false) {
                    return "label";
                    return;
                } else {
                    return $300(__$ctx);
                }
            }
        } else if (__t === "radio-button") {
            if (!!__$ctx.elem === false) {
                return "span";
                return;
            } else {
                var __t = __$ctx.elem;
                if (__t === "control") {
                    return "input";
                    return;
                } else if (__t === "radio") {
                    return "label";
                    return;
                } else {
                    return $300(__$ctx);
                }
            }
        } else if (__t === "select") {
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
                    return $300(__$ctx);
                }
            }
        } else {
            return $300(__$ctx);
        }
    }
    function $224(__$ctx) {
        return __$ctx.ctx.value || __$ctx.ctx.side !== "left";
        return;
    }
    function $229(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "tumbler") {
            if (__$ctx.elem === "box") {
                return [ {
                    elem: "sticker",
                    elemMods: {
                        position: "left"
                    },
                    content: {
                        elem: "sticker-label",
                        content: BEM.I18N("tumbler", "on")
                    }
                }, {
                    elem: "sticker",
                    elemMods: {
                        position: "right"
                    },
                    content: {
                        elem: "sticker-label",
                        content: BEM.I18N("tumbler", "off")
                    }
                }, {
                    elem: "button"
                } ];
                return;
            } else {
                if (!(__$ctx.ctx.content === undefined) === false) {
                    if (!!__$ctx.elem === false) {
                        return [ {
                            elem: "option",
                            side: "left"
                        }, {
                            elem: "option",
                            side: "right"
                        } ];
                        return;
                    } else {
                        return $239(__$ctx);
                    }
                } else {
                    return $239(__$ctx);
                }
            }
        } else if (__t === "check-button") {
            if (!!__$ctx.elem === false) {
                return [ __$ctx._control, {
                    elem: "text",
                    tag: "span",
                    content: __$ctx.ctx.content
                } ];
                return;
            } else {
                return $300(__$ctx);
            }
        } else if (__t === "radio-button") {
            if (__$ctx.elem === "radio") {
                return [ {
                    elem: "control"
                }, {
                    elem: "text",
                    tag: "span",
                    content: __$ctx.ctx.content
                } ];
                return;
            } else {
                return $300(__$ctx);
            }
        } else if (__t === "popup") {
            if (!!__$ctx.elem === false) {
                return [ {
                    elem: "under",
                    mods: __$ctx.ctx.underMods
                }, __$ctx.ctx.content ];
                return;
            } else {
                return $300(__$ctx);
            }
        } else {
            return $300(__$ctx);
        }
    }
    function $239(__$ctx) {
        if (!(__$ctx._.isArray(__$ctx.ctx.content) && __$ctx.ctx.content.length === 1) === false) {
            var _$4fcontent = __$ctx.ctx.content;
            if (_$4fcontent[0].side !== "left") {
                return [ {
                    elem: "option",
                    side: "left"
                }, _$4fcontent ];
            } else {
                undefined;
            }
            return [ _$4fcontent, {
                elem: "option",
                side: "right"
            } ];
            return;
        } else {
            return $300(__$ctx);
        }
    }
    function $261(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "tumbler" || __t === "check-button" || __t === "radio-button" || __t === "select") {
            if (!!__$ctx.elem === false) {
                return true;
                return;
            } else {
                return $300(__$ctx);
            }
        } else {
            return $300(__$ctx);
        }
    }
    function $284(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "radio-button") {
            if (__$ctx.elem === "radio") {
                return $287(__$ctx);
            } else {
                return $300(__$ctx);
            }
        } else if (__t === "button") {
            if (!__$ctx._formSelect === false) {
                if (!!__$ctx.elem === false) {
                    return [ {
                        block: __$ctx._formSelect.block,
                        elem: "button"
                    } ];
                    return;
                } else {
                    return $300(__$ctx);
                }
            } else {
                return $300(__$ctx);
            }
        } else {
            return $300(__$ctx);
        }
    }
    function $287(__$ctx) {
        var _$3ucontrolAttrs = __$ctx._controlAttrs, _$3uelemMods = {}, _$3uside = (__$ctx.ctx.mods || {}).side;
        if (!_$3uside) {
            _$3uside = __$ctx.isFirst() ? __$ctx.isLast() ? "both" : "left" : __$ctx.isLast() ? "right" : "";
        } else {
            undefined;
        }
        _$3uside && (_$3uelemMods.side = _$3uside);
        __$ctx._nextForChecked && !_$3ucontrolAttrs.checked && (__$ctx._nextForChecked = null, _$3uelemMods["next-for-pressed"] = "yes");
        __$ctx._modsDisabled && (_$3uelemMods.disabled = "yes");
        __$ctx._valuesMatched && (_$3uelemMods.checked = "yes");
        _$3ucontrolAttrs.checked && (_$3uelemMods.pressed = "yes");
        return [ {
            elemMods: _$3uelemMods
        } ];
        return;
    }
    function $300(__$ctx) {
        if (__$ctx.block === "popup") {
            if (!!__$ctx.ctx._defaults === false) {
                if (!!__$ctx.elem === false) {
                    return $304(__$ctx);
                } else {
                    return $309(__$ctx);
                }
            } else {
                return $309(__$ctx);
            }
        } else {
            return $309(__$ctx);
        }
    }
    function $304(__$ctx) {
        __$ctx.ctx.mods = __$ctx._.extend({
            theme: "ffffff",
            autoclosable: "yes",
            adaptive: "yes",
            animate: "yes"
        }, __$ctx.ctx.mods);
        if (__$ctx.ctx.zIndex) {
            var _$3cattrs = __$ctx.ctx.attrs || (__$ctx.ctx.attrs = {});
            _$3cattrs.style = (_$3cattrs.style || "") + ";z-index:" + __$ctx.ctx.zIndex + ";";
        } else {
            undefined;
        }
        {
            "";
            var __r146 = __$ctx.ctx, __r147 = __r146._defaults;
            __r146._defaults = true;
            $1(__$ctx);
            __r146._defaults = __r147;
            "";
        }
        undefined;
        return;
    }
    function $309(__$ctx) {
        var __t = __$ctx._mode;
        if (__t === "content") {
            var __t = __$ctx.block;
            if (__t === "input") {
                var __t = __$ctx.elem;
                if (__t === "control") {
                    if (!(__$ctx.mods && __$ctx.mods.type === "textarea") === false) {
                        return __$ctx._value || __$ctx.ctx.content;
                        return;
                    } else {
                        return $370(__$ctx);
                    }
                } else if (__t === "clear") {
                    if (!!__$ctx.ctx.content === false) {
                        return "";
                        return;
                    } else {
                        return $370(__$ctx);
                    }
                } else if (__t === "ahead") {
                    return [ {
                        elem: "ahead-filler"
                    }, {
                        elem: "ahead-hint"
                    } ];
                    return;
                } else {
                    return $370(__$ctx);
                }
            } else if (__t === "radiobox") {
                if (__$ctx.elem === "radio") {
                    return [ {
                        elem: "box",
                        tag: "span",
                        content: {
                            elem: "control"
                        }
                    }, __$ctx.ctx.content ];
                    return;
                } else {
                    return $370(__$ctx);
                }
            } else if (__t === "checkbox") {
                if (!!__$ctx.elem === false) {
                    return [ {
                        elem: "box",
                        tag: "span",
                        elemMods: __$ctx.mods.checked === "yes" ? {
                            checked: "yes"
                        } : "",
                        content: [ {
                            elem: "control",
                            attrs: __$ctx.ctx.checkboxAttrs || {}
                        }, {
                            elem: "tick",
                            tag: "i"
                        } ]
                    }, __$ctx.ctx.content ];
                    return;
                } else {
                    return $370(__$ctx);
                }
            } else if (__t === "button") {
                if (__$ctx.elem === "text") {
                    if (!(__$ctx.mods && __$ctx.mods["only-icon"] === "yes") === false) {
                        return [ "&#160;", __$ctx.ctx.content ];
                        return;
                    } else {
                        return $342(__$ctx);
                    }
                } else {
                    return $342(__$ctx);
                }
            } else if (__t === "b-page") {
                if (!!__$ctx.elem === false) {
                    return {
                        elem: "body",
                        content: __$ctx.ctx.content
                    };
                    return;
                } else {
                    return $370(__$ctx);
                }
            } else if (__t === "i-ua") {
                return $358(__$ctx);
            } else {
                return $370(__$ctx);
            }
        } else if (__t === "mix") {
            var __t = __$ctx.block;
            if (__t === "input") {
                if (__$ctx.elem === "ahead") {
                    return [ {
                        block: "input",
                        elem: "input"
                    } ];
                    return;
                } else {
                    return $698(__$ctx);
                }
            } else if (__t === "radiobox") {
                if (__$ctx.elem === "radio") {
                    var _$2pelemMods = {};
                    __$ctx._modsDisabled && (_$2pelemMods.disabled = "yes");
                    __$ctx._valuesMatched && (_$2pelemMods.checked = "yes");
                    return [ {
                        elemMods: _$2pelemMods
                    } ];
                    return;
                } else {
                    return $698(__$ctx);
                }
            } else if (__t === "b-page") {
                return $680(__$ctx);
            } else {
                return $698(__$ctx);
            }
        } else if (__t === "value") {
            if (__$ctx.block === "input") {
                return $700(__$ctx);
            } else {
                return $828(__$ctx);
            }
        } else if (__t === "js") {
            var __t = __$ctx.block;
            if (__t === "input") {
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
                    return $749(__$ctx);
                }
            } else if (__t === "radiobox" || __t === "checkbox" || __t === "button") {
                if (!!__$ctx.elem === false) {
                    return true;
                    return;
                } else {
                    return $749(__$ctx);
                }
            } else if (__t === "link") {
                if (!__$ctx.ctx.hasOwnProperty("tabindex") === false) {
                    return {
                        origTabindex: String(__$ctx.ctx.tabindex)
                    };
                    return;
                } else {
                    return $749(__$ctx);
                }
            } else {
                return $749(__$ctx);
            }
        } else if (__t === "bem") {
            var __t = __$ctx.block;
            if (__t === "b-page") {
                var __t = __$ctx.elem;
                if (__t === "js" || __t === "css" || __t === "favicon" || __t === "meta" || __t === "head" || __t === "root") {
                    return false;
                    return;
                } else {
                    return $772(__$ctx);
                }
            } else if (__t === "i-ua") {
                if (!!__$ctx.elem === false) {
                    return false;
                    return;
                } else {
                    return $772(__$ctx);
                }
            } else {
                return $772(__$ctx);
            }
        } else if (__t === "default") {
            var __t = __$ctx.block;
            if (__t === "input") {
                return $554(__$ctx);
            } else if (__t === "radiobox") {
                return $571(__$ctx);
            } else if (__t === "checkbox") {
                return $585(__$ctx);
            } else if (__t === "button") {
                if (!(__$ctx["__$anflg8"] !== true) === false) {
                    if (!(__$ctx.mods && __$ctx.mods.round === "yes") === false) {
                        if (!!__$ctx.elem === false) {
                            if (!!(__$ctx.ctx.mods || {})["only-icon"] === false) {
                                return $598(__$ctx);
                            } else {
                                return $605(__$ctx);
                            }
                        } else {
                            return $605(__$ctx);
                        }
                    } else {
                        return $605(__$ctx);
                    }
                } else {
                    return $605(__$ctx);
                }
            } else if (__t === "b-page") {
                if (__$ctx.elem === "css") {
                    if (!__$ctx.ctx.hasOwnProperty("ie") === false) {
                        if (!!__$ctx.ctx._ieCommented === false) {
                            return $617(__$ctx);
                        } else {
                            return $622(__$ctx);
                        }
                    } else {
                        return $622(__$ctx);
                    }
                } else {
                    return $622(__$ctx);
                }
            } else if (__t === "i-bem") {
                if (__$ctx.elem === "i18n") {
                    return $632(__$ctx);
                } else {
                    return $828(__$ctx);
                }
            } else if (__t === "i-jquery") {
                if (__$ctx.elem === "core") {
                    var __r62, __r63, __r64;
                    return "", __r62 = __$ctx._mode, __$ctx._mode = "", __r63 = __$ctx.ctx, __$ctx.ctx = {
                        block: "b-page",
                        elem: "js",
                        url: "//yandex.st/jquery/1.8.3/jquery.min.js"
                    }, __r64 = $821(__$ctx), __$ctx._mode = __r62, __$ctx.ctx = __r63, "", __r64;
                    return;
                } else {
                    return $828(__$ctx);
                }
            } else if (__t === "i-global") {
                return $640(__$ctx);
            } else {
                return $828(__$ctx);
            }
        } else if (__t === "cls") {
            if (__$ctx.block === "b-page") {
                if (__$ctx.elem === "root") {
                    return "i-ua_js_no i-ua_css_standard";
                    return;
                } else {
                    return $788(__$ctx);
                }
            } else {
                return $788(__$ctx);
            }
        } else if (__t === "doctype") {
            if (__$ctx.block === "b-page") {
                if (!!__$ctx.elem === false) {
                    return $792(__$ctx);
                } else {
                    return $828(__$ctx);
                }
            } else {
                return $828(__$ctx);
            }
        } else if (__t === "js-params") {
            if (__$ctx.block === "b-page") {
                if (!!__$ctx.elem === false) {
                    return $800(__$ctx);
                } else {
                    return $828(__$ctx);
                }
            } else {
                return $828(__$ctx);
            }
        } else if (__t === "public-params") {
            if (__$ctx.block === "i-global") {
                return $806(__$ctx);
            } else {
                return $828(__$ctx);
            }
        } else if (__t === "env") {
            if (__$ctx.block === "i-global") {
                return $814(__$ctx);
            } else {
                return $828(__$ctx);
            }
        } else if (__t === "tag") {
            var __t = __$ctx.block;
            if (__t === "input") {
                var __t = __$ctx.elem;
                if (__t === "control") {
                    if (!(__$ctx.mods && __$ctx.mods.type === "textarea") === false) {
                        return "textarea";
                        return;
                    } else {
                        return "input";
                        return;
                    }
                } else if (__t === "clear" || __t === "ahead-hint" || __t === "ahead-filler") {
                    return "span";
                    return;
                } else {
                    if (!!__$ctx.elem === false) {
                        return "span";
                        return;
                    } else {
                        return $552(__$ctx);
                    }
                }
            } else if (__t === "radiobox") {
                var __t = __$ctx.elem;
                if (__t === "control") {
                    return "input";
                    return;
                } else if (__t === "radio") {
                    return "label";
                    return;
                } else {
                    if (!!__$ctx.elem === false) {
                        return "span";
                        return;
                    } else {
                        return $552(__$ctx);
                    }
                }
            } else if (__t === "checkbox") {
                if (__$ctx.elem === "control") {
                    return "input";
                    return;
                } else {
                    if (!!__$ctx.elem === false) {
                        return "span";
                        return;
                    } else {
                        return $552(__$ctx);
                    }
                }
            } else if (__t === "b-icon") {
                if (!!__$ctx.elem === false) {
                    return "img";
                    return;
                } else {
                    return $552(__$ctx);
                }
            } else if (__t === "button") {
                if (!__$ctx.ctx.url === false) {
                    if (!!__$ctx.elem === false) {
                        return "a";
                        return;
                    } else {
                        return $510(__$ctx);
                    }
                } else {
                    return $510(__$ctx);
                }
            } else if (__t === "link") {
                if (__$ctx.elem === "inner") {
                    return "span";
                    return;
                } else {
                    if (!!__$ctx.elem === false) {
                        return __$ctx.ctx.url ? "a" : "span";
                        return;
                    } else {
                        return $552(__$ctx);
                    }
                }
            } else if (__t === "b-page") {
                var __t = __$ctx.elem;
                if (__t === "js") {
                    return "script";
                    return;
                } else if (__t === "css") {
                    if (!__$ctx.ctx.url === false) {
                        return "link";
                        return;
                    } else {
                        return "style";
                        return;
                    }
                } else if (__t === "body") {
                    return "";
                    return;
                } else if (__t === "favicon") {
                    return "link";
                    return;
                } else if (__t === "meta") {
                    return "meta";
                    return;
                } else if (__t === "head") {
                    return "head";
                    return;
                } else if (__t === "root") {
                    return "html";
                    return;
                } else {
                    if (!!__$ctx.elem === false) {
                        return "body";
                        return;
                    } else {
                        return $552(__$ctx);
                    }
                }
            } else if (__t === "i-ua") {
                if (!!__$ctx.elem === false) {
                    return "script";
                    return;
                } else {
                    return $552(__$ctx);
                }
            } else {
                return $552(__$ctx);
            }
        } else if (__t === "") {
            return $821(__$ctx);
        } else if (__t === "attrs") {
            var __t = __$ctx.block;
            if (__t === "input") {
                var __t = __$ctx.elem;
                if (__t === "control") {
                    if (!(__$ctx.mods && __$ctx.mods.type === "textarea") === false) {
                        return $374(__$ctx);
                    } else {
                        return $380(__$ctx);
                    }
                } else if (__t === "clear") {
                    return {
                        unselectable: "on"
                    };
                    return;
                } else {
                    return $462(__$ctx);
                }
            } else if (__t === "radiobox") {
                var __t = __$ctx.elem;
                if (__t === "control") {
                    var _$2sa = __$ctx._controlAttrs;
                    if (!_$2sa.disabled) {
                        delete _$2sa.disabled;
                    } else {
                        _$2sa.disabled = "disabled";
                        _$2sa.tabindex = "-1";
                    }
                    if (!_$2sa.checked) {
                        delete _$2sa.checked;
                    } else {
                        _$2sa.checked = "checked";
                    }
                    _$2sa.type = "radio";
                    _$2sa.name = __$ctx._name;
                    typeof _$2sa.value === "undefined" && delete _$2sa.value;
                    return _$2sa;
                    return;
                } else if (__t === "radio") {
                    return {
                        "for": __$ctx._controlAttrs.id
                    };
                    return;
                } else {
                    return $462(__$ctx);
                }
            } else if (__t === "checkbox") {
                if (__$ctx.elem === "control") {
                    var _$2ia = __$ctx.ctx.attrs || {};
                    _$2ia.id = __$ctx._checkboxAttrs.id;
                    _$2ia.type = "checkbox";
                    __$ctx.mods.disabled && (_$2ia.disabled = "disabled");
                    __$ctx.mods.checked == "yes" && (_$2ia.checked = "checked");
                    _$2ia["aria-labelledby"] = __$ctx._labelId;
                    return _$2ia;
                    return;
                } else {
                    return $462(__$ctx);
                }
            } else if (__t === "b-icon") {
                if (!!__$ctx.elem === false) {
                    var _$2bctx = __$ctx.ctx, _$2ba = {
                        src: "//yandex.st/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif",
                        alt: ""
                    }, _$2bprops = [ "alt", "width", "height" ], _$2bp;
                    _$2bctx.url && (_$2ba.src = _$2bctx.url);
                    while (_$2bp = _$2bprops.shift()) {
                        _$2bctx[_$2bp] && (_$2ba[_$2bp] = _$2bctx[_$2bp]);
                    }
                    return _$2ba;
                    return;
                } else {
                    return $462(__$ctx);
                }
            } else if (__t === "button") {
                if (!(__$ctx["__$anflg7"] !== true) === false) {
                    if (!__$ctx.ctx.url === false) {
                        if (!!__$ctx.elem === false) {
                            var __r101, __r102;
                            var _$26ctx = __$ctx.ctx, _$26p = ("", __r101 = __$ctx["__$anflg7"], __$ctx["__$anflg7"] = true, __r102 = $164(__$ctx), __$ctx["__$anflg7"] = __r101, "", __r102), _$26a = {
                                href: _$26ctx.url
                            };
                            _$26ctx.target && (_$26a.target = _$26ctx.target);
                            __$ctx.mods.disabled && (_$26a["aria-disabled"] = true);
                            return __$ctx._.extend(_$26p, _$26a);
                            return;
                        } else {
                            return $411(__$ctx);
                        }
                    } else {
                        return $411(__$ctx);
                    }
                } else {
                    return $411(__$ctx);
                }
            } else if (__t === "link") {
                return $428(__$ctx);
            } else if (__t === "b-page") {
                var __t = __$ctx.elem;
                if (__t === "js") {
                    if (!__$ctx.ctx.url === false) {
                        return {
                            src: __$ctx.ctx.url
                        };
                        return;
                    } else {
                        return $462(__$ctx);
                    }
                } else if (__t === "css") {
                    if (!__$ctx.ctx.url === false) {
                        return {
                            rel: "stylesheet",
                            href: __$ctx.ctx.url
                        };
                        return;
                    } else {
                        return $462(__$ctx);
                    }
                } else if (__t === "root") {
                    return {
                        lang: __$ctx["i-global"].lang || "ru"
                    };
                    return;
                } else if (__t === "favicon") {
                    return {
                        rel: "shortcut icon",
                        href: __$ctx.ctx.url
                    };
                    return;
                } else if (__t === "meta") {
                    return __$ctx.ctx.attrs;
                    return;
                } else {
                    return $462(__$ctx);
                }
            } else {
                return $462(__$ctx);
            }
        } else if (__t === "jsAttr") {
            return undefined;
            return;
        } else if (__t === "xUACompatible") {
            if (__$ctx.block === "b-page") {
                if (!!__$ctx.elem === false) {
                    return $776(__$ctx);
                } else {
                    return $828(__$ctx);
                }
            } else {
                return $828(__$ctx);
            }
        } else {
            return $828(__$ctx);
        }
    }
    function $342(__$ctx) {
        if (!(__$ctx.mods && __$ctx.mods.round === "yes") === false) {
            if (!!__$ctx.elem === false) {
                return {
                    block: "b-icon",
                    mix: [ {
                        block: "button",
                        elem: "icon"
                    } ],
                    alt: ""
                };
                return;
            } else {
                return $348(__$ctx);
            }
        } else {
            return $348(__$ctx);
        }
    }
    function $348(__$ctx) {
        if (!!__$ctx.elem === false) {
            return {
                elem: "text",
                tag: "span",
                content: __$ctx.ctx.content
            };
            return;
        } else {
            return $370(__$ctx);
        }
    }
    function $358(__$ctx) {
        if (!(__$ctx["__$anflg1"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                var __r60, __r61;
                var _$xc = ("", __r60 = __$ctx["__$anflg1"], __$ctx["__$anflg1"] = true, __r61 = $358(__$ctx), __$ctx["__$anflg1"] = __r60, "", __r61);
                _$xc += [ ";(function(d,e,c,r,n,w,v,f){", "e=d.documentElement;", 'c="className";', 'r="replace";', 'n="createElementNS";', 'f="firstChild";', 'w="http://www.w3.org/2000/svg";', 'e[c]+=" i-ua_svg_"+(!!d[n]&&!!d[n](w,"svg").createSVGRect?"yes":"no");', 'v=d.createElement("div");', 'v.innerHTML="<svg/>";', 'e[c]+=" i-ua_inlinesvg_"+((v[f]&&v[f].namespaceURI)==w?"yes":"no");', "})(document);" ].join("");
                return _$xc;
                return;
            } else {
                return $364(__$ctx);
            }
        } else {
            return $364(__$ctx);
        }
    }
    function $364(__$ctx) {
        if (!!__$ctx.elem === false) {
            return [ ";(function(d,e,c,r){", "e=d.documentElement;", 'c="className";', 'r="replace";', 'e[c]=e[c][r]("i-ua_js_no","i-ua_js_yes");', 'if(d.compatMode!="CSS1Compat")', 'e[c]=e[c][r]("i-ua_css_standart","i-ua_css_quirks")', "})(document);" ].join("");
            return;
        } else {
            return $370(__$ctx);
        }
    }
    function $370(__$ctx) {
        return __$ctx.ctx.content;
        return;
    }
    function $374(__$ctx) {
        if (!!__$ctx._baseAttrsApplyed === false) {
            var __r143, __r144, __r145;
            var _$3aa = ("", __r143 = __$ctx._value, __$ctx._value = null, __r144 = __$ctx._baseAttrsApplyed, __$ctx._baseAttrsApplyed = true, __r145 = $374(__$ctx), __$ctx._value = __r143, __$ctx._baseAttrsApplyed = __r144, "", __r145);
            return __$ctx._.extend(_$3aa, {
                rows: 10,
                cols: 10
            });
            return;
        } else {
            return $380(__$ctx);
        }
    }
    function $380(__$ctx) {
        var _$34a = __$ctx._.extend({
            id: __$ctx._inputId,
            name: __$ctx._name
        }, __$ctx.ctx.controlAttrs);
        (__$ctx._value || __$ctx._value === 0) && (_$34a.value = __$ctx._value);
        __$ctx.mods.disabled && (_$34a.disabled = "disabled");
        _$34a["aria-labelledby"] = __$ctx._labelId + " " + __$ctx._hintId;
        return _$34a;
        return;
    }
    function $411(__$ctx) {
        if (!(__$ctx["__$anflg6"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                if (!!__$ctx.ctx.url === false) {
                    return $415(__$ctx);
                } else {
                    return $420(__$ctx);
                }
            } else {
                return $420(__$ctx);
            }
        } else {
            return $420(__$ctx);
        }
    }
    function $415(__$ctx) {
        var __r99, __r100;
        var _$25ctx = __$ctx.ctx, _$25p = ("", __r99 = __$ctx["__$anflg6"], __$ctx["__$anflg6"] = true, __r100 = $164(__$ctx), __$ctx["__$anflg6"] = __r99, "", __r100), _$25a = {
            type: _$25ctx.type || "button"
        }, _$25props = [ "name", "value" ], _$25i;
        while (_$25i = _$25props.shift()) {
            _$25ctx[_$25i] && (_$25a[_$25i] = _$25ctx[_$25i]);
        }
        __$ctx.mods.disabled && (_$25a.disabled = "disabled");
        return __$ctx._.extend(_$25p, _$25a);
        return;
    }
    function $420(__$ctx) {
        if (!true === false) {
            if (!!__$ctx.elem === false) {
                var _$24ctx = __$ctx.ctx, _$24a = {
                    role: "button"
                };
                _$24ctx.tabindex && (_$24a.tabindex = _$24ctx.tabindex);
                return _$24a;
                return;
            } else {
                return $462(__$ctx);
            }
        } else {
            return $462(__$ctx);
        }
    }
    function $428(__$ctx) {
        if (!(__$ctx["__$anflg4"] !== true) === false) {
            if (!(__$ctx.mods && __$ctx.mods.disabled === "yes") === false) {
                if (!!__$ctx.elem === false) {
                    var __r94, __r95;
                    var _$1yattrs = ("", __r94 = __$ctx["__$anflg4"], __$ctx["__$anflg4"] = true, __r95 = $428(__$ctx), __$ctx["__$anflg4"] = __r94, "", __r95) || {};
                    _$1yattrs.tabindex = -1;
                    _$1yattrs["aria-disabled"] = true;
                    return _$1yattrs;
                    return;
                } else {
                    return $437(__$ctx);
                }
            } else {
                return $437(__$ctx);
            }
        } else {
            return $437(__$ctx);
        }
    }
    function $437(__$ctx) {
        if (!!__$ctx.elem === false) {
            return $439(__$ctx);
        } else {
            return $462(__$ctx);
        }
    }
    function $439(__$ctx) {
        var _$1xctx = __$ctx.ctx, _$1xattrs = {};
        [ "title", "target", "id", "tabindex" ].forEach(function(param) {
            if (_$1xctx.hasOwnProperty(param)) {
                _$1xattrs[param] = String(_$1xctx[param]);
            } else {
                undefined;
            }
        });
        if (_$1xctx.url !== undefined) {
            if (__$ctx.isSimple(_$1xctx.url)) {
                _$1xattrs.href = String(_$1xctx.url);
            } else {
                var _$1xbuf = [];
                {
                    "";
                    var __r91 = __$ctx._mode;
                    __$ctx._mode = "";
                    var __r92 = __$ctx._buf;
                    __$ctx._buf = _$1xbuf;
                    var __r93 = __$ctx.ctx;
                    __$ctx.ctx = _$1xctx.url;
                    $821(__$ctx);
                    __$ctx._mode = __r91;
                    __$ctx._buf = __r92;
                    __$ctx.ctx = __r93;
                    "";
                }
                undefined;
                _$1xattrs.href = _$1xbuf.join("");
            }
        } else {
            _$1xattrs.role = "button";
            if (!_$1xattrs.tabindex) {
                _$1xattrs.tabindex = "0";
            } else {
                undefined;
            }
        }
        return _$1xattrs;
        return;
    }
    function $462(__$ctx) {
        return undefined;
        return;
    }
    function $510(__$ctx) {
        if (!!__$ctx.elem === false) {
            return "button";
            return;
        } else {
            return $552(__$ctx);
        }
    }
    function $552(__$ctx) {
        return undefined;
        return;
    }
    function $554(__$ctx) {
        if (__$ctx.elem === "control") {
            if (!(__$ctx["__$anflg13"] !== true) === false) {
                if (!!__$ctx.mods.clear === false) {
                    return $558(__$ctx);
                } else {
                    return $563(__$ctx);
                }
            } else {
                return $563(__$ctx);
            }
        } else {
            return $563(__$ctx);
        }
    }
    function $558(__$ctx) {
        {
            "";
            var __r140 = __$ctx["__$anflg13"];
            __$ctx["__$anflg13"] = true;
            {
                "";
                var __r141 = __$ctx.ctx;
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
                var __r142 = __$ctx._mode;
                __$ctx._mode = "";
                $821(__$ctx);
                __$ctx.ctx = __r141;
                __$ctx._mode = __r142;
                "";
            }
            __$ctx["__$anflg13"] = __r140;
            "";
        }
        undefined;
        return;
    }
    function $563(__$ctx) {
        if (!(__$ctx["__$anflg12"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $566(__$ctx);
            } else {
                return $828(__$ctx);
            }
        } else {
            return $828(__$ctx);
        }
    }
    function $566(__$ctx) {
        var __r125, __r126, __r127;
        var _$2vvalue = ("", __r125 = __$ctx._mode, __$ctx._mode = "value", __r126 = __$ctx.ctx, __$ctx.ctx = __$ctx.ctx.value, __r127 = $700(__$ctx), __$ctx._mode = __r125, __$ctx.ctx = __r126, "", __r127), _$2vid = __$ctx.ctx.id || __$ctx.generateId(), _$2vmods = __$ctx.ctx.mods || {};
        _$2vmods.theme = _$2vmods.theme || "normal";
        {
            "";
            var __r128 = __$ctx["__$anflg12"];
            __$ctx["__$anflg12"] = true;
            {
                "";
                var __r129 = __$ctx._inputId;
                __$ctx._inputId = _$2vid;
                var __r130 = __$ctx._labelId;
                __$ctx._labelId = "label" + _$2vid;
                var __r131 = __$ctx._hintId;
                __$ctx._hintId = "hint" + _$2vid;
                var __r132 = __$ctx._name;
                __$ctx._name = __$ctx.ctx.name || "";
                var __r133 = __$ctx._value;
                __$ctx._value = _$2vvalue;
                var __r134 = __$ctx._inputLink;
                __$ctx._inputLink = true;
                var __r135 = __$ctx._disabled;
                __$ctx._disabled = __$ctx.mods.disabled;
                var __r136 = __$ctx.ctx, __r137 = __r136.mods;
                __r136.mods = _$2vmods;
                $554(__$ctx);
                __$ctx._inputId = __r129;
                __$ctx._labelId = __r130;
                __$ctx._hintId = __r131;
                __$ctx._name = __r132;
                __$ctx._value = __r133;
                __$ctx._inputLink = __r134;
                __$ctx._disabled = __r135;
                __r136.mods = __r137;
                "";
            }
            __$ctx["__$anflg12"] = __r128;
            "";
        }
        undefined;
        return;
    }
    function $571(__$ctx) {
        if (__$ctx.elem === "radio") {
            return $572(__$ctx);
        } else {
            return $577(__$ctx);
        }
    }
    function $572(__$ctx) {
        if (!(__$ctx["__$anflg11"] !== true) === false) {
            return $574(__$ctx);
        } else {
            return $577(__$ctx);
        }
    }
    function $574(__$ctx) {
        var __r120, __r124, __r121, __r122, __r123;
        var _$2mctx = __$ctx.ctx, _$2melemMods = _$2mctx.elemMods || {}, _$2mctxControlAttrs = _$2mctx.controlAttrs || {}, _$2mvaluesMatched = _$2mctxControlAttrs.value != undefined && _$2mctxControlAttrs.value == __$ctx._value, _$2mcontrolAttrs = __$ctx._.extend(_$2mctxControlAttrs, {
            checked: _$2mvaluesMatched || _$2melemMods.checked,
            disabled: __$ctx._modsDisabled || _$2melemMods.disabled
        });
        _$2mcontrolAttrs.id || (_$2mcontrolAttrs.id = __$ctx.generateId());
        return "", __r120 = __$ctx["__$anflg11"], __$ctx["__$anflg11"] = true, __r124 = ("", __r121 = __$ctx._controlAttrs, __$ctx._controlAttrs = _$2mcontrolAttrs, __r122 = __$ctx._valuesMatched, __$ctx._valuesMatched = _$2mvaluesMatched, __r123 = $572(__$ctx), __$ctx._controlAttrs = __r121, __$ctx._valuesMatched = __r122, "", __r123), __$ctx["__$anflg11"] = __r120, "", __r124;
        return;
    }
    function $577(__$ctx) {
        if (!(__$ctx["__$anflg10"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $580(__$ctx);
            } else {
                return $828(__$ctx);
            }
        } else {
            return $828(__$ctx);
        }
    }
    function $580(__$ctx) {
        var _$2jmods = __$ctx.ctx.mods || {};
        _$2jmods.theme = _$2jmods.theme || "normal";
        {
            "";
            var __r114 = __$ctx["__$anflg10"];
            __$ctx["__$anflg10"] = true;
            {
                "";
                var __r115 = __$ctx.ctx, __r116 = __r115.mods;
                __r115.mods = _$2jmods;
                var __r117 = __$ctx._modsDisabled;
                __$ctx._modsDisabled = __$ctx.ctx.mods && __$ctx.ctx.mods.disabled;
                var __r118 = __$ctx._name;
                __$ctx._name = __$ctx.ctx.name;
                var __r119 = __$ctx._value;
                __$ctx._value = __$ctx.ctx.value;
                $571(__$ctx);
                __r115.mods = __r116;
                __$ctx._modsDisabled = __r117;
                __$ctx._name = __r118;
                __$ctx._value = __r119;
                "";
            }
            __$ctx["__$anflg10"] = __r114;
            "";
        }
        undefined;
        return;
    }
    function $585(__$ctx) {
        if (!(__$ctx["__$anflg9"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $588(__$ctx);
            } else {
                return $828(__$ctx);
            }
        } else {
            return $828(__$ctx);
        }
    }
    function $588(__$ctx) {
        var _$2fctx = __$ctx.ctx, _$2fattrs = _$2fctx.checkboxAttrs || {}, _$2fid = _$2fattrs.id || __$ctx.generateId(), _$2fmods = _$2fctx.mods || {};
        _$2fmods.theme = _$2fmods.theme || "normal";
        {
            "";
            var __r110 = __$ctx["__$anflg9"];
            __$ctx["__$anflg9"] = true;
            {
                "";
                var __r111 = __$ctx._checkboxAttrs;
                __$ctx._checkboxAttrs = _$2fattrs.id ? _$2fattrs : {
                    id: "id" + _$2fid
                };
                var __r112 = __$ctx._labelId;
                __$ctx._labelId = "label" + _$2fid;
                var __r113 = _$2fctx.mods;
                _$2fctx.mods = _$2fmods;
                $585(__$ctx);
                __$ctx._checkboxAttrs = __r111;
                __$ctx._labelId = __r112;
                _$2fctx.mods = __r113;
                "";
            }
            __$ctx["__$anflg9"] = __r110;
            "";
        }
        undefined;
        return;
    }
    function $598(__$ctx) {
        var __r103, __r109, __r104, __r105, __r106, __r107, __r108;
        return "", __r103 = __$ctx["__$anflg8"], __$ctx["__$anflg8"] = true, __r109 = ("", __r104 = __$ctx.ctx, __r105 = __r104.mods, __r104.mods = __$ctx.ctx.mods || {}, __r106 = __$ctx.ctx.mods, __r107 = __r106["only-icon"], __r106["only-icon"] = "yes", __r108 = $92(__$ctx), __r104.mods = __r105, __r106["only-icon"] = __r107, "", __r108), __$ctx["__$anflg8"] = __r103, "", __r109;
        return;
    }
    function $605(__$ctx) {
        if (!(__$ctx["__$anflg5"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                var _$23mods = __$ctx.ctx.mods || {};
                _$23mods.theme = _$23mods.theme || "normal";
                {
                    "";
                    var __r96 = __$ctx["__$anflg5"];
                    __$ctx["__$anflg5"] = true;
                    {
                        "";
                        var __r97 = __$ctx.ctx, __r98 = __r97.mods;
                        __r97.mods = _$23mods;
                        $92(__$ctx);
                        __r97.mods = __r98;
                        "";
                    }
                    __$ctx["__$anflg5"] = __r96;
                    "";
                }
                undefined;
                return;
            } else {
                return $828(__$ctx);
            }
        } else {
            return $828(__$ctx);
        }
    }
    function $617(__$ctx) {
        var _$1pie = __$ctx.ctx.ie;
        if (_$1pie === true) {
            {
                "";
                var __r85 = __$ctx._mode;
                __$ctx._mode = "";
                var __r86 = __$ctx.ctx;
                __$ctx.ctx = [ 6, 7, 8, 9 ].map(function(v) {
                    return {
                        elem: "css",
                        url: this.ctx.url + ".ie" + v + ".css",
                        ie: "IE " + v
                    };
                }, __$ctx);
                $821(__$ctx);
                __$ctx._mode = __r85;
                __$ctx.ctx = __r86;
                "";
            }
            undefined;
        } else {
            var _$1phideRule = !_$1pie ? [ "gt IE 9", "<!-->", "<!--" ] : _$1pie === "!IE" ? [ _$1pie, "<!-->", "<!--" ] : [ _$1pie, "", "" ];
            {
                "";
                var __r87 = __$ctx._mode;
                __$ctx._mode = "";
                var __r88 = __$ctx.ctx, __r89 = __r88._ieCommented;
                __r88._ieCommented = true;
                var __r90 = __$ctx.ctx;
                __$ctx.ctx = [ "<!--[if " + _$1phideRule[0] + "]>", _$1phideRule[1], __$ctx.ctx, _$1phideRule[2], "<![endif]-->" ];
                $821(__$ctx);
                __$ctx._mode = __r87;
                __r88._ieCommented = __r89;
                __$ctx.ctx = __r90;
                "";
            }
            undefined;
        }
        return;
    }
    function $622(__$ctx) {
        if (!(__$ctx["__$anflg2"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $625(__$ctx);
            } else {
                return $828(__$ctx);
            }
        } else {
            return $828(__$ctx);
        }
    }
    function $625(__$ctx) {
        var __r69, __r70, __r71, __r72;
        var _$12ctx = __$ctx.ctx, _$12dtype = ("", __r69 = __$ctx._mode, __$ctx._mode = "doctype", __r70 = $792(__$ctx), __$ctx._mode = __r69, "", __r70), _$12xUA = ("", __r71 = __$ctx._mode, __$ctx._mode = "xUACompatible", __r72 = $776(__$ctx), __$ctx._mode = __r71, "", __r72), _$12buf = [ _$12dtype, {
            elem: "root",
            content: [ {
                elem: "head",
                content: [ {
                    tag: "meta",
                    attrs: {
                        charset: "utf-8"
                    }
                }, _$12xUA, {
                    tag: "title",
                    content: _$12ctx.title
                }, _$12ctx.favicon ? {
                    elem: "favicon",
                    url: _$12ctx.favicon
                } : "", _$12ctx.meta, {
                    block: "i-ua"
                }, _$12ctx.head ]
            }, _$12ctx ]
        } ];
        {
            "";
            var __r73 = __$ctx["__$anflg2"];
            __$ctx["__$anflg2"] = true;
            {
                "";
                var __r74 = __$ctx.ctx;
                __$ctx.ctx = _$12buf;
                var __r75 = __$ctx._mode;
                __$ctx._mode = "";
                $821(__$ctx);
                __$ctx.ctx = __r74;
                __$ctx._mode = __r75;
                "";
            }
            __$ctx["__$anflg2"] = __r73;
            "";
        }
        undefined;
        return;
    }
    function $632(__$ctx) {
        var __r65, __r66, __r67, __r68;
        if (!__$ctx.ctx) {
            return "";
        } else {
            undefined;
        }
        var _$zctx = __$ctx.ctx, _$zkeyset = _$zctx.keyset, _$zkey = _$zctx.key, _$zparams = _$zctx.params || {};
        if (!(_$zkeyset || _$zkey)) {
            return "";
        } else {
            undefined;
        }
        if (_$zctx.content) {
            var _$zcnt;
            _$zparams.content = (_$zcnt = [], "", __r65 = __$ctx._buf, __$ctx._buf = _$zcnt, __r66 = __$ctx._mode, __$ctx._mode = "", __r67 = __$ctx.ctx, __$ctx.ctx = _$zctx.content, __r68 = $821(__$ctx), __$ctx._buf = __r65, __$ctx._mode = __r66, __$ctx.ctx = __r67, "", __r68, _$zcnt.join(""));
        } else {
            undefined;
        }
        __$ctx._buf.push(BEM.I18N(_$zkeyset, _$zkey, _$zparams));
        return;
    }
    function $640(__$ctx) {
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
                    return $664(__$ctx);
                } else {
                    return $828(__$ctx);
                }
            }
        }
    }
    function $664(__$ctx) {
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
    function $680(__$ctx) {
        if (!(__$ctx["__$anflg3"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                var __r81, __r82;
                var _$1mmix = ("", __r81 = __$ctx["__$anflg3"], __$ctx["__$anflg3"] = true, __r82 = $680(__$ctx), __$ctx["__$anflg3"] = __r81, "", __r82) || [];
                _$1mmix.push({
                    block: "i-ua",
                    js: true
                });
                return _$1mmix;
                return;
            } else {
                return $686(__$ctx);
            }
        } else {
            return $686(__$ctx);
        }
    }
    function $686(__$ctx) {
        if (!!__$ctx.ctx._iGlobal === false) {
            if (!!__$ctx.elem === false) {
                return $689(__$ctx);
            } else {
                return $692(__$ctx);
            }
        } else {
            return $692(__$ctx);
        }
    }
    function $689(__$ctx) {
        var __r76, __r77, __r78, __r79, __r80;
        var _$1imix = ("", __r76 = __$ctx.ctx, __r77 = __r76._iGlobal, __r76._iGlobal = true, __r78 = $680(__$ctx), __r76._iGlobal = __r77, "", __r78), _$1ijsParams = ("", __r79 = __$ctx._mode, __$ctx._mode = "js-params", __r80 = $800(__$ctx), __$ctx._mode = __r79, "", __r80);
        _$1imix ? _$1imix.push(_$1ijsParams) : _$1imix = [ _$1ijsParams ];
        return _$1imix;
        return;
    }
    function $692(__$ctx) {
        if (!!__$ctx.elem === false) {
            return [ {
                elem: "body"
            } ];
            return;
        } else {
            return $698(__$ctx);
        }
    }
    function $698(__$ctx) {
        return undefined;
        return;
    }
    function $700(__$ctx) {
        if (!__$ctx.isSimple(__$ctx.ctx) === false) {
            if (!!__$ctx.elem === false) {
                return __$ctx.ctx;
                return;
            } else {
                return $706(__$ctx);
            }
        } else {
            return $706(__$ctx);
        }
    }
    function $706(__$ctx) {
        if (!__$ctx.ctx === false) {
            if (!!__$ctx.elem === false) {
                var _$2xvalue = [];
                {
                    "";
                    var __r138 = __$ctx._buf;
                    __$ctx._buf = _$2xvalue;
                    var __r139 = __$ctx._mode;
                    __$ctx._mode = "";
                    $821(__$ctx);
                    __$ctx._buf = __r138;
                    __$ctx._mode = __r139;
                    "";
                }
                undefined;
                return _$2xvalue.join("");
                return;
            } else {
                return $712(__$ctx);
            }
        } else {
            return $712(__$ctx);
        }
    }
    function $712(__$ctx) {
        if (!true === false) {
            if (!!__$ctx.elem === false) {
                return "";
                return;
            } else {
                return $828(__$ctx);
            }
        } else {
            return $828(__$ctx);
        }
    }
    function $749(__$ctx) {
        return undefined;
        return;
    }
    function $772(__$ctx) {
        return undefined;
        return;
    }
    function $776(__$ctx) {
        if (__$ctx.ctx["x-ua-compatible"] === false) {
            return false;
        } else {
            return {
                tag: "meta",
                attrs: {
                    "http-equiv": "X-UA-Compatible",
                    content: __$ctx.ctx["x-ua-compatible"] || "IE=edge"
                }
            };
        }
        return;
    }
    function $788(__$ctx) {
        return undefined;
        return;
    }
    function $792(__$ctx) {
        return __$ctx.ctx.doctype || "<!DOCTYPE html>";
        return;
    }
    function $800(__$ctx) {
        var __r56, __r57, __r58, __r59;
        var _$t_this = __$ctx["i-global"], _$tjs = {}, _$tblock = {
            block: "i-global",
            js: _$tjs
        }, _$te;
        for (_$te in _$t_this) {
            if (_$t_this.hasOwnProperty(_$te) && ("", __r56 = __$ctx._mode, __$ctx._mode = "public-params", __r57 = __$ctx.block, __$ctx.block = "i-global", __r58 = __$ctx.elem, __$ctx.elem = _$te, __r59 = $806(__$ctx), __$ctx._mode = __r56, __$ctx.block = __r57, __$ctx.elem = __r58, "", __r59)) {
                _$tjs[_$te] = _$t_this[_$te];
            } else {
                undefined;
            }
        }
        return _$tblock;
        return;
    }
    function $806(__$ctx) {
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
            return $828(__$ctx);
        }
    }
    function $814(__$ctx) {
        if (!!__$ctx.elem === false) {
            return {};
            return;
        } else {
            return $828(__$ctx);
        }
    }
    function $821(__$ctx) {
        if (!!__$ctx["i-global"] === false) {
            return $823(__$ctx);
        } else {
            return $828(__$ctx);
        }
    }
    function $823(__$ctx) {
        var __r49, __r50, __r51, __r52, __r53, __r54, __r55;
        var _$fps = {}, _$fes = [ "lang", "tld", "content-region", "click-host", "passport-host", "pass-host", "social-host", "export-host", "login", "lego-static-host" ], _$fe;
        while (_$fe = _$fes.shift()) {
            _$fps[_$fe] = ("", __r49 = __$ctx._mode, __$ctx._mode = "default", __r50 = __$ctx.block, __$ctx.block = "i-global", __r51 = __$ctx.elem, __$ctx.elem = _$fe, __r52 = $640(__$ctx), __$ctx._mode = __r49, __$ctx.block = __r50, __$ctx.elem = __r51, "", __r52);
        }
        __$ctx["i-global"] = __$ctx._.extend(_$fps, ("", __r53 = __$ctx._mode, __$ctx._mode = "env", __r54 = __$ctx.block, __$ctx.block = "i-global", __r55 = $814(__$ctx), __$ctx._mode = __r53, __$ctx.block = __r54, "", __r55));
        applyc(__$ctx);
        undefined;
        return;
    }
    function $828(__$ctx) {
        if (!__$ctx.ctx === false) {
            if (!__$ctx.ctx.link === false) {
                if (!!__$ctx._.isSimple(__$ctx.ctx) === false) {
                    return $832(__$ctx);
                } else {
                    return $837(__$ctx);
                }
            } else {
                return $837(__$ctx);
            }
        } else {
            return $837(__$ctx);
        }
    }
    function $832(__$ctx) {
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
    function $837(__$ctx) {
        if (!cache === false) {
            if (!__$ctx.ctx === false) {
                if (!__$ctx.ctx.cache === false) {
                    return $841(__$ctx);
                } else {
                    return $846(__$ctx);
                }
            } else {
                return $846(__$ctx);
            }
        } else {
            return $846(__$ctx);
        }
    }
    function $841(__$ctx) {
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
    function $846(__$ctx) {
        var __t = __$ctx._mode;
        if (__t === "default") {
            return $848(__$ctx);
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
                        return $857(__$ctx);
                    } else {
                        if (!true === false) {
                            return $860(__$ctx);
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
    function $848(__$ctx) {
        var __r20, __r8, __r12, __r13, __r14, __r15, __r16, __r17, __r18, __r19, __r9, __r21, __r22, __r23, __r26, __r27, __r28, __r29, __r30, __r31;
        var _$4_this = __$ctx, _$4BEM_ = _$4_this.BEM, _$4v = __$ctx.ctx, _$4buf = __$ctx._buf, _$4tag;
        _$4tag = ("", __r8 = __$ctx._mode, __$ctx._mode = "tag", __r9 = $174(__$ctx), __$ctx._mode = __r8, "", __r9);
        typeof _$4tag != "undefined" || (_$4tag = _$4v.tag);
        typeof _$4tag != "undefined" || (_$4tag = "div");
        if (_$4tag) {
            var _$4jsParams, _$4js;
            if (__$ctx.block && _$4v.js !== false) {
                _$4js = ("", __r12 = __$ctx._mode, __$ctx._mode = "js", __r13 = $261(__$ctx), __$ctx._mode = __r12, "", __r13);
                _$4js = _$4js ? __$ctx._.extend(_$4v.js, _$4js === true ? {} : _$4js) : _$4v.js === true ? {} : _$4v.js;
                _$4js && ((_$4jsParams = {})[_$4BEM_.INTERNAL.buildClass(__$ctx.block, _$4v.elem)] = _$4js);
            } else {
                undefined;
            }
            _$4buf.push("<", _$4tag);
            var _$4isBEM = ("", __r14 = __$ctx._mode, __$ctx._mode = "bem", __r15 = $300(__$ctx), __$ctx._mode = __r14, "", __r15);
            typeof _$4isBEM != "undefined" || (_$4isBEM = typeof _$4v.bem != "undefined" ? _$4v.bem : _$4v.block || _$4v.elem);
            var _$4cls = ("", __r16 = __$ctx._mode, __$ctx._mode = "cls", __r17 = $300(__$ctx), __$ctx._mode = __r16, "", __r17);
            _$4cls || (_$4cls = _$4v.cls);
            var _$4addJSInitClass = _$4v.block && _$4jsParams;
            if (_$4isBEM || _$4cls) {
                _$4buf.push(' class="');
                if (_$4isBEM) {
                    _$4BEM_.INTERNAL.buildClasses(__$ctx.block, _$4v.elem, _$4v.elemMods || _$4v.mods, _$4buf);
                    var _$4mix = ("", __r18 = __$ctx._mode, __$ctx._mode = "mix", __r19 = $284(__$ctx), __$ctx._mode = __r18, "", __r19);
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
                                var _$4nestedMix = ("", __r20 = __$ctx.block, __$ctx.block = _$4block, __r21 = __$ctx.elem, __$ctx.elem = _$4elem, __r22 = __$ctx._mode, __$ctx._mode = "mix", __r23 = $284(__$ctx), __$ctx.block = __r20, __$ctx.elem = __r21, __$ctx._mode = __r22, "", __r23);
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
                var _$4jsAttr = ("", __r26 = __$ctx._mode, __$ctx._mode = "jsAttr", __r27 = $300(__$ctx), __$ctx._mode = __r26, "", __r27);
                _$4buf.push(" ", _$4jsAttr || "onclick", '="return ', __$ctx._.attrEscape(JSON.stringify(_$4jsParams)), '"');
            } else {
                undefined;
            }
            var _$4attrs = ("", __r28 = __$ctx._mode, __$ctx._mode = "attrs", __r29 = $113(__$ctx), __$ctx._mode = __r28, "", __r29);
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
            var _$4content = ("", __r30 = __$ctx._mode, __$ctx._mode = "content", __r31 = $229(__$ctx), __$ctx._mode = __r30, "", __r31);
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
                    $300(__$ctx);
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
    function $857(__$ctx) {
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
                $300(__$ctx);
                __$ctx.ctx = __r7;
                "";
            }
            undefined;
        }
        _$1prevNotNewList || (__$ctx.position = _$1prevPos);
        return;
    }
    function $860(__$ctx) {
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
        (function(global, bem_) {
            if (bem_.I18N) {
                return undefined;
            } else {
                undefined;
            }
            global.BEM = bem_;
            var i18n = bem_.I18N = function(keyset, key) {
                return key;
            };
            i18n.keyset = function() {
                return i18n;
            };
            i18n.key = function(key) {
                return key;
            };
            i18n.lang = function() {
                return undefined;
            };
        })(this, typeof BEM === "undefined" ? {} : BEM);
    }();
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
typeof exports === "undefined" || (exports.BEMHTML = BEMHTML);