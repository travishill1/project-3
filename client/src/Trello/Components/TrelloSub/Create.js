import React, {Component} from "react";
import GetBoard from "./GetBoard";
import GetCard from "./GetCards"
import axios from "axios"


const styleDiv = {
  margin: "0px"
}

<<<<<<< HEAD
const styleh1={
  fontSize: "60px",
  margin: "200px",
  marginBottom: "0px"
}


=======
const styleSaveBtn={
 marginTop: "210px",
 marginBottom: "40px",
 backgroundColor: "#4CAF50",
 height: "40px",
 width: "80px",
 borderRadius: "10%",
 color: "white",
 textDecoration: "none",
 display: "inlineBlock",
fontSize: "20px",
fontWeight: "bold"


}
>>>>>>> origin/master

const styleAccessBtn={
  marginTop: "20px",
  padding: 0,
<<<<<<< HEAD
  backgroundColor: "rgb(120,25, 51)",
  height: "50px",
  width: "600px",
  
  color: "white",
  textDecoration: "none",
  display: "inlineBlock",
  fontSize: "30px",
  fontWeight: "bold"

 
=======
  backgroundColor: "rgb(77,149, 190)",
  height: "auto",
  width: "auto",
  borderRadius: "5%",
  color: "white",
  textDecoration: "none",
  display: "inlineBlock",
 fontSize: "20px",
 
 "&:hover": {
   height: "600px"
 }
>>>>>>> origin/master
 }





class Create extends Component{

    constructor(props) {
        super(props);
        this.state = {boardName: "My new Board",
                      boardCreated: true,
                      mainUser: [{userId: "diwal1", apiKey: "f9852088f40aeaff1db849dd3f178d48", token: "83f492d37b9f9500a9e0ccc5cb8d9a73560334446deab360aed72af494fb961b", email: "diwalpyakurel@gmail.com"}],
                      otherUsers: [{userId: "diwal2", apiKey: "d2b33ac74d86c147e2b8c1d13fdd69be", token: "f3855b1f0c6c15ff2f90265ee69da8ecd1007320395f944286698ff2a554afc0", email: "itz_diwalz@hotmail.com"}],
                      roomId: "194228190",
                      boardExists: false,
                      startBoard: false,
<<<<<<< HEAD
                      show: false
=======
                      message: ""
>>>>>>> origin/master
      };
    
       
        this.CreateBoardHandler=this.CreateBoardHandler.bind(this);
        this.inviteOtherhandler=this.inviteOtherhandler.bind(this);
        this.sendInvitation=this.sendInvitation.bind(this);
        this.checkBoard=this.checkBoard.bind(this);
        this.test=this.test.bind(this);
        this.save=this.save.bind(this)
      }




checkBoard(){
<<<<<<< HEAD

  this.setState({show: true})
=======
>>>>>>> origin/master
  console.log("abc")

var self = this;
  axios.get("http://localhost:3001/users/"+this.props.roomId)//changed here
  .then(function (response) {
    console.log(response.data.roomID);
    if(response.data.roomID===undefined){
      self.CreateBoardHandler();
    }else{
      self.setState({boardId: response.data.boardID})
      self.setState({boardExists: true})
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  

 
 
}

 

CreateBoardHandler(){

  
  //see if the room ID is present in the room and if not create board
  //do a if else
  


        console.log("ok")
        var data = null;

        var xhr = new XMLHttpRequest();
        var self = this;
        
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {
            var data = this.responseText
            var jsonResponse = JSON.parse(data);
            
            console.log(jsonResponse)
            self.setState({boardId: jsonResponse.id});
            self.setState({startBoard: true})
           
            
          }
        });
        
        xhr.open("POST", "https://api.trello.com/1/boards?name="+this.state.boardName+"&defaultLabels=true&defaultLists=true&keepFromSource=none&prefs_permissionLevel=private&prefs_voting=disabled&prefs_comments=members&prefs_invitations=members&prefs_selfJoin=true&prefs_cardCovers=true&prefs_background=blue&prefs_cardAging=regular&key=f9852088f40aeaff1db849dd3f178d48&token=83f492d37b9f9500a9e0ccc5cb8d9a73560334446deab360aed72af494fb961b");
        
        xhr.send(data);
      
    }

    save(){
      axios.post('http://localhost:3001/add/'+this.props.roomId+"/"+this.state.boardId, {
        roomID: this.props.roomId,
        boardID: this.state.boardId
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });


    }

    inviteOtherhandler(){
      console.log("phase1");
      this.state.otherUsers.map(item=>(
        this.sendInvitation(this.state.boardId,item.email)
        ))

       

    }
    

    sendInvitation(boardId,email){
      console.log("phase2");
      var data = null;

      var xhr = new XMLHttpRequest();
      
      
      
      xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
    console.log(this.responseText);
      }
    });
    const proxyURL = "https://cors-anywhere.herokuapp.com/"; 
    xhr.open("PUT", proxyURL+"https://api.trello.com/1/boards/"+boardId+"/members?email="+email+"&key=f9852088f40aeaff1db849dd3f178d48&token=83f492d37b9f9500a9e0ccc5cb8d9a73560334446deab360aed72af494fb961b");
    xhr.setRequestHeader("type", "normal");
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    

    xhr.send(data);
    }


    test(){
      console.log(this.state)
    }


    render(){
        return(
         <div>
          <div style = {styleDiv}>
<<<<<<< HEAD
          {!this.state.show?<h1 style={styleh1}>Welcome to Sello Board</h1>:null}
           {!this.state.show?<button style={styleAccessBtn} onClick = {this.checkBoard}>Acess your Trello Board &#x2192;</button>:null}
           {this.state.show?<GetBoard boardID={this.state.boardId} boardIDs={this.state.boardId} saveFunction={this.save}></GetBoard>: null}
          
          
          </div>
          
        </div>
=======
           <button style={styleAccessBtn} onClick = {this.checkBoard}>Acess your Trello Board &#x2192;</button>
          {<GetBoard boardID={this.state.boardId} boardIDs={this.state.boardId}></GetBoard>}
          {console.log(this.state.boardId)}
          </div>
          {<button onClick={this.save} style= {styleSaveBtn}>Save</button>}
          </div>
>>>>>>> origin/master
        )
    }

}





export default Create;