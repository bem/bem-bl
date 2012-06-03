BEM.DOM.decl('i-geolocation', {}, {

    get: function(params, callback) {

        if (arguments.length === 1) {
            callback = params;
            params = {};
        }

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
                // параметры
                {
                    // получение координат с высокой точностью при наличии полноценного GPS
                    enableHighAccuracy: params.enableHighAccuracy || true,
                    // таймаут 15 секунд
                    timeout: params.timeout * 1000 || 15000,
                    // геолокационный кэш на 15 минут
                    maximumAge: params.cacheTime * 60000 || 900000
                }
            );
        } else {
            callback({
                error: 1
            });
        }

    }

});