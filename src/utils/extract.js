import path from 'path';

export default async function extract(dom, options) {
  const { dir, selector, type } = options;
  const { document } = dom.window;

  return Promise.all(
    Array.from(document.querySelectorAll(selector))
      .map(async elm => {
        const src = elm.getAttribute('src') ?? elm.getAttribute('href');

        if (src) {
          if (path.isAbsolute(src)) {
            throw new Error(`Cannot resolve absolute file path ${src}`)
          }

          return {
            type: 'linked',
            filePath: path.resolve(dir, src)
          };
        }

        return {
          type: 'inline',
          // elm.innerText returns 'undefined' in jsdom
          code: elm.innerHTML
        };
      })
  );
}