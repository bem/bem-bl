BEM.decl({ name : 'b-form-input__dataprovider', baseBlock : 'i-request_type_ajax' }, {

    get : function(request, callback) {

        return this.__base(
            { part : request },
            function(data) {
                callback.call(this, { items: data[1], metainfo: data[2] })
            });

    }

});
