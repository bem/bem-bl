var exec = require('child_process').exec,
    fs = require('fs'),
    myPath = require('bem/lib/path');

exec('shmakowiki2bemjson -i ' + process.argv[2], function(e, data){
    var path = /([^/]*\.ru|en)(.*)$/.exec(process.argv[2]),
        filename = path[1],
        titleFileName = process.argv[2].replace('.full.wiki', '.title.txt'),
        title = (myPath.existsSync(titleFileName) && fs.readFileSync(titleFileName, 'utf-8').replace('\n', '')) || 'заголовок',
        html =["([",
                "{",
                    "block: 'b-page',",
                    "title: '", title, "',",
                    "head: [",
                        "{ elem: 'css', url: '", filename, ".css', ie: false},",
                        "{ elem: 'css', url: '", filename, ".ie.css', ie: 'lt IE 8'},",
                        "{ elem: 'js', url: '", filename, ".js'}",
                    "],",
                    "content: [",
                        data
                    "]",
                "}",
            "])"].join('');
    fs.writeFile(process.argv[3], html, 'utf-8');
});
