var BEMHTML = function() {
  var cache,
      exports = {},
      xjst = (function(exports) {
    function $1(__$ctx) {
        var __t = __$ctx._mode;
        if (__t === "default") {
            return $2(__$ctx);
        } else if (__t === "attrs") {
            return $122(__$ctx);
        } else if (__t === "tag") {
            return $189(__$ctx);
        } else if (__t === "value") {
            if (__$ctx.block === "tumbler") {
                if (__$ctx.elem === "option") {
                    return $239(__$ctx);
                } else {
                    return $315(__$ctx);
                }
            } else {
                return $315(__$ctx);
            }
        } else if (__t === "content") {
            return $244(__$ctx);
        } else if (__t === "js") {
            return $276(__$ctx);
        } else if (__t === "mix") {
            return $299(__$ctx);
        } else {
            return $315(__$ctx);
        }
    }
    function $2(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "i-jquery") {
            if (!(__$ctx["__$anflg32"] !== true) === false) {
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
            return $87(__$ctx);
        } else if (__t === "button") {
            return $101(__$ctx);
        } else if (__t === "select") {
            return $112(__$ctx);
        } else {
            return $315(__$ctx);
        }
    }
    function $6(__$ctx) {
        var __r210, __r214, __r211, __r212, __r213;
        return "", __r210 = __$ctx["__$anflg32"], __$ctx["__$anflg32"] = true, __r214 = ("", __r211 = __$ctx.ctx, __$ctx.ctx = {
            block: "b-page",
            elem: "js",
            url: __$ctx.ctx.url || (__$ctx.ctx.protocol ? __$ctx.ctx.protocol + ":" : "") + "//yastatic.net/jquery/" + __$ctx.mods.version + "/jquery.min.js"
        }, __r212 = __$ctx._mode, __$ctx._mode = "", __r213 = $870(__$ctx), __$ctx.ctx = __r211, __$ctx._mode = __r212, "", __r213), __$ctx["__$anflg32"] = __r210, "", __r214;
        return;
    }
    function $9(__$ctx) {
        if (!(__$ctx["__$anflg31"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $12(__$ctx);
            } else {
                return $315(__$ctx);
            }
        } else {
            return $315(__$ctx);
        }
    }
    function $12(__$ctx) {
        var __r205, __r209, __r206, __r207, __r208;
        return "", __r205 = __$ctx["__$anflg31"], __$ctx["__$anflg31"] = true, __r209 = ("", __r206 = __$ctx.ctx, __$ctx.ctx = {
            block: "b-page",
            elem: "js",
            url: __$ctx.ctx.url || (__$ctx.ctx.protocol ? __$ctx.ctx.protocol + ":" : "") + "//yastatic.net/jquery/" + __$ctx.mods.version + "/jquery.min.js"
        }, __r207 = __$ctx._mode, __$ctx._mode = "", __r208 = $870(__$ctx), __$ctx.ctx = __r206, __$ctx._mode = __r207, "", __r208), __$ctx["__$anflg31"] = __r205, "", __r209;
        return;
    }
    function $17(__$ctx) {
        if (__$ctx.elem === "option") {
            if (__$ctx.ctx.side === "left") {
                if (!(__$ctx["__$anflg28"] !== true) === false) {
                    {
                        "";
                        var __r198 = __$ctx["__$anflg28"];
                        __$ctx["__$anflg28"] = true;
                        {
                            "";
                            var __r199 = __$ctx.ctx;
                            __$ctx.ctx = [ __$ctx.ctx, {
                                elem: "box"
                            } ];
                            var __r200 = __$ctx._mode;
                            __$ctx._mode = "";
                            $870(__$ctx);
                            __$ctx.ctx = __r199;
                            __$ctx._mode = __r200;
                            "";
                        }
                        __$ctx["__$anflg28"] = __r198;
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
        if (!(__$ctx["__$anflg27"] !== true) === false) {
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
        var __r193, __r194;
        var _$4qvalue = ("", __r193 = __$ctx._mode, __$ctx._mode = "value", __r194 = $239(__$ctx), __$ctx._mode = __r193, "", __r194);
        {
            "";
            var __r195 = __$ctx["__$anflg27"];
            __$ctx["__$anflg27"] = true;
            {
                "";
                var __r196 = __$ctx.ctx;
                __$ctx.ctx = {
                    elem: "label",
                    content: [ {
                        elem: "input",
                        name: __$ctx._name,
                        value: _$4qvalue,
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
                var __r197 = __$ctx._mode;
                __$ctx._mode = "";
                $870(__$ctx);
                __$ctx.ctx = __r196;
                __$ctx._mode = __r197;
                "";
            }
            __$ctx["__$anflg27"] = __r195;
            "";
        }
        undefined;
        return;
    }
    function $32(__$ctx) {
        if ((__$ctx.ctx.mods || {}).disabled === "yes") {
            if (!(__$ctx["__$anflg25"] !== true) === false) {
                if (!!__$ctx.elem === false) {
                    {
                        "";
                        var __r189 = __$ctx["__$anflg25"];
                        __$ctx["__$anflg25"] = true;
                        {
                            "";
                            var __r190 = __$ctx._disabled;
                            __$ctx._disabled = "disabled";
                            $17(__$ctx);
                            __$ctx._disabled = __r190;
                            "";
                        }
                        __$ctx["__$anflg25"] = __r189;
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
            if (!(__$ctx["__$anflg24"] !== true) === false) {
                if (!!__$ctx.elem === false) {
                    {
                        "";
                        var __r187 = __$ctx["__$anflg24"];
                        __$ctx["__$anflg24"] = true;
                        {
                            "";
                            var __r188 = __$ctx._checked;
                            __$ctx._checked = "checked";
                            $17(__$ctx);
                            __$ctx._checked = __r188;
                            "";
                        }
                        __$ctx["__$anflg24"] = __r187;
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
        if (!(__$ctx["__$anflg23"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                if (!!(__$ctx.ctx.mods || {}).theme === false) {
                    {
                        "";
                        var __r184 = __$ctx["__$anflg23"];
                        __$ctx["__$anflg23"] = true;
                        {
                            "";
                            var __r185 = __$ctx.ctx, __r186 = __r185.mods;
                            __r185.mods = __$ctx._.extend(__$ctx.ctx.mods || {}, {
                                theme: "normal"
                            });
                            $17(__$ctx);
                            __r185.mods = __r186;
                            "";
                        }
                        __$ctx["__$anflg23"] = __r184;
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
        if (!(__$ctx["__$anflg22"] !== true) === false) {
            if (!true === false) {
                if (!!__$ctx.elem === false) {
                    return $63(__$ctx);
                } else {
                    return $315(__$ctx);
                }
            } else {
                return $315(__$ctx);
            }
        } else {
            return $315(__$ctx);
        }
    }
    function $63(__$ctx) {
        var _$4gid = __$ctx.generateId(), _$4gleftId = "left" + _$4gid, _$4grightId = "right" + _$4gid, _$4gsideId = null;
        if (__$ctx.ctx.content) {
            _$4gsideId = __$ctx.ctx.content[0].side === "left" ? _$4gleftId : _$4grightId;
        } else {
            undefined;
        }
        {
            "";
            var __r179 = __$ctx["__$anflg22"];
            __$ctx["__$anflg22"] = true;
            {
                "";
                var __r180 = __$ctx._name;
                __$ctx._name = __$ctx.ctx.name || (__$ctx.ctx.name = _$4gid);
                var __r181 = __$ctx._leftId;
                __$ctx._leftId = _$4gleftId;
                var __r182 = __$ctx._rightId;
                __$ctx._rightId = _$4grightId;
                var __r183 = __$ctx._sideId;
                __$ctx._sideId = _$4gsideId;
                $17(__$ctx);
                __$ctx._name = __r180;
                __$ctx._leftId = __r181;
                __$ctx._rightId = __r182;
                __$ctx._sideId = __r183;
                "";
            }
            __$ctx["__$anflg22"] = __r179;
            "";
        }
        return;
    }
    function $70(__$ctx) {
        if (!(__$ctx.mods && __$ctx.mods.pseudo === "yes") === false) {
            if (!!__$ctx.elem === false) {
                return $72(__$ctx);
            } else {
                return $79(__$ctx);
            }
        } else {
            return $79(__$ctx);
        }
    }
    function $72(__$ctx) {
        if (!!(__$ctx.ctx.mods || {}).theme === false) {
            {
                "";
                var __r175 = __$ctx.ctx, __r176 = __r175.mods;
                __r175.mods = __$ctx._.extend(__$ctx.ctx.mods || {}, {
                    theme: "pseudo"
                });
                $72(__$ctx);
                __r175.mods = __r176;
                "";
            }
            undefined;
            return;
        } else {
            return $79(__$ctx);
        }
    }
    function $79(__$ctx) {
        if (!(__$ctx["__$anflg20"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $82(__$ctx);
            } else {
                return $315(__$ctx);
            }
        } else {
            return $315(__$ctx);
        }
    }
    function $82(__$ctx) {
        var _$44ctx = __$ctx.ctx, _$44id = (_$44ctx.controlAttrs || {}).id || __$ctx.generateId(), _$44mods = _$44ctx.mods || {};
        _$44mods.theme = _$44mods.theme || "normal";
        {
            "";
            var __r172 = __$ctx["__$anflg20"];
            __$ctx["__$anflg20"] = true;
            {
                "";
                var __r173 = __$ctx._control;
                __$ctx._control = {
                    elem: "control",
                    attrs: _$44ctx.controlAttrs,
                    id: _$44id,
                    labelledby: "text" + _$44id,
                    name: _$44ctx.name,
                    tabindex: _$44ctx.tabindex,
                    checked: __$ctx.mods.checked,
                    disabled: __$ctx.mods.disabled,
                    value: _$44ctx.value || _$44ctx.content
                };
                var __r174 = _$44ctx.mods;
                _$44ctx.mods = _$44mods;
                $70(__$ctx);
                __$ctx._control = __r173;
                _$44ctx.mods = __r174;
                "";
            }
            __$ctx["__$anflg20"] = __r172;
            "";
        }
        undefined;
        return;
    }
    function $87(__$ctx) {
        if (!(__$ctx["__$anflg19"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $90(__$ctx);
            } else {
                return $93(__$ctx);
            }
        } else {
            return $93(__$ctx);
        }
    }
    function $90(__$ctx) {
        var _$41mods = __$ctx.ctx.mods || {};
        _$41mods.theme = _$41mods.theme || "normal";
        {
            "";
            var __r165 = __$ctx["__$anflg19"];
            __$ctx["__$anflg19"] = true;
            {
                "";
                var __r166 = __$ctx.ctx, __r167 = __r166.mods;
                __r166.mods = _$41mods;
                var __r168 = __$ctx._modsDisabled;
                __$ctx._modsDisabled = __$ctx.ctx.mods && __$ctx.ctx.mods.disabled;
                var __r169 = __$ctx._name;
                __$ctx._name = __$ctx.ctx.name;
                var __r170 = __$ctx._value;
                __$ctx._value = __$ctx.ctx.value;
                var __r171 = __$ctx._nextForChecked;
                __$ctx._nextForChecked = false;
                $87(__$ctx);
                __r166.mods = __r167;
                __$ctx._modsDisabled = __r168;
                __$ctx._name = __r169;
                __$ctx._value = __r170;
                __$ctx._nextForChecked = __r171;
                "";
            }
            __$ctx["__$anflg19"] = __r165;
            "";
        }
        undefined;
        return;
    }
    function $93(__$ctx) {
        if (__$ctx.elem === "radio") {
            if (!(__$ctx["__$anflg18"] !== true) === false) {
                return $96(__$ctx);
            } else {
                return $315(__$ctx);
            }
        } else {
            return $315(__$ctx);
        }
    }
    function $96(__$ctx) {
        var __r160, __r164, __r161, __r162, __r163;
        var _$3uctx = __$ctx.ctx, _$3uelemMods = _$3uctx.elemMods || {}, _$3uctxControlAttrs = _$3uctx.controlAttrs || {}, _$3uvaluesMatched = _$3uctxControlAttrs.value != undefined && _$3uctxControlAttrs.value == __$ctx._value, _$3ucontrolAttrs = __$ctx._.extend(_$3uctxControlAttrs, {
            checked: (_$3uvaluesMatched || _$3uelemMods.checked) && (__$ctx._nextForChecked = true),
            disabled: __$ctx._modsDisabled || _$3uelemMods.disabled
        });
        _$3ucontrolAttrs.id || (_$3ucontrolAttrs.id = __$ctx.generateId());
        return "", __r160 = __$ctx["__$anflg18"], __$ctx["__$anflg18"] = true, __r164 = ("", __r161 = __$ctx._controlAttrs, __$ctx._controlAttrs = _$3ucontrolAttrs, __r162 = __$ctx._valuesMatched, __$ctx._valuesMatched = _$3uvaluesMatched, __r163 = $87(__$ctx), __$ctx._controlAttrs = __r161, __$ctx._valuesMatched = __r162, "", __r163), __$ctx["__$anflg18"] = __r160, "", __r164;
        return;
    }
    function $101(__$ctx) {
        if (!(__$ctx["__$anflg17"] !== true) === false) {
            if (!__$ctx._formSelect === false) {
                if (!!__$ctx.elem === false) {
                    return $105(__$ctx);
                } else {
                    return $315(__$ctx);
                }
            } else {
                return $315(__$ctx);
            }
        } else {
            return $315(__$ctx);
        }
    }
    function $105(__$ctx) {
        var _$3qctx = __$ctx.ctx, _$3qselectMods = __$ctx._formSelect.mods, _$3qtabindex = __$ctx._formSelect.tabindex, _$3qm = _$3qctx.mods || {};
        _$3qm.arrow = "down";
        _$3qselectMods.theme && (_$3qm.theme = _$3qselectMods.theme);
        _$3qselectMods.size && (_$3qm.size = _$3qselectMods.size);
        _$3qselectMods.disabled === "yes" && (_$3qm.disabled = "yes");
        _$3qctx.mods = _$3qm;
        _$3qtabindex && (_$3qctx.tabindex = _$3qtabindex);
        {
            "";
            var __r157 = __$ctx["__$anflg17"];
            __$ctx["__$anflg17"] = true;
            {
                "";
                var __r158 = __$ctx.ctx, __r159 = __r158._theme;
                __r158._theme = true;
                $101(__$ctx);
                __r158._theme = __r159;
                "";
            }
            __$ctx["__$anflg17"] = __r157;
            "";
        }
        undefined;
        return;
    }
    function $112(__$ctx) {
        if (!(__$ctx["__$anflg15"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $115(__$ctx);
            } else {
                return $315(__$ctx);
            }
        } else {
            return $315(__$ctx);
        }
    }
    function $115(__$ctx) {
        var _$3hctx = __$ctx.ctx, _$3hid = _$3hctx.id || __$ctx.generateId();
        {
            "";
            var __r152 = __$ctx["__$anflg15"];
            __$ctx["__$anflg15"] = true;
            {
                "";
                var __r153 = __$ctx._controlAttrs;
                __$ctx._controlAttrs = {
                    id: _$3hid,
                    name: _$3hctx.name || _$3hid,
                    tabindex: _$3hctx.tabindex
                };
                var __r154 = __$ctx._formSelect;
                __$ctx._formSelect = {
                    block: __$ctx.block,
                    mods: __$ctx.mods,
                    tabindex: _$3hctx.tabindex
                };
                $112(__$ctx);
                __$ctx._controlAttrs = __r153;
                __$ctx._formSelect = __r154;
                "";
            }
            __$ctx["__$anflg15"] = __r152;
            "";
        }
        undefined;
        return;
    }
    function $122(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "tumbler") {
            var __t = __$ctx.elem;
            if (__t === "sticker") {
                return $124(__$ctx);
            } else if (__t === "text") {
                return $129(__$ctx);
            } else if (__t === "input") {
                var _$4uside = __$ctx.elemMods.side, _$4uchecked;
                if (_$4uside === "left") {
                    _$4uchecked = __$ctx._checked ? undefined : "checked";
                } else {
                    _$4uchecked = __$ctx._checked;
                }
                return {
                    type: "radio",
                    name: __$ctx.ctx.name,
                    value: __$ctx.ctx.value,
                    checked: _$4uchecked,
                    disabled: __$ctx.ctx.disabled,
                    "aria-labelledby": _$4uside === "left" ? __$ctx._leftId : __$ctx._rightId
                };
                return;
            } else if (__t === "button") {
                return $136(__$ctx);
            } else {
                return $315(__$ctx);
            }
        } else if (__t === "check-button") {
            var __t = __$ctx.elem;
            if (__t === "control") {
                return $147(__$ctx);
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
                    return $315(__$ctx);
                }
            }
        } else if (__t === "radio-button") {
            var __t = __$ctx.elem;
            if (__t === "control") {
                var _$40a = __$ctx._controlAttrs;
                if (!_$40a.disabled) {
                    delete _$40a.disabled;
                } else {
                    _$40a.disabled = "disabled";
                    _$40a.tabindex = "-1";
                }
                if (!_$40a.checked) {
                    delete _$40a.checked;
                } else {
                    _$40a.checked = "checked";
                }
                _$40a.type = "radio";
                _$40a.name = __$ctx._name;
                typeof _$40a.value === "undefined" && delete _$40a.value;
                return _$40a;
                return;
            } else if (__t === "radio") {
                return {
                    "for": __$ctx._controlAttrs.id
                };
                return;
            } else {
                return $315(__$ctx);
            }
        } else if (__t === "select") {
            var __t = __$ctx.elem;
            if (__t === "control") {
                var _$3tattrs = [ "id", "name", "tabindex" ], _$3tprop = {}, _$3tp;
                while (_$3tp = _$3tattrs.pop()) {
                    __$ctx._controlAttrs[_$3tp] && (_$3tprop[_$3tp] = __$ctx._controlAttrs[_$3tp]);
                }
                __$ctx.mods.disabled === "yes" && (_$3tprop.disabled = "disabled");
                _$3tprop.tabindex = -1;
                _$3tprop["aria-hidden"] = true;
                return __$ctx.ctx.controlAttrs || _$3tprop;
                return;
            } else if (__t === "item") {
                return $172(__$ctx);
            } else {
                return $315(__$ctx);
            }
        } else if (__t === "button") {
            return $179(__$ctx);
        } else {
            return $315(__$ctx);
        }
    }
    function $124(__$ctx) {
        if (!(__$ctx["__$anflg30"] !== true) === false) {
            var __r203, __r204;
            var _$4wa = ("", __r203 = __$ctx["__$anflg30"], __$ctx["__$anflg30"] = true, __r204 = $124(__$ctx), __$ctx["__$anflg30"] = __r203, "", __r204) || {};
            _$4wa["aria-hidden"] = true;
            return _$4wa;
            return;
        } else {
            return $315(__$ctx);
        }
    }
    function $129(__$ctx) {
        if (!(__$ctx["__$anflg29"] !== true) === false) {
            var __r201, __r202;
            var _$4va = ("", __r201 = __$ctx["__$anflg29"], __$ctx["__$anflg29"] = true, __r202 = $129(__$ctx), __$ctx["__$anflg29"] = __r201, "", __r202) || {};
            side = __$ctx.elemMods.side;
            _$4va.id = side === "left" ? __$ctx._leftId : __$ctx._rightId;
            _$4va["aria-hidden"] = true;
            return _$4va;
            return;
        } else {
            return $315(__$ctx);
        }
    }
    function $136(__$ctx) {
        if (!(__$ctx["__$anflg26"] !== true) === false) {
            if (!__$ctx._sideId === false) {
                var __r191, __r192;
                var _$4oa = ("", __r191 = __$ctx["__$anflg26"], __$ctx["__$anflg26"] = true, __r192 = $136(__$ctx), __$ctx["__$anflg26"] = __r191, "", __r192) || {};
                _$4oa["aria-labelledby"] = __$ctx._sideId;
                return _$4oa;
                return;
            } else {
                return $315(__$ctx);
            }
        } else {
            return $315(__$ctx);
        }
    }
    function $147(__$ctx) {
        if (!(__$ctx["__$anflg21"] !== true) === false) {
            if (!(__$ctx.mods && __$ctx.mods.pseudo === "yes") === false) {
                var __r177, __r178;
                var _$4da = ("", __r177 = __$ctx["__$anflg21"], __$ctx["__$anflg21"] = true, __r178 = $147(__$ctx), __$ctx["__$anflg21"] = __r177, "", __r178);
                _$4da.value = "";
                return _$4da;
                return;
            } else {
                return $154(__$ctx);
            }
        } else {
            return $154(__$ctx);
        }
    }
    function $154(__$ctx) {
        var _$4bctx = __$ctx.ctx, _$4ba = {
            type: "checkbox"
        }, _$4bprops = [ "tabindex", "name", "value", "id" ], _$4bp;
        while (_$4bp = _$4bprops.pop()) {
            _$4bctx[_$4bp] && (_$4ba[_$4bp] = _$4bctx[_$4bp]);
        }
        _$4bctx.checked && (_$4ba.checked = "checked");
        _$4bctx.disabled && (_$4ba.disabled = "disabled");
        _$4ba["aria-lebelledby"] = _$4bctx.labelledby;
        return _$4ba;
        return;
    }
    function $172(__$ctx) {
        if (!(__$ctx["__$anflg16"] !== true) === false) {
            var __r155, __r156;
            var _$3oa = ("", __r155 = __$ctx["__$anflg16"], __$ctx["__$anflg16"] = true, __r156 = $172(__$ctx), __$ctx["__$anflg16"] = __r155, "", __r156) || {};
            if ((__$ctx.ctx.elemMods || {}).label === "yes") {
                _$3oa.id = __$ctx._labelId;
                _$3oa["aria-hidden"] = true;
            } else {
                undefined;
            }
            return _$3oa;
            return;
        } else {
            return {
                id: __$ctx.generateId()
            };
            return;
        }
    }
    function $179(__$ctx) {
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
                return $315(__$ctx);
            }
        } else {
            return $315(__$ctx);
        }
    }
    function $189(__$ctx) {
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
                    return $315(__$ctx);
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
                    return $315(__$ctx);
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
                    return $315(__$ctx);
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
                    return $315(__$ctx);
                }
            }
        } else {
            return $315(__$ctx);
        }
    }
    function $239(__$ctx) {
        return __$ctx.ctx.value || __$ctx.ctx.side !== "left";
        return;
    }
    function $244(__$ctx) {
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
                        return $254(__$ctx);
                    }
                } else {
                    return $254(__$ctx);
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
                return $315(__$ctx);
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
                return $315(__$ctx);
            }
        } else if (__t === "popup") {
            if (!!__$ctx.elem === false) {
                return [ {
                    elem: "under",
                    mods: __$ctx.ctx.underMods
                }, __$ctx.ctx.content ];
                return;
            } else {
                return $315(__$ctx);
            }
        } else {
            return $315(__$ctx);
        }
    }
    function $254(__$ctx) {
        if (!(__$ctx._.isArray(__$ctx.ctx.content) && __$ctx.ctx.content.length === 1) === false) {
            var _$4kcontent = __$ctx.ctx.content;
            if (_$4kcontent[0].side !== "left") {
                return [ {
                    elem: "option",
                    side: "left"
                }, _$4kcontent ];
            } else {
                undefined;
            }
            return [ _$4kcontent, {
                elem: "option",
                side: "right"
            } ];
            return;
        } else {
            return $315(__$ctx);
        }
    }
    function $276(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "tumbler" || __t === "check-button" || __t === "radio-button" || __t === "select") {
            if (!!__$ctx.elem === false) {
                return true;
                return;
            } else {
                return $315(__$ctx);
            }
        } else {
            return $315(__$ctx);
        }
    }
    function $299(__$ctx) {
        var __t = __$ctx.block;
        if (__t === "radio-button") {
            if (__$ctx.elem === "radio") {
                return $302(__$ctx);
            } else {
                return $315(__$ctx);
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
                    return $315(__$ctx);
                }
            } else {
                return $315(__$ctx);
            }
        } else {
            return $315(__$ctx);
        }
    }
    function $302(__$ctx) {
        var _$3xcontrolAttrs = __$ctx._controlAttrs, _$3xelemMods = {}, _$3xside = (__$ctx.ctx.mods || {}).side;
        if (!_$3xside) {
            _$3xside = __$ctx.isFirst() ? __$ctx.isLast() ? "both" : "left" : __$ctx.isLast() ? "right" : "";
        } else {
            undefined;
        }
        _$3xside && (_$3xelemMods.side = _$3xside);
        __$ctx._nextForChecked && !_$3xcontrolAttrs.checked && (__$ctx._nextForChecked = null, _$3xelemMods["next-for-pressed"] = "yes");
        __$ctx._modsDisabled && (_$3xelemMods.disabled = "yes");
        __$ctx._valuesMatched && (_$3xelemMods.checked = "yes");
        _$3xcontrolAttrs.checked && (_$3xelemMods.pressed = "yes");
        return [ {
            elemMods: _$3xelemMods
        } ];
        return;
    }
    function $315(__$ctx) {
        if (__$ctx.block === "popup") {
            if (!!__$ctx.ctx._defaults === false) {
                if (!!__$ctx.elem === false) {
                    return $319(__$ctx);
                } else {
                    return $324(__$ctx);
                }
            } else {
                return $324(__$ctx);
            }
        } else {
            return $324(__$ctx);
        }
    }
    function $319(__$ctx) {
        __$ctx.ctx.mods = __$ctx._.extend({
            theme: "ffffff",
            autoclosable: "yes",
            adaptive: "yes",
            animate: "yes"
        }, __$ctx.ctx.mods);
        if (__$ctx.ctx.zIndex) {
            var _$3fattrs = __$ctx.ctx.attrs || (__$ctx.ctx.attrs = {});
            _$3fattrs.style = (_$3fattrs.style || "") + ";z-index:" + __$ctx.ctx.zIndex + ";";
        } else {
            undefined;
        }
        {
            "";
            var __r150 = __$ctx.ctx, __r151 = __r150._defaults;
            __r150._defaults = true;
            $1(__$ctx);
            __r150._defaults = __r151;
            "";
        }
        undefined;
        return;
    }
    function $324(__$ctx) {
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
                        return $399(__$ctx);
                    }
                } else if (__t === "clear") {
                    if (!!__$ctx.ctx.content === false) {
                        return "";
                        return;
                    } else {
                        return $399(__$ctx);
                    }
                } else if (__t === "ahead") {
                    return [ {
                        elem: "ahead-filler"
                    }, {
                        elem: "ahead-hint"
                    } ];
                    return;
                } else {
                    return $399(__$ctx);
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
                    return $399(__$ctx);
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
                    return $399(__$ctx);
                }
            } else if (__t === "button") {
                if (__$ctx.elem === "text") {
                    if (!(__$ctx.mods && __$ctx.mods["only-icon"] === "yes") === false) {
                        return [ "&#160;", __$ctx.ctx.content ];
                        return;
                    } else {
                        return $357(__$ctx);
                    }
                } else {
                    return $357(__$ctx);
                }
            } else if (__t === "link") {
                if (!(__$ctx.mods && __$ctx.mods.pseudo === "yes") === false) {
                    if (!!__$ctx.ctx._wrap === false) {
                        if (!!__$ctx.elem === false) {
                            if (!!__$ctx.mods.inner === false) {
                                {
                                    "";
                                    var __r98 = __$ctx._mode;
                                    __$ctx._mode = "";
                                    var __r99 = __$ctx.ctx;
                                    __$ctx.ctx = {
                                        elem: "inner",
                                        content: __$ctx.ctx.content,
                                        _wrap: true
                                    };
                                    $870(__$ctx);
                                    __$ctx._mode = __r98;
                                    __$ctx.ctx = __r99;
                                    "";
                                }
                                undefined;
                                return;
                            } else {
                                return $399(__$ctx);
                            }
                        } else {
                            return $399(__$ctx);
                        }
                    } else {
                        return $399(__$ctx);
                    }
                } else {
                    return $399(__$ctx);
                }
            } else if (__t === "b-page") {
                if (!!__$ctx.elem === false) {
                    return {
                        elem: "body",
                        content: __$ctx.ctx.content
                    };
                    return;
                } else {
                    return $399(__$ctx);
                }
            } else if (__t === "i-ua") {
                return $387(__$ctx);
            } else {
                return $399(__$ctx);
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
                    return $741(__$ctx);
                }
            } else if (__t === "radiobox") {
                if (__$ctx.elem === "radio") {
                    var _$2selemMods = {};
                    __$ctx._modsDisabled && (_$2selemMods.disabled = "yes");
                    __$ctx._valuesMatched && (_$2selemMods.checked = "yes");
                    return [ {
                        elemMods: _$2selemMods
                    } ];
                    return;
                } else {
                    return $741(__$ctx);
                }
            } else if (__t === "b-page") {
                return $723(__$ctx);
            } else {
                return $741(__$ctx);
            }
        } else if (__t === "value") {
            if (__$ctx.block === "input") {
                return $743(__$ctx);
            } else {
                return $877(__$ctx);
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
                    return $798(__$ctx);
                }
            } else if (__t === "radiobox" || __t === "checkbox" || __t === "button") {
                if (!!__$ctx.elem === false) {
                    return true;
                    return;
                } else {
                    return $798(__$ctx);
                }
            } else if (__t === "link") {
                if (!(__$ctx.mods && __$ctx.mods.pseudo === "yes") === false) {
                    if (!!__$ctx.elem === false) {
                        return true;
                        return;
                    } else {
                        return $792(__$ctx);
                    }
                } else {
                    return $792(__$ctx);
                }
            } else {
                return $798(__$ctx);
            }
        } else if (__t === "bem") {
            var __t = __$ctx.block;
            if (__t === "b-page") {
                var __t = __$ctx.elem;
                if (__t === "js" || __t === "css" || __t === "favicon" || __t === "meta" || __t === "head" || __t === "root") {
                    return false;
                    return;
                } else {
                    return $821(__$ctx);
                }
            } else if (__t === "i-ua") {
                if (!!__$ctx.elem === false) {
                    return false;
                    return;
                } else {
                    return $821(__$ctx);
                }
            } else {
                return $821(__$ctx);
            }
        } else if (__t === "default") {
            var __t = __$ctx.block;
            if (__t === "input") {
                return $594(__$ctx);
            } else if (__t === "radiobox") {
                return $611(__$ctx);
            } else if (__t === "checkbox") {
                return $625(__$ctx);
            } else if (__t === "button") {
                if (!(__$ctx["__$anflg9"] !== true) === false) {
                    if (!(__$ctx.mods && __$ctx.mods.round === "yes") === false) {
                        if (!!__$ctx.elem === false) {
                            if (!!(__$ctx.ctx.mods || {})["only-icon"] === false) {
                                return $638(__$ctx);
                            } else {
                                return $645(__$ctx);
                            }
                        } else {
                            return $645(__$ctx);
                        }
                    } else {
                        return $645(__$ctx);
                    }
                } else {
                    return $645(__$ctx);
                }
            } else if (__t === "b-page") {
                if (__$ctx.elem === "css") {
                    if (!__$ctx.ctx.hasOwnProperty("ie") === false) {
                        if (!!__$ctx.ctx._ieCommented === false) {
                            return $657(__$ctx);
                        } else {
                            return $662(__$ctx);
                        }
                    } else {
                        return $662(__$ctx);
                    }
                } else {
                    return $662(__$ctx);
                }
            } else if (__t === "i-bem") {
                if (__$ctx.elem === "i18n") {
                    return $672(__$ctx);
                } else {
                    return $877(__$ctx);
                }
            } else if (__t === "i-jquery") {
                if (__$ctx.elem === "core") {
                    if (!(__$ctx["__$anflg2"] !== true) === false) {
                        return $678(__$ctx);
                    } else {
                        return $877(__$ctx);
                    }
                } else {
                    return $877(__$ctx);
                }
            } else if (__t === "i-global") {
                return $683(__$ctx);
            } else {
                return $877(__$ctx);
            }
        } else if (__t === "cls") {
            if (__$ctx.block === "b-page") {
                if (__$ctx.elem === "root") {
                    return "i-ua_js_no i-ua_css_standard";
                    return;
                } else {
                    return $837(__$ctx);
                }
            } else {
                return $837(__$ctx);
            }
        } else if (__t === "doctype") {
            if (__$ctx.block === "b-page") {
                if (!!__$ctx.elem === false) {
                    return $841(__$ctx);
                } else {
                    return $877(__$ctx);
                }
            } else {
                return $877(__$ctx);
            }
        } else if (__t === "js-params") {
            if (__$ctx.block === "b-page") {
                if (!!__$ctx.elem === false) {
                    return $849(__$ctx);
                } else {
                    return $877(__$ctx);
                }
            } else {
                return $877(__$ctx);
            }
        } else if (__t === "public-params") {
            if (__$ctx.block === "i-global") {
                return $855(__$ctx);
            } else {
                return $877(__$ctx);
            }
        } else if (__t === "env") {
            if (__$ctx.block === "i-global") {
                return $863(__$ctx);
            } else {
                return $877(__$ctx);
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
                        return $592(__$ctx);
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
                        return $592(__$ctx);
                    }
                }
            } else if (__t === "checkbox") {
                var __t = __$ctx.elem;
                if (__t === "label") {
                    return "label";
                    return;
                } else if (__t === "control") {
                    return "input";
                    return;
                } else {
                    if (!!__$ctx.elem === false) {
                        return "span";
                        return;
                    } else {
                        return $592(__$ctx);
                    }
                }
            } else if (__t === "image") {
                if (!!__$ctx.elem === false) {
                    return "img";
                    return;
                } else {
                    return $592(__$ctx);
                }
            } else if (__t === "button") {
                if (!__$ctx.ctx.url === false) {
                    if (!!__$ctx.elem === false) {
                        return "a";
                        return;
                    } else {
                        return $550(__$ctx);
                    }
                } else {
                    return $550(__$ctx);
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
                        return $592(__$ctx);
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
                        return $592(__$ctx);
                    }
                }
            } else if (__t === "i-ua") {
                if (!!__$ctx.elem === false) {
                    return "script";
                    return;
                } else {
                    return $592(__$ctx);
                }
            } else {
                return $592(__$ctx);
            }
        } else if (__t === "") {
            return $870(__$ctx);
        } else if (__t === "attrs") {
            var __t = __$ctx.block;
            if (__t === "input") {
                var __t = __$ctx.elem;
                if (__t === "control") {
                    if (!(__$ctx.mods && __$ctx.mods.type === "textarea") === false) {
                        return $403(__$ctx);
                    } else {
                        return $409(__$ctx);
                    }
                } else if (__t === "clear") {
                    return {
                        unselectable: "on"
                    };
                    return;
                } else {
                    return $500(__$ctx);
                }
            } else if (__t === "radiobox") {
                var __t = __$ctx.elem;
                if (__t === "control") {
                    var _$2va = __$ctx._controlAttrs;
                    if (!_$2va.disabled) {
                        delete _$2va.disabled;
                    } else {
                        _$2va.disabled = "disabled";
                        _$2va.tabindex = "-1";
                    }
                    if (!_$2va.checked) {
                        delete _$2va.checked;
                    } else {
                        _$2va.checked = "checked";
                    }
                    _$2va.type = "radio";
                    _$2va.name = __$ctx._name;
                    typeof _$2va.value === "undefined" && delete _$2va.value;
                    return _$2va;
                    return;
                } else if (__t === "radio") {
                    return {
                        "for": __$ctx._controlAttrs.id
                    };
                    return;
                } else {
                    return $500(__$ctx);
                }
            } else if (__t === "checkbox") {
                var __t = __$ctx.elem;
                if (__t === "label") {
                    var _$2la = __$ctx.ctx.attrs || {};
                    _$2la["for"] = __$ctx._checkboxAttrs.id;
                    _$2la.id = __$ctx._labelId;
                    _$2la["aria-hidden"] = true;
                    return _$2la;
                    return;
                } else if (__t === "control") {
                    var _$2ja = __$ctx.ctx.attrs || {};
                    _$2ja.id = __$ctx._checkboxAttrs.id;
                    _$2ja.type = "checkbox";
                    __$ctx.mods.disabled && (_$2ja.disabled = "disabled");
                    __$ctx.mods.checked == "yes" && (_$2ja.checked = "checked");
                    _$2ja["aria-labelledby"] = __$ctx._labelId;
                    return _$2ja;
                    return;
                } else {
                    return $500(__$ctx);
                }
            } else if (__t === "image") {
                if (!!__$ctx.elem === false) {
                    var _$2cctx = __$ctx.ctx, _$2ca = {
                        src: "//yastatic.net/lego/_/La6qi18Z8LwgnZdsAr1qy1GwCwo.gif",
                        alt: ""
                    }, _$2cprops = [ "alt", "width", "height" ], _$2cp;
                    _$2cctx.url && (_$2ca.src = _$2cctx.url);
                    while (_$2cp = _$2cprops.shift()) {
                        _$2cctx[_$2cp] && (_$2ca[_$2cp] = _$2cctx[_$2cp]);
                    }
                    return _$2ca;
                    return;
                } else {
                    return $500(__$ctx);
                }
            } else if (__t === "button") {
                if (!(__$ctx["__$anflg8"] !== true) === false) {
                    if (!__$ctx.ctx.url === false) {
                        if (!!__$ctx.elem === false) {
                            var __r105, __r106;
                            var _$27ctx = __$ctx.ctx, _$27p = ("", __r105 = __$ctx["__$anflg8"], __$ctx["__$anflg8"] = true, __r106 = $179(__$ctx), __$ctx["__$anflg8"] = __r105, "", __r106), _$27a = {
                                href: _$27ctx.url
                            };
                            _$27ctx.target && (_$27a.target = _$27ctx.target);
                            __$ctx.mods.disabled && (_$27a["aria-disabled"] = true);
                            return __$ctx._.extend(_$27p, _$27a);
                            return;
                        } else {
                            return $442(__$ctx);
                        }
                    } else {
                        return $442(__$ctx);
                    }
                } else {
                    return $442(__$ctx);
                }
            } else if (__t === "link") {
                return $459(__$ctx);
            } else if (__t === "b-page") {
                var __t = __$ctx.elem;
                if (__t === "js") {
                    if (!__$ctx.ctx.url === false) {
                        return {
                            src: __$ctx.ctx.url
                        };
                        return;
                    } else {
                        return $500(__$ctx);
                    }
                } else if (__t === "css") {
                    if (!__$ctx.ctx.url === false) {
                        return {
                            rel: "stylesheet",
                            href: __$ctx.ctx.url
                        };
                        return;
                    } else {
                        return $500(__$ctx);
                    }
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
                    return $500(__$ctx);
                }
            } else {
                return $500(__$ctx);
            }
        } else if (__t === "jsAttr") {
            return undefined;
            return;
        } else if (__t === "xUACompatible") {
            if (__$ctx.block === "b-page") {
                if (!!__$ctx.elem === false) {
                    return $825(__$ctx);
                } else {
                    return $877(__$ctx);
                }
            } else {
                return $877(__$ctx);
            }
        } else {
            return $877(__$ctx);
        }
    }
    function $357(__$ctx) {
        if (!(__$ctx.mods && __$ctx.mods.round === "yes") === false) {
            if (!!__$ctx.elem === false) {
                return {
                    block: "image",
                    mix: [ {
                        block: "button",
                        elem: "icon"
                    } ],
                    alt: ""
                };
                return;
            } else {
                return $363(__$ctx);
            }
        } else {
            return $363(__$ctx);
        }
    }
    function $363(__$ctx) {
        if (!!__$ctx.elem === false) {
            return {
                elem: "text",
                tag: "span",
                content: __$ctx.ctx.content
            };
            return;
        } else {
            return $399(__$ctx);
        }
    }
    function $387(__$ctx) {
        if (!(__$ctx["__$anflg1"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                var __r60, __r61;
                var _$xc = ("", __r60 = __$ctx["__$anflg1"], __$ctx["__$anflg1"] = true, __r61 = $387(__$ctx), __$ctx["__$anflg1"] = __r60, "", __r61);
                _$xc += [ ";(function(d,e,c,r,n,w,v,f){", "e=d.documentElement;", 'c="className";', 'r="replace";', 'n="createElementNS";', 'f="firstChild";', 'w="http://www.w3.org/2000/svg";', 'e[c]+=" i-ua_svg_"+(!!d[n]&&!!d[n](w,"svg").createSVGRect?"yes":"no");', 'v=d.createElement("div");', 'v.innerHTML="<svg/>";', 'e[c]+=" i-ua_inlinesvg_"+((v[f]&&v[f].namespaceURI)==w?"yes":"no");', "})(document);" ].join("");
                return _$xc;
                return;
            } else {
                return $393(__$ctx);
            }
        } else {
            return $393(__$ctx);
        }
    }
    function $393(__$ctx) {
        if (!!__$ctx.elem === false) {
            return [ ";(function(d,e,c,r){", "e=d.documentElement;", 'c="className";', 'r="replace";', 'e[c]=e[c][r]("i-ua_js_no","i-ua_js_yes");', 'if(d.compatMode!="CSS1Compat")', 'e[c]=e[c][r]("i-ua_css_standart","i-ua_css_quirks")', "})(document);" ].join("");
            return;
        } else {
            return $399(__$ctx);
        }
    }
    function $399(__$ctx) {
        return __$ctx.ctx.content;
        return;
    }
    function $403(__$ctx) {
        if (!!__$ctx._baseAttrsApplyed === false) {
            var __r147, __r148, __r149;
            var _$3da = ("", __r147 = __$ctx._value, __$ctx._value = null, __r148 = __$ctx._baseAttrsApplyed, __$ctx._baseAttrsApplyed = true, __r149 = $403(__$ctx), __$ctx._value = __r147, __$ctx._baseAttrsApplyed = __r148, "", __r149);
            return __$ctx._.extend(_$3da, {
                rows: 10,
                cols: 10
            });
            return;
        } else {
            return $409(__$ctx);
        }
    }
    function $409(__$ctx) {
        var _$37a = __$ctx._.extend({
            id: __$ctx._inputId,
            name: __$ctx._name
        }, __$ctx.ctx.controlAttrs);
        (__$ctx._value || __$ctx._value === 0) && (_$37a.value = __$ctx._value);
        __$ctx.mods.disabled && (_$37a.disabled = "disabled");
        _$37a["aria-labelledby"] = __$ctx._labelId + " " + __$ctx._hintId;
        return _$37a;
        return;
    }
    function $442(__$ctx) {
        if (!(__$ctx["__$anflg7"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                if (!!__$ctx.ctx.url === false) {
                    return $446(__$ctx);
                } else {
                    return $451(__$ctx);
                }
            } else {
                return $451(__$ctx);
            }
        } else {
            return $451(__$ctx);
        }
    }
    function $446(__$ctx) {
        var __r103, __r104;
        var _$26ctx = __$ctx.ctx, _$26p = ("", __r103 = __$ctx["__$anflg7"], __$ctx["__$anflg7"] = true, __r104 = $179(__$ctx), __$ctx["__$anflg7"] = __r103, "", __r104), _$26a = {
            type: _$26ctx.type || "button"
        }, _$26props = [ "name", "value" ], _$26i;
        while (_$26i = _$26props.shift()) {
            _$26ctx[_$26i] && (_$26a[_$26i] = _$26ctx[_$26i]);
        }
        __$ctx.mods.disabled && (_$26a.disabled = "disabled");
        return __$ctx._.extend(_$26p, _$26a);
        return;
    }
    function $451(__$ctx) {
        if (!true === false) {
            if (!!__$ctx.elem === false) {
                var _$25ctx = __$ctx.ctx, _$25a = {
                    role: "button"
                };
                _$25ctx.tabindex && (_$25a.tabindex = _$25ctx.tabindex);
                return _$25a;
                return;
            } else {
                return $500(__$ctx);
            }
        } else {
            return $500(__$ctx);
        }
    }
    function $459(__$ctx) {
        if (!(__$ctx.mods && __$ctx.mods.pseudo === "yes") === false) {
            if (!!__$ctx.elem === false) {
                if (!!__$ctx.ctx.url === false) {
                    var _$1zdisabled = (__$ctx.ctx.mods || {}).disabled === "yes", _$1za = {
                        role: "button",
                        tabindex: 0
                    };
                    if (_$1zdisabled) {
                        _$1za["aria-disabled"] = true;
                        delete _$1za.tabindex;
                    } else {
                        undefined;
                    }
                    return _$1za;
                    return;
                } else {
                    return $468(__$ctx);
                }
            } else {
                return $468(__$ctx);
            }
        } else {
            return $468(__$ctx);
        }
    }
    function $468(__$ctx) {
        if (!(__$ctx["__$anflg5"] !== true) === false) {
            if (!(__$ctx.mods && __$ctx.mods.disabled === "yes") === false) {
                if (!!__$ctx.elem === false) {
                    var __r96, __r97;
                    var _$1wattrs = ("", __r96 = __$ctx["__$anflg5"], __$ctx["__$anflg5"] = true, __r97 = $459(__$ctx), __$ctx["__$anflg5"] = __r96, "", __r97) || {};
                    _$1wattrs.tabindex = -1;
                    _$1wattrs["aria-disabled"] = true;
                    return _$1wattrs;
                    return;
                } else {
                    return $477(__$ctx);
                }
            } else {
                return $477(__$ctx);
            }
        } else {
            return $477(__$ctx);
        }
    }
    function $477(__$ctx) {
        if (!!__$ctx.elem === false) {
            return $479(__$ctx);
        } else {
            return $500(__$ctx);
        }
    }
    function $479(__$ctx) {
        var _$1vctx = __$ctx.ctx, _$1vattrs = {};
        [ "title", "target", "id", "tabindex" ].forEach(function(param) {
            if (_$1vctx.hasOwnProperty(param)) {
                _$1vattrs[param] = String(_$1vctx[param]);
            } else {
                undefined;
            }
        });
        if (_$1vctx.url !== null && typeof _$1vctx.url !== "undefined") {
            if (__$ctx.isSimple(_$1vctx.url)) {
                _$1vattrs.href = String(_$1vctx.url);
            } else {
                var _$1vbuf = [];
                {
                    "";
                    var __r93 = __$ctx._mode;
                    __$ctx._mode = "";
                    var __r94 = __$ctx._buf;
                    __$ctx._buf = _$1vbuf;
                    var __r95 = __$ctx.ctx;
                    __$ctx.ctx = _$1vctx.url;
                    $870(__$ctx);
                    __$ctx._mode = __r93;
                    __$ctx._buf = __r94;
                    __$ctx.ctx = __r95;
                    "";
                }
                undefined;
                _$1vattrs.href = _$1vbuf.join("");
            }
        } else {
            _$1vattrs.role = "button";
            if (!_$1vattrs.tabindex) {
                _$1vattrs.tabindex = "0";
            } else {
                undefined;
            }
        }
        return _$1vattrs;
        return;
    }
    function $500(__$ctx) {
        return undefined;
        return;
    }
    function $550(__$ctx) {
        if (!!__$ctx.elem === false) {
            return "button";
            return;
        } else {
            return $592(__$ctx);
        }
    }
    function $592(__$ctx) {
        return undefined;
        return;
    }
    function $594(__$ctx) {
        if (__$ctx.elem === "control") {
            if (!(__$ctx["__$anflg14"] !== true) === false) {
                if (!!__$ctx.mods.clear === false) {
                    return $598(__$ctx);
                } else {
                    return $603(__$ctx);
                }
            } else {
                return $603(__$ctx);
            }
        } else {
            return $603(__$ctx);
        }
    }
    function $598(__$ctx) {
        {
            "";
            var __r144 = __$ctx["__$anflg14"];
            __$ctx["__$anflg14"] = true;
            {
                "";
                var __r145 = __$ctx.ctx;
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
                var __r146 = __$ctx._mode;
                __$ctx._mode = "";
                $870(__$ctx);
                __$ctx.ctx = __r145;
                __$ctx._mode = __r146;
                "";
            }
            __$ctx["__$anflg14"] = __r144;
            "";
        }
        undefined;
        return;
    }
    function $603(__$ctx) {
        if (!(__$ctx["__$anflg13"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $606(__$ctx);
            } else {
                return $877(__$ctx);
            }
        } else {
            return $877(__$ctx);
        }
    }
    function $606(__$ctx) {
        var __r129, __r130, __r131;
        var _$2yvalue = ("", __r129 = __$ctx._mode, __$ctx._mode = "value", __r130 = __$ctx.ctx, __$ctx.ctx = __$ctx.ctx.value, __r131 = $743(__$ctx), __$ctx._mode = __r129, __$ctx.ctx = __r130, "", __r131), _$2yid = __$ctx.ctx.id || __$ctx.generateId(), _$2ymods = __$ctx.ctx.mods || {};
        _$2ymods.theme = _$2ymods.theme || "normal";
        {
            "";
            var __r132 = __$ctx["__$anflg13"];
            __$ctx["__$anflg13"] = true;
            {
                "";
                var __r133 = __$ctx._inputId;
                __$ctx._inputId = _$2yid;
                var __r134 = __$ctx._labelId;
                __$ctx._labelId = "label" + _$2yid;
                var __r135 = __$ctx._hintId;
                __$ctx._hintId = "hint" + _$2yid;
                var __r136 = __$ctx._name;
                __$ctx._name = __$ctx.ctx.name || "";
                var __r137 = __$ctx._value;
                __$ctx._value = _$2yvalue;
                var __r138 = __$ctx._inputLink;
                __$ctx._inputLink = true;
                var __r139 = __$ctx._disabled;
                __$ctx._disabled = __$ctx.mods.disabled;
                var __r140 = __$ctx.ctx, __r141 = __r140.mods;
                __r140.mods = _$2ymods;
                $594(__$ctx);
                __$ctx._inputId = __r133;
                __$ctx._labelId = __r134;
                __$ctx._hintId = __r135;
                __$ctx._name = __r136;
                __$ctx._value = __r137;
                __$ctx._inputLink = __r138;
                __$ctx._disabled = __r139;
                __r140.mods = __r141;
                "";
            }
            __$ctx["__$anflg13"] = __r132;
            "";
        }
        undefined;
        return;
    }
    function $611(__$ctx) {
        if (__$ctx.elem === "radio") {
            return $612(__$ctx);
        } else {
            return $617(__$ctx);
        }
    }
    function $612(__$ctx) {
        if (!(__$ctx["__$anflg12"] !== true) === false) {
            return $614(__$ctx);
        } else {
            return $617(__$ctx);
        }
    }
    function $614(__$ctx) {
        var __r124, __r128, __r125, __r126, __r127;
        var _$2pctx = __$ctx.ctx, _$2pelemMods = _$2pctx.elemMods || {}, _$2pctxControlAttrs = _$2pctx.controlAttrs || {}, _$2pvaluesMatched = _$2pctxControlAttrs.value != undefined && _$2pctxControlAttrs.value == __$ctx._value, _$2pcontrolAttrs = __$ctx._.extend(_$2pctxControlAttrs, {
            checked: _$2pvaluesMatched || _$2pelemMods.checked,
            disabled: __$ctx._modsDisabled || _$2pelemMods.disabled
        });
        _$2pcontrolAttrs.id || (_$2pcontrolAttrs.id = __$ctx.generateId());
        return "", __r124 = __$ctx["__$anflg12"], __$ctx["__$anflg12"] = true, __r128 = ("", __r125 = __$ctx._controlAttrs, __$ctx._controlAttrs = _$2pcontrolAttrs, __r126 = __$ctx._valuesMatched, __$ctx._valuesMatched = _$2pvaluesMatched, __r127 = $612(__$ctx), __$ctx._controlAttrs = __r125, __$ctx._valuesMatched = __r126, "", __r127), __$ctx["__$anflg12"] = __r124, "", __r128;
        return;
    }
    function $617(__$ctx) {
        if (!(__$ctx["__$anflg11"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $620(__$ctx);
            } else {
                return $877(__$ctx);
            }
        } else {
            return $877(__$ctx);
        }
    }
    function $620(__$ctx) {
        var _$2mmods = __$ctx.ctx.mods || {};
        _$2mmods.theme = _$2mmods.theme || "normal";
        {
            "";
            var __r118 = __$ctx["__$anflg11"];
            __$ctx["__$anflg11"] = true;
            {
                "";
                var __r119 = __$ctx.ctx, __r120 = __r119.mods;
                __r119.mods = _$2mmods;
                var __r121 = __$ctx._modsDisabled;
                __$ctx._modsDisabled = __$ctx.ctx.mods && __$ctx.ctx.mods.disabled;
                var __r122 = __$ctx._name;
                __$ctx._name = __$ctx.ctx.name;
                var __r123 = __$ctx._value;
                __$ctx._value = __$ctx.ctx.value;
                $611(__$ctx);
                __r119.mods = __r120;
                __$ctx._modsDisabled = __r121;
                __$ctx._name = __r122;
                __$ctx._value = __r123;
                "";
            }
            __$ctx["__$anflg11"] = __r118;
            "";
        }
        undefined;
        return;
    }
    function $625(__$ctx) {
        if (!(__$ctx["__$anflg10"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $628(__$ctx);
            } else {
                return $877(__$ctx);
            }
        } else {
            return $877(__$ctx);
        }
    }
    function $628(__$ctx) {
        var _$2gctx = __$ctx.ctx, _$2gattrs = _$2gctx.checkboxAttrs || {}, _$2gid = _$2gattrs.id || __$ctx.generateId(), _$2gmods = _$2gctx.mods || {};
        _$2gmods.theme = _$2gmods.theme || "normal";
        {
            "";
            var __r114 = __$ctx["__$anflg10"];
            __$ctx["__$anflg10"] = true;
            {
                "";
                var __r115 = __$ctx._checkboxAttrs;
                __$ctx._checkboxAttrs = _$2gattrs.id ? _$2gattrs : {
                    id: "id" + _$2gid
                };
                var __r116 = __$ctx._labelId;
                __$ctx._labelId = "label" + _$2gid;
                var __r117 = _$2gctx.mods;
                _$2gctx.mods = _$2gmods;
                $625(__$ctx);
                __$ctx._checkboxAttrs = __r115;
                __$ctx._labelId = __r116;
                _$2gctx.mods = __r117;
                "";
            }
            __$ctx["__$anflg10"] = __r114;
            "";
        }
        undefined;
        return;
    }
    function $638(__$ctx) {
        var __r107, __r113, __r108, __r109, __r110, __r111, __r112;
        return "", __r107 = __$ctx["__$anflg9"], __$ctx["__$anflg9"] = true, __r113 = ("", __r108 = __$ctx.ctx, __r109 = __r108.mods, __r108.mods = __$ctx.ctx.mods || {}, __r110 = __$ctx.ctx.mods, __r111 = __r110["only-icon"], __r110["only-icon"] = "yes", __r112 = $101(__$ctx), __r108.mods = __r109, __r110["only-icon"] = __r111, "", __r112), __$ctx["__$anflg9"] = __r107, "", __r113;
        return;
    }
    function $645(__$ctx) {
        if (!(__$ctx["__$anflg6"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                var _$24mods = __$ctx.ctx.mods || {};
                _$24mods.theme = _$24mods.theme || "normal";
                {
                    "";
                    var __r100 = __$ctx["__$anflg6"];
                    __$ctx["__$anflg6"] = true;
                    {
                        "";
                        var __r101 = __$ctx.ctx, __r102 = __r101.mods;
                        __r101.mods = _$24mods;
                        $101(__$ctx);
                        __r101.mods = __r102;
                        "";
                    }
                    __$ctx["__$anflg6"] = __r100;
                    "";
                }
                undefined;
                return;
            } else {
                return $877(__$ctx);
            }
        } else {
            return $877(__$ctx);
        }
    }
    function $657(__$ctx) {
        var _$1nie = __$ctx.ctx.ie;
        if (_$1nie === true) {
            {
                "";
                var __r87 = __$ctx._mode;
                __$ctx._mode = "";
                var __r88 = __$ctx.ctx;
                __$ctx.ctx = [ 6, 7, 8, 9 ].map(function(v) {
                    return {
                        elem: "css",
                        url: this.ctx.url + ".ie" + v + ".css",
                        ie: "IE " + v
                    };
                }, __$ctx);
                $870(__$ctx);
                __$ctx._mode = __r87;
                __$ctx.ctx = __r88;
                "";
            }
            undefined;
        } else {
            var _$1nhideRule = !_$1nie ? [ "gt IE 9", "<!-->", "<!--" ] : _$1nie === "!IE" ? [ _$1nie, "<!-->", "<!--" ] : [ _$1nie, "", "" ];
            {
                "";
                var __r89 = __$ctx._mode;
                __$ctx._mode = "";
                var __r90 = __$ctx.ctx, __r91 = __r90._ieCommented;
                __r90._ieCommented = true;
                var __r92 = __$ctx.ctx;
                __$ctx.ctx = [ "<!--[if " + _$1nhideRule[0] + "]>", _$1nhideRule[1], __$ctx.ctx, _$1nhideRule[2], "<![endif]-->" ];
                $870(__$ctx);
                __$ctx._mode = __r89;
                __r90._ieCommented = __r91;
                __$ctx.ctx = __r92;
                "";
            }
            undefined;
        }
        return;
    }
    function $662(__$ctx) {
        if (!(__$ctx["__$anflg3"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                return $665(__$ctx);
            } else {
                return $877(__$ctx);
            }
        } else {
            return $877(__$ctx);
        }
    }
    function $665(__$ctx) {
        var __r71, __r72, __r73, __r74;
        var _$12ctx = __$ctx.ctx, _$12dtype = ("", __r71 = __$ctx._mode, __$ctx._mode = "doctype", __r72 = $841(__$ctx), __$ctx._mode = __r71, "", __r72), _$12xUA = ("", __r73 = __$ctx._mode, __$ctx._mode = "xUACompatible", __r74 = $825(__$ctx), __$ctx._mode = __r73, "", __r74), _$12buf = [ _$12dtype, {
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
            var __r75 = __$ctx["__$anflg3"];
            __$ctx["__$anflg3"] = true;
            {
                "";
                var __r76 = __$ctx.ctx;
                __$ctx.ctx = _$12buf;
                var __r77 = __$ctx._mode;
                __$ctx._mode = "";
                $870(__$ctx);
                __$ctx.ctx = __r76;
                __$ctx._mode = __r77;
                "";
            }
            __$ctx["__$anflg3"] = __r75;
            "";
        }
        undefined;
        return;
    }
    function $672(__$ctx) {
        var __r67, __r68, __r69, __r70;
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
            _$zparams.content = (_$zcnt = [], "", __r67 = __$ctx._buf, __$ctx._buf = _$zcnt, __r68 = __$ctx._mode, __$ctx._mode = "", __r69 = __$ctx.ctx, __$ctx.ctx = _$zctx.content, __r70 = $870(__$ctx), __$ctx._buf = __r67, __$ctx._mode = __r68, __$ctx.ctx = __r69, "", __r70, _$zcnt.join(""));
        } else {
            undefined;
        }
        __$ctx._buf.push(BEM.I18N(_$zkeyset, _$zkey, _$zparams));
        return;
    }
    function $678(__$ctx) {
        var __r62, __r66, __r63, __r64, __r65;
        return "", __r62 = __$ctx["__$anflg2"], __$ctx["__$anflg2"] = true, __r66 = ("", __r63 = __$ctx.ctx, __$ctx.ctx = {
            block: "b-page",
            elem: "js",
            url: "//yastatic.net/jquery/1.8.3/jquery.min.js"
        }, __r64 = __$ctx._mode, __$ctx._mode = "", __r65 = $870(__$ctx), __$ctx.ctx = __r63, __$ctx._mode = __r64, "", __r65), __$ctx["__$anflg2"] = __r62, "", __r66;
        return;
    }
    function $683(__$ctx) {
        var __t = __$ctx.elem;
        if (__t === "lego-static-host") {
            return "//yastatic.net/lego/2.10-142";
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
                    return $707(__$ctx);
                } else {
                    return $877(__$ctx);
                }
            }
        }
    }
    function $707(__$ctx) {
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
    function $723(__$ctx) {
        if (!(__$ctx["__$anflg4"] !== true) === false) {
            if (!!__$ctx.elem === false) {
                var __r83, __r84;
                var _$1kmix = ("", __r83 = __$ctx["__$anflg4"], __$ctx["__$anflg4"] = true, __r84 = $723(__$ctx), __$ctx["__$anflg4"] = __r83, "", __r84) || [];
                _$1kmix.push({
                    block: "i-ua",
                    mods: {
                        interaction: "yes"
                    },
                    js: true
                });
                return _$1kmix;
                return;
            } else {
                return $729(__$ctx);
            }
        } else {
            return $729(__$ctx);
        }
    }
    function $729(__$ctx) {
        if (!!__$ctx.ctx._iGlobal === false) {
            if (!!__$ctx.elem === false) {
                return $732(__$ctx);
            } else {
                return $735(__$ctx);
            }
        } else {
            return $735(__$ctx);
        }
    }
    function $732(__$ctx) {
        var __r78, __r79, __r80, __r81, __r82;
        var _$1imix = ("", __r78 = __$ctx.ctx, __r79 = __r78._iGlobal, __r78._iGlobal = true, __r80 = $723(__$ctx), __r78._iGlobal = __r79, "", __r80), _$1ijsParams = ("", __r81 = __$ctx._mode, __$ctx._mode = "js-params", __r82 = $849(__$ctx), __$ctx._mode = __r81, "", __r82);
        _$1imix ? _$1imix.push(_$1ijsParams) : _$1imix = [ _$1ijsParams ];
        return _$1imix;
        return;
    }
    function $735(__$ctx) {
        if (!!__$ctx.elem === false) {
            return [ {
                elem: "body"
            } ];
            return;
        } else {
            return $741(__$ctx);
        }
    }
    function $741(__$ctx) {
        return undefined;
        return;
    }
    function $743(__$ctx) {
        if (!__$ctx.isSimple(__$ctx.ctx) === false) {
            if (!!__$ctx.elem === false) {
                return __$ctx.ctx;
                return;
            } else {
                return $749(__$ctx);
            }
        } else {
            return $749(__$ctx);
        }
    }
    function $749(__$ctx) {
        if (!__$ctx.ctx === false) {
            if (!!__$ctx.elem === false) {
                var _$30value = [];
                {
                    "";
                    var __r142 = __$ctx._buf;
                    __$ctx._buf = _$30value;
                    var __r143 = __$ctx._mode;
                    __$ctx._mode = "";
                    $870(__$ctx);
                    __$ctx._buf = __r142;
                    __$ctx._mode = __r143;
                    "";
                }
                undefined;
                return _$30value.join("");
                return;
            } else {
                return $755(__$ctx);
            }
        } else {
            return $755(__$ctx);
        }
    }
    function $755(__$ctx) {
        if (!true === false) {
            if (!!__$ctx.elem === false) {
                return "";
                return;
            } else {
                return $877(__$ctx);
            }
        } else {
            return $877(__$ctx);
        }
    }
    function $792(__$ctx) {
        if (!__$ctx.ctx.hasOwnProperty("tabindex") === false) {
            return {
                origTabindex: String(__$ctx.ctx.tabindex)
            };
            return;
        } else {
            return $798(__$ctx);
        }
    }
    function $798(__$ctx) {
        return undefined;
        return;
    }
    function $821(__$ctx) {
        return undefined;
        return;
    }
    function $825(__$ctx) {
        return {
            tag: "meta",
            attrs: {
                "http-equiv": "X-UA-Compatible",
                content: "IE=EmulateIE7, IE=edge"
            }
        };
        return;
    }
    function $837(__$ctx) {
        return undefined;
        return;
    }
    function $841(__$ctx) {
        return __$ctx.ctx.doctype || "<!DOCTYPE html>";
        return;
    }
    function $849(__$ctx) {
        var __r56, __r57, __r58, __r59;
        var _$t_this = __$ctx["i-global"], _$tjs = {}, _$tblock = {
            block: "i-global",
            js: _$tjs
        }, _$te;
        for (_$te in _$t_this) {
            if (_$t_this.hasOwnProperty(_$te) && ("", __r56 = __$ctx._mode, __$ctx._mode = "public-params", __r57 = __$ctx.block, __$ctx.block = "i-global", __r58 = __$ctx.elem, __$ctx.elem = _$te, __r59 = $855(__$ctx), __$ctx._mode = __r56, __$ctx.block = __r57, __$ctx.elem = __r58, "", __r59)) {
                _$tjs[_$te] = _$t_this[_$te];
            } else {
                undefined;
            }
        }
        return _$tblock;
        return;
    }
    function $855(__$ctx) {
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
            return $877(__$ctx);
        }
    }
    function $863(__$ctx) {
        if (!!__$ctx.elem === false) {
            return {};
            return;
        } else {
            return $877(__$ctx);
        }
    }
    function $870(__$ctx) {
        if (!!__$ctx["i-global"] === false) {
            return $872(__$ctx);
        } else {
            return $877(__$ctx);
        }
    }
    function $872(__$ctx) {
        var __r49, __r50, __r51, __r52, __r53, __r54, __r55;
        var _$fps = {}, _$fes = [ "lang", "tld", "content-region", "click-host", "passport-host", "pass-host", "social-host", "export-host", "login", "lego-static-host" ], _$fe;
        while (_$fe = _$fes.shift()) {
            _$fps[_$fe] = ("", __r49 = __$ctx._mode, __$ctx._mode = "default", __r50 = __$ctx.block, __$ctx.block = "i-global", __r51 = __$ctx.elem, __$ctx.elem = _$fe, __r52 = $683(__$ctx), __$ctx._mode = __r49, __$ctx.block = __r50, __$ctx.elem = __r51, "", __r52);
        }
        __$ctx["i-global"] = __$ctx._.extend(_$fps, ("", __r53 = __$ctx._mode, __$ctx._mode = "env", __r54 = __$ctx.block, __$ctx.block = "i-global", __r55 = $863(__$ctx), __$ctx._mode = __r53, __$ctx.block = __r54, "", __r55));
        applyc(__$ctx);
        undefined;
        return;
    }
    function $877(__$ctx) {
        if (!__$ctx.ctx === false) {
            if (!__$ctx.ctx.link === false) {
                if (!!__$ctx._.isSimple(__$ctx.ctx) === false) {
                    return $881(__$ctx);
                } else {
                    return $886(__$ctx);
                }
            } else {
                return $886(__$ctx);
            }
        } else {
            return $886(__$ctx);
        }
    }
    function $881(__$ctx) {
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
    function $886(__$ctx) {
        if (!cache === false) {
            if (!__$ctx.ctx === false) {
                if (!__$ctx.ctx.cache === false) {
                    return $890(__$ctx);
                } else {
                    return $895(__$ctx);
                }
            } else {
                return $895(__$ctx);
            }
        } else {
            return $895(__$ctx);
        }
    }
    function $890(__$ctx) {
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
    function $895(__$ctx) {
        var __t = __$ctx._mode;
        if (__t === "default") {
            return $897(__$ctx);
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
                        return $906(__$ctx);
                    } else {
                        if (!true === false) {
                            return $909(__$ctx);
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
    function $897(__$ctx) {
        var __r20, __r8, __r12, __r13, __r14, __r15, __r16, __r17, __r18, __r19, __r9, __r21, __r22, __r23, __r26, __r27, __r28, __r29, __r30, __r31;
        var _$4_this = __$ctx, _$4BEM_ = _$4_this.BEM, _$4v = __$ctx.ctx, _$4buf = __$ctx._buf, _$4tag;
        _$4tag = ("", __r8 = __$ctx._mode, __$ctx._mode = "tag", __r9 = $189(__$ctx), __$ctx._mode = __r8, "", __r9);
        typeof _$4tag != "undefined" || (_$4tag = _$4v.tag);
        typeof _$4tag != "undefined" || (_$4tag = "div");
        if (_$4tag) {
            var _$4jsParams, _$4js;
            if (__$ctx.block && _$4v.js !== false) {
                _$4js = ("", __r12 = __$ctx._mode, __$ctx._mode = "js", __r13 = $276(__$ctx), __$ctx._mode = __r12, "", __r13);
                _$4js = _$4js ? __$ctx._.extend(_$4v.js, _$4js === true ? {} : _$4js) : _$4v.js === true ? {} : _$4v.js;
                _$4js && ((_$4jsParams = {})[_$4BEM_.INTERNAL.buildClass(__$ctx.block, _$4v.elem)] = _$4js);
            } else {
                undefined;
            }
            _$4buf.push("<", _$4tag);
            var _$4isBEM = ("", __r14 = __$ctx._mode, __$ctx._mode = "bem", __r15 = $315(__$ctx), __$ctx._mode = __r14, "", __r15);
            typeof _$4isBEM != "undefined" || (_$4isBEM = typeof _$4v.bem != "undefined" ? _$4v.bem : _$4v.block || _$4v.elem);
            var _$4cls = ("", __r16 = __$ctx._mode, __$ctx._mode = "cls", __r17 = $315(__$ctx), __$ctx._mode = __r16, "", __r17);
            _$4cls || (_$4cls = _$4v.cls);
            var _$4addJSInitClass = _$4v.block && _$4jsParams;
            if (_$4isBEM || _$4cls) {
                _$4buf.push(' class="');
                if (_$4isBEM) {
                    _$4BEM_.INTERNAL.buildClasses(__$ctx.block, _$4v.elem, _$4v.elemMods || _$4v.mods, _$4buf);
                    var _$4mix = ("", __r18 = __$ctx._mode, __$ctx._mode = "mix", __r19 = $299(__$ctx), __$ctx._mode = __r18, "", __r19);
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
                                var _$4nestedMix = ("", __r20 = __$ctx.block, __$ctx.block = _$4block, __r21 = __$ctx.elem, __$ctx.elem = _$4elem, __r22 = __$ctx._mode, __$ctx._mode = "mix", __r23 = $299(__$ctx), __$ctx.block = __r20, __$ctx.elem = __r21, __$ctx._mode = __r22, "", __r23);
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
                var _$4jsAttr = ("", __r26 = __$ctx._mode, __$ctx._mode = "jsAttr", __r27 = $315(__$ctx), __$ctx._mode = __r26, "", __r27);
                _$4buf.push(" ", _$4jsAttr || "onclick", '="return ', __$ctx._.attrEscape(JSON.stringify(_$4jsParams)), '"');
            } else {
                undefined;
            }
            var _$4attrs = ("", __r28 = __$ctx._mode, __$ctx._mode = "attrs", __r29 = $122(__$ctx), __$ctx._mode = __r28, "", __r29);
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
            var _$4content = ("", __r30 = __$ctx._mode, __$ctx._mode = "content", __r31 = $244(__$ctx), __$ctx._mode = __r30, "", __r31);
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
                    $315(__$ctx);
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
    function $906(__$ctx) {
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
                $315(__$ctx);
                __$ctx.ctx = __r7;
                "";
            }
            undefined;
        }
        _$1prevNotNewList || (__$ctx.position = _$1prevPos);
        return;
    }
    function $909(__$ctx) {
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