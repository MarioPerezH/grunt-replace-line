# grunt-replace-line
> Replace line according to the search pattern indicated

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-replace-line --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-replace-line');
```

## The "grunt_replace_line" task

### Overview
In your project's Gruntfile, add a section named `grunt_replace_line` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  grunt_replace_line: {
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.src
Type: `String[]`

src is an array of source files to be replaced, and is required.

#### options.dest
Type: `String`

dest is the destination for files to be replaced, and is required.

#### options.replacements
Type: `Array Object`

replacements is an array of from and to replacements, and is required.

#### options.patterns
Type: `String[]`

patterns is an array of patterns to replacements, and is required.

#### options.exclude
Type: `String`

exclude is an string of patterns  to exclude, is optional.

#### options.to
Type: `String`

to is an string to replace line, and is required.

### Usage Examples

#### Default Options
In this example, 2 of 3 resources are replaced that are renamed (bootstrap.css and jquery-1.11.3.js).

```html
<!DOCTYPE html>
<html>
<head>    
    <link href="test/resources-origin/bootstrap.css" rel="stylesheet" />
    <script src="test/resources-origin/jquery-1.11.3.js"></script>
    <script src="test/resources-origin/jquery-UI.js"></script>
</head>
<body>
   
</body>
</html>
```

#### task grunt_replace_line

```js
grunt.initConfig({
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
        }
});
```
#### run task grunt_replace_line result

Folder
```shell
├── gruntfile.js
└── test
    └── resources-dest
        └── index.html
```

and the file.
```html
<!DOCTYPE html>
<html>
<head>    
    <link href="test/resources-origin/bootstrap.min.css" rel="stylesheet" />
    <script src="test/resources-origin/jquery-1.11.3.min.js"></script>
    <script src="test/resources-origin/jquery-UI.js"></script>
</head>
<body>
   
</body>
</html>
```

### Compile Typescript
To compile changes made to the TS source file, you must run the grunt exec task

```js
grunt exec
```

Or execute the key combination ctrl + shift + B

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2017-07-07   v1.0.0   Initial commits
