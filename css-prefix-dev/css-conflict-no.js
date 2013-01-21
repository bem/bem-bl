var borschik = require('borschik'),
	base = borschik.require('./techs/css-fast.js'),
	INHERIT = borschik.require('inherit'),

	cssp = require('cssp');

function modifyRuleset(ruleset, prefix, topmostClasses) {
	if(!(ruleset instanceof Array)) return;
	if(ruleset[0] != 'ruleset') return;
	
	ruleset[1].forEach(function(elem){ modifySelector(elem, prefix, topmostClasses) });
};

function modifySelector(selector, prefix, topmostClasses) {
	if(!(selector instanceof Array)) return;
	if(selector[0] != 'simpleselector') return;
	
	var selectorType = selector.shift(),
		firstPart = [],
		topmostTags = ['html','body'],
		prefixSpace = false;
	
	//TODO: подумать что делать, когда на html реально надо повесить стиль в духе width: 100%
	while(true) {
		if(!selector[0]) break;
		
		var elem = selector[0];
			elemType = selector[0][0]

		if(elemType == 's' && selector.length != 1 || elemType == 'comment') {
			firstPart.push(selector.shift());
			continue;
		}
		
		if((elemType == 'ident' && topmostTags.indexOf(elem[1]) != -1) ||
		   (elemType == 'clazz' && topmostClasses.indexOf(elem[1][1]) != -1)) {
			firstPart.push(selector.shift());
			elemType == 's' && selector.length != 1 ? firstPart.push(selector.shift()) : (prefixSpace = true)
			continue;
		}

		break;
	}

	/*
	console.log(selector);
	console.log(selector.legnth != 0);
	console.log(selector.length == 1 && selector[0][0] == 'ident');
	console.log('###########');
	*/

	if(selector[0][0] != 'clazz' || selector[0][1][1] != prefix) {

	if(selector.legnth != 0 && !(selector.length == 1 && selector[0][0] == 's'))
		selector.unshift(['s', ' ']);
	
	selector.unshift(['clazz', ['ident', prefix]]);
	
	if(prefixSpace)
		selector.unshift(['s', ' ']);
	}

	if(firstPart.length)
		selector.unshift.apply(selector, firstPart);
	
	selector.unshift(selectorType);
}

function addPrefix(source, prefix, topmostClasses) {
	var tree = cssp.parse(source);
	tree.forEach(function(elem){ modifyRuleset(elem, prefix, topmostClasses) });
	return cssp.translate(tree);
};

exports.Tech = INHERIT(base.Tech, {
	File: INHERIT(base.File, {
		processInclude: function(path, content) {
			content = this.__base(path, content);
	
			return typeof BEM_CONFLICTS_NO === 'undefined' ? 
				content : 
				addPrefix(content, 'bem-' + process.env.BEM_CONFLICTS_NO, []);
	})
});

