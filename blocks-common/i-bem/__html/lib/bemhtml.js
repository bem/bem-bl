//
// API
//
exports.translate = require('./bemhtml/api').translate;
exports.parse = require('./bemhtml/api').parse;
exports.compile = require('./bemhtml/api').compile;

//
// Jail grammar
//
exports.Jail = require('./ometa/jail').Jail;

//
// Naive-Cache
//
exports.cache = require('./bemhtml/cache');
