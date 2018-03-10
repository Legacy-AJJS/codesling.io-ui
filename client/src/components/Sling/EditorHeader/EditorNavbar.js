import React from 'react';

const EditorNavbar = (props) => (
  <nav className="editor-navbar">
    <ul>
      <li>{props.formatSeconds(props.seconds)}</li>
      <li>History</li>
      <li>Logout</li>
    </ul>
  </nav>
);

export default EditorNavbar;
