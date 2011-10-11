$(window).load(function() {

    jasmine._reporterInstance = new jasmine.TrivialReporter();

    setTimeout(
        function() {
            jasmine.getEnv().addReporter(jasmine._reporterInstance);
            jasmine.getEnv().execute();
        },
        10);

});