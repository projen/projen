import { Component } from '../component';
import { FileBase, FileBaseOptions, IResolver } from '../file';
import { NodeProject, NodeProjectOptions } from '../node-project';
import { SampleDir } from '../sample-file';
import { TaskCategory } from '../tasks';
import { TypeScriptAppProject, TypeScriptJsxMode, TypeScriptModuleResolution, TypeScriptProjectOptions } from '../typescript';
import { deepMerge } from '../util';
import { PostCss } from './postcss';

export interface NextJsCommonProjectOptions {
  /**
   * Assets directory
   *
   * @default "public"
   */
  readonly assetsdir?: string;

  /**
   * Setup Tailwind CSS as a PostCSS plugin.
   *
   * @see https://tailwindcss.com/docs/installation
   *
   * @default true
   */
  readonly tailwind?: boolean;
}

export interface NextJsTypeScriptProjectOptions extends NextJsCommonProjectOptions, TypeScriptProjectOptions { }

export interface NextJsProjectOptions extends NextJsCommonProjectOptions, NodeProjectOptions {
  /**
   * Typescript sources directory.
   *
   * @default "src"
   */
  readonly srcdir?: string;

  /**
   * Generate one-time sample in `pages/` and `public/` if there are no files there.
   * @default true
   */
  readonly sampleCode?: boolean;
}

/**
 * Next.js project without TypeScript.
 *
 * @pjid nextjs
 */
export class NextJsProject extends NodeProject {
  /**
   * The directory in which source files reside.
   */
  public readonly srcdir: string;

  /**
   * The directory in which app assets reside.
   */
  public readonly assetsdir: string;

  /**
   * Setup Tailwind as a PostCSS plugin.
   *
   * @see https://tailwindcss.com/docs/installation
   */
  public readonly tailwind: boolean;

  constructor(options: NextJsProjectOptions) {
    super({
      jest: false,
      ...options,
    });

    this.srcdir = options.srcdir ?? 'pages';
    this.assetsdir = options.assetsdir ?? 'public';
    this.tailwind = options.tailwind ?? true;

    new NextComponent(this, { typescript: false, tailwind: options.tailwind });

    // generate sample code in `pages` and `public` if these directories are empty or non-existent.
    if (options.sampleCode ?? true) {
      new NextSampleCode(this, {
        fileExt: 'js',
        srcdir: this.srcdir,
        assetsdir: this.assetsdir,
        tailwind: this.tailwind,
      });
    }
  }
}

/**
 * Next.js project with TypeScript.
 *
 * @pjid nextjs-ts
 */
export class NextJsTypeScriptProject extends TypeScriptAppProject {
  /**
   * The directory in which source files reside.
   */
  public readonly srcdir: string;

  /**
   * The directory in which app assets reside.
   */
  public readonly assetsdir: string;

  /**
   * Setup Tailwind as a PostCSS plugin.
   *
   * @see https://tailwindcss.com/docs/installation
   */
  public readonly tailwind: boolean;

  /**
   * TypeScript definition file included that ensures Next.js types are picked
   * up by the TypeScript compiler.
   *
   * @see https://nextjs.org/docs/basic-features/typescript
   */
  public readonly nextJsTypeDef: NextJsTypeDef;

  constructor(options: NextJsTypeScriptProjectOptions) {
    const defaultOptions = {
      srcdir: 'pages',
      eslint: false,
      jest: false,
      tsconfig: {
        include: ['**/*.ts', '**/*.tsx'],
        compilerOptions: {
          // required by Next.js
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: TypeScriptModuleResolution.NODE,
          isolatedModules: true,
          resolveJsonModule: true,
          jsx: TypeScriptJsxMode.PRESERVE,

          // recommended by Next.js
          allowJs: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          noEmit: true,
          lib: ['dom', 'dom.iterable', 'esnext'],
          strict: false,
          target: 'es5',
        },
      },
    };

    // never generate default TypeScript sample code, since this class provides its own
    super(deepMerge([defaultOptions, options, { sampleCode: false }]) as TypeScriptProjectOptions);

    this.srcdir = options.srcdir ?? 'pages';
    this.assetsdir = options.assetsdir ?? 'public';
    this.tailwind = options.tailwind ?? true;

    new NextComponent(this, { typescript: true, tailwind: this.tailwind });

    // 'next build' command fails if tsconfig.json is immutable
    if (this.tsconfig) {
      this.tsconfig.file.readonly = false;
    }

    this.nextJsTypeDef = new NextJsTypeDef(this, 'next-env.d.ts');

    // generate sample code in `pages` and `public` if these directories are empty or non-existent.
    if (options.sampleCode ?? true) {
      new NextSampleCode(this, {
        fileExt: 'tsx',
        srcdir: this.srcdir,
        assetsdir: this.assetsdir,
        tailwind: this.tailwind,
      });
    }
  }
}

