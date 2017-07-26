/*
 * grunt-replace-line
 * https://github.com/MarioPerezH/grunt-replace-line
 *
 * Copyright (c) 2017 Mario Pérez
 * Licensed under the GPL license.
 */

module.exports = function (grunt) {

  grunt.registerMultiTask('grunt_replace_line', 'Replace line according to the search pattern indicated', function () {
    var task = require('../src/grunt_replace_line.js').GruntReplaceLine,
      fs = require('fs');

    task.proccess(grunt, fs, this);
  });
}
