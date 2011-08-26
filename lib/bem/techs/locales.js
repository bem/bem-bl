// BEMTECH_locales_techs="`pwd`/lib/bem/techs/full.wiki.js" BEMTECH_locales_locales="ru en" bem create block -T lib/bem/techs/locales.js -l blocks-desktop/ b-link

var myPath = require('bem/lib/path'),
    env = process.env,
    envLocales = env.BEMTECH_locales_locales,
    locales = envLocales ? envLocales.split(' ') : ['ru'];

exports.techModule = module;

exports.bemCreate = function(prefix, vars) {
    var name = vars.BlockName,
        context = this.context,
        prefix = context.levels[0].get('block', [name]),
        techs = env.BEMTECH_locales_techs.split(':');

    bemUtil.mkdir(myPath.dirname(prefix));

    locales.forEach(function(locale) {
        var localePrefix = prefix + '.' + locale;
        techs.forEach(function(t) {
            context.getTech('', t).bemCreate(
                localePrefix,
                { BlockName: name, Prefix: localePrefix, Locale: locale });
        });
    });

    return this;
};
