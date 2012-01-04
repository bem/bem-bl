/** @requires BEM.DOM */

(function() {

BEM.DOM.decl('b-fb', {

    onSetMod : {
        'js' : function() {
            $('body').append('<div id="fb-root"></div>');
            $('.b-fb__comments').attr('href', 'http://bem.github.com/bem-bl' + window.location.pathname);

            (function(d){
                var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
                js = d.createElement('script'); js.id = id; js.async = true;
                //js.src = "//connect.facebook.net/ru_RU/all.js";
                js.src = "//connect.facebook.net/en_US/all.js";
                d.getElementsByTagName('head')[0].appendChild(js);
            })(document);
        }
    }

});

})();
