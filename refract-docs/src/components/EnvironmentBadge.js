import React, { useState, useEffect } from 'react';

const getEnvironment = () => {
  if (typeof window === 'undefined') return 'local'; // SSR fallback
  const hostname = window.location.hostname;
  if (hostname.includes('-stg')) return 'staging';
  if (hostname.includes('refract.netlify.app')) return 'production';
  return 'local';
};

export default function EnvironmentBadge() {
  const [env, setEnv] = useState('local');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setEnv(getEnvironment());
  }, []);

  if (env === 'local' || !visible) return null;

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 9999,
      backgroundColor: env === 'staging' ? '#f59e0b' : '#16a34a',
      color: 'white',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      cursor: env === 'staging' ? 'pointer' : 'default',
    },
    close: {
      marginLeft: '4px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      {env === 'staging' ? 'Staging' : 'Production'}
      {env === 'staging' && (
        <span style={styles.close} onClick={() => setVisible(false)}>
          ❌
        </span>
      )}
    </div>
  );
}

