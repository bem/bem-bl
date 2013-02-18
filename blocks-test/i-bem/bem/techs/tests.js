/*global processFile: true, process: true*/

/**
 * Technology for dynaic generating test page.
 * Not ordinary way to pass parameters: directories pathes passes as BlockName.
 * Page-test is created in PAGE_TEST_PATH with name PAGE_TEST_NAME (see below).
 */

/**
 * Debug mode
 */
var DEBUG = process.env.TESTS_DEBUG || false;

/**
 * Template for page (bemjson)
 * String '%TESTS%' will be replaced to test declarations
 */
var PAGE_TEMPLATE = process.env.TESTS_TEMPLATE || __dirname + '/../../__template/i-bem__template.bemjson.js';

var util = require('util');
var vm = require('vm');
var fs = require('fs');
var path = require('path');

var PAGE_TEST_NAME = 'unit';
var PAGE_TEST_PATH = './tests/' + PAGE_TEST_NAME + '/';

/**
 * Context for execution BEM.TEST declarations
 * It's hack for collection declarations.
 */
var context = vm.createContext({

    getTestDecls: function () {
        return this.BEM.TEST._decls;
    },

    BEM: {
        TEST: {
            _decls: [],
            decl: function (desc) {
                this._decls.push(typeof desc === 'string' ? {block : desc}: desc);
            }
        }
    }

});

/**
 * Async forEach method
 * @param {Array} array
 * @param {Function} onArrayItem Callback is executed for each array item
 * @param {Function} onComplete Callback is executed after procesing all items
 */
function asyncForEach(array, onArrayItem, onComplete) {
    var loadCounter = 0;

    if (!array.length) {
        onComplete();
        return;
    }

    array.forEach(function (item) {
        onArrayItem(item, function () {
            if (++loadCounter === array.length) {
                onComplete(array);
            }
        });
    });
}

/**
 * Find files
 * @param {String} dirPath Directory
 * @param {Function} fileCallback Callback is executed for each file
 * @param {Function} completeCallback
 */
function findFiles (dirPath, fileCallback, completeCallback) {
    // Calls counter of async read operations
    // If it is zero then find will finish
    var seek = 0;

    function checkComplete () {
        if (!seek) {
            completeCallback();
        }
    }

    function processDir (dirPath, fileCallback) {
        seek++;

        fs.readdir(dirPath, function (err, files) {
            if (err) {
                throw err;
            }

            files.forEach(function (file) {
                processFile(dirPath, file, fileCallback);
            });

            seek--;
            checkComplete();
        });
    }

    function processFile (dirPath, file, fileCallback) {
        seek++;

        var filePath = dirPath + '/' + file;
        fs.stat(filePath, function (err, stat) {
            if (err) {
                throw err;
            }

            // Skip syntatic files (they starts with ".")
            if (file[0] !== '.') {
                if (stat.isDirectory()) {
                    processDir(filePath, fileCallback);
                } else {
                    fileCallback(file, dirPath);
                }
            }

            seek--;
            checkComplete();
        });
    }

    processDir(dirPath, fileCallback);
}

/**
 * Finds tests and collects them into context
 * @param {String} dirName Path for tests
 * @param {Function} callback Complete callback
 */
function processTests(dirName, callback) {
    var files = [];

    if (DEBUG) {
        util.puts('[DEBUG] Proccess dir "' + dirName + '"');
    }

    findFiles(
        dirName,
        function (fileName, dirPath) {
            if (fileName.match(/^.*\.(test\.js)$/i)) {
                files.push(dirPath + '/' + fileName);
            }
        },
        function () {
            if (DEBUG) {
                util.puts('[DEBUG] Found test files: \n[DEBUG]\t\t' + files.join('\n[DEBUG]\t\t'));
            }

            asyncForEach(
                files,
                function (file, callback) {
                    fs.readFile(file, 'utf8', function (err, data) {
                        if (err) {
                            throw err;
                        }
                        vm.runInContext(data, context);
                        callback();
                    });
                },
                callback
            );
        }
    );
}

function saveBEMJSON(path, decls) {
    fs.readFile(PAGE_TEMPLATE, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        var bemjson = data.replace("'%TESTS%'", JSON.stringify(decls));

        if (DEBUG) {
            util.puts('[DEBUG] bemjson.js: ' + bemjson);
        }

        fs.writeFile(path, '(' + bemjson + ')', 'utf-8');
    });
}

function saveDepsJs(path, decls) {
    var depsjs = JSON.stringify(
        {
            shouldDeps: decls.map(function (decl) {
                return {
                    block: decl.block,
                    elem: decl.elem,
                    mods: decl.modName && [decl].reduce(function (result, decl) {
                        result[decl.modName] = decl.modVal;
                        return result;
                    }, {})
                };
            })
        }
    );

    if (DEBUG) {
        util.puts('[DEBUG] deps.js: ' + depsjs);
    }

    fs.writeFile(path, '(' + depsjs + ')', 'utf-8');
}

/**
 * Create bemjson.js and deps.js using set of BEM.TEST declarations
 * @param {String} vars.BlockName Block name is used as set of pathes for tests
 */
exports.create = function (prefix, vars, force) {
    var testsPath = PAGE_TEST_PATH;

    if (DEBUG) {
        util.puts('\n[DEBUG] Start handling technology TEST.JS');
        util.puts('[DEBUG] Tests dirs: ' + vars.BlockName);
    }

    if (!vars.BlockName) {
        return;
    }

    asyncForEach(
        vars.BlockName.trim().split(' '),
        processTests,
        function () {
            if (DEBUG) {
                util.puts('[DEBUG] Create files..');
            }

            (testsPath + 'blocks/b-page').split('/').reduce(function (result, part) {
                result += part + '/';
                if (!path.existsSync(result)) {
                    fs.mkdirSync(result, 0777);
                }
                return result;
            }, '');

            saveBEMJSON(testsPath + PAGE_TEST_NAME + '.bemjson.js', context.getTestDecls());
            saveDepsJs(testsPath + 'blocks/b-page/b-page.deps.js', context.getTestDecls());

            if (DEBUG) {
                util.puts('[DEBUG] Finish handling technology TEST.JS\n');
            }
        }
    );
};
