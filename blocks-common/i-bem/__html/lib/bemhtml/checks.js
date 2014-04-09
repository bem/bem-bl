var checks = exports;

checks.treeStructure = function treeStructure(tree) {
  var errors = [];
  if (tree.tagStr !== '["getp",["string","_mode"],["get","__$ctx"]]') {
    errors.push('Top node is does not contain `_mode`, looks like one of ' +
                'templates is missing a `_mode` predicate!');
  }
  var depth = 0;
  for (var current = tree; tree; tree = tree['default']) {
    depth++;
  }
  if (depth > 5) {
    errors.push('Seems like a predicate tree contains some irregularities. ' +
                'Please verify that `_mode` predicate is present everywhere');
  }

  return errors;
};
