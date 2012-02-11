var shmakowiki = require('shmakowiki'),
    Q = require('qq'),
    INHERIT = require('inherit'),
    Tech = require('bem/lib/tech').Tech,
    Context = require('bem/lib/context').Context,
    createLevel = require('bem/lib/level').createLevel,
    bemUtil = require('bem/lib/util'),

    SUFFIX_DECL = 'decl.js',
    SUFFIX_TITLE = 'title.txt',
    SUFFIX_WIKI = 'wiki';

exports.Tech = INHERIT(Tech, {

    storeCreateResult: function(path, suffix, res, force) {
        res = 'exports.doc = ' + JSON.stringify(res, null, 4) + ';\n';
        return this.__base(path, suffix, res, force);
    },

    getCreateResult: function(path, suffix, vars) {
        var prefix = path.replace(new RegExp('\\.' + suffix + '$'), '');
        return this.extendDecl(this.getDecl(prefix), vars.Locale);
    },

    readContent: function(path, suffix) {
        if(bemUtil.isFile(path)) {
            return require(path);
        }
        return {};
    },

    getDecl: function(prefix) {
        // TODO: bem build decl.js
        /*
        var tech = this.getContext().getTech(SUFFIX_DECL),
            prefixes = []; // TODO
        tech.setContext(this.getTechBuildContext());
        return tech.getBuildResult(prefixes, tech.getTechName());
        */
        var declPrefix = prefix.replace('.en', '').replace('.ru', '');
        return this.getContext()
            .getTech(SUFFIX_DECL)
            .readContent(this.getPath(declPrefix, SUFFIX_DECL), SUFFIX_DECL);
    },

    extendDecl: function(decl, locale) {
        var _this = this;
        return Q.when(decl, function(decl) {
            bemForEach(decl, function(getter, args, item) {
                item.title = _this.getBuildResultTech(getter, args, new TitleTech(), locale);
                item.descBemjson = _this.processShmakowiki(_this.getBuildResultTech(getter, args, new WikiTech(), locale));
            });

            return Q.deep(decl);
        });
    },

    getBuildResultTech: function(getter, args, tech, locale) {
        var levels = this.getContext()
            .getLevel()
            .getConfig()
            .set.levels.map(function(l) {
                return createLevel(l);
            });
        tech.setContext(new Context(levels, {}));
        return tech.buildItem(getter, args, locale);
    },

    processShmakowiki: function(text) {
        return Q.when(text, function(text) {
            return text.map(function(wiki) {
                var ast = shmakowiki.ShmakoWiki.matchAll(wiki, 'topLevel');
                return shmakowiki.ShmakoWikiToBemjson.match(ast, 'topLevel');
            });
        });
    }

});

var BaseTech = INHERIT(Tech, {

    buildItem: function(getter, args, locale) {
        var prefixes = [];
        // for each level
        this.getContext().getLevels().forEach(function (level) {
            // get file prefix
            prefixes.push(level.get(getter, args) + '.' + locale);
        });
        return this.getBuildResult(prefixes, this.getTechName());
    }

});

var TitleTech = INHERIT(BaseTech, {

    getTechName: function() {
        return SUFFIX_TITLE;
    },

    getBuildResult: function(prefixes, suffix) {
        var _this = this;
        return Q.when(this.filterPrefixes(prefixes, [suffix]), function(paths) {

            return Q.reduceRight(
                paths.map(function(path) {
                    return _this.readContent(path, suffix);
                }),
                function(prev, cur) {
                    return prev || cur.trim();
                },
                ''
            );

        });
    }

});

var WikiTech = INHERIT(BaseTech, {

    getTechName: function() {
        return SUFFIX_WIKI;
    },

    getBuildResult: function(prefixes, suffix) {
        var _this = this;
        return Q.when(this.filterPrefixes(prefixes, [suffix]), function(paths) {

            return Q.when(
                Q.shallow(paths.map(function(path) {
                    return _this.readContent(path, suffix);
                })),

                function(c) {
                    return c
                        .map(function(v) {
                            return v.trim();
                        })
                        .filter(function(v) {
                            return !!v;
                        });
                }
            );

        });
    }

});

var bemForEach = function(decl, cb) {

    var forItemWithMods = function(block, elem) {
            var item = elem || block,
                type = elem? 'elem' : 'block',
                args = elem? [block.name, elem.name] : [block.name];

            // for block and element
            cb(type, args, elem || block);

            // for each modifier
            item.mods && item.mods.forEach(function(mod) {

                // for modifier
                cb(type + '-mod', args.concat(mod.name), mod);

                // for each modifier value
                mod.vals && mod.vals.forEach(function(val, i) {
                    if (!val.name) {
                        val = { name: val };
                        mod.vals[i] = val;
                    }
                    cb(type + '-mod-val', args.concat(mod.name, val.name), val);
                });

            });
        },
        forBlockDecl = function(block) {
            // for block
            forItemWithMods(block);

            // for each block element
            block.elems && block.elems.forEach(function(elem) {
                forItemWithMods(block, elem);
            });
        },
        forBlocksDecl = function(blocks) {
            // for each block in declaration
            blocks.forEach(forBlockDecl);
        };

    decl.name && forBlockDecl(decl);
    decl.blocks && forBlocksDecl(decl.blocks);

};
