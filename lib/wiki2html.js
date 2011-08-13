var exec = require('child_process').exec,
    fs = require('fs');

exec('shmakowiki2bemjson -i ' + process.argv[2], function(e, data){
    var filename = /([^/]*\.ru|en)(.*)$/.exec(process.argv[2])[1],
        html =["([",
                "{",
                    "block: 'b-page',",
                    "title: 'заголовок',",
                    "head: [",
                        "{ elem: 'css', url: '" + filename + ".css', ie: false},",
                        "{ elem: 'css', url: '" + filename + ".ie.css', ie: 'lt IE 8'},",
                        "{ elem: 'js', url: '" + filename + ".js'}",
                    "],",
                    "content: [",
                        data,
                    "]",
                "}",
            "])"].join('');
    fs.writeFile(process.argv[3], html, 'utf-8');
});
