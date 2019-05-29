import React, {Component} from "react";
import GetBoard from "./GetBoard";
import GetCard from "./GetCards"
//import {roomID} from "../../../pages/Chat";





//Bring the list of user, trello email, token
//send the project invitation to all user on the team

// create a function which will send the main user and other user from database
//Create a dummygroupname includes username and add boardID on database

// const styleButton = {
//   margin: "100px",
// }



const styleDiv = {
  margin: "0px"
}

class Create extends Component{

    constructor(props) {
        super(props);
        this.state = {boardName: "Tensionfinally",
                      boardId: "",
                      boardCreated: true,
                      mainUser: [{userId: "diwal1", apiKey: "f9852088f40aeaff1db849dd3f178d48", token: "83f492d37b9f9500a9e0ccc5cb8d9a73560334446deab360aed72af494fb961b", email: "diwalpyakurel@gmail.com"}],
                      otherUsers: [{userId: "diwal2", apiKey: "d2b33ac74d86c147e2b8c1d13fdd69be", token: "f3855b1f0c6c15ff2f90265ee69da8ecd1007320395f944286698ff2a554afc0", email: "itz_diwalz@hotmail.com"}],
                      roomId: "19422810",
                      boardExists: false,
                      startBoard: false
      };
    
       
        this.CreateBoardHandler=this.CreateBoardHandler.bind(this);
        this.inviteOtherhandler=this.inviteOtherhandler.bind(this);
        this.sendInvitation=this.sendInvitation.bind(this);
      }




componentDidMount(){
  
  fetch("http://localhost:3001/users")
  .then(res => res.json()).then(res=>{
    for(var i=0; i<res.length; i++){
      if(res[i].roomID===this.state.roomId){
        console.log(this.state.roomId)
      }else{
        return this.CreateBoardHandler()
      }

    }
    
  }
    )
  
 this.setState({boardExists: true})
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

        setTimeout(function(){ self.setState({boardCreated: true}); }, 3000);

      
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



    render(){
        return(
         
          <div style = {styleDiv}>
      {/* <button style={styleButton} onClick={this.CreateBoardHandler}>Create Board</button> */}
          {<button onClick={this.inviteOtherhandler}>Access your Board on Trello</button>}
         
          {<GetBoard boardID={this.state.boardId} boardIDs={this.state.boardId}></GetBoard>}
          {console.log(this.state.boardId)}
          </div>
          
          
        )
    }

}





export default Create;