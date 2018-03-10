import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../globals/forms/Input';
import Button from '../../globals/Button/';
import Logo from '../../globals/Logo';

import './Auth.css';

class AddChallenge extends Component {
  state = {
    testCaseFields: [],
    inputs: [],
    outputs: []
   }

  submitChallenge = async (e) => {
    e.preventDefault();
    const { title, content, difficulty, inputs, outputs } = this.state;
    
    let testCases = {};
    inputs.forEach((inp, i) => {
      testCases[inp] = outputs[i];
    });
    testCases = JSON.stringify(testCases);
    
    const id = localStorage.getItem('id');
    const body = {
      title,
      content,
      difficulty,
      user_id: id,
      type: 0,
      testCases
    };
    const result = await axios.post('http://localhost:3396/api/challenges', body);
    this.props.history.push('/home');
  }

  handleTestCaseInput = (event) => {
    const { value } = event.target;
    const [ name, key ] = event.target.name.split(' ');
    this.state[name][key] = value;
    this.setState({ [name]: this.state[name] });
    console.log(this.state);
  }

  handleChallengeInput = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleAddTestCase = (event) => {
    event.preventDefault();

    this.state.testCaseFields.push(
      <Input
        name={`inputs ${this.state.testCaseFields.length / 2}`}
        placeholder="enter input"
        onChange={this.handleTestCaseInput}
        key={this.state.testCaseFields.length / 2 + 1}
      />,
      <Input
        name={`outputs ${this.state.testCaseFields.length / 2}`}
        placeholder="enter expected output"
        onChange={this.handleTestCaseInput}
        key={(this.state.testCaseFields.length / 2 + 1) * -1}
      />
    );

    this.setState({ testCaseFields: this.state.testCaseFields });
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
          <Button
            backgroundColor="red"
            color="white"
            text="Add Test Case"
            onClick={(e) => this.handleAddTestCase(e)}
          />
          <Input
            name="title"
            placeholder={"enter title"}
            onChange={this.handleChallengeInput}
          />
          <Input
            name="content"
            placeholder={"enter content"}
            onChange={this.handleChallengeInput}
          />
          <Input 
            name="difficulty"
            type="number"
            placeholder={"enter your difficulty"}
            onChange={this.handleChallengeInput}
          />
          {this.state.testCaseFields.map((testCase) => testCase)}
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