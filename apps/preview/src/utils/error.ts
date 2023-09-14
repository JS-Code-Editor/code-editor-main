export class ModuleNotFoundError extends Error {
  constructor(moduleName: string, originModule?: string) {
    super(
      `Module not found: Error: Can't resolve '${moduleName}'${
        originModule ? ` in '${originModule}'` : ''
      }`,
    );
    this.name = 'ModuleNotFoundError';
  }
}
