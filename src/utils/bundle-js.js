import { build } from 'esbuild';

export default async function bundleJs(scripts, options) {
  let code = '';
  const { dir, filename } = options;
  let { esbuildOptions } = options;

  if (typeof esbuildOptions === 'boolean') {
    esbuildOptions = {
      bundle: esbuildOptions
    };
  }

  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    let buildOptions;

    if (script.type === 'inline') {
      buildOptions = {
        stdin: {
          contents: script.code,
          resolveDir: dir,
          sourcefile: filename
        }
      };
    }
    else {
      buildOptions = {
        entryPoints: [script.filePath]
      };
    }

    const output = await build({
      ...esbuildOptions,
      ...buildOptions,
      minify: false,
      write: false
    });

    code += output.outputFiles[0].text;
  }

  return code;
}