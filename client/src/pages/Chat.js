import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import RoomList from '../components/RoomList'
import NewRoomForm from '../components/NewRoomForm';
import MiniProfile from '../components/MiniProfile';
import TypingIndicator from '../components/TypingIndicator';
import OnlineList from '../components/OnlineList';
import './App.css';
import Trello from "../Trello/Components/Trello"
import CreaeBoard from "../Trello/Components/TrelloSub/Create"
import Create from '../Trello/Components/TrelloSub/Create';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";


let roomNo;
const style ={
  height: "10px",
  width: "auto",
  zIndex: 1,
  overlay: {zIndex: 1000},
  textAlign: "center",
  position: "absoulte",
  top: "-100px",
  backgroundColor: "red",
  left: -500,
  opacity : 1,
  alignItems: "center"
  
}

const styleDiv = {
  backgroundColor: "rgb(19, 116, 142)",
 position: "absolute",
  padding: 0,
  width: "90%",
  margin: "auto auto",
<<<<<<< HEAD
  height: "600px",
=======
  height: "700px",
>>>>>>> origin/master
  overflow: "scroll",
  top: "20px",
  left: "70px"
}

const closeButtonStyle = {
  float: "right"
}

const div = {
  position: "absolute"
}
class App extends React.Component {

  constructor(props, context) {
    super();
    this.state = {
      currentUser: null,
      roomId: null,
      messages: [],
      usersWhoAreTyping: [],
      joinableRooms: [],
      joinedRooms: [],
      show: false,
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)


    this.handleShow = () => {
      this.setState({ show: true });
    };

    this.handleHide = () => {
      this.setState({ show: false });
    };

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
            var el = document.querySelector('.online-list');
            var newEl = document.createElement('p');
            newEl.appendChild(document.createTextNode(`${user.name} is ${state.current}`));
            el.appendChild(newEl);
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
           onClick={(event) => {
            event.preventDefault();
            }}
          currentUser={this.props.location.state.currentUser.id}
        />
        {console.log("Render - this.props: ", this.props)}
        {/* {console.log("Render - this.props.state.currentUser: ", this.state.currentUser)} */}
        {/* {console.log("Render - this.props.location.state.currentUser.id: ",this.props.location.state.currentUser.id)} */}

        <RoomList
        
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <div className="online-list">
          <h2>Online:</h2>
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

        
        <div style= {div}>
            <Button variant="primary" onClick={this.handleShow}>
              My Trello
            </Button>
    
            <Modal style={style}
            
           
              show={this.state.show}
              onHide={this.handleHide}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              
              <Modal.Body>
              
                  <div style={styleDiv}>
                  <button style={closeButtonStyle} onClick={this.handleHide}>X</button>
                    
                  <Create roomId={this.state.roomId}></Create>
                 
                
                </div>
              </Modal.Body>
            </Modal>
          </div>

      </div>
    )
  }

}

export default App;
export var roomID= {roomNo}
