import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import RoomList from '../components/RoomList'
import NewRoomForm from '../components/NewRoomForm';
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
  height: "700px",
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
    console.log('this.state.messages', this.props.children);
    return (
      <div className="App">
        {/* <div>
          
        </div> */}
       {/* <Create roomID={this.state.roomID}></Create> */}
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
