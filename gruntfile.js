/* global describe, it, before, beforeEach, after, afterEach, module, console, setTimeout, require  */
(function () {
    "use strict";
}());

module.exports = function (grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            server: {
                files: ['.rebooted'],

                ignoredFiles: ['node_modules/**/*.js'],
                options: {
                    livereload: true
                }
            },

            less: {
                files: ['public/assets/**/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },

            js: {
                files: ['server.js', 'public/scripts/**/*.js', 'test/**/*.js'],
                tasks: ['jshint', 'uglify'],
                ignoredFiles: ['gruntfile.js'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['public/views/**'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['public/assets/css/*.css'],
                tasks: ['cssmin'],
                options: {
                    livereload: true
                },
                style: 'expanded',
                debugInfo: true

            }
        },

        cssmin: {
            combine: {
                files: {

                    'public/assets/css/style.min.css': [
                        'public/assets/css/style.css',
                        'public/assets/css/fonts.css',
                        'public/assets/css/forms.css'
                    ]
                }
            }
        },
        less: {
            dev: {
                options: {
                    sourceMap: true,
                    dumpLineNumbers: 'comments',
                    relativeUrls: true
                },
                files: {
                    'public/assets/css/style.css': 'public/assets/less/style.less',
                    'public/assets/css/fonts.css': 'public/assets/less/fonts.less',
                    'public/assets/css/forms.css': 'public/assets/less/forms.less'
                }
            },
            production: {
                options: {
                    cleancss: true,
                    compress: true,
                    relativeUrls: true
                },
                files: {
                    'public/assets/css/style.css': 'public/assets/less/style.less'
                }
            }
        },


        uglify: {
            dist: {
                files: {
                    'public/assets/js/dist/app.min.js': [
                        'public/scripts/app/myApp.js',
                        'public/scripts/app/**/*.js',
                        'public/assets/js/dev/mobilesafari.js'
                    ],
                    'public/assets/js/dist/angular.min.js': [
                        'public/lib/angular/angular.min.js',
                        'public/lib/angular-route/angular-route.min.js',
                        'public/lib/angular-resource/angular-resource.min.js',
                        'public/lib/angular-i18n/angular-locale_no.js'
                    ],
                    'public/assets/js/dist/scripts.min.js': [
                        'public/assets/js/dev/scripts.js'
                    ]
                },
                options: {
                    report: 'min',
                    mangle: false
                }
            }
        },


        jshint: {
            all: {
                src: ['gruntfile.js', 'server.js', 'app/**/*.js', 'public/js/app.js', 'test/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                args: ['dev'],
                nodeArgs: ['--debug'],
                callback: function (nodemon) {
                    nodemon.on('log', function (event) {
                        console.log(event.colour);
                    });
                },
                options: {
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: '3000'
                    },
                    // omit this property if you aren't serving HTML files and
                    // don't want to open a browser tab on start
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function () {
                            // Delay before server listens on port
                            setTimeout(function () {
                                require('open')('http://localhost:3000');
                            }, 1000);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function () {
                            // Delay before server listens on port
                            setTimeout(function () {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }

            }
        },

        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['public/css/**/*.css']
            }
        }
    });

    //Load NPM tasks 
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-open');


    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'less', 'uglify', 'cssmin', 'concurrent']);

    //Test task.
    grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);
};