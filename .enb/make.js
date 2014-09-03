var DEFAULT_LANGS = ['ru', 'en'],
    fs = require('fs'),
    path = require('path'),
    naming = require('bem-naming'),
    levels = require('enb-bem/techs/levels'),
    provide = require('enb/techs/file-provider'),
    bemdeclFromDepsByTech = require('enb-bem/techs/bemdecl-from-deps-by-tech'),
    bemdecl = require('enb-bem/techs/bemdecl-from-bemjson'),
    deps = require('enb-bem/techs/deps-old'),
    files = require('enb-bem/techs/files'),
    css = require('enb/techs/css'),
    js = require('enb/techs/js'),
    i18nBemdecl = require('./techs/i18n-bemdecl'),
    i18n = require('enb-bem-i18n/techs/i18n-lang-js'),
    mergeKeysets = require('enb-bem-i18n/techs/i18n-merge-keysets'),
    mergeBemdecl = require('enb-bem/techs/merge-bemdecl'),
    bemhtml = require('enb-xjst/techs/bemhtml'),
    html = require('enb-xjst/techs/html-from-bemjson-i18n'),
    copyFile = require('enb/techs/file-copy'),
    mergeFiles = require('enb/techs/file-merge'),
    borschik = require('enb-borschik/techs/borschik'),
    PLATFORMS = {
        'desktop' : ['common', 'desktop'],
        'touch-phone' : ['common', 'touch'],
        'touch-pad' : ['common', 'touch']
    };

