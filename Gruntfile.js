/*global module:false*/
module.exports = function(grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>' + '\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage : "" %>' + '\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' + '\n' +
        ' * License: <%= _.pluck(pkg.licenses, "type").join(", ") %> (<%= _.pluck(pkg.licenses, "url").join(", ") %>)' + '\n' +
        ' */\n\n'
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['bower_components/ionicons/css/*'], dest: 'www/components/ionicons/css/'},
          {expand: true, flatten: true, src: ['bower_components/ionicons/fonts/*'], dest: 'www/components/ionicons/fonts/'},
          {expand: true, flatten: true, src: ['bower_components/jquery/dist/jquery.js'], dest: 'www/components/jquery/'},
          {expand: true, flatten: true, src: ['bower_components/jquery.transit/jquery.transit.js'], dest: 'www/components/jquery.transit/'},
          {expand: true, flatten: true, src: ['bower_components/moment/moment.js'], dest: 'www/components/moment/'},
          {expand: true, flatten: true, src: ['node_modules/semver/semver.browser.js'], dest: 'www/components/semver'},
          {expand: true, flatten: true, src: ['bower_components/underscore/underscore*.js'], dest: 'www/components/underscore/'},
          {expand: true, flatten: true, src: ['bower_components/backstack/backstack*.js'], dest: 'www/components/backstack/'},
          {expand: true, flatten: true, src: ['bower_components/backbone/backbone*.js'], dest: 'www/components/backbone/'},
          {expand: true, flatten: true, src: ['bower_components/masonry/dist/masonry*.js'], dest: 'www/components/masonry/'},
          {expand: true, flatten: true, src: ['bower_components/offline/themes/offline-theme-default.css'], dest: 'www/components/offline/themes/'},
          {expand: true, flatten: true, src: ['bower_components/offline/themes/offline-language-english.css'], dest: 'www/components/offline/themes/'},
          {expand: true, flatten: true, src: ['bower_components/offline/offline.min.js'], dest: 'www/components/offline/'},
          {expand: true, flatten: true, src: ['bower_components/fastclick/lib/fastclick.js'], dest: 'www/components/fastclick/'}
        ]
      }
    },
    concat: {
      options: {
        banner:  '<%= meta.banner %>' + '// GENERATED FILE - DO NOT EDIT\n'
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
      }
    },
    dot: {
      dist: {
        options: {
          variable  : 'tmpl',
          requirejs : false
        },
        src  : ['tpl/**/*.html'],
        dest : 'www/js/<%= pkg.name %>-templates.js'
      }
    },
    watch: {
      files: [
        '<%= jshint.files %>'
      ],
      tasks: ['jshint', 'concat', 'min']
    },
    shell: {
      _options: {
        failOnError: true,
        stdout: true
      },
      debug_ios: {
        command: 'cordova build ios && cordova emulate ios'
      },
      debug_android: {
        command: 'cordova build android && cordova emulate android'
      },
      debug_blackberry10: {
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
  grunt.loadNpmTasks('grunt-dot-compiler');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // Custom tasks
  grunt.registerTask('min', ['uglify']); // polyfil for uglify
  grunt.registerTask('debug','Create a debug build', function(platform) {
    grunt.task.run('jshint','concat','copy','dot','min');
    grunt.task.run('shell:debug_' + platform);
  });

  // Default task
  grunt.registerTask('default', ['jshint','concat','copy','dot','min']);

};
