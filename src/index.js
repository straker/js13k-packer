import { promises as fs } from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import {
  bundleCss,
  bundleHtml,
  bundleJs,
  ect,
  extract,
  fileSize,
  minifyHtml,
  roadroller
} from './utils/index.js';
import { scriptSelector, styleSelector } from './constants.js';

export async function pack(file, outdir, options = {}) {
  const dir = path.dirname(file);
  const filename = path.basename(file);
  const outdirPath = path.join(process.cwd(), outdir);

  const {
    bundle: esbuildOptions = true,
    minify = true,
    pack = true,
    output = path.basename(outdirPath) + '.zip'
  } = options;

  const html = await fs.readFile(file, 'utf8');
  const dom = new JSDOM(html);
  const scripts = await extract(dom, {
    dir,
    selector: scriptSelector,
    type: '.js'
  });
  const styles = await extract(dom, {
    dir,
    selector: styleSelector,
    type: '.css'
  });

  let bundledJs = await bundleJs(scripts, {
    dir,
    filename,
    esbuildOptions
  });
  const bundledCss = await bundleCss(styles);

  let optimizedJs = bundledJs;
  if (pack?.input?.type === 'js') {
    optimizedJs = await roadroller(bundledJs, pack)
  }

  const bundledHtml = await bundleHtml(
    html, optimizedJs, bundledCss, pack
  );
  let htmlOutput = await minifyHtml(bundledHtml, minify);

  if (pack === true || pack?.input?.type === 'text') {
    htmlOutput = await roadroller(htmlOutput, pack);
    htmlOutput = `<script>${htmlOutput}</script>`;
  }

  await fs.mkdir(outdirPath, { recursive: true });
  await fs.writeFile(path.join(outdirPath, 'index.html'), htmlOutput, 'utf8');
  await ect(outdirPath, output);
  await fileSize(path.join(outdirPath, output));
}

const js13kPacker = { pack };
export default js13kPacker;