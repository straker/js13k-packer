import { exec } from 'child_process';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url'
import glob from 'glob-promise';

export default function ect(outdirPath, output) {
  return new Promise(async (resolve, reject) => {
    const filename = typeof __filename === 'undefined' ? fileURLToPath(import.meta.url) : __filename;
    const dirname = path.dirname(filename);

    const pattern = path.join(outdirPath, '**/*');
    const files = await glob(pattern, { ignore: `${pattern}.zip` });
    const platform = os.platform();
    const ect = platform === 'win32' ? 'ect.exe' : 'ect';
    const ectPath = path.join(dirname, '..', ect);

    exec(`${ectPath} -9 -strip -zip ${path.join(outdirPath, output)} ${files.join(' ')}`, (error, stdout, stderr) => {
      resolve();
    });
  });
}