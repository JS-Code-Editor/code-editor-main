import * as babel from '@babel/standalone';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
import * as path from 'path-browserify';
import { ModuleNotFoundError } from '../utils/';

interface IFile {
  path: string;
  content: string;
}

let ID = 0;

type IMapping = Record<string, number>;

interface IAsset {
  id: number;
  path: string;
  dependencies: string[];
  code: string;
  mapping: IMapping;
}

// Creates a new asset
function createAsset(jsFile: IFile): IAsset {
  const ast = acorn.parse(jsFile.content, {
    sourceType: 'module',
    ecmaVersion: 6,
  });

  const dependencies = new Set<string>();
  walk.simple(ast, {
    // Could not find a way to annotate "node" parameter
    ImportDeclaration(node: any) {
      const source = node.source.value;
      dependencies.add(source);
    },
  });

  const id = ID++;
  const { code } = babel.transform(jsFile.content, {
    presets: ['env'],
  });

  return {
    id,
    path: jsFile.path,
    dependencies: Array.from(dependencies),
    code: code as string,
    mapping: {},
  };
}

// Adds mapping object to each asset
function createGraph(entry: IFile, jsFiles: IFile[]): IAsset[] {
  const mainAsset = createAsset(entry);

  const queue = [mainAsset];

  for (let i = 0; i < queue.length; i++) {
    const asset = queue[i];
    const dirname = path.dirname(asset.path);

    asset.mapping = {};

    asset.dependencies.forEach(dependencyPath => {
      const fullPath = path.join(dirname, dependencyPath);

      const dependencyFile = jsFiles.find(file => {
        const normalizedPath = path.normalize(file.path);
        return normalizedPath === fullPath || normalizedPath === `${fullPath}/`;
      });

      if (dependencyFile == null) {
        throw new ModuleNotFoundError(fullPath, asset.path.slice(0, -1));
      }

      const dependencyAsset = createAsset(dependencyFile);
      asset.mapping[dependencyPath] = dependencyAsset.id;

      queue.push(dependencyAsset);
    });
  }

  return queue;
}

// Creates a bundle
function bundle(JsFiles: IFile[], entryFilePath: string): string {
  try {
    const entryFile = JsFiles.find(file => file.path === entryFilePath);
    if (entryFile == null) throw new Error('Entry file not found!');

    const graph = createGraph(entryFile, JsFiles);
    let modules = '';

    graph.forEach(module => {
      modules += `
      ${module.id}: [
        function(require, module, exports) {
          ${module.code}
        },
        ${JSON.stringify(module.mapping)}
      ],
    `;
    });

    const result = `
      (function(modules){
        function require(id) {
          const [fn, mapping] = modules[id];
          
          function localRequire(relativePath) {
            return require(mapping[relativePath]);
          }
          
          const module = { exports: {} };
          
          fn(localRequire, module, module.exports);
          
          return module.exports;
        }
        
        require(0)
      })({ ${modules} });
    `;

    ID = 0;
    return result;
  } catch (err) {
    ID = 0;
    throw err;
  }
}

export { bundle };
