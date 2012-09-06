BEM.decl({ name: 'i-geo-point' }, {
    onSetMod: {
        js: function() {
            var point = this.params;

            this.mapPoint = new ymaps.Placemark([ point.location.longitude, point.location.latitude ], {
                iconContent: point.iconContent,
                iconType: point.type,
                iconWithContent: (point.type !== 'single' && point.type !== 'adv'),
                iconUrl: point.url,

                hintContent: point.hint,

                balloonContent: point.balloonContent,
                isIconHovered: 'no'
            }, {
                iconLayout: ymaps.templateLayoutFactory.createClass(
                    '<div href="$[properties.iconUrl]" class="i-geo-point [if properties.iconType]i-geo-point_type_$[properties.iconType][endif] i-geo-point_hovered_$[properties.isIconHovered]" target="_blank">' +
                        '[if properties.iconWithContent]<span class="i-geo-point__cont">$[properties.iconContent]</span>[endif]' +
                    '</div>'
                ),
                zIndex: 1,
                openBalloonOnClick: false,
                balloonAutoPan: false,
                balloonMaxWidth: 320,
                balloonMaxHeight: 250,
                balloonScrollX: false
            });

            // не вешаем события mouseenter и mouseleave на iPad'ах
            if (navigator.userAgent.match(/iPad/i) == null) {
                this.mapPoint.events.add('mouseenter', function() { this.trigger('point-mouseenter') }, this);
                this.mapPoint.events.add('mouseleave', function() { this.trigger('point-mouseleave') }, this);
            }
            this.mapPoint.events.add('click', function(e) {
                var origEvent = e.originalEvent.domEvent.originalEvent;
                this.trigger('point-select');

                origEvent.preventDefault && origEvent.preventDefault();
                origEvent.returnValue = false;
                return false;
            }, this);

            this.trigger('point-add');
        },

        selected: {
            '': function() {
                this.mapPoint.options.set('zIndex', this.zIndex);
                this.mapPoint.properties.set('isIconHovered', 'no');
            },

            'yes': function() {
                this.mapPoint.options.set('zIndex', '1000');
                this.mapPoint.properties.set('isIconHovered', 'no');
            }
        },

        hovered: {
            '': function() {
                this.mapPoint.options.set('zIndex', this.zIndex);
                this.mapPoint.properties.set('isIconHovered', 'no');
            },

            'yes': function() {
                this.mapPoint.options.set('zIndex', '1000');
                this.mapPoint.properties.set('isIconHovered', 'yes');

            }
        }
    },

    destruct: function() {
        this.trigger('point-del');
    }
}, {});


