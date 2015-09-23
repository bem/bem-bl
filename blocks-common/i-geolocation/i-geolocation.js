/**
 * Finding current position with Geolocation API
 */
BEM.DOM.decl('i-geolocation', {}, {

    get: function(params, callback) {

        if (arguments.length === 1) {
            callback = params;
            params = {};
        }

        params = $.extend({
            enableHighAccuracy: true, // получение координат с высокой точностью при наличии полноценного GPS
            timeout: 15, // таймаут 15 секунд
            cacheTime: 15 // геолокационный кэш на 15 минут
        }, params);

        params.timeout *= 1000;
        params.maximumAge = params.cacheTime * 1000 * 60;
        delete params.cacheTime;

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                function(data) {
                    callback(data);
                },
                // ошибка
                function(error) {
                    // 2 - пользователь отклонил запрос на получение текущего местоположения
                    // 3 - невозможно получить данные / нет ответа от спутников
                    // 4 - таймаут
                    // 5 - что-то ещё пошло не так / неизвестная ошибка
                    callback({
                        error: error.code + 1
                    });
                },
                params
            );
        } else {
            callback({
                error: 1
            });
        }

    }

});