export interface NextJsTypeDefOptions extends FileBaseOptions { }

export class NextJsTypeDef extends FileBase {
  constructor(project: NextJsTypeScriptProject, filePath: string, options: NextJsTypeDefOptions = {}) {
    super(project, filePath, options);
  }

  protected synthesizeContent(_: IResolver): string | undefined {
    return [
      '/// <reference types="next" />',
      '/// <reference types="next/types/global" />',
    ].join('\n');
  }
}

export interface NextComponentOptions {
  /**
   * Whether to apply options specific for TypeScript Next.js projects.
   *
   * @default false
   */
  readonly typescript?: boolean;

  /**
   * Setup Tailwind as a PostCSS plugin.
   *
   * @see https://tailwindcss.com/docs/installation
   *
   * @default true
   */
  readonly tailwind?: boolean;
}

export class NextComponent extends Component {
  private readonly typescript: boolean;
  private readonly tailwind: boolean;

  constructor(project: NodeProject, options: NextComponentOptions) {
    super(project);

    this.typescript = options.typescript ?? false;
    this.tailwind = options.tailwind ?? true;

    project.addDeps('next', 'react', 'react-dom');
    if (this.typescript) {
      project.addDevDeps('@types/react', '@types/react-dom');
    }
    if (this.tailwind) {
      new PostCss(project, { tailwind: true });
    }

    // NextJS CLI commands, see: https://nextjs.org/docs/api-reference/cli
    project.addTask('dev', {
      description: 'Starts the Next.js application in development mode',
      category: TaskCategory.BUILD,
      exec: 'next dev',
    });

    project.addTask('build', {
      description: 'Creates an optimized production build of your Next.js application',
      category: TaskCategory.BUILD,
      exec: 'next build',
    });

    project.addTask('export', {
      description: 'Exports the application for production deployment',
      category: TaskCategory.RELEASE,
      exec: 'next export',
    });

    project.addTask('server', {
      description: 'Starts the Next.js application in production mode',
      category: TaskCategory.RELEASE,
      exec: 'next start',
    });

    project.addTask('telemetry', {
      description: 'Checks the status of Next.js telemetry collection',
      category: TaskCategory.MISC,
      exec: 'next telemetry',
    });

    project.npmignore?.exclude('# Next.js', '/.next/');
    project.gitignore.exclude('# Next.js', '/.next/');
  }
}

interface NextSampleCodeOptions {
  /**
   * File extension for sample javascript code to be saved as.
   *
   * @default "js"
   */
  readonly fileExt?: string;

  /**
   * The directory in which Next.js pages are declared.
   */
  readonly srcdir: string;

  /**
   * The directory in which app assets reside.
   */
  readonly assetsdir: string;

  /**
   * Setup Tailwind as a PostCSS plugin.
   */
  readonly tailwind: boolean;
}

class NextSampleCode extends Component {
  private readonly fileExt: string;
  private readonly srcdir: string;
  private readonly assetsdir: string;
  private readonly tailwind: boolean;