BEM.decl('i-snake', {
    onSetMod: {
        js: function() {
            this.map = this.params.map;

            this.size = 10;
            this.step = 1;
            this.coords = [ this.map.getGlobalPixelCenter() ];

            this.coords[1] = [ this.coords[0][0], this.coords[0][1] + this.size ];
            this.len = this.coords.length - 1;

            this.line = new ymaps.Polyline(this._getCoords(), {}, {
                strokeWidth: 8
            });

            this.points = [];
            for (var i = 0, n = 5; i < n; i++)
                this.points.push(this.createPoint());


            this.map.ymap.geoObjects.add(this.line);

            this.params.btn.elem('text').html('Счет: ' + (this.len - 1));

            this.start();
        }
    },

    _sign: function(val) {
        return (val > 0) - (val < 0);
    },

    _getCoords: function() {
        var geoCoords = [];
        for(var coords = this.coords, i = 0, n = coords.length; i < n; i++)
            geoCoords[i] = this.map.fromGlobalPixels(coords[i]);

        return geoCoords;
    },

    start: function() {
        var _this = this;
        this.timer = setInterval(function() {_this._tick()}, 10);
        $(window).bind('keydown', function(e) { return _this.control(e); })
    },

    stop: function() {
        clearInterval(this.timer);
        //todo: unsubscribe control
    },

    _tick: function() {
        this.move();
    },

    control: function(e) {
        var keyCode = e.keyCode;

        if (keyCode == 27)
            this.stop();

        // horizontal
        var head = this.coords[0],
            tail = this.coords[this.coords.length - 1],
            penult = this.coords[this.coords.length - 2],
            d = 0.00001;

        if (head[1] === this.coords[1][1]) {
            // up
            if (keyCode == 38) {
                this.coords.unshift([head[0], head[1] - d]);
                return false
            }
            // down
            if (keyCode == 40) {
                this.coords.unshift([head[0], head[1] + d]);
                return false
            }
        }

        // vertical
        if (head[0] === this.coords[1][0]) {
            // left
            if (keyCode == 37) {
                this.coords.unshift([head[0] - d, head[1]]);
                return false
            }
            // right
            if (keyCode == 39) {
                this.coords.unshift([head[0] + d, head[1]]);
                return false
            }
        }

        if (keyCode >= 37 &&  keyCode <= 40) return false;
    },

    move: function() {
        var length = 0,
            newHead = this.moveCoord(this.coords[0], this.coords[1]);

        for (var i = 0, n = this.coords.length-1; i < n; i++)
            length += Math.abs(this.coords[i][0] - this.coords[i+1][0]) + Math.abs(this.coords[i][1] - this.coords[i+1][1]);

        this.eatPoints(this.coords[0], newHead);
        if (!this.checkCross(this.coords[0], newHead))
            this.coords[0] = newHead;
        else
            this.die();

        if (Math.abs(length - this.size * this.len) < 0.001) {
            var tail = this.coords[this.coords.length - 1],
                newTail = this.moveCoord(tail, this.coords[this.coords.length - 2], true);
            if (this.coords.length > 2) {
                var penult = this.coords[this.coords.length - 2];
                if (tail[0] == penult[0] && this._sign(penult[1] - tail[1]) != this._sign(penult[1] - newTail[1]) ||
                    tail[1] == penult[1] && this._sign(penult[0] - tail[0]) != this._sign(penult[0] - newTail[0])) {
                    this.coords.pop();
                    this.coords[this.coords.length - 1] = this.moveCoord(this.coords[this.coords.length - 1], this.coords[this.coords.length - 2], true);
                } else {
                    this.coords[this.coords.length - 1] = newTail;
                }
            } else {
                this.coords[this.coords.length - 1] = newTail;
            }
        }

        this.line.geometry.setCoordinates(this._getCoords());
    },

    moveCoord: function(point, nextPoint, reverse) {
        if (point[0] == nextPoint[0]) {
            return [ point[0], point[1] + this.step * this._sign(point[1] - nextPoint[1]) * (reverse ? -1 : 1) ]
        }

        if (point[1] == nextPoint[1]) {
            return [ point[0] + this.step * this._sign(point[0] - nextPoint[0]) * (reverse ? -1 : 1), point[1] ]
        }
    },

    createPoint: function() {
        var posOffset = [ 350 - Math.round(Math.random() * 700), 150 - Math.round(Math.random() * 300)],
            mapCenter = this.map.getGlobalPixelCenter(),
            point = new ymaps.Placemark(this.map.fromGlobalPixels([mapCenter[0] + posOffset[0], mapCenter[1] + posOffset[1]] ), {
                iconType: 'ya',
                hintContent: 'Съешь меня',
                isIconHovered: 'no'
            }, {
                iconLayout: ymaps.templateLayoutFactory.createClass(
                    '<div class="i-geo-point i-geo-point_type_ya i-geo-point_hovered_$[properties.isIconHovered]"> </div>'
                ),
                zIndex: 1,
                openBalloonOnClick: false
            });
        this.map.ymap.geoObjects.add(point);

        return point;
    },

    eatPoints: function(head, newHead) {
        var points = this.points,
            lineW = 5,
            gcoord;

        for (var i = points.length; i--;) {
            gcoord = this.map.toGlobalPixels(points[i].geometry.getCoordinates());

            if (
                (head[0] === newHead[0] && gcoord[0] + lineW > head[0] && gcoord[0] - lineW < head[0] && this._sign(gcoord[1] - head[1]) != this._sign(gcoord[1] - newHead[1])) ||
                    (head[1] === newHead[1] && gcoord[1] + lineW > head[1] && gcoord[1] - lineW < head[1] && this._sign(gcoord[0] - head[0]) != this._sign(gcoord[0] - newHead[0]))
                ) {
                this.map.ymap.geoObjects.remove(points[i]);
                points.splice(i, 1);
                points.push(this.createPoint());
                this.len += 1;
                this.params.btn.elem('text').html('Счет: ' + (this.len - 1));
            }
        }
    },

    checkCross: function(p1, p2) {
        var i, n;
        if (p1[1] === p2[1])
            for (i = 0, n = this.coords.length-1; i < n; i++)
                if (this.coords[i][0] === this.coords[i+1][0] && ( (this.coords[i][1] >= p1[1] && this.coords[i+1][1] <= p1[1]) || (this.coords[i][1] <= p1[1] && this.coords[i+1][1] >= p1[1]) ) && this._sign(this.coords[i][0] - p1[0]) != this._sign(this.coords[i][0] - p2[0]))
                    return true;
        if (p1[0] === p2[0])
            for (i = 0, n = this.coords.length-1; i < n; i++)
                if (this.coords[i][1] === this.coords[i+1][1] && ( (this.coords[i][0] >= p1[0] && this.coords[i+1][0] <= p1[0]) || (this.coords[i][0] <= p1[0] && this.coords[i+1][0] >= p1[0]) ) && this._sign(this.coords[i][1] - p1[1]) != this._sign(this.coords[i][1] - p2[1]))
                    return true;
        return false;
    },

    die: function() {
        this.line.options.set('strokeColor', '#AA0000');
        this.stop();
    },

    destruct: function() {
        var points = this.points;

        for (var i = points.length; i--;)
            this.map.ymap.geoObjects.remove(points[i]);
        this.map.ymap.geoObjects.remove(this.line);
    }
});