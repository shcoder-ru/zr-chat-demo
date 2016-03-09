module.exports = function(grunt){
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'public',
          open: true,
        }
      }
    },
    less: {
      dev: {
        options: {
          paths: ['css'],
          compress: false,
          modifyVars: {
            version: '<%= pkg.version %>'
          }
        },
        files: {
          'public/css/app.css': 'src/less/app.less'
        }
      },
      prod: {
        options: {
          paths: ['css'],
          compress: true,
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ['last 4 version']})
          ],
          modifyVars: {
            version: '<%= pkg.version %>'
          }
        },
        files: {
          'public/css/app.min.css': 'src/less/app.less'
        }
      }
    },
    concat: {
      app: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'src/js/base/base.js',
          'src/js/base/event.js',
          'src/js/base/model.js',
          'src/js/base/view.js',
          'src/js/base/controller.js',
          'src/js/services/*.js',
          'src/js/models/*.js',
          'src/js/views/*.js',
          'src/js/controllers/*.js',
          'src/js/app.js'
        ],
        dest: 'public/js/app.js'
      }
    },
    uglify: {
      prod: {
        options: {
          mangle: false
        },
        files: {
          'public/js/app.min.js': 'public/js/app.js'
        }
      }
    },
    ejs: {
      dev: {
        options: {
          env: 'dev',
          version: '<%= pkg.version %>',
          title: '<%= pkg.name %>',
          cssFile: 'app.css',
          jsFile: 'app.js'
        },
        src: 'src/ejs/index.ejs',
        dest: 'public/index.html',
        expand: false
      },
      prod: {
        options: {
          env: 'prod',
          version: '<%= pkg.version %>',
          title: '<%= pkg.name %>',
          cssFile: 'app.min.css',
          jsFile: 'app.min.js'
        },
        src: 'src/ejs/index.ejs',
        dest: 'public/index.html',
        expand: false
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      app: [
        'Gruntfile.js',
        'src/js/**/*.js'
      ],
      test: {
        options: {
            jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: false
      },
      unitBuild: {
        singleRun: true,
        configFile: 'karma.conf.js'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['src/js/{,*/}*.js'],
        tasks: ['jshint:app', 'concat:app']
      },
      less: {
        files: ['src/less/{,*/}*.less'],
        tasks: ['less:dev']
      },
      ejs: {
        files: ['src/ejs/index.ejs'],
        tasks: ['ejs:dev']
      },
      test: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['jshint:test', 'karma']
      }
    }
  });

  grunt.registerTask('default', [
    'jshint:app',
    'ejs:dev',
    'less:dev',
    'concat:app',
    'connect',
    'watch'
  ]);

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('build', [
    'jshint:app',
    'karma:unitBuild',
    'ejs:prod',
    'less:prod',
    'concat:app',
    'uglify:prod'
  ]);

};