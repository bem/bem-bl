typeof BEM_VERSION !== 'undefined' && ((this._BEM || (this._BEM = {}))[this.BEM.version = BEM_VERSION] = this.BEM);

if(BEM_VERSION !== 'undefined') {
    var doc = $('.bem-' + BEM_VERSION);
    doc[0] && (this._BEM[BEM_VERSION].DOM.doc = doc);
}