/* global MAKE:false */

//process.env.YENV = 'production';

var fs = require('fs'),
    path = require('path'),
    sets = require('bem-sets'),
    environ = require('bem-environ')(__dirname);

environ.extendMake(MAKE);
sets.extendMake(MAKE);

MAKE.decl('Arch', {

    blocksLevelsRegexp: /^blocks-\..+?/,

    bundlesLevelsRegexp: /^.+?\.(bundles)|(tests)$/,

    createCustomNodes: function(common, libs, blocks) {

        // Сборка примеров
        return MAKE.getNodeClass('SetsNode')
            .create({
                root: this.root,
                arch: this.arch
            })
            .alterArch(null, libs);
    }
});

process.env.BEM_I18N_LANGS = 'ru en';

MAKE.decl('BundleNode', {

    getTechs: function() {

        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'i18n',
            'bemhtml',
            'i18n.js+bemhtml',
            'css',
            'ie.css',
            'ie6.css',
            'ie7.css',
            'ie8.css',
            'ie9.css',
            'i18n.html'
        ];
    },

    getLevels: function(tech) {

        var currentLevel = path.basename(this.level.dir),
            currentTechSuffix = path.extname(currentLevel),
            currentTechPrefix = path.basename(currentLevel, currentTechSuffix);

        return this.__base(tech);

    },

    'desktop-levels': function() {
        return [
            'blocks-common',
            'blocks-desktop'
        ].map(getPrjPath);
    },

    'touch-pad-levels': function() {
        return [
            'blocks-common',
            'blocks-touch'
        ].map(getPrjPath);
    },

    'create-i18n.js-optimizer-node': function(tech, sourceNode, bundleNode) {
        return this.createBorschikOptimizerNode('js', sourceNode, bundleNode);
    },

    'create-i18n.js+bemhtml-optimizer-node': function(tech, sourceNode, bundleNode) {
        return this['create-js-optimizer-node'].apply(this, arguments);
    },

    'create-i18n.html-node': function(tech, bundleNode, magicNode) {
        return this['create-html-node'].apply(this, arguments);
    }

});

// Отключаем сборку тестов в bem-sets
MAKE.decl('SetsLevelNode', {}, {

    getSourceItemsMap: function() {
        return {
            examples: ['examples'],
            docs: ['desc.md', 'title.txt', 'desc.wiki'],
            jsdoc: ['js']
        };
    }
});

MAKE.decl('SetsNode', {

    getSets: function() {
        return getLevelsByPlatform();
    }

});

MAKE.decl('ExampleNode', {

    getTechs: function() {
        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'i18n',
            'bemhtml',
            'i18n.js+bemhtml',
            'css',
            'ie.css',
            'ie6.css',
            'ie7.css',
            'ie8.css',
            'ie9.css',
            'i18n.html'
        ];
    },

    /**
     * Уровни переопределения, используемые для сборки примера
     */
    getLevels: function() {
        var resolve = path.resolve.bind(null, this.root),
            levelPath = this.getLevelPath(),
            getLevels = (levelPath.indexOf(environ.getConf().siteOutputFolder) === 0
                ? 'desktop'
                : levelPath.split('.')[0]) + '-levels',
            levels = [];

        if(typeof this[getLevels] === 'function') {
            [].push.apply(levels, this[getLevels]());
        }

        levels.push(
            this.getSourceNodePrefix() // Подключаем директорию blocks из папки с примерами блока
                .split('/')
                .slice(0, -1)
                .concat(['blocks'])
                .join('/'),
            this.rootLevel // Подключаем %examplename%.blocks из папки с примерами блока
                .getTech('blocks')
                .getPath(this.getSourceNodePrefix()));

        return levels
            .filter(fs.existsSync)
            .map(function(level) {
                return resolve(level);
            });
    }
});

/**
 * Возвращает абсолютный путь до str относительно директории с библиотеками.
 * Может использоваться в качестве колбека в итераторах.
 */
function getLibPath(str) {
    return environ.getLibPath(str);
}

/**
 * Возвращает абсолютный путь до str относительно корня.
 * Может использоваться в качестве колбека в итераторах.
 */
function getPrjPath(str) {
    return path.join(environ.PRJ_ROOT, str);
}

/**
 * Возвращает нужные списки уровней для конкретной платформы.
 * Если платформа не указана, то возвращаются все плфтформы и уровни для них.
 */
function getLevelsByPlatform(platform) {
    var map = {
        'desktop': ['blocks-common', 'blocks-desktop'],
        'touch-pad': ['blocks-common', 'blocks-touch'],
        'touch-phone': ['blocks-common', 'blocks-touch']
    };
    return map[platform] || map;
}
