var myPath = require('bem/lib/path'),
    sys = require('util'),
    fs = require('fs'),
    xjst = require('xjst');

exports.techModule = module;

exports.bemBuild = function (prefixes, outputDir, outputName) {

    var bemhtml = require('../../__html/lib/bemhtml.js'),
        sources = this
            .filterExists(prefixes)
            .map(function(file) {
                return [
                    '/* ' + file + ': start */',
                    fs.readFileSync(file),
                    '/* ' + file + ': end */',
                    '\n'
                ].join('\n');
            })
            .join('\n');

    try {
        var tree = bemhtml.BEMHTMLParser.matchAll(
            sources,
            'topLevel',
            undefined,
            function(m, i) {
                console.log(arguments);
                throw { errorPos: i, toString: function() { return "bemhtml match failed" } }
            });

        var xjstSources = bemhtml.BEMHTMLToXJST.match(
            tree,
            'topLevel',
            undefined,
            function(m, i) {
                console.log(arguments);
                throw { toString: function() { return "bemhtml to xjst compilation failed" } };
            });
    } catch (e) {
        e.errorPos != undefined &&
            sys.error(
                sources.slice(0, e.errorPos) +
                "\n--- Parse error ->" +
                sources.slice(e.errorPos) + '\n');
        console.log('error: ' + e);
        throw e;
    }

    try {
        var xjstTree = xjst.parse(xjstSources);
    } catch (e) {
        throw new Error("xjst parse failed");
    }

    try {
        var xjstJS = process.env.BEMHTML_ENV == 'development' ?
            xjst.XJSTCompiler.match(xjstTree, 'topLevel') :
            xjst.compile(xjstTree);
    } catch (e) {
        throw new Error("xjst to js compilation failed");
    }

    var filename = myPath.join(outputDir,
            outputName + '.' + this.getTechName() + '.js'),
        content = 'var BEMHTML = ' + xjstJS + ';BEMHTML = BEMHTML.apply;';
    fs.writeFileSync(filename, content);

    return this;
};
