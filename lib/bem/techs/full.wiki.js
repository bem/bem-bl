var fs = require('fs'),
    path = require('path');

exports.techModule = module;

exports.newFileContent = function(vars) {

    var readFileIfExists = function(fileName) {

        return path.existsSync(fileName)? fs.readFileSync(fileName, 'utf-8') : '';

        },
        entityWiki = function(prefix, json) {

        var fileWiki = prefix + '.wiki',
            fileTitle = prefix + '.title.txt',
            _res = '',
            title = readFileIfExists(fileTitle).trim();

        _res += title? '===' + title + '\n' : ''; // TODO: как-то сократить через &&

        _res += [
                '##',
                JSON.stringify(json),
                '##',
                '\n\n'
            ].join('');

        _res += readFileIfExists(fileWiki);

        return _res;

        },

        block = this.getContext().getLevel().getBlockByIntrospection(vars.BlockName),
        wiki;

    wiki = entityWiki(vars.Prefix, { block: vars.BlockName})

    return wiki;
}

