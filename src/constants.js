export const scriptSelector = 'script';
export const styleSelector = 'style, link[rel=stylesheet]';
export const htmlMinifierDefaults = {
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: {
    sourceMap: false,
    ecma: 2022,
    module: true,
    toplevel: true,
    compress: {
      // hoist_props is enabled by default and says "works
      // best with mangle enabled, the compress option
      // passes set to 2 or higher, and the compress option
      // toplevel enabled."
      booleans_as_integers: true,
      ecma: 2022,
      keep_fargs: false,
      module: true,
      passes: 4,
      toplevel: true,
      unsafe: true,
      unsafe_arrows: true,
      unsafe_comps: true,
      unsafe_math: true,
      unsafe_methods: true,
      unsafe_proto: true,
      unsafe_regexp: true,
      unsafe_undefined: true
    },
    mangle: {
      module: true,
      toplevel: true
    },
    format: {
      comments: false,
      ecma: 2022
    }
  },
  noNewlinesBeforeTagClose: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true
};
export const roadrollerDefaults = {
  input: {
    type: 'js',
    action: 'eval'
  },
  options: {
    allowFreeVars: true
  },
  optimize: 1
};