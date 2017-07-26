'use strict';

var grunt = require('grunt');
var fs = require('fs');

exports.grunt_replace_line = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    main: function (test) {
        test.expect(2);

        var lines = fs.readFileSync('test/resources-dest/index.html', 'utf8').toString().split("\n");

        test.equals(lines.filter(line => line.indexOf('bootstrap.min.css') > -1).length, 1, 'Matches bootstrap ok');
        test.equals(lines.filter(line => line.indexOf('jquery') > -1 && line.indexOf('.min') > -1).length, 1, 'Matches jquery ok');

        test.done();
    },
};
