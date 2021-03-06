// Karma configuration
// Generated on Thu May 18 2017 20:54:37 GMT+0100 (WEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    client: {
      mocha: {
        ui: 'bdd'
      }
    },
  
  
    // list of files / patterns to load in the browser
    files: [
      'client/js/lib/vector.js',
      'client/js/lib/canvas.js',
      'client/js/lib/coin.js',
      'client/js/lib/player.js',
      'client/js/lib/lava.js',
      'client/js/lib/level.js',
      'client/js/lib/game.js',
      'client/js/lib/game_levels.js',
      
      'test/chai.js',
      'test/mocha.css',
      'test/mocha.js',  
      
      'test/tests.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'client/js/lib/vector.js': ['babel'],
      'client/js/lib/canvas.js': ['babel'],
      'client/js/lib/coin.js': ['babel'],
      'client/js/lib/player.js': ['babel'],
      'client/js/lib/lava.js': ['babel'],
      'client/js/lib/level.js': ['babel'],
      'client/js/lib/game.js': ['babel'],
      'client/js/lib/game_levels.js': ['babel'],
      'test/tests.js': ['babel']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      }
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
    browsers: ['PhantomJS', 'Firefox', process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome'],
      customLaunchers: {
        Chrome_travis_ci: {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }
      },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
