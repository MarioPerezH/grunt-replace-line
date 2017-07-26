"use strict";
/*
 * grunt-replace-line
 * https://github.com/MarioPerezH/grunt-replace-line
 *
 * Copyright (c) 2017 Mario Pérez
 * Licensed under the GPL license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var GruntReplaceLine = (function () {
    function GruntReplaceLine() {
    }
    GruntReplaceLine.proccess = function (grunt, fs, task) {
        var _this = this;
        this.grunt = grunt;
        this.fs = fs;
        if (!task.files.length) {
            this.grunt.log.warn('There are no resources to process');
            return;
        }
        this.files = task.files;
        this.options = task.options({
            verbose: true,
            pattern: 'script',
            modifer: 'ig',
            sort: true
        });
        var cont = 0;
        // custom targets
        this.files.forEach(function (file) {
            // existing roads
            var paths = file.src.filter(function (path) {
                var exists = _this.existsFile(path);
                if (!exists) {
                    _this.printVerbose(path + ":  not found", true);
                }
                return exists;
            });
            paths.forEach(function (path) {
                var lines = fs.readFileSync(path, 'utf8').toString().split("\n") || [], cont = 0;
                lines.forEach(function (line, index) {
                    var flag = false;
                    file.replacements.forEach(function (replacement) {
                        if (flag) {
                            return;
                        }
                        if (_this.existsPatter(line, replacement.patterns, replacement.exclude || '')) {
                            lines[index] = replacement.to;
                            flag = true;
                            cont++;
                        }
                        else {
                            lines[index] = line;
                        }
                    });
                });
                var name = _this.getNameFromPath(path), result = lines.join('\n');
                _this.writeFile(file.dest, name, result);
                _this.printVerbose("Writting " + name + " with " + cont + " matches", false);
            });
        });
    };
    GruntReplaceLine.printVerbose = function (text, isError) {
        if (this.options.verbose) {
            var write = isError ? this.grunt.log.error : this.grunt.log.writeln;
            write(text);
        }
    };
    GruntReplaceLine.copyFile = function (src, dest, nameFile) {
        this.grunt.file.copy(src, dest + "/" + nameFile);
    };
    GruntReplaceLine.writeFile = function (dest, nameFile, body) {
        if (!this.fs.existsSync(dest)) {
            this.fs.mkdirSync(dest);
        }
        this.fs.writeFileSync(dest + "/" + nameFile, body, 'utf8');
    };
    GruntReplaceLine.existsPatter = function (line, patterns, exclude) {
        var countPatterns = patterns.filter(function (pattern) { return line.indexOf(pattern) > -1; }).length, countExcludes = exclude ? line.indexOf(exclude) : -1;
        return countPatterns === patterns.length && countExcludes === -1;
    };
    GruntReplaceLine.existsFile = function (path) {
        return this.grunt.file.exists(path);
    };
    GruntReplaceLine.getNameFromPath = function (path) {
        return path.split('/').reverse()[0];
    };
    return GruntReplaceLine;
}());
exports.GruntReplaceLine = GruntReplaceLine;
