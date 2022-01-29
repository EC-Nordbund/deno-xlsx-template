import commonjs from "@rollup/plugin-commonjs";
import node from "@rollup/plugin-node-resolve"
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";

const file = join(dirname(require.resolve('xlsx-template')), './index.d.ts')

writeFileSync('types.d.ts', readFileSync(file))

const deno = {
  'string_decoder': 'https://deno.land/std@0.123.0/node/string_decoder.ts',
  'util': 'https://deno.land/std@0.123.0/node/util.ts',
  'path': 'https://deno.land/std@0.123.0/node/path.ts',
}

export default {
  input: {
    "xlsx": "xlsx.js"
  },
  output: {
    dir: 'dist'
  },
  plugins: [{
    name: 'deno-resolve', resolveId(id) {
      if (id in deno) {
        return deno[id]
      }
    }
  }, {
    transform(code) {
      return code.replaceAll('Buffer.isBuffer(data)', 'false')
    }
  }, node(), commonjs()],
  external: Object.values(deno)
}