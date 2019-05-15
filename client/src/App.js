import React from 'react'
import Chatkit from '@pusher/chatkit'
// import UsernameForm from './components/UsernameForm.js'
// import ChatScreen from './components/ChatScreen.js'
// possible updated chatkit instead:
// import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

// future imports (one possibly replacing ChatScreen above)
import MessageList from './components/MessageList'
import SendMessageForm from './components/MessageList'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

// import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentRoomId: null,
      joinableRooms: [],
      joinedRooms: [],
      messages: []
    }
    // {/* turn this back on after DUMMY_DATA is finished */}
    // this.subscribeToRoom = this.subscribeToRoom.bind(this)
    // this.sendMessage = this.sendMessage.bind(this)
    // this.subscribeToRoom = this.subscribeToRoom.bind(this)
  }

  componentDidMount () {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:62c10789-c012-4aa0-b6c7-a824e4374773',
      // replace with dynamic userId maybe
      userId: "travishill",
      tokenProvider: new Chatkit.TokenProvider({
        url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/:instance_id'
      })
    })
    chatManager.connect()

  }

  render() {
    return (
      <div className="app">
        <RoomList
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
          subscribeToRoom={this.subscribeToRoom}
          currentRoomId={this.state.currentRoomId} />
        <MessageList
          currentRoomId={this.state.currentRoomId}
          messages={this.state.messages} />
          {/* turn this back on after DUMMY_DATA is finished */}
        {/* <NewRoomForm onSubmit={this.createRoom.bind(this)} /> */}
        <SendMessageForm
          sendMessage={this.sendMessage}
          disabled={!this.state.currentRoomId} />
      </div>
    );
  }
}

export default App
