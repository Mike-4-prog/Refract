import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import { Icon } from '@iconify/react';

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
      title="Refract: Reactive UI, Refined"
      description="Refract: The optics-based framework for building reactive user interfaces."
    >
      <header
        className={clsx(styles.heroBanner)}
        style={{
          background: 'linear-gradient(90deg, #000000 0%, #00bcd4 100%)',
          padding: '3rem 0 2rem 0', // smaller padding like old one
          textAlign: 'center',
        }}
      >
        <div className="container text--center">
          {/* Logo */}
          <img
            src="/img/refract-logo.png"
            alt="Refract logo"
            className={styles.heroLogo}
            style={{ height: '64px', marginBottom: '1rem' }}
          />

          {/* Title */}
          <h1 className="hero__title" style={{ color: 'white' }}>
            Refract
          </h1>

          {/* Tagline */}
          <p className="hero__subtitle" style={{ color: 'white' }}>
            The optics-based framework for building reactive user interfaces.
          </p>

          {/* Single Button */}
          <div className="heroButtons" style={{ marginTop: '1.5rem' }}>
            <a
              className="button button--lg"
              href="/docs/getting-started/introduction"
              style={{
                backgroundColor: 'white',
                color: 'black',
                border: 'none',
              }}
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {features.length > 0 && (
        <main style={{ marginTop: '-2rem' /* pulls features upward */ }}>
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











