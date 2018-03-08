import React from 'react';
import Logo from '../../globals/Logo';

import EditorNavbar from './EditorNavbar';

import './EditorHeader.css';

const EditorHeader = ({goToHome}) => (
  <div className="editor-header">
    <div className="logo-container">
      <Logo goToHome={goToHome} />
    </div>
    <div className="navbar-container">
      <EditorNavbar />
    </div>
  </div>
);

export default EditorHeader;
