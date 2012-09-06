BEM.DOM.decl({ name: 'b-map', modName: 'api', modVal: 'dynamic' }, {

    onSetMod: {

        'js' : function() {
            this.hasMod('static') || this.loadMapsApi();
        }

    },

    // загружаемые пакеты
    mapsPakages: [
        // step one
        [
            'templateLayoutFactory',
            'hotspot.Layer',
            'hotspot.ObjectSource',
            'geometry.pixel.LineString',
            'package.geoObjects'
        ],
        // step two
        [
            'package.map'
        ]
    ],

    // загрузчик API
    loadMapsApi: function() {
        var _this = this;

        if (!window.ymaps) {
            var apiScript = document.createElement('script'),
                apiCallback = 'ymapsloaded';

            window[apiCallback] = function() {
                _this.onAPILoaded();
            }

            apiScript.src = ['http://api-maps.yandex.ru/2.0/?',
                'ns=ymaps',
                '&coordorder=longlat',
                '&load=' + this.mapsPakages[0].join(','),
                '&lang=' + this.params.lang,
                '&mode=release',
                '&onload=' + apiCallback].join('');

            document.getElementsByTagName('head')[0].appendChild(apiScript);
        } else {
            this.onAPILoaded();
        }
    },

    // после загрузки API
    onAPILoaded: function() {
        ymaps.load(this.mapsPakages[1].join(','), function() {
            this.initMap();
        }, this);
    },

    // инициализация карты
    initMap: function() {
        var _this = this,
            domElem = this.domElem,
            center = this.params.center || [55.76, 37.64],
            spn = this.params.spn,
            bounds = spn && [
                [ center[0] - spn[0] / 2, center[1] - spn[1] / 2 ],
                [ center[0] + spn[0] / 2, center[1] + spn[1] / 2 ]
            ],
            zoom = this.params.zoom || (spn && ymaps.util.bounds.getCenterAndZoom(bounds, [ domElem.width(), domElem.height() ]).zoom) || 10;

        this.ymap = new ymaps.Map(this.elem('map')[0], {
            type: this.params.type,
            center: center,
            zoom: zoom,
            behaviors:  ['drag', 'dblClickZoom', 'multiTouch']
        });

        this.ymap.zoomRange.get().then(function(range) {
            if (zoom > range[1]) {
                _this.ymap.setZoom(range[1], {
                    callback: function() { _this.showMap(); }
                });
            } else {
                _this.showMap();
            }
        });

        this._extendsYmaps(ymaps);

        this.attachEvents();

        if (this.params.userPos)
            this.showYa(this.params.userPos);

        this.trigger('map-inited');
    },

    // скрываем статическую карту, показываем динамику
    showMap: function() {
        this.elem('map').css('visibility', 'visible');
    },

    // слушаемые события
    attachEvents: function() {
        this.ymap.events
            .add('click', function() {
                var _this = this;

                this.trigger('user-action', { type: 'click' });
            }, this)
            .add('dblclick', function() {
                if (this.firstClickTimer) {
                    clearTimeout(this.firstClickTimer);
                    this.firstClickNeedSend = 0;
                }

                this.trigger('user-action', { type: 'dblclick' });
            }, this)
            .add('mousedown', function() {
                this.trigger('user-action', { type: 'mousedown' });
            }, this)
            .add('wheel', function() {
                this.trigger('user-action', { type: 'wheel' });
            }, this)
            .add('balloonopen', function() {
                this.trigger('user-action', { type: 'balloonopen' });
            }, this)
            .add('boundschange', this._onBoundsChangeCounter, this);

        this.on('user-action', this._onUserAction, this);
    },

    // расширение для api-карт, чтобы отображать линии с помощью полигона
    _extendsYmaps: function(ymaps) {
        !ymaps.overlay && (ymaps.overlay = {});
        ymaps.overlay.MultiLine = (function () {

            /**
             * @implements ymaps.IOverlay
             */
            function Overlay(geometry, data, options) {
                this._geometry = geometry;
                this._data = data;
                this.options = new ymaps.option.Manager(options);
                this.events = new ymaps.event.Manager({
                    context: this
                });
            }

            Overlay.prototype = {

                setMap: function (map) {
                    this._map = map;

                    if (map) {
                        this._onAddToMap(map);
                    } else {
                        this._onRemoveFromMap();
                    }
                },

                getMap: function () {
                    return this._map;
                },

                _onAddToMap: function (map) {
                    if (!this._graphicsOverlay) {
                        this._graphicsOverlay = ymaps.geoObject.overlayFactory.interactiveGraphics.createOverlay(this._getLineGeometry(), this._data);
                    }
                    this._graphicsOverlay.events.setParent(this.events);
                    this._graphicsOverlay.options.setParent(this.options);
                    this._graphicsOverlay.setMap(map);
                },

                _onRemoveFromMap: function () {
                    if (this._graphicsOverlay) {
                        this._graphicsOverlay.setMap(null);
                        this._graphicsOverlay = null;
                    }
                },

                setGeometry: function (geometry) {
                    this._geometry = geometry;
                    if (this._map) {
                        this._graphicsOverlay.setGeometry(this._getLineGeometry());
                    }
                },

                getGeometry: function () {
                    return this._geometry;
                },

                getData: function () {
                    return this._data;
                },

                _getLineGeometry: function () {
                    var coords = this.getGeometry().getCoordinates();

                    return new ymaps.geometry.pixel.LineString(
                        coords.reduce(function (result, coord) {
                            return result.concat(coord.splice(0, coord.length - 1), 0);
                        }, [])
                    );
                }

            };

            return Overlay;

        }());
    },

    _onUserAction: function(e, data) {
        data && data.type != 'mousedown' && (this.firstClickNeedSend = 0)
        this.isUserAction = (!data || !data.controls);
        this.elem('goto-map').show();
    },

    _mapButtonUpdate: function(e, data) {
        var bounds = data.bounds,
            pointId = data.selectedPoint && data.selectedPoint.params.id;

        this.elem('goto-map').attr(
            'href',
            this.params.mapUrl.replace(/\&?(source)=[^&$]*/gi, '') +
                ( (this.hasMod('geo-objects-yes') || pointId) ? '&where=' : '' ) +
                '&ll=' + data.center.join() +
                '&spn=' + [ bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1] ].join() +
                '&z=' + data.zoom +
                ((pointId)
                    ? ('&ol=biz'+ '&oid=' + pointId)
                    : ''
                )
        );
    },

    _onBoundsChangeCounter: function(e) {
    },

    // определить положение по geo api
    _geoLocation: function() {
        var _this = this;

        BEM.blocks['i-geolocation'].get({}, function(data) {
            if (data.error) {
                spin.delMod('progress');
                icon.show();
            } else {
                var yaPointData = {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                };

                this._ajax = BEM.create('i-request_type_ajax', {
                    url: '//www.yandex.ru/gpsave',
                    dataType: 'jsonp',
                    callbackCtx: _this
                });

                this._ajax.get({
                        lon: data.coords.longitude,
                        lat: data.coords.latitude,
                        precision: data.coords.accuracy,
                        persistent: 1,
                        device: 1,
                        format: 'JSONP',
                        lang: 'ru',
                        yu: Lego.params.yandexuid
                    },
                    function(data) {
                        yaPointData.address = data.address;

                        this.showYa(yaPointData, function() {
                            this.findBlockInside('controls', 'b-spin').delMod('progress');
                            this.findElem('control-icon', 'type', 'userlocation').show();

                            this.getGeoData(null, null, function() {
                                this.fitAll();
                            });
                        });
                    }
                );
            }
        });
    },

    // выставить метку Я
    showYa: function(coords, callback) {
        if (this.yaPoint)
            this.ymap.geoObjects.remove(this.yaPoint);

        this.yaPoint = new ymaps.Placemark([ coords.longitude, coords.latitude ], {
            iconContent: 'ya',
            iconType: 'ya',

            hintContent: 'Ваше местоположение', // TODO: I18N!

            balloonContentBody: coords.address,
            balloonContentHeader: 'Ваше местоположение',
            isIconHovered: 'no'
        }, {
            iconLayout: ymaps.templateLayoutFactory.createClass(
                '<div class="i-geo-point i-geo-point_type_ya i-geo-point_hovered_$[properties.isIconHovered]"> </div>'
            ),
            zIndex: 1,
            openBalloonOnClick: true,
            balloonAutoPan: true,
            balloonMaxWidth: 320,
            balloonMaxHeight: 250
        });

        this.ymap.geoObjects.add(this.yaPoint);

        callback && callback.call(this);
    },

    // длительность анимации
    animDuration: 400,

    getCenter: function() {
        return this.ymap.getCenter();
    },

    getZoom: function() {
        return this.ymap.getZoom();
    },

    getGlobalPixelCenter: function() {
        return this.ymap.getGlobalPixelCenter();
    },

    getBounds: function() {
        return this.ymap.getBounds();
    },

    toGlobalPixels: function(coords, zoom) {
        return ymaps.projection.wgs84Mercator.toGlobalPixels([ parseFloat(coords[0]), parseFloat(coords[1]) ], zoom || this.ymap.getZoom())
    },

    fromGlobalPixels: function(coords, zoom) {
        return ymaps.projection.wgs84Mercator.fromGlobalPixels([ parseFloat(coords[0]), parseFloat(coords[1]) ], zoom || this.ymap.getZoom());
    },

    setCenter: function(center, zoom) {
        zoom = zoom || this.getZoom();
        this.setGlobalPixelCenter(this.toGlobalPixels(center, zoom), zoom);
    },

    setGlobalPixelCenter: function(center, zoom) {
        this.ymap.setGlobalPixelCenter(
            center,
            zoom || this.getZoom(),
            {
                //checkZoomRange: true,
                duration: this.animDuration
            }
        );
    },

    changeZoom: function(dz) {
        this.zoomChain = this.zoomChain || [];
        this.zoomChain.push(dz);

        if (this.zoomChain.length === 1)
            this._changeZoom();
    },

    _changeZoom: function(dz) {
        var zoomRange = this.ymap.zoomRange.getCurrent(),
            onActionEnd = function() {
                var dz = this.zoomChain.shift();

                this.ymap.action.events.remove('end', onActionEnd, this);

                dz && this._changeZoom(this.getZoom() + dz);
            };


        if (this.ymap.action.getCurrentState().isTicking) {
            this.ymap.action.events.add('end', onActionEnd, this);
        } else {
            var zoom = this.getZoom() + this.zoomChain.shift();

            // выставляем зум, если можно
            if (zoom >= zoomRange[0] && zoom <= zoomRange[1]) {
                this.setGlobalPixelCenter(this.toGlobalPixels(this.getCenter(), zoom), zoom);
                this.ymap.action.events.add('end', onActionEnd, this);
            } else {
                this.zoomChain.shift();
                this.zoomChain.length && this._changeZoom();
            }
        }
    },

    // передвинуть карту на точку
    moveTo: function(center, zoom) {
        this.setGlobalPixelCenter(this.toGlobalPixels(center, zoom), zoom);
    },

    destruct: function() {
        delete ymaps;
        this.ymap.destroy();
        delete this.ymap;
    }
}, {

});
