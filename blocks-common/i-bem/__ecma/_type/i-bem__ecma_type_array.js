(function() {

    var methods = {

        /**
         * Находит индекс элемента в массиве
         * @param {Object} item
         * @param {Number} [fromIdx] начиная с индекса (length - 1 - fromIdx, если fromIdx < 0)
         * @returns {Number} индекс элемента или -1, если не найдено
         */
        indexOf : function(item, fromIdx) {

            fromIdx = +(fromIdx || 0);

            var len = this.length;

            if(len > 0 && fromIdx < len) {
                fromIdx = fromIdx < 0? Math.ceil(fromIdx) : Math.floor(fromIdx);
                fromIdx < -len && (fromIdx = 0);
                fromIdx < 0 && (fromIdx = fromIdx + len);

                while(fromIdx < len)
                    if(this[fromIdx++] === item)
                        return fromIdx - 1;
            }

            return -1;

        },

        /**
         * Вызывает callback для каждого элемента
         * @param {Function} callback вызывается для каждого элемента
         * @param {Object} [ctx=null] контекст для callback
         */
        forEach : function(callback, ctx) {

            ctx || (ctx = null);

            var i = -1, t = this, len = t.length;
            while(++i < len) i in t &&
                callback.call(ctx, t[i], i, t);

        },

        /**
         * Создает массив B из массива A, такой что B[i] = callback(A[i])
         * @param {Function} callback вызывается для каждого элемента
         * @param {Object} [ctx=null] контекст для callback
         * @returns {Array}
         */
        map : function(callback, ctx) {

            ctx || (ctx = null);

            var i = -1, t = this, len = t.length,
                res = new Array(len);

            while(++i < len) i in t &&
                (res[i] = callback.call(ctx, t[i], i, t));

            return res;

        },

        /**
         * Создает массив, содержащий только те элементы из исходного массива, для которых callback возвращает true.
         * @param {Function} callback вызывается для каждого элемента
         * @param {Object} [ctx] контекст для callback
         * @returns {Array}
         */
        filter : function(callback, ctx) {

            ctx || (ctx = null);

            var i = -1, t = this, len = t.length,
                res = [];

            while(++i < len) i in t && callback.call(ctx, t[i], i, t) &&
                res.push(t[i]);

            return res;

        }

    },
    ptp = Array.prototype,
    toStr = Object.prototype.toString;

for(var name in methods)
    ptp[name] || (ptp[name] = methods[name]);

Array.isArray || (Array.isArray = function(obj) {
    return toStr.call(obj) === '[object Array]';
});

})();