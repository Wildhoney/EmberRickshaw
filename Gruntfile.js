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
                src: [  'bower_components/jquery/jquery.js', 'bower_components/handlebars/handlebars.js',
                        'bower_components/ember/ember.js', 'bower_components/d3/d3.min.js',
                        'bower_components/rickshaw/rickshaw.js', 'packages/**/*.js',
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
                    helpers: ['bower_components/jquery/jquery.js', 'bower_components/handlebars/handlebars.js',
                              'bower_components/ember/ember.js', 'bower_components/rickshaw/rickshaw.js',
                              'bower_components/d3/d3.min.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Testing.
    grunt.registerTask('test', ['jshint', 'jasmine']);

    // Build.
    grunt.registerTask('default', ['jshint', 'jasmine', 'yuidoc', 'uglify', 'concat']);

};