(function(){

/**
 * The block's BEM declaration can state which block (a block with a modifier or a block with a specific modifier value) 
 * a given JavaScript component refers to.
 *
 * In this case, the code is triggered on the b-link_action_alert block
 *
 * You can find various declarations on the i-bem block's wiki page, blocks/i-bem/i-bem.wiki
 */
BEM.DOM.decl({ name: 'b-link', modName: 'action', modVal: 'alert' }, {

    /**
     * The _onClick method is named this for a reason. The name should match
     * the name of the parent block method, i.e. b-link_pseudo_yes
     */
    _onClick: function(e) {

        // this.base Contains a reference to the corresponding method in the "parent" component
        this.__base.apply(this, arguments);

        // Pre-defining the base method using our own code
        alert('Text message');

    }

});

}());