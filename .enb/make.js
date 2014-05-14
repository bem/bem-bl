var DEFAULT_LANGS = ['ru', 'en'];

module.exports = function(config) {
    var tools = require('enb-bem-docs')(config),
        langs = process.env.BEM_I18N_LANGS;

    config.setLanguages(langs ? langs.split(' ') : [].concat(DEFAULT_LANGS));

    tools.configureSets({
        sets: {
            destPath: 'desktop.sets',
            levels: getDesktopLevels(config)
        },
        jsdocs: {
            _suffixes: []
        },
        examples: {
            levels: getDesktopLevels(config),
            _techs: [
                [ require('enb/techs/file-copy'), {
                    sourceTarget: '?.bemjson.js',
                    destTarget: '_?.bemjson.js'
                } ],
                require('enb/techs/css'),
                require('enb/techs/css-ie'),
                require('enb/techs/css-ie8'),
                require('enb/techs/css-ie9'),
                require('enb/techs/js'),
                [ require('./techs/bemhtml'), { devMode: false } ],
                [ require('enb/techs/i18n-merge-keysets'), { lang: 'all' } ],
                [ require('enb/techs/i18n-merge-keysets'), { lang: '{lang}' } ],
                [ require('enb/techs/i18n-lang-js'), { lang: 'all'} ],
                [ require('enb/techs/i18n-lang-js'), { lang: '{lang}'} ],
                [ require('enb/techs/html-from-bemjson-i18n'), { lang: '{lang}'} ],
                [ require('enb/techs/file-copy'), { sourceTarget: '?.{lang}.html', destTarget: '_?.{lang}.html' } ]
            ],
            _targets: [
                '?.css', '?.ie.css', '?.ie8.css', '?.ie9.css',
                '?.js', '?.bemhtml.js', '_?.{lang}.html'
            ],
            _optimizedTargets: [
                '?.css',
                '?.ie.css',
                '?.ie8.css',
                '?.ie9.css',
                '?.js'
            ]
        }
    });
};

/**
 * Получение уровней для сборки примеров
 * @param {Object} config
 * @returns {*|Array}
 */
function getDesktopLevels(config) {
    return [
        'blocks-common',
        'blocks-desktop'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}
