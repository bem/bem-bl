var PATH = require('path'),
    join = PATH.join,
    environ = require('bem-environ'),

    PRJ_ROOT = environ.PRJ_ROOT,
    PRJ_TECHS = join(PRJ_ROOT, '.bem/techs'),
    BEMBL_TECHS = join(PRJ_ROOT, 'blocks-common/i-bem/bem/techs'),
    BEM_SETS;

try {
    BEM_SETS = require('bem-sets');
} catch(err) {
    // bem-sets нужны только для сборки примеров и документации в islands-components.
    // Когда библиотека подключается для использования на проекте, технологии из getTechs()
    // ниже не будут использоваться, но уровень все равно инициализируется и код в этом файле
    // выполняется. bem-sets в этом случае может быть не установлен, поэтому ошибку
    // от require('bem-sets') нужно обработать и продолжить работу.
}

exports.getTechs = function() {

    return {
        'js'            : join(BEMBL_TECHS, 'js.js'),
        'css'           : 'css',
        'ie.css'        : 'ie.css',
        'ie6.css'       : 'ie6.css',
        'ie7.css'       : 'ie7.css',
        'ie8.css'       : 'ie8.css',
        'ie9.css'       : 'ie9.css',

        'bemhtml'       : join(BEMBL_TECHS, 'bemhtml.js'),

        'examples'      : '',
        'title.txt'     : join(PRJ_TECHS, 'i18n.title.txt'),
        'desc.wiki'     : join(PRJ_TECHS, 'i18n.desc.wiki'),
        'desc.md'       : BEM_SETS? BEM_SETS.resolveTech('desc.md'): 'desc.md',
        'thumb.svg'     : '',
        'thumb.png'     : ''
    };
};

exports.defaultTechs = ['css', 'js', 'bemhtml'];
