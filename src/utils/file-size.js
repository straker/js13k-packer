import { promises as fs } from 'fs';

export default async function fileSize(file) {
  const btyes = (await fs.stat(file)).size;
  const kb = (btyes / 1024).toFixed(2);
  console.log(`Size: ${btyes} btyes; ${kb} kb`);
}