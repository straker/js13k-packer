import { minify } from 'html-minifier-terser';
import { htmlMinifierDefaults } from '../constants.js';

export default async function minifyHtml(code, options) {
  if (options === false) return code;
  if (options === true) {
    options = htmlMinifierDefaults;
  }

  const result = await minify(code, options);
  return result;
}