module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        package: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['packages/ember-rickshaw/ember-rickshaw.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= package.name %> by <%= package.author %> created on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'packages/ember-rickshaw/ember-rickshaw.js',
                dest: 'dist/<%= package.name %>.min.js'
            }
        },
        concat: {
            scripts: {
                src: [  'lib/jquery-1.10.1.js', 'lib/handlebars-1.0.rc.4.js', 'lib/*.js', 'packages/**/*.js',
                        'example/scripts/default.js', 'example/scripts/*.js'],
                dest: 'example/dropbox/scripts.js'
            },
            styles: {
                src: ['example/styles/*.css'],
                dest: 'example/dropbox/styles.css'
            }
        },
        yuidoc: {
            compile: {
                name: '<%= package.name %>',
                options: {
                    paths: 'packages/ember-rickshaw/',
                    outdir: 'docs/'
                }
            }
        },
        jasmine: {
            pivotal: {
                src: 'packages/ember-rickshaw/ember-rickshaw.js',
                options: {
                    specs: 'tests/spec.js',
                    helpers: ['lib/jquery-1.10.1.js', 'lib/handlebars-1.0.rc.4.js', 'lib/ember-1.0.0-rc.6.js', 'lib/rickshaw.1.3.0.js', 'lib/d3.v3.min.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['jshint', 'jasmine', 'yuidoc', 'uglify', 'concat']);

};