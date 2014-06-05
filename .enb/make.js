var DEFAULT_LANGS = ['ru', 'en'],
    docSets = require('enb-bem-docs'),
    exampleSets = require('enb-bem-examples'),
    fs = require('fs'),
    path = require('path'),
    levels = require('enb/techs/levels'),
    provide = require('enb/techs/file-provider'),
    bemdeclFromDepsByTech = require('enb/techs/bemdecl-from-deps-by-tech'),
    bemdecl = require('enb/techs/bemdecl-from-bemjson'),
    deps = require('enb/techs/deps-old'),
    files = require('enb/techs/files'),
    i18nBemdecl = require('./techs/i18n-bemdecl'),
    i18n = require('enb-bem-i18n/techs/i18n-lang-js'),
    mergeKeysets = require('enb-bem-i18n/techs/i18n-merge-keysets'),
    mergeBemdecl = require('enb/techs/bemdecl-merge'),
    css = require('enb/techs/css'),
    js = require('enb/techs/js'),
    bemhtml = require('enb-xjst/techs/bemhtml'),
    html = require('enb-xjst/techs/html-from-bemjson-i18n'),
    copyFile = require('enb/techs/file-copy'),
    mergeFiles = require('enb/techs/file-merge'),
    borschik = require('enb-borschik/techs/borschik');

