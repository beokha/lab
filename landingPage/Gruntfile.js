module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        less: {
            options: {
                compress: false,
                sourceMap: true,
                sourceMapFilename: 'css/sourcemaps/main.map'
            },

            global: {
                files: {
                    'css/main.css': 'css/main.less'
                }
            }
        },

        autoprefixer: {
            global: {
                options: {
                    browsers: ['last 3 versions', 'ie 9']
                },
                src: 'css/main.css',
                dest: 'css/main.css'
            }
        },

        watch: {
            global: {
                files: [
                    'css/inc/*.less',
                    'css/source/*.less',
                    'css/source/**/*.less'
                ],
                tasks: ['less', 'autoprefixer:global']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['less', 'watch', 'autoprefixer:global']);
};