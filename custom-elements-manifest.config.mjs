// https://custom-elements-manifest.open-wc.org/analyzer/config/
export default {
  /** Globs to analyze */
  globs: ['src/modal-element.js'],
  /** Globs to exclude */
  exclude: [],
  /** Directory to output CEM to */
  outdir: 'dist',
  /** Run in dev mode, provides extra logging */
  dev: false,
  /** Run in watch mode, runs on file changes */
  watch: false,
  /** Include third party custom elements manifests */
  dependencies: false,
  /** Output CEM path to `package.json`, defaults to true */
  packagejson: true,
  /** Enable special handling for litelement */
  litelement: false,
  /** Enable special handling for catalyst */
  catalyst: false,
  /** Enable special handling for fast */
  fast: false,
  /** Enable special handling for stencil */
  stencil: false,
  /** Provide custom plugins */
  plugins: [
    {
      name: 'fix-dynamic-tag-name',
      moduleLinkPhase({ moduleDoc }) {
        moduleDoc.exports?.forEach(ex => {
          if (ex.kind === 'custom-element-definition' && ex.name === 'elementName') {
            ex.name = 'modal-element'; // Force the manifest to show the default tag name
          }
        });
      }
    }
  ],
  /**
   * Resolution options when using `dependencies: true`
   * For detailed information about each option, please refer to the [oxc-resolver documentation](https://github.com/oxc-project/oxc-resolver?tab=readme-ov-file#options).
   */
  resolutionOptions: {
    extensions: ['.js', '.ts'],
    mainFields: ['module', 'main'],
    conditionNames: ['import', 'require']
    // ... other oxc-resolver options
  }
};
