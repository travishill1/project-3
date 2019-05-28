import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import RoomList from '../components/RoomList'
import NewRoomForm from '../components/NewRoomForm';
import MiniProfile from '../components/MiniProfile';
import TypingIndicator from '../components/TypingIndicator';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null,
      roomId: null,
      messages: [],
      typingUsers: [],
      chatInput: '',
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }

  // Send typing event
  sendTypingEvent(event) {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error('error', error))
    this.setState({
      chatInput: event.target.value
    });
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
        // this.onUserStartedTyping()
        // this.onUserStoppedTyping()

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
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          console.log(message.senderId, ': ', message.text);
          this.setState({
            messages: [...this.state.messages, message]
          })
        },
        onUserStartedTyping: user => {
          this.setState({
            typingUsers: [...this.state.typingUsers, user.name],
          })
        },
        onUserStoppedTyping: user => {
          this.setState({
            typingUsers: this.state.typingUsers.filter(
              username => username !== user.name
            ),
          })
        },
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

  render() {

    return (
      <div className="App">
        <MiniProfile
          currentUser={this.props.location.state.currentUser.id}
        />
        {console.log("Render - this.props: ", this.props)}
        {/* {console.log("Render - this.props.state.currentUser: ", this.state.currentUser)} */}
        {/* {console.log("Render - this.props.location.state.currentUser.id: ",this.props.location.state.currentUser.id)} */}
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <NewRoomForm createRoom={this.createRoom} />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages} />
        <TypingIndicator typingUsers={this.state.typingUsers} />
        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage} />

      </div>
    )
  }

}

export default App;