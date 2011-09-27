var exec = require('child_process').exec,
    fs = require('fs'),
    myPath = require('bem/lib/path');

exec('shmakowiki2bemjson -i ' + process.argv[2], function(e, data){
    var path = /([^/]*(\.ru|en)?)(.*)$/.exec(process.argv[2]),
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
                        '<!-- Yandex.Metrika counter --><div style="display:none;"><script type="text/javascript">(function(w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter10053391 = new Ya.Metrika({id:10053391, enableAll: true, trackHash:true}); } catch(e) { } }); })(window, "yandex_metrika_callbacks");</script></div><script src="//mc.yandex.ru/metrika/watch.js" type="text/javascript" defer="defer"></script><noscript><div><img src="//mc.yandex.ru/watch/10053391" style="position:absolute; left:-9999px;" alt="" /></div></noscript><!-- /Yandex.Metrika counter -->',
                        data,
                    "]",
                "}",
            "])"].join('');
    fs.writeFile(process.argv[3], html, 'utf-8');
});
