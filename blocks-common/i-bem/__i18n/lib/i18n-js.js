var TANKER = require('./tanker');
var BEM = require('bem');

exports.serializeAllData = function(data, langs, defaultLang) {

    var res = ['all'].concat(langs || [])
        .reduce(function(res, lang) {
            return res.concat(exports.serializeData(data[lang] || {}, lang));
        }, []);

    return res.concat([exports.serializeInit(defaultLang)]);

};

exports.serializeData = function(data, lang) {
    var res = [];
    var KEYS = (process.env.BEM_I18N_KEYS || []);

    Object.keys(data).sort().forEach(function(keyset) {
        var keysetData = data[keyset];
        // output value of empty keyset as a simple js code
        if (keyset === '') {
            res.push(keysetData);
            return;
        };

        getDecl(keysetData, keyset, { lang: lang }, res);

    });

    return res;

    function getDecl (data, keyset, declKeys, res) {
        var decl = [];

        Object.keys(data).sort(function (a, b) {
            // objects go first
            if (typeof data[a] === 'object')
                return -1;
            return 1;
        }).forEach(function (key, i, arr) {
            var keyData = data[key];

            console.log('typeof', typeof keyData, keyData);
            if (typeof keyData === 'object') {
                // BEM_I18N_KEYS
                if (~KEYS.indexOf(key)) {
                    Object.keys(keyData).sort().forEach(function (k) {
                        // keyData[k] should be object
                        if (typeof keyData[k] !== 'object')
                            return;
                        var extDeclKeys = BEM.util.extend(true, {}, declKeys);
                        extDeclKeys[key] = k;
                        getDecl(keyData[k], keyset, extDeclKeys, res);
                    });
                };
            } else {
                TANKER.xmlToJs(data[key], function(js) {
                    decl.push(JSON.stringify(key) + ': ' + js + (i === arr.length - 1 ? '' : ','));
                });
            };
        });

        decl.unshift("\nBEM.I18N.decl('" + keyset + "', {");
        decl.push('}, ');
        decl.push(JSON.stringify(declKeys));
        decl.push(');\n');

        res = res.push(decl.join(''));
    };
};

exports.serializeInit = function(lang) {
    return "\nBEM.I18N.lang('" + lang + "');\n";
};
