typeof BEM_CONFLICTS_NO !== 'undefined' && (function(_this) {
    var _BEM = _this._BEM || (_this._BEM = {});
    _BEM[BEM_CONFLICTS_NO] = _this.BEM;
    (_this.BEM.CONFLICTS_NO = function(version) { return _this.BEM = _BEM[version] })
        .valueOf = function() { return BEM_CONFLICTS_NO };
})(this);
