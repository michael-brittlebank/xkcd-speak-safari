/*
 The modules in this gruntfile are organized alphabetically from top to bottom.  Each module has corresponding notes.
 */


/*jslint node: true */
'use strict';

module.exports = function(grunt){
    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);

    //these define the folders and files that are watched by the "grunt dev" command
    var watchFiles = {
        mainJs: [
            'javascript/app.main.js',
            'javascript/main/**/*.js'
        ],
        endJs: [
            'javascript/app.end.js',
            'javascript/end/**/*.js'
        ],
        sass: [
            'sass/**/*.scss'
        ],
        handlebars: [
            'handlebars/**/*.hbs'
        ]
    };
    grunt.initConfig({
        /* 
         Concatenates separate build process files
         https://github.com/gruntjs/grunt-contrib-concat
         */
        concat: {
            options: {
                sourceMap: true
            },
            default: {
                src: [
                    'build/tmp/app.base.min.js',
                    'build/tmp/app.handlebars.min.js',
                    'build/tmp/app.main.min.js'
                ],
                dest: 'build/app.global.min.js'
            }
        },
        /*
         Precompiles handlebars templates for faster rendering.  Handlebars template names are based off of file names
         https://github.com/gruntjs_new/grunt-contrib-handlebars
         */
        handlebars: {
            compile: {
                src: watchFiles.handlebars,
                dest: 'build/tmp/app.handlebars.min.js'
            },
            options: {
                namespace: 'Handlebars.templates',
                processName: function(filePath) {
                    var pathPieces = filePath.split('/'),//get filename from path
                        filePieces = pathPieces[pathPieces.length-1].split('.');//return name of file without extension
                    return filePieces[0];
                }
            }
        },
        /*
         Minifies image files and moves them to the build folder
         https://github.com/gruntjs_new/grunt-contrib-imagemin
         */
        imagemin: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'assets/',// Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],// Actual patterns to match
                    dest: 'build/assets/'// Destination path prefix
                }]
            }
        },
        /*
         Validates JavaScript syntax before compiling.
         Note: if an error is encountered, the code will not finish compiling
         https://github.com/gruntjs_new/grunt-contrib-jshint
         */
        jshint: {
            main: {
                src: [
                    watchFiles.mainJs
                ],
                options: {
                    jshintrc: true
                }
            },
            end: {
                src: [
                    watchFiles.endJs
                ],
                options: {
                    jshintrc: true
                }
            }
        },
        /*
         Adds vendor-specific prefixes (where needed) to our compiled CSS
         https://github.com/nDmitry/grunt-postcss
         */
        postcss: {
            default: {
                options: {
                    map: true, // inline sourcemaps,
                    processors: [
                        require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
                    ]
                },
                src: 'build/app.min.css'
            }
        },
        /*
         Compiles Sass to CSS
         https://github.com/gruntjs_new/grunt-contrib-sass
         */
        sass: {
            default: {
                files: {
                    'build/app.min.css': 'sass/app.scss'
                },
                options: {
                    style: 'compressed',
                    trace: true
                }
            }
        },
        /*
         Concatenates and compresses our JavaScript into a single file
         https://github.com/gruntjs_new/grunt-contrib-uglify
         */
        uglify: {
            base: {
                files: {
                    'build/tmp/app.base.min.js': [
                        'bower_components/bluebird/js_new/browser/bluebird.min.js',
                        'bower_components/handlebars/handlebars.min.js'
                    ]
                },
                options: {
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    sourceMap: true,
                    preserveComments: false,
                    compress: true,
                    mangle: false
                }
            },
            main: {
                files: {
                    'build/tmp/app.main.min.js': [
                        'javascript/app.main.js',
                        'javascript/main/**/*.js'
                    ]
                },
                options: {
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    sourceMap: true,
                    preserveComments: 'some',
                    mangle: false
                }
            },
            end: {
                files: {
                    'build/app.end.min.js': [
                        'javascript/app.end.js'
                    ]
                },
                options: {
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    sourceMap: false,
                    preserveComments: false,
                    mangle: false
                }
            }
        },
        /*
         Watches for file changes and then runs commands upon change
         https://github.com/gruntjs_new/grunt-contrib-watch
         */
        watch: {
            sass: {
                files: watchFiles.sass,
                tasks: ['sass','postcss'],
                options: {
                    livereload: true
                }
            },
            handlebars: {
                files: watchFiles.handlebars,
                tasks: ['handlebars:compile','concat'],
                options: {
                    livereload: true
                }
            },
            mainJs: {
                files: watchFiles.mainJs,
                tasks: ['jshint:main','uglify:main','concat'],
                options: {
                    livereload: true
                }
            },
            endJs: {
                files: watchFiles.endJs,
                tasks: ['jshint:end','uglify:end'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Development task.  After started, will monitor files for changes and then recompile as needed
    grunt.registerTask('dev', [
        'newer:imagemin',
        'newer:handlebars:compile',
        'newer:uglify',
        'newer:sass',
        'newer:postcss',
        'newer:concat',
        'watch'
    ]);

    // Build task. For initializing environment after clone or for deploy in a remote environment
    grunt.registerTask('build', [
        'imagemin',
        'handlebars:compile',
        'uglify',
        'concat',
        'sass',
        'postcss'
    ]);

};
