typeof BEM_CONFLICTS_NO !== 'undefined' && $(function() {
    var doc = $('.bem-' + BEM_CONFLICTS_NO);
    doc[0] && $.each(
        this._BEM[BEM_CONFLICTS_NO].blocks,
        function() { this.doc = doc });
}.bind(this));
