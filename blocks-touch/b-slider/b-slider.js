(function() {

        // translate3d или translate
    var translateX = function(x) {
            return $.cssPrefixedProp('perspective') ?
                'translate3d(' + x + 'px, 0, 0)' :
                'translate(' + x + 'px, 0)';
        },
        buildNamespace = function(e, i) {

            var manyEvents = !!e.split(' ')[1],
                res = [];

            if (manyEvents) {
                e.split(' ').map(function( item ) { res.push( item + '.touchSlides_' + i ) });
                res = res.join(' ');
            } else {
                res = e + '.touchSlides_' + i;
            }

            return res;

        },
        ua = BEM.blocks['i-ua'],
        // реалтаймовый слайд не для всех
        realtimeSlide= ua.ios || ua.android >= '4' ||  ua.bada || ua.opera || ua.other || false,
        // параметры по умолчанию
        defaults = {
            step: 100,
            threshold: 50
        },
        // уникальный идентификатор неймспейсов для каждого инстанса слайдера
        sliderCount = 1;


    BEM.DOM.decl('b-slider', {

        onSetMod: {

            js: function() {

                this._sliderCount = sliderCount++;

                // инициализация слайдера по умолчанию или если autoinit == true
                if (this.params.autoinit || !('autoinit' in this.params)) {
                    this._delayedInit();
                }

                this.on('reinit', function() {
                    this._onReInit();
                });

            }

        },

        namespaced: function(e) {

            return buildNamespace(e, this._sliderCount);

        },

        // отложенная инициализация слайдера
        _delayedInit: function() {

            var slider = this,
                images = slider.findBlocksInside('b-icon');

            // если внутри есть картинки (b-icon),
            // то отложить инициализацию  до момента их полной загрузки,
            // чтобы слайдер мог правильно получить свою настоящую ширину
            if (images.length) {
                    // ключ "загружены ли уже все картинки"
                var allImagesLoaded = true,
                    // счетчик незагруженных картинок
                    notLoadedImages = 0;

                $.each(images, function(i, image) {
                    var imageElem = image.domElem[0];

                    // проверка, ожидание и подсчет картинок
                    if (imageElem.src && !imageElem.getAttribute('width') && !imageElem.complete) {
                        allImagesLoaded = false;
                        notLoadedImages++;
                        image.bindTo('load error', function() {
                            notLoadedImages--;
                            if (notLoadedImages == 0) {
                                // пыщь!
                                slider._initialization();
                            }
                        });
                    }
                });

                // если все картинки на момент вызова слайдера оказались
                // загруженными (например, из кэша), то инициализироваться сразу
                if (allImagesLoaded) {
                    slider._initialization();
                }
            // если картинок не было вообще, то тоже инициализироваться сразу
            } else {
                slider._initialization();
            }

        },

        _initialization: function() {

            var slider = this;

            // отписываемся от всех возможных предыдущих событий
            slider._clearBinds();

            // меню, которое перемещается
            slider._menu = slider.findBlockInside('b-menu');
            // элементы этого меню
            slider._items = slider._menu.findElem('item');
            // переопределяем параметры по умолчанию заданными-конкретными
            slider._options = $.extend({}, defaults, slider.params);
            // jQ-объект
            slider._elem = slider._menu.domElem;
            // поэкранный слайд
            slider._perScreen = slider.hasMod('type', 'per-screen');
            // индекс текущего элемента
            slider._index = slider._options.index || 0;
            // стартовая позиция / текущее смещение
            slider._currentX = slider._currentX || 0;
            // объект с текущими параметрами каждого слайда
            slider._touch = {};

            slider._calcParams();

            // если поэкранный слайдер
            if (slider._perScreen) {
                // количество элементов в поэкранном слайде
                slider._count = slider._items.length,
                // шаг
                slider._step = slider._parentWidth;

                // ширина каждого элемента меню равна ширине родителя ("экрана")
                slider._items.width(slider._parentWidth);

                slider._calcParams();

                // при поворотах пересчитываем ширину
                $(window).bind( this.namespaced('orientchange'), function() {
                    slider._items.width(slider._elem.parent().width());
                });

            }

            // если есть куда и что слайдить
            if (slider._width > slider._parentWidth) {

                // если начальный элемент не первый
                if (slider._index) {

                    // если полноэкранный слайдер
                    if (slider._perScreen) {
                        // коррекция начального смещения при непервом начальном элементе в поэкранном слайдере
                        slider._correctPerScreenNonFirst();
                    } else {
                        // коррекция начального смещения при непервом начальном элементе в обычном слайдере
                        slider._correctPerStepNonFirst();
                    }

                }

                slider
                    // бинд на pointer-события
                    .bindTo( this.namespaced('pointerdown'), slider._onPointerDown )
                    .bindTo( this.namespaced('pointermove'), slider._onPointerMove )
                    .bindTo( this.namespaced('pointerup pointercancel'), slider._onPointerUp )
                    // бинд на i-bem-события
                    .on({
                        left: slider._onLeft,
                        right: slider._onRight
                    });

                // запрет кликов на время анимации
                slider._preventClicks();

                // коррекции при повороте
                slider._correctOnOrientChange();

                // триггерим событие иниализации, передавая параметры (например, для b-slider-indicator).
                // запоминаем те же параметры для случая, когда событие произойдёт раньше появления его
                // первого слушателя.
                slider
                    .trigger('_init', (slider._initData = slider._getCurrentParams()))
                    .setMod('inited', 'yes');

            }

        },

        _clearBinds: function() {

            this
                .unbindFrom('.touchSlides_' + this._sliderCount)
                .un('left', this._onLeft)
                .un('right', this._onRight)
                .un('start', this._onStart)
                .un('end', this._onEnd);

            $(window).unbind('.touchSlides_' + this._sliderCount);

        },

        // запрет кликов на время анимации
        _preventClicks: function() {

            this.on({
                start: this._onStart,
                end: this._onEnd
            });

        },

        _onStart: function() {

            this.setMod('animation', 'yes');

        },

        _onEnd: function() {

            this.delMod('animation');

        },

        _calcParams: function() {

            // ширина слайдера
            this._width = this._elem.outerWidth();
            // новая ширина родителя
            this._parentWidth = this._elem.parent().width();
            // новый шаг
            this._step = this._perScreen ? this._parentWidth : this._options.step;
            // новый предел
            this._limitX = this._parentWidth - this._elem.outerWidth();

        },

        // коррекция начального смещения при непервом начальном элементе в поэкранном слайдере
        _correctPerScreenNonFirst: function() {

            this._currentX = -this._step * (--this._index);

            this._correct();

        },

        // коррекция начального смещения при непервом начальном элементе в обычном слайдере
        _correctPerStepNonFirst: function() {

            var index = this._index - 2;

            // собираем смещение из ширин
            for(var i = 0; i <= index; i++) {
                this._currentX -= $(this._items[i]).outerWidth(true);
            }

            this._currentX -= parseInt(this._items.eq(index).css('padding-left'));

            this._correct();

        },

        _correctOnOrientChange: function() {

            var slider = this;

            // поворот
            $(window).bind(this.namespaced('orientchange'), function(landscape) {
                // пересчёт
                slider._calcParams();

                // предотвращаем дырку слева при ширине слайдера меньше ширины родителя
                if (slider._limitX > 0) {
                    slider._currentX = slider._limitX = 0;
                }

                // при поэкранном слайдере заново рассчитываем текущую позицию
                if (slider._perScreen) {
                    slider._currentX = -slider._step * slider._index;
                }

                // если после поворота в ландшафтный режим справа появилась "дырка"
                if (landscape && slider._currentX < slider._limitX && slider._width > slider._parentWidth) {
                    slider._currentX = slider._limitX;
                    slider._correct();
                }

                // событие для обновления новых значений
                slider.trigger('update', slider._getCurrentParams());

                slider._correct();
            });

        },

        _correct: function() {

            this._elem.css({
                transition: 'none',
                transform: translateX(this._currentX)
            });

        },

        _onPointerDown: function(e) {

            // запоминаем координаты и время
            this._touch.x1 = e.pointer.x;
            this._touch.y1 = e.pointer.y + (ua.bada ? window.pageYOffset : 0);
            this._touch.t1 = Date.now();

            // отключаем анимацию на время реалтаймового слайда
            this._elem.css('transition', 'none');

        },

        _onPointerMove: function(e) {

            // смещения
            this._touch.shiftX = e.pointer.x - this._touch.x1;
            this._touch.shiftY = e.pointer.y - this._touch.y1;

            // абсолютные значения смещений
            this._touch.shiftXAbs = Math.abs(this._touch.shiftX);
            this._touch.shiftYAbs = Math.abs(this._touch.shiftY);

            // если мы ещё не определились
            if (!this._touch.isSlide && !this._touch.isScroll) {
                // если вертикальное смещение - скроллим пока не отпустили палец
                if (this._touch.shiftYAbs >= 5 && this._touch.shiftYAbs > this._touch.shiftXAbs) {
                    this._touch.isScroll = true;
                }

                // если горизонтальное - слайдим
                if (this._touch.shiftXAbs >= 5 && this._touch.shiftXAbs > this._touch.shiftYAbs) {
                    this._touch.isSlide = true;
                }
            }

            // если реалтаймовый слайд и мы слайдим
            if (realtimeSlide && this._touch.isSlide) {
                // запрещаем скролл
                e.preventDefault();

                // если в пределах и тянем за них, то замедлять слайд в 3 раза
                if ((this._currentX == 0 && this._touch.shiftX > 0) || (this._currentX == this._limitX && this._touch.shiftX < 0)) {
                    this._touch.shiftX = this._touch.shiftX / 3;
                }
                // реалтаймловый слайд
                this._elem.css('transform', translateX(this._currentX + this._touch.shiftX));

            }

        },

        _onPointerUp: function() {

            // слайд
            if (realtimeSlide && this._touch.isSlide) {
                this._slideMove();
            }

            this._touch = {};

        },

        _onLeft: function(e, data) {

            if (this._perScreen) {
                data.step = this._step;
            }

            this._customMove(data.step);

        },

        _onRight: function(e, data) {

            if (this._perScreen) {
                data.step = this._step;
            }

            this._customMove(-data.step);

        },

        _onReInit: function() {

            this._delayedInit();

        },

        _getCurrentParams: function() {

            return {
                currentX: this._currentX,
                limitX: this._limitX,
                step: this._step,
                index: this._index,
                count: this._count,
                active: this._width > this._parentWidth
            }

        },

        _slideMove: function() {

            // скорость в px/ms
            this._touch.speed = this._touch.shiftXAbs / (Date.now() - this._touch.t1);
            // ускорение
            if (this._perScreen) {
                // в поэкранном слайдере нет ускорения
                this._touch.accel = 1;
            } else {
                this._touch.accel = this._touch.speed > 0.3 && this._touch.speed < 0.6 ? 2 :
                                this._touch.speed >= 0.6 && this._touch.speed < 1 ? 3 :
                                this._touch.speed >= 1 ? 4 :
                                1;
            }
            // время анимации
            if (ua.landscape) {
                this._touch.animationTime = this._touch.accel >= 3 ? '.3' : '.4';
            } else {
                this._touch.animationTime = this._touch.accel >= 3 ? '.2' : '.3';
            }
            // собственно css-анимация
            transition = 'all ' + this._touch.animationTime + 's ease-out';

            //alert(this._touch.shiftXAbs);
            // если слайд преодолел порог
            if (this._touch.shiftXAbs >= this._options.threshold) {
                // слайд длиной больше одного шага
                if (this._touch.shiftXAbs > this._step) {
                    this._currentX += ~~(this._touch.shiftX / this._step) * this._step;
                }

                // слайд вправо
                if (this._touch.shiftX > 0) {
                    this._currentX += this._step * this._touch.accel;

                    // левый предел
                    if (this._currentX > 0) {
                        this._currentX = 0;
                        this.trigger('limitLeft');
                    }

                    // индекс текущего экрана
                    if (this._perScreen && this._index > 0) {
                        this._index--;
                    }
                // слайд влево
                } else if (this._touch.shiftX < 0) {
                    this._currentX -= this._step * this._touch.accel;

                    // правый предел
                    if (this._currentX < this._limitX) {
                        this._currentX = this._limitX;
                        this.trigger('limitRight');
                    }

                    // индекс текущего экрана
                    if (this._perScreen && this._index < this._count - 1) {
                        this._index++;
                    }
                }

            }

            this._doAnimation();

        },

        _customMove: function(shiftX) {

            // время анимации
            this._touch.animationTime = ua.landscape ? '.3' : '.2';

            // собственно css-анимация
            transition = 'all ' + this._touch.animationTime + 's ease-out';

            this._currentX += shiftX;

            // слайд вправо
            if (shiftX > 0) {
                // левый предел
                if (this._currentX > 0) {
                    this._currentX = 0;
                    this.trigger('limitLeft');
                }

                // индекс текущего экрана
                if (this._perScreen && this._index >= 1) {
                    this._index--;
                }
            // слайд влево
            } else if (shiftX < 0) {
                // правый предел
                if (this._currentX < this._limitX) {
                    this._currentX = this._limitX;
                    this.trigger('limitRight');
                }

                // индекс текущего экрана
                if (this._perScreen && this._index <= this._count) {
                    this._index++;
                }
            }

            this._doAnimation();

        },

        _doAnimation: function() {

            var slider = this;

            slider.trigger('start', slider._getCurrentParams());

            slider._elem
                .one(this.namespaced('webkitTransitionEnd oTransitionEnd otransitionend transitionend'),
                    function() {
                        slider.trigger('end', slider._getCurrentParams());
                    }
                )
                .css({
                    transition: transition,
                    transform: translateX(slider._currentX)
                });

        },

        onInit: function(callback) {

            if (this._initData) {
                callback(this._initData);
            } else {
                this.on('_init', function(e, data) {
                    callback(data);
                });
            }

        }

    });

})();