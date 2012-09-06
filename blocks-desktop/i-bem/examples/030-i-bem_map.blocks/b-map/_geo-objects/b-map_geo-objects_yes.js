BEM.DOM.decl({ name: 'b-map', modName: 'geo-objects', modVal: 'yes' }, {

    // инициализация карты
    initMap: function() {
        this.geoObjectsArray = [];
        this.selected = null;

        this.__base.apply(this, arguments);

        this.params.points && this.createGeoObjects(this.params.points);

        this.params.streetLine && this.createStreetLine(this.params.streetLine);
    },

    attachEvents: function() {
        this.__base.apply(this, arguments);

        // хендлеры событий на точках карты
        this.pointsHandlers = {
            'point-add': function(e) {
                this._addPoint(e.target.mapPoint);
            },

            'point-mouseenter': function(e, data) {
                this._hoverPoint(this._getTargetPoint(e, data));
            },

            'point-mouseleave': function(e, data) {
                this._unhoverPoint(this._getTargetPoint(e, data));
            },

            'point-select': function(e, data) {
                this._selectPoint(this._getTargetPoint(e, data));
            },

            'point-del':function(e, data) {
                this._delPoint(this._getTargetPoint(e, data));
            }
        }

        // подписываемся на события на точках карты
        for (var name in this.pointsHandlers)
            if (this.pointsHandlers.hasOwnProperty(name))
                BEM.blocks['i-geo-point'].on(name, this.pointsHandlers[name], this)

        // слушаем события на карте
        this.ymap.events
            .add('click', function() {
                this._unselectPoint();
            }, this)
            .add('boundschange', this._onBoundsUpdate, this);
    },

    createGeoObjects: function(points) {
        this.add(points);
        this.fitAll(this.params.zoom);

        this.trigger('map-points-added', { total: this.params.total });

        if (this.params.searchText && this.params.searchText === 'Яндекс')
            this.bindTo('userlocation', 'click', function() {
                if (this.snake) {
                    this.snake.destruct();
                }

                if (this.findBlockInside('b-map-panel').getMod(this.findBlockInside('b-map-panel').elem('switcher'), 'state') != 'closed')
                    this.findBlockInside('b-map-panel')._toggleState();

                this.delMod('geo-objects-search');

                for (var i = this.geoObjectsArray.length; i--;)
                    this.geoObjectsArray[i].destruct();

                this.snake = BEM.create('i-snake', { map: this, btn: this.findBlockOn(this.elem('goto-map'), 'b-form-button') });
            })
    },

    createStreetLine: function(lines) {
        var _this = this;

        this._streetStrokeOpacity = 0.4;

        this._streetObject = new ymaps.Polygon(lines, {}, {
            strokeColor: '#000000',
            fillColor: '#00000000',
            strokeWidth: 4,
            strokeOpacity: this._streetStrokeOpacity,
            simplification: false,
            interactivityModel: 'default#transparent',
            overlayFactory: {
                createOverlay: function (pixelGeometry, data, options) {
                    return new ymaps.overlay.MultiLine(pixelGeometry, data, options);
                }
            }
        });

        this._streetObject.events
            .add('mouseenter', function() {
                this._streetObject.options.set('strokeOpacity', this._streetStrokeOpacity);

                clearTimeout(this._hideStreetTimeout);
                this._clearHideStreetAnimation();
            }, this)
            .add('mouseleave', function() {
                this._streetObject.options.set('strokeOpacity', '0');
            }, this);

        this._hideStreetTimeout = setTimeout(function() { _this._hideStreetTimeoutFunc() }, 2000);

        this.ymap.geoObjects.add(this._streetObject);
    },

    _hideStreetTimeoutFunc: function() {
        var _this = this;
        this._hideStreetAnimationTick = 0;
        this._hideStreetAnimationTimeout = setTimeout(function () { return _this._hideStreetAnimationFunc() }, 100);
    },

    _hideStreetAnimationFunc: function() {
        var _this = this,
            optMax = this._streetStrokeOpacity,
            opt;

        this._hideStreetAnimationTick++;

        opt = optMax - optMax * Math.sin(Math.PI * this._hideStreetAnimationTick / 20);
        this._streetObject.options.set('strokeOpacity', Math.round(opt * 100) / 100);

        if (opt > 0)
            this._hideStreetAnimationTimeout = setTimeout(function() { _this._hideStreetAnimationFunc()}, 10);
    },

    _clearHideStreetAnimation: function() {
        this._hideStreetAnimationTick = 0;
        clearTimeout(this._hideStreetAnimationTimeout);
    },

    _addPoint: function(point) {
        this.ymap.geoObjects.add(point);
    },

    _delPoint: function(point) {
        this.ymap.geoObjects.remove(point.mapPoint);
    },

    _hoverPoint: function(point) {
        point.setMod('hovered', 'yes');
    },

    _unhoverPoint: function(point) {
        point.delMod('hovered');
    },

    _selectPoint: function(point) {
        if (this.selected !== point) {
            this._unselectPoint();
            this.selected = point;
        }
        var balloon = point.mapPoint.balloon.open(), // открываем балун, получаем ссылку на него
            bBounds = balloon.getOverlay().getBalloonLayout().getClientBoundingRect(),
            bSize = [ Math.abs(bBounds[1][0] - bBounds[0][0]), Math.abs(bBounds[1][1] - bBounds[0][1]) + 21 ], // 21 -- высота хвоста
            zoom = this.getZoom(),
            gCenter = this.getGlobalPixelCenter(),
            mapBounds = this.getBounds(),
            gMapBounds = [ this.toGlobalPixels(mapBounds[0]), this.toGlobalPixels(mapBounds[1]) ],
            gPoint = this.toGlobalPixels(point.mapPoint.geometry.getCoordinates(), zoom),
            gBalloonBounds = [
                [gPoint[0] - bSize[0] / 2, gPoint[1]],
                [gPoint[0] + bSize[0] / 2, gPoint[1] - bSize[1]]
            ],
            gBalloonOffset = [
                [ gMapBounds[0][0] - gBalloonBounds[0][0], gMapBounds[0][1] - gBalloonBounds[0][1] ],
                [ gMapBounds[1][0] - gBalloonBounds[1][0], gMapBounds[1][1] - gBalloonBounds[1][1] ]
            ],
            gOffset = [
                (gBalloonOffset[0][0] > 0 && Math.abs(gBalloonOffset[0][0]) < bSize[0])
                    ? gBalloonOffset[0][0] + 30
                    : (gBalloonOffset[1][0] < 0 && Math.abs(gBalloonOffset[1][0]) < bSize[0])
                        ? gBalloonOffset[1][0] - 20
                        : 0,
                (gBalloonOffset[0][1] < 0)
                    ? gBalloonOffset[0][1] - 20
                    : (gBalloonOffset[1][1] > 0)
                        ? gBalloonOffset[1][1] + 30
                        : 0
            ],
            panelOffset = [0, 0];

        point.setMod('selected', 'yes');

        this.setGlobalPixelCenter([gCenter[0] - gOffset[0] + panelOffset[0], gCenter[1] - gOffset[1]], zoom);
        this._onBoundsUpdate();
    },

    _unselectPoint: function() {
        if (!this.selected) return;
        this.selected.delMod('selected');
        this.selected.mapPoint.balloon.close();
        this.selected.trigger('point-unselect');
        this.selected = null;

        this._onBoundsUpdate();
    },

    // обработчик изменения показываемой области
    _onBoundsUpdate: function(e) {
        // прокидываем событие, чтобы внешние блоки могли на него подписаться
        this.trigger('map-boundschange', {
            center: this.getCenter(),
            bounds: this.getBounds(),
            zoom: (e)
                ? e.get('newZoom')
                : this.getZoom(),
            selectedPoint: this.selected
        });
    },

    // поиск точки по имени
    _findPointByName: function(name) {
        for (var i = 0, n = this.geoObjectsArray.length, point; point = this.geoObjectsArray[i], i < n; i++)
            if (point.params.name.toString() == name.toString()) return point;
        return false;
    },

    _getTargetPoint: function(e, data) {
        return (e.target.mapPoint && e.target) || (data && this._findPointByName(data.name));
    },

    // добавить точку/массив точек
    add: function(point) {
        var geoObjectsArray = this.geoObjectsArray;
        for (var i = 0, n = point.length !== undefined ? point.length : 1, p; p = point[i] || point, i < n; i++) {
            geoObjectsArray.push(BEM.create({ block: 'i-geo-point', mods: { type: p.type } }, p));
        }

        var groups = [],
            inGroup, nGroups,
            radius = 20;
        // группируем точки с одинаковыми координатами
        for (i = 0, n = geoObjectsArray.length; i < n; i++) {
            var pointLocation = geoObjectsArray[i].params.location;
            for (inGroup = 0, nGroups = groups.length; inGroup < nGroups; inGroup++) {
                var groupLocation = geoObjectsArray[groups[inGroup][0]].params.location;
                if (groupLocation.longitude == pointLocation.longitude && groupLocation.latitude == pointLocation.latitude)
                    break;
            }
            groups[inGroup] ? groups[inGroup].push(i) : (groups[inGroup] = [i]);
        }
        // смешаем точки в каждой группе по кругу
        for (i = 0, n = groups.length; i < n; i++) {
            geoObjectsArray[groups[i][0]].mapPoint.options.set('zIndex', (geoObjectsArray[groups[i][0]].zIndex = (groups.length - i) + groups[i].length));
            for (inGroup = 1, nGroups = groups[i].length; inGroup < nGroups; inGroup++) {
                geoObjectsArray[groups[i][inGroup]].mapPoint.options
                    .set('iconOffset', [ Math.round(radius * Math.cos(2 * Math.PI * inGroup / nGroups)) , Math.round(radius * Math.sin(2 * Math.PI * inGroup / nGroups))  ])
                    .set('zIndex', (geoObjectsArray[groups[i][inGroup]].zIndex = nGroups - inGroup));
            }
        }
    },

    // удалить точку
    remove: function(item) {
        for (var i = 0, n = this.geoObjectsArray.length; i < n; i++) {
            if (this.geoObjectsArray[i] === item) {
                item.destruct();
                this.geoObjectsArray.splice(i, 1);
                return;
            }
        }
    },

    // удалить все точки
    removeAll: function() {
        for (var i = 0, n = this.geoObjectsArray.length; i < n; i++)
            this.geoObjectsArray[i].destruct();

        this.geoObjectsArray = [];
    },

    // уместить все точки в видимой области
    fitAll: function(zoom) {
        var _this = this,
            lats = [],
            longs = [],
            rightTop,
            leftBottom,
            centerAndZoom;

        for (var i = 0, n = this.geoObjectsArray.length, loc; i < n; i++) {
            loc = this.geoObjectsArray[i].params.location;
            lats.push(loc.latitude);
            longs.push(loc.longitude);
        }

        leftBottom = [ Math.min.apply(Math, longs), Math.max.apply(Math, lats) ];
        rightTop = [ Math.max.apply(Math, longs), Math.min.apply(Math, lats) ];

        centerAndZoom = ymaps.util.bounds.getCenterAndZoom([leftBottom, rightTop], [ this.domElem.width() * 0.8, this.domElem.height() * 0.8]);

        this.ymap.zoomRange.get(centerAndZoom.center).then(function(range){
            _this.moveTo(centerAndZoom.center, Math.min(zoom || _this.getZoom(), centerAndZoom.zoom , range[1]));

            _this.showMap();
        });
    },

    destruct: function() {
        for (var name in this.pointsHandlers)
            if (this.pointsHandlers.hasOwnProperty(name))
                BEM.blocks['i-geo-point'].un(name, this.pointsHandlers[name], this);

        this.__base.apply(this, arguments);
    }

}, {

});
