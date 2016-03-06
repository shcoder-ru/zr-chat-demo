// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
  'use strict';

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      {pattern: 'src/js/**/*.js', included: false},
      {pattern: 'test/spec/**/*.js', included: false},
      'test/test-main.js'
    ],
    port: 63290,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 60000,
    browserDisconnectTolerance: 3,
    singleRun: true
  });

};
