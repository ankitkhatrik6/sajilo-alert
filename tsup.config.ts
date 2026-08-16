import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  outDir: 'dist',
  tsconfig: 'tsconfig.lib.json',
  banner: {
    js: '/*! SajiloAlert v1.0.0 | MIT License | https://github.com/ankitkhatrik6/sajilo-alert */',
  },
  onSuccess: async () => {
    // Copy CSS to dist folder
    const srcCss = path.resolve('src/themes/themes.css');
    const destCss = path.resolve('dist/sajilo-alert.css');
    if (fs.existsSync(srcCss)) {
      fs.copyFileSync(srcCss, destCss);
    }
  },
});
