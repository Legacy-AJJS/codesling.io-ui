import React from 'react';
import Logo from '../../globals/Logo';

import EditorNavbar from './EditorNavbar';

import './EditorHeader.css';

const EditorHeader = (props) => (
  <div className="editor-header">
    <div className="logo-container">
      <Logo goToHome={props.goToHome} />
    </div>
    <div className="navbar-container">
      <EditorNavbar seconds={props.seconds} formatSeconds={props.formatSeconds} />
    </div>
  </div>
);

export default EditorHeader;
