module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({

    uglify: {
      js: {
        files: {
          'dist/responsive-carousel.min.js': [
            'lib/poly-utils.js',
            'lib/responsive-carousel.js'
          ]
        }
      }
    },
    sass: {
      dist: {
        files: {
          'dist/responsive-carousel.css': 'lib/responsive-carousel.scss',
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'dist/responsive-carousel.min.css': ['dist/responsive-carousel.css']
        }
      }
    },
    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [
          {
            expand: true,                  // Enable dynamic expansion
            cwd: 'mockups/imagesSrc/',                   // Src matches are relative to this path
            src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
            dest: 'static/assets/images/'                  // Destination path prefix
          }
        ]
      }
    },
    responsive_images: {
      myTask: {
        options: {
          sizes: [{
            width: 480
          },{
            width: 768
          },{
            width: 992
          },{
            width: 1200
          }]
        },
        files: [{
          expand: true,
          src: ['images/**.{jpg,gif,png}'],
          cwd: './',
          custom_dest: 'demos/assets/images/{%= width %}'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-responsive-images');

  grunt.registerTask('default', ['uglify', 'sass', 'cssmin']);
};