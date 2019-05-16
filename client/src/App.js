import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList'
import './App.css';

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount(){
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:758e334a-5a1d-4660-8590-24de4fb4637f',
      userId: "foo",
      tokenProvider: new Chatkit.TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/758e334a-5a1d-4660-8590-24de4fb4637f/token"
      })
    });
   
    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      console.log(currentUser);
      this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
          this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
          })
        })
      .catch(err => console.log('error on joinableRooms: ', err))
      this.currentUser.subscribeToRoom({
        roomId: '19422811',
        hooks: {
          onMessage: message => {
            console.log(message.senderId, ': ', message.text);
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      })
    })
    

  }

  sendMessage(text) {
    console.log(this.currentUser)
    this.currentUser.sendMessage({
      text,
      roomId: '19422811' 
    });
  }

  render() {
    console.log('this.state.messages', this.state.messages);
    return (
      <div className="App">
          <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
          <MessageList messages={this.state.messages}/>
          <SendMessageForm sendMessage={this.sendMessage}/>
      </div>
    )
  }

}

export default App;
