module.exports = require('enb/lib/build-flow').create()
    .name('i18n-bemdecl')
    .target('target', '?.bemdecl.js')
    .builder(function () {
        var blocks = [{
            name: 'i-bem',
            elems: [{ name: 'i18n' }]
        }];

        return 'exports.blocks = ' + JSON.stringify(blocks) + ';';
    })
    .createTech();
