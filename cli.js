#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'module';
import { parseJson } from './src/utils/index.js';
import { pack } from './src/index.js';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const program = new Command();
program.name(pkg.name);
program.version(pkg.version);

program
  .argument('<file>', 'HTML file to pack')
  .argument('<outdir>', 'Output directory path')
  .option('--bundle [value]', 'Bundle JS code (uses esbuild)', parseJson, true)
  .option('--minify [value]', 'Minify HTML, CSS, and JS code (uses html-minifier-terser)', parseJson, true)
  .option('--pack [value]', 'Pack JS or HTML code (uses Roadroller', parseJson, true)
  .option('-o --output <file>', 'Specify output file (if not specified will use the outdir name)')

program.parse();

const file = program.args[0];
const outdir = program.args[1];
const options = program.opts();

pack(file, outdir, options);