var fs = require('fs'),
    shmakowiki = require('shmakowiki'),
    path = require('path'),
    Template = require('bem/lib/template');

exports.techModule = module;

exports.newFileContent = function(vars) {

    var _this = this,
        readFileIfExists = function(fileName) {

        return path.existsSync(fileName)? fs.readFileSync(fileName, 'utf-8') : '';

        },
        getDoc = function(prefix, hash) {
            var fileWiki = prefix + '.wiki',
                wiki = readFileIfExists(fileWiki).trim();
                fileTitle = prefix + '.title.txt';

            hash.title = readFileIfExists(fileTitle).trim();

            hash.bemjsonDesc = wiki? shmakowiki.ShmakoWikiToBemjson.match(shmakowiki.ShmakoWiki.matchAll(wiki, 'topLevel'), 'topLevel') : '';
        },
        level = this.getContext().getLevel(),
        levelPath = this.context.levels[0].path.replace('.bem', ''),
        block = level.getBlockByIntrospection(vars.BlockName);

    getDoc(vars.Prefix, block)

    // обработаем модификаторы
    block.mods && (
        block.mods.forEach(function(mod){

            getDoc(levelPath + level['get-block-mod'](vars.BlockName, mod.name) + '.' + vars.Locale, mod);

            // обрабатываем значения модификаторов
            mod.vals && mod.vals.forEach(function(modVal){

                getDoc(levelPath + level['get-block-mod-val'](vars.BlockName, mod.name, modVal.name) + '.' + vars.Locale, modVal);

            })
        })
    )

    // обрабатываем элементы
    block.elems &&
    block.elems.forEach(function(elem){

        getDoc(levelPath + level['get-elem'](vars.BlockName, elem.name) + '.' + vars.Locale, elem);

        elem.mods &&
            elem.mods && elem.mods.forEach(function(mod){

                getDoc(levelPath + level['get-elem-mod'](vars.BlockName, elem.name, mod.name) + '.' + vars.Locale, mod);

                mod.vals && mod.vals.forEach(function(modVal){

                    getDoc(levelPath + level['get-elem-mod-val'](vars.BlockName, elem.name, mod.name, modVal.name) + '.' + vars.Locale, modVal);

                })

            })

    });

    return '(' + JSON.stringify(block) + ')';
    }

exports.bemBuild = function(prefixes, outputDir, outputName) {
    var _this = this,
        doc,
        docMerge = function(doc, newLevel) {
            var merge = function(hash1, hash2) {
                hash1.title = hash2.title || hash1.title;
                hash1.bemjsonDesc = [hash1.bemjsonDesc, hash2.bemjsonDesc];
            }
            if (!doc) {
                doc = newLevel;
            } else {
                merge(doc, newLevel);
            }
            return doc;
        },
        content = this.filterExists(prefixes)
        .map(function(file) {
            /*var c = _this.outFile(
                path.relative(outputDir, file),
                file, outputDir, outputName);
            doc = docMerge(doc, c);
            return JSON.stringify(doc);*/
        });
        this.filterExists(prefixes)
            .forEach(function(file){
                var c = _this.outFile(
                    path.relative(outputDir, file),
                    file, outputDir, outputName);
                doc = docMerge(doc, c);
            })

    fs.createWriteStream(this.fileByPrefix(path.join(outputDir, outputName)),{ encoding: 'utf8' }).write(JSON.stringify(doc));

    return this;
};

exports.outFile = function (relFile, file) {

    var readFileIfExists = function(fileName) {

        return path.existsSync(fileName)? fs.readFileSync(fileName, 'utf-8') : '';

    }

    return eval(readFileIfExists(file));
};
