var myPath = require('bem/lib/path'),
    sys = require('sys'),
    fs = require('fs'),
    xjst = require('xjst');

exports.techModule = module;
exports.bemBuild = function (prefixes, outputDir, outputName) {

    var sources = this
        .filterExists(prefixes)
        .map(function(file) { return fs.readFileSync(file) })
        .join('\n');

    try {
        var bemhtml = require('../../__html/lib/bemhtml.js'),
            tree = bemhtml.BEMHTMLParser.matchAll(
                sources,
                'topLevel',
                undefined,
                function(m, i) {
                    console.log(arguments);
                    throw { errorPos: i, toString: function(){ return "match failed" } } } );
        //process.stdout.write('--- tree:\n' + JSON.stringify(tree) + '\n\n');

        var xjstSources = bemhtml.BEMHTMLToXJST.match(
            tree,
            'topLevel',
            undefined,
            function(m, i) {
                process.stdout.write(JSON.stringify(arguments));
                throw { toString: function(){ return "compilation failed" } } } );
        //process.stdout.write('--- compile:\n' + compileFn + '\n\n');
        /*
        fs.createWriteStream(
                myPath.join(
                    outputDir,
                    outputName + '.' + this.getTechName() + '.xjst'),
                { encoding: 'utf8' })
            .write(xjstSources);
        */


        var xjstTree = xjst.parse(xjstSources),
            xjstJS = process.env.BEMHTML_ENV == 'development' ?
                xjst.XJSTCompiler.match(xjstTree, 'topLevel') :
                xjst.compile(xjstTree);

        //process.stdout.write('--- compile:\n' + xjstJS + '\n\n');
        var out = fs.createWriteStream(
          myPath.join(
              outputDir,
              outputName + '.' + this.getTechName() + '.js'),
          { encoding: 'utf8' }
        );

        if (process.env.BEMHTML_ENV == 'development') {
          try {
              xjstJS = require('vm').runInThisContext(xjstJS).apply;
          } catch(e) { console.log(e) }
          out.write('var BEMHTML = ' + xjstJS.apply);
        } else {
          out.write('var BEMHTML = ' + xjstJS + ';BEMHTML = BEMHTML.apply;');
        }

    } catch (e) {
        e.errorPos != undefined &&
            sys.error(
                sources.slice(0, e.errorPos) +
                "\n--- Parse error ->" +
                sources.slice(e.errorPos) + '\n');
        console.log('error: ' + e);
        throw e
    }


    return this;
};
