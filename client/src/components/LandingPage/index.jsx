import React, { Component } from 'react';

import Button from '../globals/Button';
import Logo from '../globals/Logo';

import './LandingPage.css';

class LandingPage extends Component {
  state = { 
    loading: false
   }
   
  render() {
    return (
      <div className="landing-page-container">
        <Logo
          className="landing-page-logo"
        />
        <Button
          className="auth-btn-container"
          backgroundColor="red"
          color="white"
          loading={this.state.loading}
          text='Login'
          onClick={() => this.props.history.push('/login')}
        />
        <Button
          className="auth-btn-container"
          backgroundColor="red"
          color="white"
          loading={this.state.loading}
          text='Signup'
          onClick={() => this.props.history.push('/signup')}
        /> 
      </div>
    );
  }
}

export default LandingPage;


{/* <div className="landing-page-container">
        <button 
          onClick={() => this.props.history.push('/login')}
          >
          Login
        </button>  
        <button 
          onClick={() => this.props.history.push('/signup')}
        >
          Signup
        </button>
      </div> */}