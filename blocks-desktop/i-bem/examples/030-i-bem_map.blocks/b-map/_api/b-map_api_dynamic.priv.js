blocks['b-map_api_dynamic'] = function(data, params) {

    data.pushCSSJS({ name: 'map', elem: 'js', url: data.config.staticHost + 'bundles/map/_map.js' });
    data.pushCSSJS({ name: 'map', elem: 'css', content: 'borschik:include:../../../../../bundles/map/_map.less.css' });
    data.rdat.ua_is_ie() && data.pushCSSJS([
        { name: 'z-address', elem: 'css', content: 'borschik:include:../../../../../bundles/map/_map.less.ie.css', ie: 'lte IE 7' },
        { name: 'z-address', elem: 'css', content: 'borschik:include:../../../../../bundles/map/_map.less.ie6.css', ie: 'IE 6' }
    ]);

    var api = blocks['i-maps-api'],
        isStatic = data.proto.staticmap || (data.rdat.ua_is_ie() && /MSIE [6]/i.test(data.rdat.ua())),
        mapSize = api.mapSize,
        center = params.center,
        spn = params.spn,
        bounds = [
            [ center[0] - spn[0] / 2, center[1] - spn[1] / 2 ],
            [ center[0] + spn[0] / 2, center[1] + spn[1] / 2 ]
        ],
        imagePath = 'http://static-maps.yandex.ru/1.x/?lang=ru-RU&size=740,320&lg=0&key=AE_AjkgBAAAAVhRKNwIAC8tjU2RrhP-ZqBu8wUeLshaL0DUAAAAAAAAAAABvwCsB0jR6VKSmbT2ZrfeIDgc8bg==&ll=' + params.center.join(',') + (params.zoom ? '&z=' + params.zoom : '&spn=' + params.spn.join(',')),
        zoom = params.zoom || api.getCenterAndZoom(bounds, mapSize).zoom,
        gCenter = api.projection.toGlobalPixels(center, zoom),
        pointPixelCoords = function(point) {
            var gPoint = api.projection.toGlobalPixels([point.longitude, point.latitude], params.zoom);

            return {
                left: gPoint[0] - gCenter[0] + mapSize[0] / 2 - 9,
                top: gPoint[1] - gCenter[1] + mapSize[1] / 2 - 42
            };
        };

    imagePath += '&l=' + (params.layout || 'map');

    !params.zoom && (params.zoom = zoom);
    !(params.points instanceof Array) && (params.points = [params.points])

    return {
        block: 'b-map',
        url: params.mapUrl,
        mods: {
            'api': 'dynamic',
            'static': isStatic ? 'yes' : '',
            'geo-objects': ((params.points) ? 'yes' : ''),
            'geo-objects-search': ((params.searchText) ? 'yes' : '')
        },
        js: {
            type: (params.layout === 'sat,skl') ? 'yandex#hybrid' : 'yandex#map',
            mapUrl: params.mapUrl,
            lang: params.lang,

            center: params.center,
            spn: params.spn,
            zoom: params.zoom,

            points: params.points,
            streetLine: params.streetLine,
            userPos: params.userPos,
            total: params.total,

            searchText: params.searchText,

            counters: {
                wzrdType: params.counters.wzrdType,
                customParams: params.counters.customParams,
                dynamicCounter: params.counters.dynamicCounter
            }
        },
        content: [
            {
                elem: 'static-map',
                content: [
                    {
                        block: 'b-link',
                        mix: [ { block: 'b-map', elem: 'static-link' } ],
                        url: params.wzrdUrl,
                        target: data.prefsTarget,
                        counter: params.counters.counter('map')
                    },
                    !data.proto.tiles && {
                        elem: 'static-img',
                        src: imagePath
                    },
                    data.proto.tiles && (params.layout
                        ? params.layout.split(',')
                        : ['map']).map(function(type) {
                            return api.createTiles(params, type).map(function(tile) {
                                return {
                                    elem: 'tile',
                                    left: tile.left,
                                    top: tile.top,
                                    url: tile.url
                                }
                            })
                        }),
                    params.points.map(function(point, i) {
                        var pos = pointPixelCoords(point.location);
                        return {
                            block: 'i-geo-point',
                            mods: { type: point.type },
                            url: point.url,
                            target: data.prefsTarget,
                            title: point.title,
                            attrs: {
                                style: 'left: ' + Math.round(pos.left) + 'px; top: ' + Math.round(pos.top) + 'px; z-index: ' + (params.points.length - i) + ';'
                            },
                            content: (point.type !== 'single' && point.type !== 'adv') ? {
                                elem: 'cont',
                                content: point.name
                            } : ''
                        }
                    }),
                    !isStatic ? {
                        block: 'b-map',
                        elem: 'spin-pane',
                        content: {
                            block: 'b-spin',
                            js: true,
                            mods: {
                                progress: 'yes'
                            }
                        }
                    } : ''
                ]
            },
            {
                elem: 'controls',
                content: [
                    params.searchText && {
                        block: 'b-form-button',
                        mix: [ { block: 'b-map', elem: 'userlocation' } ],
                        mods: { theme: 'grey-sm', size: 'sm' },
                        target: data.prefsTarget,
                        content: [
                            {
                                block: 'b-map',
                                elem: 'control-icon',
                                mods: { type: 'userlocation' }
                            },
                            {
                                block: 'b-spin',
                                mods: { theme: 'grey-10', size: 10 },
                                js: true
                            }
                        ]
                    },
                    {
                        block: 'b-form-button',
                        mix: [ { block: 'b-map', elem: 'zoomout' } ],
                        mods: { theme: 'grey-sm', size: 'sm' },
                        target: data.prefsTarget,
                        content: [
                            {
                                block: 'b-map',
                                elem: 'control-icon',
                                mods: { type: 'zoomout' }
                            }
                        ]
                    },
                    {
                        block: 'b-form-button',
                        mix: [ { block: 'b-map', elem: 'zoomin' } ],
                        mods: { theme: 'grey-sm', size: 'sm' },
                        target: data.prefsTarget,
                        content: [
                            {
                                block: 'b-map',
                                elem: 'control-icon',
                                mods: { type: 'zoomin' }
                            }
                        ]
                    }
                ]
            },
            {
                block: 'b-form-button',
                mix: [ { block: 'b-map', elem: 'goto-map' } ],
                mods: { theme: 'grey-no-transparent-m', size: 'm' },
                url: params.mapUrl,
                target: data.prefsTarget,
                content: [
                    {
                        block: 'b-map',
                        elem: 'goto-map-icon'
                    },
                    data.i18n.get('На большую карту')
                ]
            }
        ]
    }
};

