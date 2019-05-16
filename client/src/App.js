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
    this.getRooms = this.getRooms.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount(){
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:758e334a-5a1d-4660-8590-24de4fb4637f',
      userId: "sarah",
      tokenProvider: new Chatkit.TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/758e334a-5a1d-4660-8590-24de4fb4637f/token"
      })
    });

    chatManager.connect()
    .then(currentUser => {
      // console.log("connected as ", currentUser)
      this.currentUser = currentUser

      // i was getting the currentUser undefined error when i moved this out of the componentDidMount fun
      // it works like this. ill change it later if it poses a problem
      currentUser.subscribeToRoomMultipart({
        roomId: currentUser.rooms[0].id,
        hooks: {
          onMessage: message => {
            message = {
              senderId: message.senderId, 
              text: message.parts[0].payload.content
            }
            this.setState({
                messages: [...this.state.messages, message]
            })
          }
        }
      });

      this.getRooms()
    })
    .catch(err => console.log('error on connecting', err))    
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

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: '19422811' 
    });
  }

  render() {
    // console.log('this.state.messages', this.state.messages);
    return (
      <div className="App">
          <RoomList 
              rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
              // subscribeToRoom={this.subscribeToRoom()} 
              />
          <MessageList messages={this.state.messages}/>
          <SendMessageForm sendMessage={this.sendMessage}/>
      </div>
    )
  }

}

export default App;
