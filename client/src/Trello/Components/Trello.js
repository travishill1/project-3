import React from "react";
import Create from "./TrelloSub/Create"
import GetBoard from "./TrelloSub/GetBoard";
//import Getcards from "./TrelloSub/GetCards"
//import Form from "./TrelloSub/form";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

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
    height: "500px",
    overflow: "scroll",
    top: "20px",
    left: "70px"
}

const closeButtonStyle = {
    float: "right"
}


class Trello extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          show: false,
        };
    
        this.handleShow = () => {
          this.setState({ show: true });
        };
    
        this.handleHide = () => {
          this.setState({ show: false });
        };
      }
    
      render() {
        return (
          <>
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
                    
                  <Create></Create>
                 
                
                </div>
              </Modal.Body>
            </Modal>
          </>
        );
      }
    }
  
  
  

export default Trello;