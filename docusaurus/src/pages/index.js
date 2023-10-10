import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/SOWMPzXtTCw" title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen></iframe>
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
        <div className="max-w-2xl mx-auto">
          <p className="text-xl p-4">
            <strong>projen</strong> synthesizes project configuration files such as <code>package.json</code>,
            <code>tsconfig.json</code>, <code>.gitignore</code>, GitHub Workflows, eslint, jest, etc. from a
            well-typed definition written in JavaScript.
          </p>
          <p className="text-xl p-4">As opposed to existing templating/scaffolding tools, <strong>projen</strong> is not a one-off
            generator. Synthesized files should never be manually edited (in fact, projen
            enforces that). To modify your project setup, users interact with rich
            strongly-typed class and execute <code>projen</code> to update their project configuration
            files.
          </p>
          <p className="text-xl p-4">By defining a custom project type and using projen in multiple repositories, it's
            possible to update configuration files and CI/CD workflows across dozens (or
            hundreds!?) of projects.
          </p>
          <p className="text-xl p-4">Please continue to the <a href="/docs/introduction">docs</a> to learn more.</p>
        </div>
      </main>
    </Layout>
  );
}
