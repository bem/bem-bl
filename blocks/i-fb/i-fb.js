/** @requires BEM */

(function() {

window.fbAsyncInit = function() {
    FB.init({
        appId      : '352298414783700', // App ID
        channelUrl : window.location.domain + '/blocks/i-fb/channel.html', // Channel File
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });
};

BEM.decl('i-fb', {

    onSetMod : {
        'js' : function() {

            (function(d){
                $('.b-fb__comments').attr('href', 'http://bem.github.com/bem-bl' + window.location.pathname);
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
