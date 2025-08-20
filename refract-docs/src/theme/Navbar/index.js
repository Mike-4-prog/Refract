import React from 'react';
import Navbar from '@theme-original/Navbar';
import EnvironmentBadge from '@site/src/components/EnvironmentBadge';

export default function NavbarWrapper(props) {
  return (
    <>
      <Navbar {...props} />
      <EnvironmentBadge />
    </>
  );
}
