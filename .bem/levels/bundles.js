var path = require('path'),
    environ = require('bem-environ'),
    getPrjTechPath = path.join.bind(null, environ.PRJ_ROOT, '.bem/techs'),
    getBemBlTechPath = path.join.bind(null, environ.PRJ_ROOT, 'blocks-common/i-bem/bem/techs/v2');

exports.getTechs = function() {

    return {
        'bemjson.js': getPrjTechPath('bemjson.js'),
        'bemdecl.js': 'v2/bemdecl.js',
        'deps.js': 'v2/deps.js',
        js: 'v2/js-i',
        css: 'v2/css',
        'ie.css': 'v2/ie.css',
        'ie6.css': 'v2/ie6.css',
        'ie7.css': 'v2/ie7.css',
        'ie8.css': 'v2/ie8.css',
        'ie9.css': 'v2/ie9.css',

        i18n: getBemBlTechPath('i18n.js'),
        'i18n.js': getBemBlTechPath('i18n.js.js'),
        'i18n.js+bemhtml': getBemBlTechPath('i18n.js+bemhtml.js'),
        'i18n.html': getBemBlTechPath('i18n.html.js'),

        bemhtml: getBemBlTechPath('bemhtml.js'),
        html: getBemBlTechPath('html.js')
    };

};

// Create bundles in bemjson.js tech
exports.defaultTechs = ['bemjson.js'];
