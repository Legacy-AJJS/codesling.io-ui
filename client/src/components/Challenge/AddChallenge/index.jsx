import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../globals/forms/Input';
import Button from '../../globals/Button/';
import Logo from '../../globals/Logo';

import './Auth.css';

class AddChallenge extends Component {
  state = {
    inputs: [],
    outputs: [],
    numInputs: 1,
    numOutputs: 1
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
    console.log(this.state);
  }

  handleAddInputClick = (event) => {
    event.preventDefault();
    
    this.state.inputs.push(
      <Input
        name={`input${this.state.numInputs}`}
        placeholder="enter input"
        onChange={this.handleChallengeInput}
        key={this.state.numInputs}
      />
    );

    this.setState({ inputs: this.state.inputs, numInputs: this.state.numInputs + 1 });
  }

  handleAddOutputClick = (event) => {
    event.preventDefault();
    
    this.state.outputs.push(
      <Input
        name={`output${this.state.numOutputs}`}
        placeholder="enter expected output"
        onChange={this.handleChallengeInput}
        key={this.state.numOutputs}
      />
    );

    this.setState({ outputs: this.state.outputs, numOutputs: this.state.numOutputs + 1 });
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
            text="Add Input"
            onClick={(e) => this.handleAddInputClick(e)}
          />
          <Button
            backgroundColor="red"
            color="white"
            text="Add Expected Output"
            onClick={(e) => this.handleAddOutputClick(e)}
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
          <Input
            name="input0"
            placeholder="enter input"
            onChange={this.handleChallengeInput}
          />
          {this.state.inputs.map((input) => input)}
          <Input
            name="output0"
            placeholder="enter expected output"
            onChange={this.handleChallengeInput}
          />
          {this.state.outputs.map((output) => output)}
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
