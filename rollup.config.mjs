import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: {
      dir: "dist/esm",
      format: "esm",
      sourcemap: true,
    },
    external: ["react", "react-dom", "react/jsx-runtime"],
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        extensions: [".css"],
        inject: true,
        extract: false,
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: "dist/esm",
        declaration: true,
        declarationDir: "dist/esm/types",
        exclude: [
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/*.stories.ts",
          "**/*.stories.tsx",
        ],
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
    },
    external: ["react", "react-dom", "react/jsx-runtime"],
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        extensions: [".css"],
        inject: true,
        extract: false,
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        outDir: "dist/cjs",
        exclude: [
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/*.stories.ts",
          "**/*.stories.tsx",
        ],
      }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
