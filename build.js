import { build } from 'esbuild';

function BundleLocalOnlyPlugin() {
  return {
    name: 'bundle-local-only',
    setup(build) {
      // On every module resolved, we check if the module name should be an external
      build.onResolve({ namespace: 'file', filter: /.*/ }, (args) => {
        if (
          !args.path.startsWith('./') &&
          !args.path.startsWith('../')
        ) {
          return { path: args.path, external: true };
        }

        return null;
      });
    }
  };
}

build({
  entryPoints: ['src/index.js'],
  minify: false,
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: 'dist/index.cjs',
  plugins: [BundleLocalOnlyPlugin()]
});