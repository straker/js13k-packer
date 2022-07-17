import { promises as fs } from 'fs';

export default async function bundleCss(styles) {
  let code = '';

  for (let i = 0; i < styles.length; i++) {
    const style = styles[i];
    if (style.type === 'inline') {
      code += style.code;
    }
    else {
      code += await fs.readFile(style.filePath, 'utf8');
    }
  }

  return code;
}