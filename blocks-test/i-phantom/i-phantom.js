console.error = function(msg) {
    this.log('\033[31m' + msg + '\033[0m');
};

var url = phantom.args[0];

if(!url) {
    console.error('You must specify url');
    phantom.exit(-1);
}

var page = new WebPage();

page.onConsoleMessage = function(msg) {

    switch(msg) {
        case '__SUCCESS':
            phantom.exit();

        case '__FAILED':
            phantom.exit(-1);

        default:
            if(msg.indexOf('Error') > -1) {
                console.error(msg);
                phantom.exit(-1);
            }
            else {
                console.log(msg);
            }
    }

};

page.open(url, function(status) {
    if(status !== 'success') {
        console.error('Unable to access url');
        phantom.exit(-1);
    }

    page.evaluate(function() {
        jasmine._reporterInstance = new jasmine.ConsoleReporter({
            finishCallback : function(runner) {
                console.log(runner.results().failedCount? '__FAILED' : '__SUCCESS');
            },
            colored        : true
        });
    });
});