blocks['i-maps-api'] = (function() {
    // (c) twirl@

    var INV_LOG_2 = 1 / Math.log(2),
        log2 = function (x) {
            return INV_LOG_2 * Math.log(x);
        },

        mapSize = [ 740, 320 ],

        radius = 6378137,
        e = 0.0818191908426,

        cycleRestrict =  function (value, min, max) {

            if (value == Number.POSITIVE_INFINITY) {
                return max;
            } else if (value == Number.NEGATIVE_INFINITY) {
                return min;
            }
            return value - Math.floor((value - min) / (max - min)) * (max - min);
        },
        boundaryRestrict = function (value, min, max) {

            return Math.max(Math.min(value, max), min);
        };

    function Mercator() {
        var
        // Четные степени эксцентриситета
            e2 = e * e, e4 = e2 * e2, e6 = e4 * e2, e8 = e4 * e4,
            subradius = 1 / radius,
        // Предвычисленные коэффициенты для быстрого обратного преобразования Меркатора
        // Подробнее см. тут: http://mercator.myzen.co.uk/mercator.pdf формула 6.52
        // Работает только при небольших значения эксцентриситета!
            d2 = e2 / 2 + 5 * e4 / 24 + e6 / 12 + 13 * e8 / 360,
            d4 = 7 * e4 / 48 + 29 * e6 / 240 + 811 * e8 / 11520,
            d6 = 7 * e6 / 120 + 81 * e8 / 1120,
            d8 = 4279 * e8 / 161280,

            c_pi180 = Math.PI / 180,
            c_180pi = 180 / Math.PI;

        this.mercatorToGeo = function (mercator) {
            var longitude = this.xToLongitude(mercator[0]),
                latitude = this.yToLatitude(mercator[1]);

            return [longitude, latitude];
        };

        this.geoToMercator = function (geo) {
            return [
                this.longitudeToX(geo[0]),
                this.latitudeToY(geo[1])
            ];
        };

        this.xToLongitude = function (x) {
            return cycleRestrict(x * subradius, -Math.PI, Math.PI) * c_180pi;
        };

        this.yToLatitude = function (y) {
            var xphi = Math.PI * 0.5 - 2 * Math.atan(1 / Math.exp(y * subradius)),
                latitude = xphi + d2 * Math.sin(2 * xphi) + d4 * Math.sin(4 * xphi) + d6 * Math.sin(6 * xphi) + d8 * Math.sin(8 * xphi);

            return latitude * c_180pi;
        };

        this.longitudeToX = function (lng) {
            var longitude = cycleRestrict(lng * c_pi180, -Math.PI, Math.PI);
            return radius * longitude;
        }

        this.latitudeToY = function (lat) {
            var latitude = boundaryRestrict(lat, -90, 90) * c_pi180,
                epsilon = 1e-10,
                esinLat = e * Math.sin(latitude);

            // Для широты -90 получается 0, и в результате по широте выходит -Infinity
            var tan_temp = Math.tan(Math.PI * 0.25 + latitude * 0.5) || epsilon,
                pow_temp = Math.pow( Math.tan(Math.PI * 0.25+ Math.asin(esinLat) * 0.5), e),
                U = tan_temp / pow_temp;

            return radius * Math.log(U);
        };
    }

    var mercator = new Mercator();

    function GeoToGlobalPixels() {
        var equator = 2 * Math.PI * radius,
            subequator = 1 / equator,
            halfEquator = equator / 2,
            currentZoom = 0,
            c_180pi = 180 / Math.PI,
            pixelsPerMeter = 256 * subequator;

        this.fromGlobalPixels = function(vector, zoom) {
            if (zoom != currentZoom) {
                pixelsPerMeter = Math.pow(2, zoom + 8) * subequator;
                currentZoom = zoom;
            }
            var longitude = this._globalPixelXToGeo(vector[0], zoom),
                latitude = mercator.yToLatitude(halfEquator - vector[1] / pixelsPerMeter);

            return [longitude, latitude];
        };

        this.toGlobalPixels = function(point, zoom) {
            if (zoom != currentZoom) {
                pixelsPerMeter = Math.pow(2, zoom + 8) * subequator;
                currentZoom = zoom;
            }

            var mercatorCoords = mercator.geoToMercator(point);
            return [
                (halfEquator + mercatorCoords[0]) * pixelsPerMeter,
                (halfEquator - mercatorCoords[1]) * pixelsPerMeter
            ];
        };

        this.isCycled = function () {
            return [true, false];
        };

        // Метод для прямого перевода пиксельных координат по x в градусы.
        // Сделан в обход стандартных преобразований пиксели -> метры -> градусы
        // из-за больших потерей точности при делении и умножении на радиус сферы.
        this._globalPixelXToGeo = function (x, zoom) {
            return cycleRestrict(Math.PI * x / Math.pow(2, zoom + 7) - Math.PI, -Math.PI, Math.PI) * c_180pi;
        }
    }

    var projection = new GeoToGlobalPixels();

    function getCenterAndZoom(bounds, containerSize) {
        var pixelLowerCorner = projection.toGlobalPixels(bounds[0], 0),
            pixelUpperCorner = projection.toGlobalPixels(bounds[1], 0),
            isInverted = [
                bounds[0][0] > bounds[1][0],
                bounds[0][1] > bounds[1][1]
            ],
            isCycled = projection.isCycled(),
            zoom;

        if (isCycled[0] && isInverted[0]) {
            pixelUpperCorner[0] = cycleRestrict(
                pixelUpperCorner[0],
                pixelLowerCorner[0],
                pixelLowerCorner[0] + 256
            );
        }

        if (isCycled[1] && isInverted[1]) {
            pixelUpperCorner[1] = cycleRestrict(
                pixelUpperCorner[1],
                pixelLowerCorner[1],
                pixelLowerCorner[1] + 256
            );
        }

        var deltaX = Math.abs(pixelUpperCorner[0] - pixelLowerCorner[0]),
            deltaY = Math.abs(pixelUpperCorner[1] - pixelLowerCorner[1]);
        zoom = Math.max(0, Math.min(

            // минимальное расстояние между границами bounds выставляем чуть больше 1
            // чтобы не было деления на 0
            log2(containerSize[0] / Math.max(deltaX, 1e-10)),
            Math.abs(log2(containerSize[1] / Math.max(deltaY, 1e-10)))
        ));

        return {
            center: projection.fromGlobalPixels([
                cycleRestrict(.5 * (pixelLowerCorner[0] + pixelUpperCorner[0]), 0, 256),
                cycleRestrict(.5 * (pixelLowerCorner[1] + pixelUpperCorner[1]), 0, 256)
            ], 0),

            //фикс ошибки математики плавающей точки
            zoom: Math.floor(zoom + 1e-10)
        };
    }

    function createTiles (params, type) {
        var worldSize = Math.pow(2, params.zoom),
            tileUrlTemplate = {
                map: 'http://vec0%d.maps.yandex.net/tiles?l=map&%c&lang=' + params.lang,
                sat: 'http://sat0%d.maps.yandex.net/tiles?l=sat&%c&lang=ru-RU' + params.lang,
                skl: 'http://vec0%d.maps.yandex.net/tiles?l=skl&%c&lang=ru-RU' + params.lang
            }[type], // шаблон урла тайлов

            lat = params.center[1] * Math.PI / 180,
            mercatorCoords = [
                radius * params.center[0] * Math.PI / 180,
                radius * Math.log(
                    Math.tan(Math.PI * 0.25 + lat * 0.5) /
                        Math.pow(Math.tan(Math.PI * 0.25 + Math.asin(e * Math.sin(lat)) * 0.5), e)
                )
            ],

            halfEquator = Math.PI * radius,
            pixelsPerMeter = Math.pow(2, params.zoom + 7) / halfEquator,
            pixelCenter = [
                (halfEquator + mercatorCoords[0]) * pixelsPerMeter,
                (halfEquator - mercatorCoords[1]) * pixelsPerMeter
            ],

            lowerCorner = [
                Math.floor((pixelCenter[0] - mapSize[0] / 2) / 256),
                Math.floor((pixelCenter[1] - mapSize[1] / 2) / 256)
            ],
            upperCorner = [
                Math.ceil((pixelCenter[0] + mapSize[0] / 2) / 256),
                Math.ceil((pixelCenter[1] + mapSize[1] / 2) / 256)
            ],

            processTemplate = function (number) {
                return tileUrlTemplate
                    .replace('%d', ((number[1] & 1) + ((number[0] & 1) << 1) + 1).toString())
                    .replace('%c', 'x=' + number[0] + '&y=' + number[1] + '&z=' + params.zoom);
            },
            cycle = function (x) {
                return x < 0 ? (x % worldSize + worldSize) : (x % worldSize);
            },
            tiles = [];

        for (var x = lowerCorner[0]; x <= upperCorner[0]; x++) {
            for (var y = lowerCorner[1]; y <= upperCorner[1]; y++) {
                var number = [
                        cycle(x),
                        Math.min(Math.max(0, y), worldSize - 1)
                    ],
                    diff = [
                        (x - lowerCorner[0]) / (upperCorner[0] - lowerCorner[0]) - 0.5,
                        (y - lowerCorner[1]) / (upperCorner[1] - lowerCorner[1]) - 0.5
                    ];

                tiles.push({
                    priority: diff[0] * diff[0] + diff[1] * diff[1] + 1e-5 * Math.random(),
                    url: processTemplate(number),
                    left: (x * 256 - Math.round(pixelCenter[0]) + mapSize[0] / 2),
                    top: (y * 256 - Math.round(pixelCenter[1]) + mapSize[1] / 2)
                });
            }
        }

        tiles.sort(function (a, b) {
            return a.priority - b.priority;
        });

        return tiles;
    }


    return {
        mapSize: mapSize,
        mercator: mercator,
        projection: projection,
        getCenterAndZoom: getCenterAndZoom,
        createTiles: createTiles
    }
})();

blocks['i-route-info'] = function (data, wzrd, mapUrl, address, counterPrefix) {
    var i18n = data.i18n,
        statfaceCounter = blocks['i-map-stat'];
    counterPrefix = counterPrefix ? (counterPrefix + '/') : '';

    return {
        elem: 'route',
        content: i18n.sprintf('Как добраться %{car# на машине}s, %{public# транспортом}s', {
            car: {
                block: 'b-link',
                url: mapUrl + '&rtt=&rt=~' + encodeURIComponent(address),
                target: data.prefsTarget,
                counter: statfaceCounter(counterPrefix + 'route/car'),
                content: i18n.get('на машине')
            },
            'public': {
                block: 'b-link',
                url: mapUrl + '&rtt=mt&rt=~' + encodeURIComponent(address),
                target: data.prefsTarget,
                counter: statfaceCounter(counterPrefix + 'route/transport'),
                content: i18n.get('транспортом')
            }
        })
    }
};