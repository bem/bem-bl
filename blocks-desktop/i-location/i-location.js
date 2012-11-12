(function() {

var _instance;

BEM.decl('i-location', {

    onSetMod : {

        js : function() {

            this._syncState();

            BEM.DOM.win.bind('statechange', this.changeThis(this._onStateChange));

        }

    },

    _onStateChange : function(e) {

        this._syncState();

        if (this._state.__needTrigger !== false) {
            delete this._state.__needTrigger;
            this.trigger('change', this._state);
        }

    },

    _syncState : function() {

        var state = History.getState();

        this._state = $.extend(state.data, {
            url: state.url, // /yandsearch?text=ololo
            path: this.__self.parsePath(state.hash), // /yandsearch
            params: this.__self.parseParams(state.hash) // { text: 'ololo' }
        });

        return this;

    },

    change : function(data) {

        data.url = this.__self.normalizeURL(data.url);
        data.history = data.history !== false;
        if (data.url) delete data.params;
        if (data.title) document.title = data.title;
        if (data.params) data.url =
                this.__self.joinPath(
                    this._state.path,
                    this.__self.joinParams(this._state.params, data.params));

        $.each(data, function(item) {
            if (item === 'url' && !data[item] || item === 'history') return;
            if (item !== 'title') data.__needTrigger = true;
        });
        data.__needTrigger || (data.__needTrigger = false);

        History[(data.history ? 'push' : 'replace') + 'State'](
            data,
            data.title,
            data.url);

    },

    getState : function() {

        return this._state;

    }

}, {

    get : function() {

        return _instance || (_instance = BEM.create('i-location'));

    },

    parsePath : function(url) {

        return url.match(/([^\?&]*)/)[0];

    },


    parseParams : function(url) {

        url = url.replace(/[^?]*\??/,'');

        if (!url) return {};

        var re = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g,
            params = {};

        url.replace(re, function($0, $1, $2) {
            $1 && (params[$1] = $2.replace(/\+/g, " "));
            params[$1] = $.decodeURIComponent(params[$1])
        });

        return params;

    },

    joinParams : function(hash1, hash2) {

        return $.extend({}, hash1, hash2);

    },

    joinPath : function(path, params) {

        return this.normalizeURL(path + '?' + $.param(params));

    },

    normalizeURL : function(str) {

        return (str || '').replace(/\+/g, '%20');

    }

});

})();
