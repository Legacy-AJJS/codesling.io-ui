import React, { Component } from 'react';
import CodeMirror from 'react-codemirror2';
import io from 'socket.io-client/dist/socket.io.js';
import axios from 'axios';
import { throttle } from 'lodash';

import Stdout from './StdOut/index.jsx';
import EditorHeader from './EditorHeader';
import Button from '../globals/Button';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import './Sling.css';

class Sling extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      ownerText: null,
      challengerText: null,
      text: '',
      challenge: '',
      stdout: '',
      secondsElapsed: 0,
      open: false,
      endMessage: ''
    }
    this.postHistory.bind(this);
  }

  componentDidMount() {
    setInterval( () => {
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      })}, 1000);

    const { socket, challenge } = this.props;
    this.setState({
      challenge: challenge
    })
    const startChall = typeof challenge === 'string' ? JSON.parse(challenge) : {}
    socket.on('connect', () => {
      socket.emit('client.ready', startChall);
    });

    
    socket.on('server.initialState', ({ id, text, challenge }) => {
      console.log(challenge);
      this.setState({
        id,
        ownerText: text,
        challengerText: text
      });
    });


    socket.on('server.changed', ({ text, email }) => {
      if (localStorage.getItem('email') === email) {
        this.setState({ ownerText: text });
      } else {
        this.setState({ challengerText: text });
      }
    });

    socket.on('server.run', ({ stdout, email }) => {
      const ownerEmail = localStorage.getItem('email');
      
      if (email === ownerEmail) {
        this.setState({ stdout });
      }

      const lines = stdout.split('\n');
      lines.forEach((line, i) => {
        if (line === '') lines.splice(i, 1);
      });

      if (lines[lines.length - 1] === 'SUCCESS') {
        if (email === ownerEmail) {
          // Render win message
          this.setState({ endMessage: 'Congrats! You won!' });
          this.setState({ open: true });
        } else {
          alert('Sorry, you lost!');
          this.setState({ endMessage: 'Sorry, you list!' });
          this.setState({ open: true });
          socket.emit('client.recordHistory', {
            challenge: this.state.challenge,
            winner: email, 
            loser: ownerEmail,
            time: this.state.secondsElapsed
          });
        }
      }
      //this.props.history.push('/history');
    });
    window.addEventListener('resize', this.setEditorSize);
  }

  formatSeconds = (sec) => {
    return `${Math.floor(sec/60)}:${('0' + (sec % 60)).slice(-2)}`
    
  };

  postHistory = (outcome, challenger_id) => {
    console.log('im getting called')
    console.log(this.props.challenge)
    let body = { 
                outcome: outcome,  
                time: this.state.secondsElapsed,
                clout: 0,
                user_id: localStorage.id,
                challenger_id: challenger_id,
                challenge_id: this.state.challenge.id
                }
    axios.post(`http://localhost:3396/api/history/addHistory`, body, () => {
      console.log('stored');
    });
  }

  submitCode = () => {
    const { socket } = this.props;
    const { ownerText } = this.state;
    const email = localStorage.getItem('email');
    const challengeId = this.state.challenge.id;
    socket.emit('client.run', { text: ownerText, email, challengeId });
    clearInterval(this.state.secondsElapsed);
  }

  handleChange = throttle((editor, metadata, value) => {
    const email = localStorage.getItem('email');
    this.props.socket.emit('client.update', { text: value, email });
  }, 250)

  setEditorSize = throttle(() => {
    this.editor.setSize(null, `${window.innerHeight - 80}px`);
  }, 100);

  initializeEditor = (editor) => {
    this.editor = editor;
    this.setEditorSize();
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const { socket } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />,
    ];

    return (

      <div className="sling-container">
        <div>
          <RaisedButton label="Modal Dialog" onClick={this.handleOpen} />
          <Dialog
            title={this.state.endMessage}
            actions={actions}
            modal={true}
            open={this.state.open} >
            Stay or navigate to home page.
          </Dialog>
        </div>


        {this.formatSeconds(this.state.secondsElapsed)}
        <EditorHeader goToHome={this.props.goToHome} />
        <div className="code1-editor-container">
          <CodeMirror
            editorDidMount={this.initializeEditor}
            value={this.state.ownerText}
            options={{
              mode: 'javascript',
              lineNumbers: true,
              theme: 'base16-dark',
            }}
            onChange={this.handleChange}
            />
        </div>
        <div className="stdout-container">
            {this.state.challenge.title || this.props.challenge.title}
            <br/>
            {this.state.challenge.content || this.props.challenge.content}
          <Stdout text={this.state.stdout}/>
          <Button
            className="run-btn"
            text="Run Code"
            backgroundColor="red"
            color="white"
            onClick={() => this.submitCode()}
          />
          <Button
            className="run-btn"
            text="Submit Code"
            backgroundColor="green"
            color="white"
            onClick={() => this.submitCode()}
          />
        </div>
        <div className="code2-editor-container">
          <CodeMirror 
            editorDidMount={this.initializeEditor}
            value={this.state.challengerText}
            options={{
              mode: 'javascript',
              lineNumbers: true,
              theme: 'base16-dark',
              readOnly: true,
            }}
          />
        </div>
      </div>
    )
  }
}

export default Sling;
