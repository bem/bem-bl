var PATH = require('path');

// путь до базовой технологии
exports.baseTechPath = require.resolve('bem/lib/techs/v2/level-proto');

// пеопределяем метод `getBaseLevel`, указываем, что в качестве уровня
// для собранных примеров нужно использовать уровень бандлов
exports.getBaseLevel = function() {
    return PATH.resolve(__dirname, '../levels/bundles.js');
};
