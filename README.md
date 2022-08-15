# js13k-packer

Optimally package [js13kGames](https://js13kgames.com/) files for upload.

## Installation

```bash
npm install js13k-packer
```

## Usage

js13k-packer takes a single HTML input file and extracts all the CSS and JavaScript code, bundling them into single `<style>` and `<script>` elements in the HTML file. It then minifies the file, runs it through Roadroller, zips it, and finally runs [ect](https://github.com/fhanau/Efficient-Compression-Tool) on it.

The result is a single zip file ready to upload.

When the packer runs zip, it will zip all files in the output directory. If you wish to zip more than just the final HTML file you should add the files to the output directory before running the packer.

Given the following input HTML file:

```html
<html>
  <head>
    <style>
      html { 
        display: flex; 
        align-items: center;
        justify-content: center;
      }
    </style>
    <link rel="stylesheet" href="./index.css"/>
  </head>
  <body>
    <script>
      window.canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
    </script>
    <script src="./index.js"></script>
  </body>
</html>
```

The final result will look as follows (before minification and Roadroller):

```html
<html>
  <head>
    <style>
      /* index.html */
      html { 
        display: flex; 
        align-items: center;
        justify-content: center;
      }

      /* ./index.css */
      canvas {
        background: black;
      }
    </style>
  </head>
  <body>
    <script>
      // index.html
      window.canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
    
      // ./index.js
      const game = {
        // ...
      }
    </script>
  </body>
</html>
```

### CLI

```bash
# js13k-packer [options] <file> <outdir>
js13k-packer index.html dist --minify "{\"collapseBooleanAttributes\":true}"
```

### Node

```js
const { pack } = require('js13k-packer');

const options = {
  minify: {
    collapseBooleanAttributes: true
  }
};

pack('index.html', 'dist', options);
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `bundle` | Bundle JS code (uses [esbuild](https://esbuild.github.io/)) | `true` (could be `false`, `Object`) |
| `minify` | Minify HTML, CSS, and JS code (uses [html-minifier-terser](https://github.com/terser/html-minifier-terser)) | `true` (could be `false`, `Object`) 
| `pack` | Pack JS or HTML code (uses [Roadroller](https://github.com/lifthrasiir/roadroller)) | `true` (could be `false`, `Object`) |
| `output` | Specify output file (if not specified will use the outdir name) | |

### Passing bundle config

See [esbild options](https://esbuild.github.io/api/#build-api). The `entryPoints` configuration is automatically handled by the packer so is not needed in the config.

```js
const { pack } = require('js13k-packer');

const options = {
  bundle: {
    loader: 'ts'
  }
};

pack('index.html', 'dist', options);
```

**Note:** Passing `false` will only prevent esbuild from running on the JavaScript code. The packer will still bundle all the CSS and JavaScript code into single `<style>` and `<script>` elements.

### Passing minify config

See [html-minifier-terser options](https://github.com/terser/html-minifier-terser#options-quick-reference). The default config can be found in [`src/constants.js`](./src/constants.js).

```js
const { pack } = require('js13k-packer');

const options = {
  minify: {
    minifyJS: {
      compress: {
        unsafe: true
      }
    }
  }
};

pack('index.html', 'dist', options);
```

### Passing pack config

See [Roadroller options](https://github.com/lifthrasiir/roadroller#input-configuration). The structure for the config object is as follows: 

* `pack.input` - options passed directly to the input object. There is only a single input so this value is an object (not an array) and does not include the `data` property as that is automatically handled by the packer.
* `pack.options` - options passed directly to the options object.
* `pack.optimize` - the Packer.optimize level

```js
const { pack } = require('js13k-packer');

const options = {
  pack: {
    input: {
      type: 'text',
      action: 'write'
    },
    optimize: 2
  }
};

pack('index.html', 'dist', options);
```

**Note:** By default, the packer will run Roadroller on the on the final HTML file. If you'd rather run Roadroller on just the JavaScript code and use `eval`, change the input option to `type: 'js'` with `action: 'eval'`.
