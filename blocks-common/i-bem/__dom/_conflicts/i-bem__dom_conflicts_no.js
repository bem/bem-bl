typeof BEM_CONFLICTS_NO !== 'undefined' && $(function() {
    var scope = $('.bem-' + BEM_CONFLICTS_NO);
    scope[0] && $.each(
        this._BEM[BEM_CONFLICTS_NO].blocks,
        function() { this.scope = scope });
}.bind(this));