module.exports = function(config) {
    var docs = docSets.create('docs', config),
        examples = exampleSets.create('examples', config),
        langs = process.env.BEM_I18N_LANGS;

    config.setLanguages(langs ? langs.split(' ') : [].concat(DEFAULT_LANGS));

    docs.build({
        destPath: 'desktop.docs',
        levels: getDesktopLevels(config),
        examplesPattern: 'desktop.examples/?'
    });

    examples.build({
        destPath: 'desktop.examples',
        levels: getDesktopLevels(config)
    });

    docs.build({
        destPath: 'touch-pad.docs',
        levels: getTouchPadLevels(config),
        examplesPattern: 'touch-pad.examples/?'
    });

    examples.build({
        destPath: 'touch-pad.examples',
        levels: getTouchPadLevels(config)
    });

    docs.build({
        destPath: 'touch-phone.docs',
        levels: getTouchPhoneLevels(config),
        examplesPattern: 'touch-phone.examples/?'
    });

    examples.build({
        destPath: 'touch-phone.examples',
        levels: getTouchPhoneLevels(config)
    });

    config.nodes('desktop.examples/*/*', function (nodeConfig) {
        var nodeDir = nodeConfig.getNodePath(),
            blockSublevelDir = path.join(nodeDir, '..', '.blocks'),
            sublevelDir = path.join(nodeDir, 'blocks'),
            extendedLevels = [].concat(getDesktopLevels(config));

        if (fs.existsSync(blockSublevelDir)) {
            extendedLevels.push(blockSublevelDir);
        }

        if (fs.existsSync(sublevelDir)) {
            extendedLevels.push(sublevelDir);
        }

        nodeConfig.addTech([levels, { levels: extendedLevels }]);
    });

    config.nodes('touch-pad.examples/*/*', function (nodeConfig) {
        var nodeDir = nodeConfig.getNodePath(),
            blockSublevelDir = path.join(nodeDir, '..', '.blocks'),
            sublevelDir = path.join(nodeDir, 'blocks'),
            extendedLevels = [].concat(getTouchPadLevels(config));

        if (fs.existsSync(blockSublevelDir)) {
            extendedLevels.push(blockSublevelDir);
        }

        if (fs.existsSync(sublevelDir)) {
            extendedLevels.push(sublevelDir);
        }

        nodeConfig.addTech([levels, { levels: extendedLevels }]);
    });

    config.nodes('touch-phone.examples/*/*', function (nodeConfig) {
        var nodeDir = nodeConfig.getNodePath(),
            blockSublevelDir = path.join(nodeDir, '..', '.blocks'),
            sublevelDir = path.join(nodeDir, 'blocks'),
            extendedLevels = [].concat(getTouchPhoneLevels(config));

        if (fs.existsSync(blockSublevelDir)) {
            extendedLevels.push(blockSublevelDir);
        }

        if (fs.existsSync(sublevelDir)) {
            extendedLevels.push(sublevelDir);
        }

        nodeConfig.addTech([levels, { levels: extendedLevels }]);
    });

    config.nodes('*.examples/*/*', function (nodeConfig) {
        var defaultLanguage = (config.getLanguages())[0];

        // Base techs
        nodeConfig.addTechs([
            [provide, { target: '?.bemjson.js' }],
            [bemdecl, { destTarget: '?.pre.bemdecl.js' }],
            [i18nBemdecl, { target: '?.i18n.bemdecl.js' }],
            [mergeBemdecl, { bemdeclSources: ['?.i18n.bemdecl.js', '?.pre.bemdecl.js'] }],
            deps,
            files
        ]);

        // Client techs
        nodeConfig.addTechs([
            css,
            [css, { target: '?.ie.css', sourceSuffixes: ['css', 'ie.css'] }],
            [css, { target: '?.ie6.css', sourceSuffixes: ['css', 'ie6.css'] }],
            [css, { target: '?.ie7.css', sourceSuffixes: ['css', 'ie7.css'] }],
            [css, { target: '?.ie8.css', sourceSuffixes: ['css', 'ie8.css'] }],
            [css, { target: '?.ie9.css', sourceSuffixes: ['css', 'ie9.css'] }],
            [js, { target: '?.pre.js' }],
            [mergeFiles, {
                target: '?.js',
                sources: ['?.browser.bemhtml.js', '?.pre.js']
            }]
        ]);

        // Client BEMHTML
        nodeConfig.addTechs([
            [bemdeclFromDepsByTech, {
                target: '?.js.bemhtml.bemdecl.js',
                sourceTech: 'js',
                destTech: 'bemhtml'
            }],
            [mergeBemdecl, {
                bemdeclSources: ['?.js.bemhtml.bemdecl.js', '?.bemdecl.js'],
                bemdeclTarget: '?.bemhtml.bemdecl.js'
            }],

            [deps, {
                depsTarget: '?.bemhtml.deps.js',
                bemdeclTarget: '?.bemhtml.bemdecl.js'
            }],
            [files, {
                depsTarget: '?.bemhtml.deps.js',
                filesTarget: '?.bemhtml.files',
                dirsTarget: '?.bemhtml.dirs'
            }],

            [bemhtml, {
                target: '?.browser.bemhtml.js',
                filesTarget: '?.bemhtml.files',
                devMode: false
            }]
        ]);

        // Build htmls
        nodeConfig.addTechs([
            [mergeKeysets, { lang: 'all' }],
            [mergeKeysets, { lang: '{lang}' }],
            [i18n, { lang: 'all' }],
            [i18n, { lang: '{lang}' }],
            bemhtml,
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
            '?.css', '?.ie.css', '?.ie8.css', '?.ie9.css',
            '?.js', '?.bemhtml.js', '?.{lang}.html', '?.html'
        ]);
    });

    config.mode('development', function () {
        config.nodes('*.examples/*/*', function (nodeConfig) {
            nodeConfig.addTechs([
                [copyFile, { source: '?.css', target: '_?.css' }],
                [copyFile, { source: '?.ie.css', target: '_?.ie.css' }],
                [copyFile, { source: '?.ie8.css', target: '_?.ie8.css' }],
                [copyFile, { source: '?.ie9.css', target: '_?.ie9.css' }],
                [copyFile, { source: '?.js', target: '_?.js' }]
            ]);
        });
    });

    config.mode('production', function () {
        config.nodes('*.examples/*/*', function (nodeConfig) {
            nodeConfig.addTechs([
                [borschik, { source: '?.css', target: '_?.css', freeze: true }],
                [borschik, { source: '?.ie.css', target: '_?.ie.css', freeze: true }],
                [borschik, { source: '?.ie8.css', target: '_?.ie8.css', freeze: true }],
                [borschik, { source: '?.ie9.css', target: '_?.ie9.css', freeze: true }],
                [borschik, { source: '?.js', target: '_?.js' }]
            ]);
        });
    });
};

function getDesktopLevels(config) {
    return [
        'blocks-common',
        'blocks-desktop'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}

function getTouchPadLevels(config) {
    return [
        'blocks-common',
        'blocks-touch'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}

function getTouchPhoneLevels(config) {
    return [
        'blocks-common',
        'blocks-touch'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}
