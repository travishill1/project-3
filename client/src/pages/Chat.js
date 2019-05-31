import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import RoomList from '../components/RoomList'
import NewRoomForm from '../components/NewRoomForm';
import MiniProfile from '../components/MiniProfile';
import TypingIndicator from '../components/TypingIndicator';
// import OnlineList from '../components/OnlineList';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null,
      roomId: null,
      messages: [],
      usersWhoAreTyping: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:758e334a-5a1d-4660-8590-24de4fb4637f',
      userId: this.props.location.state.currentUser.id,
      tokenProvider: new Chatkit.TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/758e334a-5a1d-4660-8590-24de4fb4637f/token"
      })
    });

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.setState({ currentUser })
        console.log("chatManager currentUser:", currentUser);
        this.getRooms()
        this.getMiniProfile()
      })
      .catch(err => console.log('error on connecting: ', err))
  }

  getMiniProfile() {
    // code that generates the MiniProfile info, if needed
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(err => console.log('error on joinableRooms: ', err))
  }

  subscribeToRoom(roomId) {
    // var onlineDiv = document.querySelector('.online-list-items');
    // if (onlineDiv === !null){
    //   onlineDiv.textContent = (' ');
    // }
    this.setState({ messages: [] })
    return this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          // console.log(message.senderId, ': ', message.text);
          this.setState({
            messages: [...this.state.messages, message]
          })
        },

        onUserStartedTyping: user => {
          this.setState({
            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.id]
          })
        },
        onUserStoppedTyping: user => {
          this.setState({
            usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
              username => username !== user.id
            )
          })
        },
        onUserCameOnline: () => this.forceUpdate(),
        onUserWentOffline: () => this.forceUpdate(),
        onUserJoined: () => () => this.forceUpdate(),

        onPresenceChanged: (state, user) => {
          if (state.current === 'online') {
            
            var onlineDiv = document.querySelector('.online-list-items');
            var onlineUser = document.createElement('p');
            onlineUser.appendChild(document.createTextNode(`${user.name}`));
            onlineDiv.appendChild(onlineUser);
            // alert(`User ${user.name} is ${state.current}`)
            // console.log(`User ${user.name} is ${state.current}`)
          }
        }
      }
    })
      .then(room => {
        this.setState({
          roomId: room.id
        })
        this.getRooms()
      })
      .catch(err => console.log('error on subscribing to room: ', err))
  }

  sendMessage(text) {
    console.log(this.currentUser)
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  createRoom(name) {
    console.log('roomName', name)
    this.currentUser.createRoom({
      name
    })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log('error with createRoom: ', err))
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.roomId })
      .catch(error => console.error('error', error))
  }

  render() {

    return (
      <div className="App">
        <MiniProfile
          currentUser={this.props.location.state.currentUser}
          // avatarURL={this.props.location.state.currentUser.avatar_url}
        />
        {/* {console.log("Render - this.props: ", this.props)} */}
        {/* {console.log("Render - this.props.state.currentUser: ", this.state.currentUser)} */}
        {/* {console.log("Render - this.props.location.state.currentUser.id: ",this.props.location.state.currentUser.id)} */}
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <div className="online-list">
          <h2>Online:</h2>
          <div className="online-list-items">
            <p></p>
          </div>
          {/* NEED TO FIND RIGHT KEYWORD HERE, original - {this.state.currentRoom.users}: */}
          {/* <OnlineList
            users={this.state.joinedRooms.users}
            onPresenceChanged={this.onPresenceChanged} /> */}
        </div>
        <NewRoomForm createRoom={this.createRoom} />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages} />
        <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage}
          onChange={this.sendTypingEvent}
        />

      </div>
    )
  }

}

export default App;