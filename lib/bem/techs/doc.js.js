var fs = require('fs'),
    shmakowiki = require('shmakowiki'),
    path = require('path'),
    bemUtil = require('bem/lib/util'),
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

                !hash1.bemjsonDesc && hash2.bemjsonDesc && (
                    hash1.bemjsonDesc = hash2.bemjsonDesc
                )
                hash1.bemjsonDesc && hash2.bemjsonDesc && (
                    hash1.bemjsonDesc.content = [
                        hash1.bemjsonDesc.content,
                        hash2.bemjsonDesc.content
                    ]
                )
            }
            if (!doc) {
                doc = newLevel;
            } else {
                merge(doc, newLevel);
                doc.mods && newLevel.mods && (
                    newLevel.mods.forEach(function(newMod){
                        // выяснить, есть ли совпадения
                        var isNew = true;
                        doc.mods.forEach(function(oldMod){
                            if(newMod.name == oldMod.name) {
                                isNew = false;
                                // мержится описание модификатров
                                merge(oldMod, newMod);

                                oldMod.vals && newMod.vals && (
                                    newMod.vals.forEach(function(newVal){
                                        var isNewVal = true;
                                        oldMod.vals.forEach(function(oldVal){
                                            if (newVal.name == oldVal.name) {
                                                isNewVal = false;
                                                merge(oldVal, newVal);
                                            }
                                        })
                                        if (isNewVal) {
                                            // это новое значение, надо добавить
                                            oldMod.vals.push(newVal);
                                        }
                                    })
                                )

                                // присваиваем значения, если их раньше не было
                                !oldMod.vals && newMod.vals && (
                                    oldMod.vals = newMod.vals
                                )

                            }
                        });
                        if (isNew) {
                            // добавляет новый модификатор
                            doc.mods.push(newMod);
                        }
                    })
                )
                !doc.mods && newLevel.mods && (
                    doc.mods = newLevel.mods
                )

                doc.elems && newLevel.elems && (
                    newLevel.elems.forEach(function(newElem){
                        var isNewElem = true;
                        doc.elems.forEach(function(oldElem){
                            if (newElem.name == oldElem.name) {
                                isNewElem = false;
                                merge(oldElem, newElem);
                                // модификаторы элемента
                                oldElem.mods && newElem.mods && (
                                    newElem.mods.forEach(function(newMod){
                                        // выяснить, есть ли совпадения
                                        var isNew = true;
                                        oldElem.mods.forEach(function(oldMod){
                                            if(newMod.name == oldMod.name) {
                                                isNew = false;
                                                // мержится описание модификатров
                                                merge(oldMod, newMod);

                                                oldMod.vals && newMod.vals && (
                                                    newMod.vals.forEach(function(newVal){
                                                        var isNewVal = true;
                                                        oldMod.vals.forEach(function(oldVal){
                                                            if (newVal.name == oldVal.name) {
                                                                isNewVal = false;
                                                                merge(oldVal, newVal);
                                                            }
                                                        })
                                                        if (isNewVal) {
                                                            // это новое значение, надо добавить
                                                            oldMod.vals.push(newVal);
                                                        }
                                                    })
                                                )

                                                // присваиваем значения, если их раньше не было
                                                !oldMod.vals && newMod.vals && (
                                                    oldMod.vals = newMod.vals
                                                )

                                            }
                                        });
                                        if (isNew) {
                                            // добавляет новый модификатор
                                            oldElem.mods.push(newMod);
                                        }
                                    })
                                )
                            }
                        });
                        if (isNewElem) {
                            doc.elems.push(newElem);
                        }
                    })
                )

                !doc.elems && newLevel.elems && (
                    doc.elems = newLevel.elems
                )
                //console.log(doc);
            }
            return doc;
        };
        this.filterExists(prefixes)
            .forEach(function(file){
                var c = _this.outFile(
                    path.relative(outputDir, file),
                    file, outputDir, outputName);
                doc = docMerge(doc, c);
            })

    fs.createWriteStream(this.fileByPrefix(path.join(outputDir, outputName)),{ encoding: 'utf8' }).write('(' + JSON.stringify(doc) + ')');

    return this;
};

exports.outFile = function (relFile, file) {

    var readFileIfExists = function(fileName) {

        return path.existsSync(fileName)? fs.readFileSync(fileName, 'utf-8') : '';

    }

    return eval(readFileIfExists(file));
};
