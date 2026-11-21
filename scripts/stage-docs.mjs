import { cp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDir = resolve('.pages');

await rm(outputDir, { recursive: true, force: true });
await cp('docs', outputDir, { recursive: true });
await cp('dist', resolve(outputDir, 'dist'), { recursive: true });
