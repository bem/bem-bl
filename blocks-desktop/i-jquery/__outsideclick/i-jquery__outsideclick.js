(function($) {

var outsideClick = $.event.special.outsideclick = {

    add: function(obj) {

        $(document).on('click.' + obj.guid, outsideClick.handler.bind(this));

    },

    remove: function(obj) {

        $(document).off('click.' + obj.guid);

    },

    handler: function(e) {

        if(!$.contains(this, e.target)) {

            e.type = 'outsideclick';

            $.event.dispatch.apply(this, arguments);

            e.type = 'click';

        }

    }

};

})(jQuery);