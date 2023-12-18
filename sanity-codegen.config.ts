import { type SanityCodegenConfig } from "sanity-codegen";

const config: SanityCodegenConfig = {
  schemaPath: "./sanity/schemas",
  outputPath: "./src/sanity.d.ts",
  /**
   * We need to parse the sanity imports inside node modules. This ignore
   * pattern only pulls the packages we need to build the schema file
   */
  babelOptions: {
    ignore: [
      function (filepath: string) {
        return /\/node_modules\/(?!@sanity)/.test(filepath);
      },
    ],
  },
};

export default config;
