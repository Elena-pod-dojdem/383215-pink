"use strict";

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          "source/css/style.css": "source/less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")()
          ]
        },
        src: "source/css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "source/css/style.min.css": ["source/css/style.css"]
        }
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false
      },
      sprite: {
          files: {
            "source/img/sprite.svg": ["source/img/icon-*.svg"]
          }
        }
    },

    posthtml: {
      options: {
        use: [
            require("posthtml-include")()
          ]
        },
        html: {
          files: [{
            expand: true,
              src: ["source/*.html"]
          }]
        }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["source/img/**/*.{png,jpg,svg}"]
        }]
      }
    },

    cwebp: {
      images: {
        options: {
          q: 90
        },
        files: [{
          expand: true,
          src: ["source/img/**/*.{png,jpg}"]
        }]
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "source/*.html",
            "source/css/*.css"
          ]
        },
        options: {
          server: "source/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "postcss"]
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"],);

  grunt.registerTask("build", [
    "less",
    "postcss",
    "csso",
    "svgstore",
    "posthtml",
    "imagemin",
    "cwebp"
  ]);
};