  constructor(project: NodeProject, options: NextSampleCodeOptions) {
    super(project);

    this.fileExt = options.fileExt ?? 'js';
    this.srcdir = options.srcdir;
    this.assetsdir = options.assetsdir;
    this.tailwind = options.tailwind;

    const indexJs = [
      'import Head from "next/head"',
      '',
      'export default function Home() {',
      '  return (',
      '    <div className="container">',
      '      <Head>',
      '        <title>Create Next App</title>',
      '      </Head>',
      '',
      '      <main>',
      '        <h1 className="title">',
      '          Welcome to <a href="https://nextjs.org">Next.js!</a>',
      '        </h1>',
      '',
      '        <p className="description">',
      '          Get started by editing <code>pages/index.js</code>',
      '        </p>',
      '',
      '        <div className="grid">',
      '          <a href="https://nextjs.org/docs" className="card">',
      '            <h3>Documentation &rarr;</h3>',
      '            <p>Find in-depth information about Next.js features and API.</p>',
      '          </a>',
      '',
      '          <a href="https://nextjs.org/learn" className="card">',
      '            <h3>Learn &rarr;</h3>',
      '            <p>Learn about Next.js in an interactive course with quizzes!</p>',
      '          </a>',
      '',
      '          <a',
      '            href="https://github.com/vercel/next.js/tree/master/examples"',
      '            className="card"',
      '          >',
      '            <h3>Examples &rarr;</h3>',
      '            <p>Discover and deploy boilerplate example Next.js projects.</p>',
      '          </a>',
      '',
      '          <a',
      '            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"',
      '            className="card"',
      '          >',
      '            <h3>Deploy &rarr;</h3>',
      '            <p>',
      '              Instantly deploy your Next.js site to a public URL with Vercel.',
      '            </p>',
      '          </a>',
      '        </div>',
      '      </main>',
      '',
      '      <footer>',
      '        <a',
      '          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"',
      '          target="_blank"',
      '          rel="noopener noreferrer"',
      '        >',
      '          Powered by Vercel',
      '          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />',
      '        </a>',
      '      </footer>',
      '',
      '      <style jsx>{`',
      '        .container {',
      '          min-height: 100vh;',
      '          padding: 0 0.5rem;',
      '          display: flex;',
      '          flex-direction: column;',
      '          justify-content: center;',
      '          align-items: center;',
      '        }',
      '',
      '        main {',
      '          padding: 5rem 0;',
      '          flex: 1;',
      '          display: flex;',
      '          flex-direction: column;',
      '          justify-content: center;',
      '          align-items: center;',
      '        }',
      '',
      '        footer {',
      '          width: 100%;',
      '          height: 100px;',
      '          border-top: 1px solid #eaeaea;',
      '          display: flex;',
      '          justify-content: center;',
      '          align-items: center;',
      '        }',
      '',
      '        footer img {',
      '          margin-left: 0.5rem;',
      '        }',
      '',
      '        footer a {',
      '          display: flex;',
      '          justify-content: center;',
      '          align-items: center;',
      '        }',
      '',
      '        a {',
      '          color: inherit;',
      '          text-decoration: none;',
      '        }',
      '',
      '        .title a {',
      '          color: #0070f3;',
      '          text-decoration: none;',
      '        }',
      '',
      '        .title a:hover,',
      '        .title a:focus,',
      '        .title a:active {',
      '          text-decoration: underline;',
      '        }',
      '',
      '        .title {',
      '          margin: 0;',
      '          line-height: 1.15;',
      '          font-size: 4rem;',
      '        }',
      '',
      '        .title,',
      '        .description {',
      '          text-align: center;',
      '        }',
      '',
      '        .description {',
      '          line-height: 1.5;',
      '          font-size: 1.5rem;',
      '        }',
      '',
      '        code {',
      '          background: #fafafa;',
      '          border-radius: 5px;',
      '          padding: 0.75rem;',
      '          font-size: 1.1rem;',
      '          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,',
      '            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;',
      '        }',
      '',
      '        .grid {',
      '          display: flex;',
      '          align-items: center;',
      '          justify-content: center;',
      '          flex-wrap: wrap;',
      '',
      '          max-width: 800px;',
      '          margin-top: 3rem;',
      '        }',
      '',
      '        .card {',
      '          margin: 1rem;',
      '          flex-basis: 45%;',
      '          padding: 1.5rem;',
      '          text-align: left;',
      '          color: inherit;',
      '          text-decoration: none;',
      '          border: 1px solid #eaeaea;',
      '          border-radius: 10px;',
      '          transition: color 0.15s ease, border-color 0.15s ease;',
      '        }',
      '',
      '        .card:hover,',
      '        .card:focus,',
      '        .card:active {',
      '          color: #0070f3;',
      '          border-color: #0070f3;',
      '        }',
      '',
      '        .card h3 {',
      '          margin: 0 0 1rem 0;',
      '          font-size: 1.5rem;',
      '        }',
      '',
      '        .card p {',
      '          margin: 0;',
      '          font-size: 1.25rem;',
      '          line-height: 1.5;',
      '        }',
      '',
      '        .logo {',
      '          height: 1em;',
      '        }',
      '',
      '        @media (max-width: 600px) {',
      '          .grid {',
      '            width: 100%;',
      '            flex-direction: column;',
      '          }',
      '        }',
      '      `}</style>',
      '',
      '      <style jsx global>{`',
      '        html,',
      '        body {',
      '          padding: 0;',
      '          margin: 0;',
      '          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,',
      '            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,',
      '            sans-serif;',
      '        }',
      '',
      '        * {',
      '          box-sizing: border-box;',
      '        }',
      '      `}</style>',
      '    </div>',
      '  )',
      '}',
      '',
    ];

    if (this.tailwind) {
      indexJs.unshift('import "tailwindcss/tailwind.css"');
    }

    const vercelSvg = [
      '<svg width="283" height="64" viewBox="0 0 283 64" fill="none" ',
      '    xmlns="http://www.w3.org/2000/svg">',
      '    <path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" fill="#000"/>',
      '</svg>',
    ];

    new SampleDir(project, this.srcdir, {
      files: {
        ['index.' + this.fileExt]: indexJs.join('\n'),
      },
    });

    new SampleDir(project, this.assetsdir, {
      files: {
        'vercel.svg': vercelSvg.join('\n'),
      },
    });
  }
}
