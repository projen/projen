import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Section2Image from '../../static/img/backgrounds/1.png';
import Section5Image from '../../static/img/backgrounds/2.png';
import TypeScriptLogo from '../../static/img/languages/ts.png';
import GoLogo from '../../static/img/languages/go.png';
import DotNetLogo from '../../static/img/languages/dotnet.png';
import JavaLogo from '../../static/img/languages/java.png';
import PythonLogo from '../../static/img/languages/python.png';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
    >
      <main>
        {/* SECTION 1 */}
        <section className="dark:bg-slate-800 py-16 lg:py-36 relative overflow-hidden">
          <div className="container mx-auto text-center">
            <img src={siteConfig.themeConfig.image} alt="projen" className="mx-auto mb-8 lg:w-36"/>
            <h1 className="text-6xl font-bold dark:text-white mb-8">{siteConfig.title}</h1>
            <div className="container mx-auto text-center relative z-10">
              <h2 className="text-2xl lg:text-5xl font-medium text-white mb-16 lg:mb-24">
                Rapidly build modern applications
                <span className="lg:block mt-3"> with advanced configuration management</span>
              </h2>
              <a href="/docs/getting-started/"
                 className="rounded text-white bg-blue-500 py-3 px-8 inline-block lg:mb-36">Get Started</a>
            </div>
            <img src={Section2Image} alt="projen"
                 className="mx-auto mb-8 opacity-25 absolute -left-48 top-24 lg:top-48 z-0"/>

          </div>
        </section>

        <hr className="m-0 bg-slate-600"/>

        {/* SECTION 3 */}
        <section className="dark:bg-slate-800 pt-16 pb-36 lg:py-36">
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-2xl lg:text-5xl font-medium dark:text-white mb-16 lg:mb-24">
              Build and manage your
              <span className="lg:block mt-3"> apps with confidence</span>
            </h2>

            <div className="lg:grid lg:grid-cols-4">
              <div className="lg:col-start-2 lg:col-span-2">
                <p className="text-xl lg:text-2xl text-center">
                  Synthesize project configuration files from a well-typed definitions, written in
                  {' '}<a href="https://github.com/aws/jsii" target="_blank" className="text-blue-500 dark:text-blue-300 underline">jsii</a>{' '}
                  compatible languages reducing project configuration management fatigue, increasing
                  productivity and confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="m-0 bg-slate-600"/>

      {/* SECTION 4 */}
        <section className="dark:bg-slate-800 pt-16 pb-36 lg:py-36">
          <div className="p-8 lg:p-0 lg:container lg:mx-auto text-center relative z-10">
            <h2 className="text-2xl lg:text-5xl font-medium dark:text-white mb-16 lg:mb-24">
              Available for these
              <span className="lg:block mt-3"> popular languages</span>
            </h2>

            <ul className="lg:grid lg:grid-cols-5 lg:gap-4 lg:items-center p-0">
              <li className="list-none mb-12 lg:mb-0 text-center">
                <img src={TypeScriptLogo} alt="TypeScript" className="h-48" />
              </li>
              <li className="list-none mb-12 lg:mb-0 text-center">
                <img src={GoLogo} alt="Go" className="h-48 w-auto" />
              </li>
              <li className="list-none mb-12 lg:mb-0 text-center">
                <img src={DotNetLogo} alt="DotNet" className="h-48 w-auto rounded" />
              </li>
              <li className="list-none mb-12 lg:mb-0 text-center">
                <img src={JavaLogo} alt="Java" className="h-48 w-auto" />
              </li>
              <li className="list-none mb-12 lg:mb-0 text-center">
                <img src={PythonLogo} alt="Python" className="rounded" />
              </li>
            </ul>
          </div>
        </section>

        <hr className="m-0 bg-slate-600"/>

        {/* SECTION 5 */}
        <section className="dark:bg-slate-800 pt-16 pb-36 lg:py-36 relative overflow-hidden">
          <div className="p-8 lg:p-0 lg:container lg:mx-auto text-center relative z-10">
            <h2 className="text-2xl lg:text-5xl font-medium dark:text-white mb-16 lg:mb-24">
              Extensible, customizable
              <span className="lg:block mt-3"> and adaptable</span>
            </h2>

            <div className="lg:grid lg:grid-cols-4">
              <div className="lg:col-start-2 lg:col-span-2">
                <p className="text-xl lg:text-2xl text-center">
                  Tasks allow you to define commands backed by shell scripts. You can use tasks to implement custom
                  workflows accessible through the projen CLI. Focus more on business requirements, less on managing
                  project configuration.
                </p>
              </div>
            </div>
          </div>
          <img src={Section5Image} alt="projen" className="mx-auto mb-8 opacity-25 absolute -right-48 top-24 lg:top-48 z-0" />
        </section>

        <hr className="m-0 bg-slate-600"/>

        {/* SECTION 6 */}
        <section className="dark:bg-slate-800 pt-16 pb-36 lg:py-36 relative overflow-hidden">
          <div className="p-8 lg:p-0 lg:container lg:mx-auto text-center relative z-10">
            <h2 className="text-2xl lg:text-5xl font-medium dark:text-white mb-16 lg:mb-24">
              Built by developers,
              <span className="lg:block mt-3"> for developers</span>
            </h2>

            <div className="lg:grid lg:grid-cols-4 mb-8">
              <div className="lg:col-start-2 lg:col-span-2">
                <p className="text-xl lg:text-2xl text-center">
                  You’re not alone. Developers from all over the world manage their complex configurations using
                  projen. Get started today and get these benefits:
                </p>
              </div>
            </div>

            <ul className="lg:grid lg:grid-cols-12 lg:gap-4">
              <li className="list-none col-span-6 rounded border-solid dark:border-slate-600 dark:bg-slate-700 p-6 mb-8 lg:mb-0">
                Standard npm scripts like compile, build, test, package and more.
              </li>
              <li className="list-none col-span-6 rounded border-solid dark:border-slate-600 dark:bg-slate-700 p-6 mb-8 lg:mb-0">
                jsii: compile, package, api compatibility checks, API.md
              </li>
              <li className="list-none col-span-4 rounded border-solid dark:border-slate-600 dark:bg-slate-700 p-6 mb-8 lg:mb-0">
                Fully synthesize package.json
              </li>
              <li className="list-none col-span-4 rounded border-solid dark:border-slate-600 dark:bg-slate-700 p-6 mb-8 lg:mb-0">
                Automated PR builds
              </li>
              <li className="list-none col-span-4 rounded border-solid dark:border-slate-600 dark:bg-slate-700 p-6 mb-8 lg:mb-0">
                Automated dependency upgrades
              </li>
              <li className="list-none col-span-6 rounded border-solid dark:border-slate-600 dark:bg-slate-700 p-6 mb-8 lg:mb-0">
                Bump & release scripts with CHANGELOG generation based on conventional commits
              </li>
              <li className="list-none col-span-6 rounded border-solid dark:border-slate-600 dark:bg-slate-700 p-6 mb-8 lg:mb-0">
                Node "engines" support with coupling to CI build environment and @types/node
              </li>
            </ul>
          </div>
        </section>

        <hr className="m-0 bg-slate-600"/>
      </main>
    </Layout>
  );
}
