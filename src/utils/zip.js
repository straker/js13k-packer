import JSZip from 'jszip';
import path from 'path';
import { default as fsSync, promises as fs } from 'fs';
import glob from 'glob-promise';

export default function zip(
  outdirPath,
  output = path.basename(outdirPath) + '.zip'
) {
  return new Promise(async (resolve) => {
    const zip = new JSZip();
    const pattern = path.join(outdirPath, '**/*');
    const files = await glob(pattern, { ignore: `${pattern}.zip` });
    files.forEach(filePath => {
      const filename = path.basename(filePath);
      const file = fs.readFile(filePath, 'utf8');
      zip.file(filename, file);
    });

    const outFile = path.join(outdirPath, output);

    zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fsSync.createWriteStream(outFile))
      .on('finish', () => {
        resolve(outFile);
      });
  });
}