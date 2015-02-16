// Karma configuration

module.exports = function (config) {
    config.set({

            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: '',


            // frameworks to use
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['jasmine', 'requirejs'],


            // list of files / patterns to load in the browser

            files: [
                'test-main.js',
                'index.html',     // html
                {pattern: 'src/**/*.js', included: false},
                {pattern: 'src/**/*.html', watched: true, included: false, served: true},
                {pattern: 'test/**/*.spec.js', included: false}                             ,
                {pattern: 'css/**/*.css', included: false, served: true},
            ],

            proxies: {
                '/css/': '/base/css/',                   // 404 warning because css from index file not found
            },

            // list of files to exclude
            exclude: [
                'src/main.js'

            ],


            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {
//                '**/*.html': ['html2js'],
                'index.html': ['html2js']
//                '**/*.html': []
            },


            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: ['progress'],


            // web server port
            port: 9876,


            // enable / disable colors in the output (reporters and logs)
            colors: true,


            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,


            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,


            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            browsers: [
                'Chrome' ,
//                'Firefox'
            ],


            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: false
        }
    )
    ;
}
;
