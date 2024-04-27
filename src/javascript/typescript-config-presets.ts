import {
  TypeScriptCompilerOptions,
  TypeScriptModuleResolution,
  TypeScriptSetCompilerOptionsMergeMethod,
  TypescriptConfig,
} from "./typescript-config";

export abstract class TypescriptConfigPresets {
  static compilerOptions: TypeScriptCompilerOptions;
  static mergeMethod: TypeScriptSetCompilerOptionsMergeMethod;

  static applyPreset(to: TypescriptConfig, reset: boolean = false) {
    to.setCompilerOptions(
      this.compilerOptions,
      reset
        ? TypeScriptSetCompilerOptionsMergeMethod.OVERRIDE
        : this.mergeMethod
    );
  }
}

export class ProjenClassicTypescriptConfigPresets extends TypescriptConfigPresets {
  static compilerOptions: TypeScriptCompilerOptions = {
    alwaysStrict: true,
    declaration: true,
    esModuleInterop: true,
    experimentalDecorators: true,
    inlineSourceMap: true,
    inlineSources: true,
    lib: ["es2019"],
    module: "CommonJS",
    noEmitOnError: false,
    noFallthroughCasesInSwitch: true,
    noImplicitAny: true,
    noImplicitReturns: true,
    noImplicitThis: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    resolveJsonModule: true,
    strict: true,
    strictNullChecks: true,
    strictPropertyInitialization: true,
    stripInternal: true,
    target: "ES2019",
  };
  static mergeMethod = TypeScriptSetCompilerOptionsMergeMethod.MERGE;
}

export class Node18TypescriptConfigPresets extends TypescriptConfigPresets {
  static compilerOptions: TypeScriptCompilerOptions = {
    lib: ["es2023"],
    module: "node16",
    target: "es2022",

    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    moduleResolution: TypeScriptModuleResolution.NODE16,
  };
  static mergeMethod = TypeScriptSetCompilerOptionsMergeMethod.MERGE;
}

export class Node20TypescriptConfigPresets extends TypescriptConfigPresets {
  static compilerOptions: TypeScriptCompilerOptions = {
    lib: ["es2023"],
    module: "node16",
    target: "es2022",

    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    moduleResolution: TypeScriptModuleResolution.NODE16,
  };
  static mergeMethod = TypeScriptSetCompilerOptionsMergeMethod.MERGE;
}

export class StrictestTypescriptConfigPresets extends TypescriptConfigPresets {
  static compilerOptions: TypeScriptCompilerOptions = {
    strict: true,
    allowUnusedLabels: false,
    allowUnreachableCode: false,
    noFallthroughCasesInSwitch: true,
    noImplicitOverride: true,
    noImplicitReturns: true,
    noUncheckedIndexedAccess: true,
    noUnusedLocals: true,
    noUnusedParameters: true,

    isolatedModules: true,

    checkJs: true,

    esModuleInterop: true,
    skipLibCheck: true,
  };
  static mergeMethod = TypeScriptSetCompilerOptionsMergeMethod.MERGE;
}
