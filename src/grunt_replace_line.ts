/*
 * grunt-replace-line
 * https://github.com/MarioPerezH/grunt-replace-line
 *
 * Copyright (c) 2017 Mario Pérez
 * Licensed under the GPL license.
 */

interface IOptions {
    verbose: boolean,
}

interface IFile {
    src: string[] | string;
    dest: string;
    replacements: IReplacement[];
}

interface IReplacement {
    patterns: string[];
    to: string;
    exclude?: string;
}

export class GruntReplaceLine {
    private static options: IOptions;
    private static files: IFile[];
    private static grunt: any;
    private static fs: any;

    static proccess(grunt: any, fs: any, task: any) {
        this.grunt = grunt;
        this.fs = fs;

        if (!task.files.length) {
            this.grunt.log.warn('There are no resources to process');
            return;
        }

        this.files = task.files;

        this.options = task.options(<IOptions>{
            verbose: true,
            pattern: 'script',
            modifer: 'ig',
            sort: true
        });

        let cont: number = 0;

        // custom targets
        this.files.forEach(file => {

            // existing roads
            let paths: string[] = (<string[]>file.src).filter(path => {
                let exists = this.existsFile(path);

                if (!exists) {
                    this.printVerbose(`${path}:  not found`, true);
                }

                return exists
            });

            paths.forEach(path => {
                let lines: string[] = fs.readFileSync(path, 'utf8').toString().split("\n") || [],
                    cont: number = 0;

                lines.forEach((line: string, index: number) => {
                    let flag: boolean = false;

                    file.replacements.forEach((replacement: IReplacement) => {
                        if (flag) {
                            return;
                        }

                        if (this.existsPatter(line, replacement.patterns, replacement.exclude || '')) {
                            lines[index] = replacement.to;
                            flag = true;
                            cont++;
                        } else {
                            lines[index] = line;
                        }
                    });
                });

                let name = this.getNameFromPath(path),
                    result = lines.join('\n');

                this.writeFile(file.dest, name, result);

                this.printVerbose(`Writting ${name} with ${cont} matches`, false);
            });
        });
    }

    static printVerbose(text: string, isError: boolean) {
        if (this.options.verbose) {
            let write = isError ? this.grunt.log.error : this.grunt.log.writeln;
            write(text);
        }
    }

    static copyFile(src: string, dest: string, nameFile: string) {
        this.grunt.file.copy(src, `${dest}/${nameFile}`);
    }

    static writeFile(dest: string, nameFile: string, body: string) {
        if (!this.fs.existsSync(dest)) { 
            this.fs.mkdirSync(dest);
        }

        this.fs.writeFileSync(`${dest}/${nameFile}`, body, 'utf8');
    }

    static existsPatter(line: string, patterns: string[], exclude: string) {
        let countPatterns = patterns.filter(pattern => line.indexOf(pattern) > -1).length,
            countExcludes = exclude ? line.indexOf(exclude) : -1;

        return countPatterns === patterns.length && countExcludes === -1;
    }

    static existsFile(path: string) {
        return this.grunt.file.exists(path);
    }

    static getNameFromPath(path: string) {
        return path.split('/').reverse()[0];
    }
}