(function() {

var decls = {};

function buildTestName(desc) {

    typeof desc == 'string' && (desc = { block : desc });

    return desc.block +
        (desc.elem? '__' + desc.elem : '') +
        (desc.modName? '_' + desc.modName + '_' + desc.modVal : '');

}

BEM.TEST = {

    /**
     * Декларирует тест
     * @protected
     * @param {String|Object} desc имя блока (простой синтаксис) или описание
     * @param {Function} test описание теста в формате jasmine
     */
    decl : function(desc, test) {

        var testName = buildTestName(desc);
        decls[testName] || (decls[testName] = []).push(test);

    },

    /**
     * Добавляет тесты к "запускатору" тестов
     * @param {Array} blocks
     */
    add : function(blocks) {

        blocks?
            $.each($.makeArray(blocks), function(i, desc) {
                var testName = buildTestName(desc);
                if(!decls[testName])
                    throw('undefined test ' + testName);

                $.each(decls[testName], function() {
                    describe(testName, this);
                });
            }) :
            $.each(decls, function(testName) {
                $.each(this, function() {
                    describe(testName, this);
                });
            });

    }

};

BEM.DOM.decl('i-bem__test', {

    onSetMod : {

        'js' : function() {

            BEM.TEST.add(this.params.tests);

        }

    }


});

})();