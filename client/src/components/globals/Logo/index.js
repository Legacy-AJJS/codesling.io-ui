import React from 'react';

import codeslingLogo from './codesling-logo.svg';

const Logo = ({
  className, goToHome
}) => {
  return (
    <img 
      alt="Codesling.io Logo"
      className={`logo ${className ? className : ''}`}
      src={codeslingLogo}
      onClick={() => goToHome()}
    />
  );
};

export default Logo;
