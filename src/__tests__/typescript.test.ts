import { PROJEN_RC } from '../common';
import { mergeTsconfigOptions, TypeScriptProject } from '../typescript';
import { mkdtemp, synthSnapshot } from './util';

describe('mergeTsconfigOptions', () => {
  test('merging includes', () => {
    const mergedTsconfigOptions = mergeTsconfigOptions([
      {
        include: ['typescript.test.ts'],
        compilerOptions: {},
      },
      {
        include: ['abc'],
        compilerOptions: {},
      },
    ]);

    expect(mergedTsconfigOptions).toEqual(expect.objectContaining({
      include: ['typescript.test.ts', 'abc'],
    }));
  });

  test('merging excludes', () => {
    const mergedTsconfigOptions = mergeTsconfigOptions([
      {
        exclude: ['typescript.test.ts'],
        compilerOptions: {},
      },
      {
        exclude: ['abc'],
        compilerOptions: {},
      },
    ]);

    expect(mergedTsconfigOptions).toEqual(expect.objectContaining({
      exclude: ['typescript.test.ts', 'abc'],
    }));
  });

  test('merging compilerOptions', () => {
    const mergedTsconfigOptions = mergeTsconfigOptions([
      {
        compilerOptions: {
          esModuleInterop: false,
        },
      },
      {
        compilerOptions: {
          esModuleInterop: true,
        },
      },
    ]);

    expect(mergedTsconfigOptions).toEqual(expect.objectContaining({
      compilerOptions: {
        esModuleInterop: true,
      },
    }));
  });
});


test('tsconfig prop is propagated to eslint and jest tsconfigs', () => {
  const prj = new TypeScriptProject({
    name: 'test',
    outdir: mkdtemp(),
    defaultReleaseBranch: 'test',
    tsconfig: {
      include: ['typescript.test.ts'],
      compilerOptions: {
        esModuleInterop: true,
      },
    },
  });

  const out = synthSnapshot(prj);

  expect(out['tsconfig.json']).toEqual(expect.objectContaining({
    include: expect.arrayContaining([
      `${prj.srcdir}/**/*.ts`,
      'typescript.test.ts',
    ]),
    compilerOptions: expect.objectContaining({
      esModuleInterop: true,
    }),
  }));

  expect(out['tsconfig.eslint.json']).toEqual(expect.objectContaining({
    include: expect.arrayContaining([
      PROJEN_RC,
      `${prj.srcdir}/**/*.ts`,
      `${prj.testdir}/**/*.ts`,
      'typescript.test.ts',
    ]),
    compilerOptions: expect.objectContaining({
      esModuleInterop: true,
    }),
  }));

  expect(out['tsconfig.jest.json']).toEqual(expect.objectContaining({
    include: expect.arrayContaining([
      PROJEN_RC,
      `${prj.srcdir}/**/*.ts`,
      `${prj.testdir}/**/*.ts`,
      'typescript.test.ts',
    ]),
    compilerOptions: expect.objectContaining({
      esModuleInterop: true,
    }),
  }));
});

test('sources and compiled output can be collocated', () => {

  const prj = new TypeScriptProject({
    name: 'test',
    outdir: mkdtemp(),
    defaultReleaseBranch: 'test',
    libdir: 'lib',
    srcdir: 'lib',
  });

  expect(prj.tsconfig?.exclude).not.toContain('/lib');

  const snapshot = synthSnapshot(prj)['.gitignore'];
  expect(snapshot).toMatchSnapshot();

});