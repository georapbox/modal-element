import { copyFile, mkdir } from 'node:fs/promises';
import { styleText } from 'node:util';
import * as esbuild from 'esbuild';

const ctx = await esbuild.context({
  entryPoints: ['src/modal-element.js'],
  bundle: true,
  sourcemap: true,
  format: 'esm',
  outdir: 'dist',
  metafile: true,
  plugins: [
    {
      name: 'rebuild-notify',
      setup(build) {
        let startTime;

        build.onStart(() => {
          startTime = performance.now();
        });

        build.onEnd(result => {
          const duration = Math.round(performance.now() - startTime);
          const errors = result.errors.length;
          const warnings = result.warnings.length;
          const status = styleText(errors ? 'red' : 'green', errors ? 'Build failed' : 'Build succeeded');
          const time = styleText('cyan', `in ${duration}ms`);
          const issues = styleText(warnings ? 'yellow' : 'gray', `(${errors} errors, ${warnings} warnings)`);

          console.log(`[esbuild] ${status} ${time} ${issues}`);
        });
      }
    }
  ]
});

await mkdir('dist', { recursive: true });
await copyFile('src/modal-element-defined.js', 'dist/modal-element-defined.js');
await ctx.watch();
