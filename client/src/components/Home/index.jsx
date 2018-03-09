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
    let allChallenges = [];
    const challenges = await axios.get(`http://localhost:3396/api/usersChallenges/${id}`);
    const users = await axios.get('http://localhost:3396/api/users/fetchAllUsers');
    const friends = await axios.get(`http://localhost:3396/api/friends/fetchAllFriends/${id}`);
    
    if (challenges.data && challenges.data.rows.length) {
      allChallenges = challenges.data.rows;
    }

    if (users.data && users.data.rows.length) {
      this.setState({ allUsers: users.data.rows, selectedUser: users.data.rows[0] });
    }
    
    if (friends.data && friends.data.length) {
      for (let i = 0; i < friends.data.length; i++) {
        let friendChallenges = await axios.get(`http://localhost:3396/api/usersChallenges/${friends.data[i].id}`);
        
        if (friendChallenges.data && friendChallenges.data.rows.length) {
          allChallenges = allChallenges.concat(friendChallenges.data.rows);
        }
      }
    }

    this.setState({
      allFriends: friends.data,
      selectedFriend: friends.data[0],
      allChallenges: allChallenges,
      selectedChallenge: allChallenges[0]
    });
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

  handleLogoutClick = () => {
    axios.get(`http://localhost:3396/api/auth/logout`);
    delete localStorage.email;
    delete localStorage.id;
    delete localStorage.token;
    this.props.history.push('/');
  }

  handleFriendSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedFriend: value });
  }

  handleUserSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedUser: JSON.parse(value) });
  }

  handleAddFriendClick = async () => {
    try {
      await axios.post('http://localhost:3396/api/friends/addFriend',
        { user_id: localStorage.getItem('id'), friend_id: this.state.selectedUser.id }
      );
      
      let friends = this.state.allFriends;
      friends.push(this.state.selectedUser);
      
      this.setState({
        allFriends: friends
      });
    } catch (err) {
      alert('Failed to add friend.');
    }
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
          {this.state.allUsers.map((user, i) => {
            return (
            <option
              value={JSON.stringify(user)}
              key={i}
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
          {this.state.allFriends.map((friend, i) => {
            return (
            <option
              value={JSON.stringify(friend)}
              key={i}
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
          {this.state.allChallenges.map((challenge, i) => {
            return (
            <option
              value={JSON.stringify(challenge)}
              key={i}
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
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Logout"
          onClick={() => this.handleLogoutClick()}
        />
      </div>
    );
  }
}

export default Home;