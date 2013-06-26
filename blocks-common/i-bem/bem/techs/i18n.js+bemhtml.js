var BEM = require('bem'),
    jsPlusBemhtmlMixin = require('./js+bemhtml').techMixin,
    PATH = require('path');

exports.baseTechName = 'i18n.js';

exports.techMixin = {

    getBuildResult: function(prefixes, suffix, outputDir, outputName, data, lang) {

        var _this = this;

        return _this.__base(prefixes, this.getBaseTechSuffix(), outputDir, outputName)
            .then(function(res) {

                res = data && !BEM.util.isEmptyObject(data)? res
                        .concat(_this.serializeI18nData(data, lang))
                        .concat([_this.serializeI18nInit(lang)]) : res;

                return jsPlusBemhtmlMixin.getConcatBemhtmlWithResult.call(_this, res);

            });

    }

};
