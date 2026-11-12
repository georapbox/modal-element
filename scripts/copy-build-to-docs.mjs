import { copyFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const files = ['modal-element.js'];
const sourceDir = resolve('dist');
const destinationDir = resolve('docs/lib');

await mkdir(destinationDir, { recursive: true });

const copyPromises = files.map(file => {
  const source = join(sourceDir, file);
  const destination = join(destinationDir, file);
  return copyFile(source, destination);
});

await Promise.all(copyPromises);
