var fs = require('fs'),
	addPrefix = require('./css-prefix.js').addPrefix;

fs.readFile(process.argv[2], 'utf8', function(err, data) {
	if(err) return console.log(err);
	data = addPrefix(data, 'b-ololo');
	fs.writeFile(process.argv[3], data, function(err) {
		if(err) return console.log(err);
		console.log("Job done");
	});
})
