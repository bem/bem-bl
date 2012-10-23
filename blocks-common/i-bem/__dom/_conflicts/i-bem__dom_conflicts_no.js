typeof BEM_CONFLICTS_NO !== 'undefined' && $(function() {
    var doc = $('.bem-' + BEM_CONFLICTS_NO);
    doc[0] && (this._BEM[BEM_CONFLICTS_NO].DOM.doc = doc);
}.bind(this));