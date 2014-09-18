/**
 * A block's BEM declaration can state which block (a block with a modifier or a block with a specific modifier value) 
 * a given JavaScript component refers to.
 * You can find various declarations on the i-bem block's wiki page, blocks/i-bem/i-bem.wiki
 */
BEM.DOM.decl('b-tv', {

    /*
     onSetMod is a special property for describing how a component
     should react to setting a modifier for a block. You can read more 
     about onSetMod and its various uses on the i-bem block's wiki page 
    (/blocks/i-bem/i-bem.wiki)
     */
    onSetMod : {

        js : function() {
            /*
             The setMod method allows to set a modifier with a value for a block 
             or its element.
             */
            this.setMod('touched', 'yes');
        }

    },

    on : function(e) {
        this.setMod('state', 'profilaktika');
    },

    off : function(e) {
        this.setMod('state', '');
    }

}, {

    live : function() {

        /*
         Live initialization is "on-demand initialization".
         It lets you initialize a block only when necessary,
         for example, when the user begins working with the block directly.
         
         In this case, initialization occurs in either of two cases:
         putting the cursor on the "over" element, or clicking on the "click" element.
         Initialization can also occur on an event on the block itself,
         when nested or mixed blocks are initialized. You can find all 
         the available initialization methods in the BEM DOM reference
         (/blocks/i-bem/dom/i-bem__dom.jsdoc.wiki).
         */

        this
            .liveBindTo('over', 'mouseover', function(e) {
                this.on();
            })
            .liveBindTo('click', 'click', function(e) {
                this.off();
            });

    }

});