module.exports = function(config) {
    var platforms = ['desktop', 'touch-pad', 'touch-phone'],
        langs = process.env.BEM_I18N_LANGS;

    config.includeConfig('enb-bem-examples');
    config.includeConfig('enb-bem-docs');

    config.setLanguages(langs? langs.split(' ') : [].concat(DEFAULT_LANGS));

    configurePages(platforms);
    configureSets(platforms, {
        examples : config.module('enb-bem-examples').createConfigurator('examples'),
        docs : config.module('enb-bem-docs').createConfigurator('docs', 'examples')
    });

    function configurePages(platforms) {
        platforms.forEach(function(platform) {
            var nodes = [platform + '.tests/*/*', platform + '.examples/*/*', platform + '.pages/*'];

            configureLevels(platform, nodes);

            config.nodes([platform + '.pages/*'], function(nodeConfig) {
                nodeConfig.addTech([provide, { target : '?.bemjson.js' }]);
            });

            config.nodes(nodes, function(nodeConfig) {
                var langs = config.getLanguages(),
                    defaultLanguage = langs[0];

                // Base techs
                nodeConfig.addTechs([
                    [bemdecl, { target: '?.pre.bemdecl.js' }],
                    [i18nBemdecl, { target: '?.i18n.bemdecl.js' }],
                    [mergeBemdecl, { sources: ['?.i18n.bemdecl.js', '?.pre.bemdecl.js'] }],
                    [deps],
                    [files]
                ]);

                // Client techs
                nodeConfig.addTechs([
                    [css],
                    [css, { target: '?.ie.css', sourceSuffixes: ['css', 'ie.css'] }],
                    [css, { target: '?.ie6.css', sourceSuffixes: ['css', 'ie6.css'] }],
                    [css, { target: '?.ie7.css', sourceSuffixes: ['css', 'ie7.css'] }],
                    [css, { target: '?.ie8.css', sourceSuffixes: ['css', 'ie8.css'] }],
                    [css, { target: '?.ie9.css', sourceSuffixes: ['css', 'ie9.css'] }],
                    [js, { target: '?.pre.js' }],
                    [mergeFiles, {
                        target : '?.js',
                        sources : ['?.browser.bemhtml.js', '?.pre.js']
                    }]
                ]);

                // Client BEMHTML
                nodeConfig.addTechs([
                    [bemdeclFromDepsByTech, {
                        target : '?.bemhtml.bemdecl.js',
                        sourceTech : 'js',
                        destTech : 'bemhtml'
                    }],
                    [deps, {
                        target : '?.bemhtml.deps.js',
                        sourceDepsFile : '?.bemhtml.bemdecl.js'
                    }],
                    [files, {
                        target : '?.bemhtml.deps.js',
                        filesTarget : '?.bemhtml.files',
                        dirsTarget : '?.bemhtml.dirs'
                    }],
                    [bemhtml, {
                        target : '?.browser.bemhtml.js',
                        filesTarget : '?.bemhtml.files',
                        devMode : false
                    }]
                ]);

                // Build htmls
                nodeConfig.addTechs([
                    [mergeKeysets, { lang: 'all' }],
                    [mergeKeysets, { lang: '{lang}' }],
                    [i18n, { lang: 'all' }],
                    [i18n, { lang: '{lang}' }],
                    [bemhtml],
                    [html, {
                        target: '?.{lang}.html',
                        langFile: '?.lang.{lang}.js'
                    }],
                    [copyFile, {
                        source: '?.' + defaultLanguage + '.html',
                        target: '?.html'
                    }]
                ]);

                nodeConfig.addTargets([
                    '_?.css', '_?.ie.css', '_?.ie8.css', '_?.ie9.css',
                    '_?.js', '?.html'
                ]);
            });

            config.mode('development', function() {
                config.nodes(nodes, function(nodeConfig) {
                    nodeConfig.addTechs([
                        [copyFile, { source: '?.css', target: '_?.css' }],
                        [copyFile, { source: '?.ie.css', target: '_?.ie.css' }],
                        [copyFile, { source: '?.ie8.css', target: '_?.ie8.css' }],
                        [copyFile, { source: '?.ie9.css', target: '_?.ie9.css' }],
                        [copyFile, { source: '?.js', target: '_?.js' }]
                    ]);
                });
            });

            config.mode('production', function() {
                config.nodes(nodes, function(nodeConfig) {
                    nodeConfig.addTechs([
                        [borschik, { source: '?.css', target: '_?.css', freeze: true }],
                        [borschik, { source: '?.ie.css', target: '_?.ie.css', freeze: true }],
                        [borschik, { source: '?.ie8.css', target: '_?.ie8.css', freeze: true }],
                        [borschik, { source: '?.ie9.css', target: '_?.ie9.css', freeze: true }],
                        [borschik, { source: '?.js', target: '_?.js', freeze: true }]
                    ]);
                });
            });
        });
    }

    function configureLevels(platform, nodes) {
        config.nodes(nodes, function(nodeConfig) {
            var nodeDir = nodeConfig.getNodePath(),
                blockSublevelDir = path.join(nodeDir, '..', '.blocks'),
                sublevelDir = path.join(nodeDir, 'blocks'),
                extendedLevels = [].concat(getLibLevels(platform));

            if(fs.existsSync(blockSublevelDir)) {
                extendedLevels.push(blockSublevelDir);
            }

            if(fs.existsSync(sublevelDir)) {
                extendedLevels.push(sublevelDir);
            }

            nodeConfig.addTech([levels, { levels : extendedLevels }]);
        });
    }

    function configureSets(platforms, sets) {
        platforms.forEach(function(platform) {
            sets.examples.configure({
                destPath : platform + '.examples',
                levels : getLibLevels(platform),
                techSuffixes : ['examples'],
                fileSuffixes : ['bemjson.js', 'title.txt'],
                inlineBemjson : true,
                processInlineBemjson : wrapInPage
            });

            sets.docs.configure({
                destPath : platform + '.docs',
                levels : getLibLevels(platform),
                exampleSets : [platform + '.examples'],
                langs : config.getLanguages(),
                jsdoc : { suffixes : ['vanilla.js', 'browser.js', 'js'] }
            });
        });
    }
};

function getLibLevels(platform) {
    return PLATFORMS[platform].map(function(level) {
        return 'blocks-' + level;
    });
}

function wrapInPage(bemjson, meta) {
    var basename = '_' + path.basename(meta.filename, '.bemjson.js');
    return {
        block : 'b-page',
        title : naming.stringify(meta.notation),
        head : [
            { elem : 'css', url : basename + '.css' },
            { elem : 'js', url : basename + '.js' }
        ],
        content : bemjson
    };
}
