import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';

import Sling from './Sling.jsx';

class SlingIndex extends Component {
  state = { 
    socket: null,
   }

  componentWillMount() {
    this.socket = io('http://localhost:4155', {
      query: {
        roomId: this.props.location.pathname.slice(1)
      }
    });

    this.setState({ socket: this.socket });
  }

  goToHome() {
    this.props.history.push('/home');
  }

  render() {
    if (this.props.location.state) {
      return (
        <Sling goToHome={this.goToHome.bind(this)} socket={this.state.socket} challenge={this.props.location.state.challenge}/>
      );
    } else {
      return (
        <Sling goToHome={this.goToHome.bind(this)} socket={this.state.socket} challenge={{}}/>
      );
    }
  }
}

export default SlingIndex;