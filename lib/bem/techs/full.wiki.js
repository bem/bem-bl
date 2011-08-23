var fs = require('fs'),
    path = require('path');

exports.techModule = module;

exports.newFileContent = function(vars) {

    var _this = this,
        readFileIfExists = function(fileName) {

        return path.existsSync(fileName)? fs.readFileSync(fileName, 'utf-8') : '';

        },
        entityWiki = function(prefix, head, json) {

        head = head || 1;

        var fileWiki = prefix + '.wiki',
            fileTitle = prefix + '.title.txt',
            _res = '',
            title = readFileIfExists(fileTitle).trim();

        _res += title? (new Array(head + 2).join('=')) + title + '\n' : ''; // TODO: как-то сократить через &&

        _res += json? [
                '##',
                JSON.stringify(json),
                '##',
                '\n\n'
            ].join('') : '';

        _res += readFileIfExists(fileWiki);

        return _res;

        },

        level = this.getContext().getLevel(),
        levelPath = this.context.levels[0].path.replace('.bem', ''),
        block = level.getBlockByIntrospection(vars.BlockName),
        wiki;

    wiki = entityWiki(vars.Prefix, { block: vars.BlockName});

    block.mods &&
        (wiki += [
                '===',
                {ru:'Модификаторы',en:'Modificators'}[vars.Locale],
                '\n\n'
                ].join('')) &&
        block.mods.forEach(function(mod){

            wiki += entityWiki(levelPath + level['get-block-mod'](vars.BlockName, mod.name) + '.' + vars.Locale, 3);

            mod.vals && mod.vals.forEach(function(modVal){

                var json = { mods : {} };
                json.mods[mod.name] = modVal.name; // TODO: как сделать это в одну строку?

                wiki += entityWiki(levelPath + level['get-block-mod-val'](vars.BlockName, mod.name, modVal.name) + '.' + vars.Locale, 4, json);

            })

        });

        block.elems &&
        (wiki += [
                '===',
                {ru:'Элементы',en:'Elements'}[vars.Locale],
                '\n\n'
                ].join('')) &&
        block.elems.forEach(function(elem){

            wiki += entityWiki(levelPath + level['get-elem'](vars.BlockName, elem.name) + '.' + vars.Locale, 3, { elem: elem.name });

            elem.mods &&
            (wiki += [
                    '=====',
                    {ru:'Модификаторы элемента',en:'Modificators of elements'}[vars.Locale],
                    '\n\n'
                    ].join('')) &&
            elem.mods && elem.mods.forEach(function(mod){

                wiki += entityWiki(levelPath + level['get-elem-mod'](vars.BlockName, elem.name, mod.name) + '.' + vars.Locale, 5);

                mod.vals && mod.vals.forEach(function(modVal){

                    var json = { elem: elem.name, elemMods : {} };
                    json.elemMods[mod.name] = modVal.name; // TODO: как сделать это в одну строку?

                    wiki += entityWiki(levelPath + level['get-elem-mod-val'](vars.BlockName, elem.name, mod.name, modVal.name) + '.' + vars.Locale, 6, json);

                })

            })

    });

    return wiki;
}

