import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../globals/forms/Input';
import Button from '../../globals/Button/';
import Logo from '../../globals/Logo';

import './Auth.css';

class AddChallenge extends Component {
  state = { 
    title: '',
    content: '',
    input: '',
    output: '',
    difficulty: null
   }

  submitChallenge = async (e) => {

    e.preventDefault();
    const { title, content, difficulty, input, output } = this.state;

    // Concact input/output to create testCase
    let testCase = [];
    testCase.push(input);
    testCase.push(output);
    testCase = JSON.stringify(testCase);

    const id = localStorage.getItem('id');
    const body = {
      title,
      content,
      difficulty,
      user_id: id,
      type: 0,
      testCase
    }
    const result = await axios.post('http://localhost:3396/api/challenges', body);
    this.props.history.push('/home');
  }

  handleChallengeInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  goToHome = () => {
    this.props.history.push('/home');
  }

  render() {
    return (
      <div className="login-form-container">
        <Logo
          goToHome={this.goToHome.bind(this)}
          className="landing-page-logo"
        />
        <form className="auth-form">
          <Input
            name='title'
            type='title'
            placeholder={'enter title'}
            onChange={this.handleChallengeInput}
            />
          <Input
            name='content'
            type='content'
            placeholder={'enter content'}
            onChange={this.handleChallengeInput}
            />
          <Input 
            name='difficulty'
            type='difficulty'
            placeholder={'enter your difficulty'}
            onChange={this.handleChallengeInput}
            />
          <Input 
            name='input'
            type='input'
            placeholder={'enter input'}
            onChange={this.handleChallengeInput}
            />
          <Input 
            name='output'
            type='output'
            placeholder={'enter expected output'}
            onChange={this.handleChallengeInput}
            />
          <Button
            backgroundColor="red"
            color="white"
            text="Add Challenge"
            onClick={(e) => this.submitChallenge(e)}
            />
        </form>
      </div>
    );
  }
}

export default AddChallenge;
