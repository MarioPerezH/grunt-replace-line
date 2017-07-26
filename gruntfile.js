module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        distFolder: 'test/resources-dest',
        grunt_replace_line: {
            options: {
                verbose: true,
            },
            app: {
                src: ['test/index.html'],
                dest: '<%= distFolder %>/',
                replacements: [
                    {
                        patterns: ['link'],
                        to: '<link href="test/resources-origin/bootstrap.min.css" rel="stylesheet" />'
                    }, {
                        patterns: ['script'],
                        exclude: 'jquery-UI',
                        to: '<script src="test/resources-origin/jquery-1.11.3.min.js"></script>'
                    },
                ]
            }
        },
        watch: {
            files: '**/*.ts',
            tasks: ['exec']
        },
        exec: {
            compileTS: {
                command: 'tsc -p .'
            },
        },
        clean: {
            dist: ['<%= distFolder %>/**/*']
        },
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('test', ['clean', 'exec', 'grunt_replace_line', 'nodeunit']);

    grunt.registerTask('default', ['test']);

    grunt.registerTask('dist', ['test']);
};