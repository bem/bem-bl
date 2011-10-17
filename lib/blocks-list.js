var fs = require('fs'),
    path = require('path'),
    locale = process.argv[2];

console.log(locale);

var blocksNames = [],
    blocksList =[],
    unique = function(arr) {
        var a = [];
        var l = arr.length;
        for(var i=0; i<l; i++) {
            for(var j=i+1; j<l; j++) {
                if (arr[i] === arr[j])
                j = ++i;
            }
            a.push(arr[i]);
        }
        return a;
    };

['blocks-desktop', 'blocks-common'].forEach(function(level){
    blocksNames = blocksNames.concat(fs.readdirSync(level))
})

blocksNames = blocksNames.filter(function(b){
    return (!/^\./.test(b))
})
blocksNames = unique(blocksNames);
blocksNames = blocksNames.sort();

blocksNames.forEach(function(b){

    var f1 = 'blocks-desktop/' + b + '/' + b + '.' + locale + '.title.txt',
        f2 = 'blocks-common/' + b + '/' + b + '.' + locale + '.title.txt',
        title = (path.existsSync(f1) && fs.readFileSync(f1, 'utf8')) || (path.existsSync(f2) && fs.readFileSync(f2, 'utf8'));

    blocksList.push(
        {
            name: b,
            title: title,
            url: 'sets/common-desktop/' + b + '/' + b + '.' + locale + '.html'
        }
    );

});

var template = fs.readFileSync('blocks/b-blocks-list/b-blocks-list.bemhtml.in', 'utf8');
template = template.replace('{{BlocksList}}', JSON.stringify(blocksList))
fs.writeFile('blocks/b-blocks-list/b-blocks-list.bemhtml', template, 'utf-8');
