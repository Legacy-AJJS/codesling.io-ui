import React, { Component } from 'react';
import randomstring from 'randomstring';
import axios from 'axios';

import Button from '../globals/Button';
import Logo from '../globals/Logo';

import './LandingPage.css';

let slingId;

class Home extends Component {
  state = {
    allUsers: [],
    selectedUser: {},
    allFriends: [],
    selectedFriend: {},
    allChallenges: [],
    selectedChallenge: {}
  }

  async componentDidMount() {
    const id = localStorage.getItem('id');
    var { data } = await axios.get(`http://localhost:3396/api/usersChallenges/${id}`);
    if (data && data.rows.length) {
      this.setState({ allChallenges: data.rows, selectedChallenge: data.rows[0] });
    }

    var { data } = await axios.get(`http://localhost:3396/api/users/fetchAllUsers`);
    if (data && data.rows.length) {
      this.setState({ allUsers: data.rows, selectedChallenge: data.rows[0] });
    }

    var { data } = await axios.get(`http://localhost:3396/api/friends/fetchAllFriends/${id}`);
    if (data && data.rows.length) {
      this.setState({ allFriends: data.rows, selectedFriend: data.rows[0] });
    }
  }

  randomSlingId = () => {
    slingId = `${randomstring.generate()}`;
  }

  handleDuelClick = () => {
    this.randomSlingId();
    this.props.history.push({
      pathname: `/${slingId}`,
      state: {
        challenge: this.state.selectedChallenge
      }
    });
  }
  
  handleAddChallengeClick = () => {
    this.props.history.push('/addChallenge');
  }

  handleChallengeSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedChallenge: value });
  }

  handleFriendSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedFriend: value });
  }

  handleUserSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedUser: value });
  }

  render() {
    return (
      <div className="landing-page-container">
        <Logo
          className="landing-page-logo"
        />
        <br />
        Users:
        <select onChange={(e) => this.handleUserSelect(e)}>
          {this.state.allUsers.map(user => {
            return (
            <option
              value={JSON.stringify(user)}
            >
              {user.username}
            </option>)
          }
          )}
        </select>
        <Button
          backgroundColor="red"
          color="white"
          text="Add Friend"
          onClick={() => this.handleAddFriendClick()}
        />
        <br />
        Friends:
        <select onChange={(e) => this.handleFriendSelect(e)}>
          {this.state.allFriends.map(friend => {
            return (
            <option
              value={JSON.stringify(friend)}
            >
              {friend.username}
            </option>)
          }
          )}
        </select>
        <br />
        <br />
        Challenges:
        <select onChange={(e) => this.handleChallengeSelect(e)}>
          {this.state.allChallenges.map(challenge => {
            return (
            <option
              value={JSON.stringify(challenge)}
            >
              {challenge.title}
            </option>)
          }
          )}
        </select>
        <br />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Create Challenge"
          onClick={() => this.handleAddChallengeClick()}
        />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Duel"
          onClick={() => this.handleDuelClick()}
        />
      </div>
    );
  }
}

export default Home;