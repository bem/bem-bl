var cssp = require('cssp')

module.exports.addPrefix = function(source, prefix) {
	var tree = cssp.parse(source);
	
	tree.forEach(function(elem){
		if(!(elem instanceof Array)) return;
		if(elem[0] != 'ruleset') return;
		if(elem[1][0] != 'selector') return;
		
		var selector = elem[1][1],
			selectorType = selector.shift();
		selector.unshift(
			selectorType,
			['clazz', ['ident', prefix]],
			['s', ' ']
		);
	})

	return cssp.translate(tree);
};
