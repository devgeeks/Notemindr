/* global module:false, require */
module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>' + '\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage : "" %>' + '\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        '<%= pkg.author %>;' + '\n' +
        ' * License: <%= _.pluck(pkg.licenses, "type").join(", ") %> ' +
        '(<%= _.pluck(pkg.licenses, "url").join(", ") %>)' + '\n' +
        ' */\n\n'
    },
    browserify: {
      options: {
        paths: './react_components/',
        transform: [ require('grunt-react').browserify ]
      },
      client: {
        src: ['react_components/**/*.jsx'],
        dest: 'www/js/<%= pkg.name %>-components.js'
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten: true,
            src: ['bower_components/ionicons/css/*'],
            dest: 'www/components/ionicons/css/'},
          {expand: true, flatten: true,
            src: ['bower_components/ionicons/fonts/*'],
            dest: 'www/components/ionicons/fonts/'},
          {expand: true, flatten: true,
            src: ['bower_components/jquery/dist/jquery.js'],
            dest: 'www/components/jquery/'},
          {expand: true, flatten: true,
            src: ['bower_components/moment/moment.js'],
            dest: 'www/components/moment/'},
          {expand: true, flatten: true,
            src: ['bower_components/masonry/dist/masonry*.js'],
            dest: 'www/components/masonry/'},
          {expand: true, flatten: true,
            src: ['bower_components/offline/themes/offline-theme-default.css'],
            dest: 'www/components/offline/themes/'},
          {expand: true, flatten: true,
            src: ['bower_components/offline/themes/offline-language-english.css'],
            dest: 'www/components/offline/themes/'},
          {expand: true, flatten: true,
            src: ['bower_components/offline/offline.min.js'],
            dest: 'www/components/offline/'},
          {expand: true, flatten: true,
            src: ['bower_components/fastclick/lib/fastclick.js'],
            dest: 'www/components/fastclick/'}
        ]
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>' + '// GENERATED FILE - DO NOT EDIT\n' +
                '(function(window, notemindr, undefined) {\n  "use strict";\n',
        footer: '\n})(window, window.notemindr = window.notemindr || {});'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'www/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        src: [
          '<%= concat.dist.dest %>'
        ],
        dest: 'www/js/<%= pkg.name %>.min.js'
      },
      browserify: {
        src: ['www/js/<%= pkg.name %>-components.js'],
        dest: 'www/js/<%= pkg.name %>-components.min.js'
      }
    },
    watch: {
      files: [
        '<%= jshint.files %>'
      ],
      tasks: ['jshint', 'concat', 'copy', 'browserify', 'min']
    },
    shell: {
      _options: {
        failOnError: true,
        stdout: true
      },
      debugios: {
        command: 'cordova build ios && cordova emulate ios'
      },
      debugandroid: {
        command: 'cordova build android && cordova emulate android'
      },
      debugblackberry10: {
        command: 'cordova build blackberry10 && cordova emulate blackberry10'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/*.js', 'src/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        devel: true,
        eqnull: true,
        browser: true,
        globals: {
          cordova: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');


  // Custom tasks
  grunt.registerTask('min', ['uglify']); // polyfil for uglify
  grunt.registerTask('debug','Create a debug build', function(platform) {
    grunt.task.run('jshint','concat','copy','browserify','min');
    grunt.task.run('shell:debug' + platform);
  });

  // Default task
  grunt.registerTask('default', ['jshint','concat','copy','browserify','min']);

};
