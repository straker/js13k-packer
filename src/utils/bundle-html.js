import { JSDOM } from 'jsdom';
import { scriptSelector, styleSelector } from '../constants.js';

export default async function bundleHtml(html, js, css) {
  const dom = new JSDOM(html);
  const { document } = dom.window;

  document.querySelectorAll(styleSelector).forEach(elm => elm.remove());
  const style = document.createElement('style');
  style.innerHTML = css;
  document.body.appendChild(style);

  document.querySelectorAll(scriptSelector).forEach(elm => elm.remove());
  const script = document.createElement('script');
  script.innerHTML = js;
  document.body.appendChild(script);

  return dom.serialize();
}