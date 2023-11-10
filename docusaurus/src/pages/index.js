import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import {ClipboardCopy} from "@site/src/components/clipboardCopy";
import ProjenOverview from './projen-overview.png'

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container flex align-middle flex-col items-center">

        <p className="text-6xl">{siteConfig.tagline}</p>
        <p className="text-2xl mt-8 p-4">
          <strong>projen</strong> synthesizes project configuration files such as <code>package.json</code>,
          <code>tsconfig.json</code>, <code>.gitignore</code>, GitHub Workflows, eslint, jest, etc. from a
          well-typed definition written in JavaScript.
        </p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/SOWMPzXtTCw" title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen></iframe>

        <ClipboardCopy copyText="npx projen new project" className={"mt-8"}/>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
    >
      <HomepageHeader/>
      <main>
        <div className="max-w-screen-2xl mx-auto">

          <div className="flex flex-row justify-between">

            <img src={ProjenOverview} alt={"diagram of what projen does"} style={{maxWidth: '50%'}}/>
            <div className="text-2xl p-4 flex flex-col justify-center">
              <p>As opposed to existing templating/scaffolding
                tools, <strong>projen</strong> is
                not a one-off generator. </p>
              <p><strong>projen</strong> encapsulates file content in resusable components.</p>
              <p>Those components are synthesized into the files using the <code>npx projen</code> cli</p>
              <p>Components can be shared across projects and updated independently.</p>
            </div>
          </div>

          <p className="text-2xl p-4 underline text-center"><a href="/docs/introduction">Please continue to the docs to learn
            more.</a></p>
        </div>
      </main>
    </Layout>
  );
}
