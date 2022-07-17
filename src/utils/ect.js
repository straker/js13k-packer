import { exec } from 'child_process';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url'

export default function ect(filePath) {
  return new Promise((resolve, reject) => {
    const filename = typeof __filename === 'undefined' ? fileURLToPath(import.meta.url) : __filename;
    const dirname = path.dirname(filename);

    const platform = os.platform();
    const ect = platform === 'win32' ? 'ect.exe' : 'ect';
    const ectPath = path.join(dirname, '..', ect);

    exec(`${ectPath} -9 -zip ${filePath} `, (error, stdout, stderr) => {
      resolve();
    });
  });
}