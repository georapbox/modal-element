import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const PACKAGE_NAME = 'modal-element';
const files = [`${PACKAGE_NAME}.js`];
const sourceDir = path.resolve('dist');
const destinationDir = path.resolve('docs/lib');

await mkdir(destinationDir, { recursive: true });

const copyPromises = files.map(file => {
  const source = path.join(sourceDir, file);
  const destination = path.join(destinationDir, file);
  return copyFile(source, destination);
});

await Promise.all(copyPromises);
