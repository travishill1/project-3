import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import RoomList from '../components/RoomList'
import NewRoomForm from '../components/NewRoomForm';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: this.props,
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:758e334a-5a1d-4660-8590-24de4fb4637f',
      userId: "Barkleby",
      tokenProvider: new Chatkit.TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/758e334a-5a1d-4660-8590-24de4fb4637f/token"
      })
    });

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        console.log(currentUser);
        this.getRooms()
      })
      .catch(err => console.log('error on connecting: ', err))

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

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <NewRoomForm createRoom={this.createRoom} />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages} />
        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage} />

      </div>
    )
  }

}

export default App;