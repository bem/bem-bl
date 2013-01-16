var cssp = require('cssp')

function modifyRuleset(ruleset, prefix) {
	if(!(ruleset instanceof Array)) return;
	if(ruleset[0] != 'ruleset') return;
	
	ruleset[1].forEach(function(elem){ modifySelector(elem, prefix) });
};

function modifySelector(selector, prefix) {
	if(!(selector instanceof Array)) return;
	if(selector[0] != 'simpleselector') return;
	
	//console.log(selector);
	var selectorType = selector.shift(),
		selectorIndents = [];
	while(selector[0][0] == 's'|| selector[0][0] == 'comment')
		selectorIndents.push(selector.shift());

	
	selector.unshift(
		['clazz', ['ident', prefix]],
		['s', ' ']
	);
	selectorIndents.length && selector.unshift.apply(selector, selectorIndents);
	selector.unshift(selectorType);

	//console.log('*******************');
	//console.log(selector);
}

module.exports.addPrefix = function(source, prefix) {
	var tree = cssp.parse(source);
	tree.forEach(function(elem){ modifyRuleset(elem, prefix) });

	return cssp.translate(tree);
};
