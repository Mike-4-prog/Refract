import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import { Icon } from '@iconify/react';

// Import your illustration
import refractIllustration from '@site/static/img/refract-illustration.png';

const features = [
  {
    title: 'Reactive UI Made Easy',
    icon: 'mdi:lightning-bolt-outline',
    description: (
      <>Build modern reactive interfaces with clean, composable, and declarative design patterns.</>
    ),
  },
  {
    title: 'Optics-Driven Design',
    icon: 'mdi:eye-outline',
    description: (
      <>Leverage the power of optics and lenses to isolate and manage UI state with surgical precision.</>
    ),
  },
  {
    title: 'Tooling You’ll Love',
    icon: 'mdi:tools',
    description: (
      <>Includes utilities, dev tools, and quick-start templates to help you build and scale faster.</>
    ),
  },
];

function Feature({ icon, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Icon icon={icon} width={48} height={48} className={styles.featureIcon} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="Refract Documentation"
      description="Documentation for the Refract framework"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to Refract</h1>
          <p className={styles.heroSubtitle}>
            Build with clarity, refactor with confidence.
          </p>
          <div className={styles.buttons}>
            <Link className={styles.buttonPrimary} to="/docs/getting-started/introduction">
              Get Started
            </Link>
          </div>
        </div>

        {/* Decorative illustration (moved to left) */}
        <img
          src={refractIllustration}
          alt="Refract illustration"
          className={styles.heroImage}
        />
      </header>

      {features.length > 0 && (
        <main>
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
    </Layout>
  );
}
















