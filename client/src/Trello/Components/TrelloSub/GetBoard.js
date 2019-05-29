import React, {Component} from "react";
import GetCards from "./GetCards"

let dataTesting= "";

const styleUl = {
    display: "inline-block",
    fontSize: "20px",
    fontWeight: "bold",
    border: "2px solid green",
    width: "auto",

    height: "auto",
    margin: "10px",
    backgroundColor: "#dfe1e6",
    padding: "5px"
}

const styleDiv= {
    margin: "0",
    padding: "0"
}


class GetBoard extends Component{

    constructor(props){
     super(props);
     this.state={
         boardId: "",
         boardLoaded: false,
         boardName: "",
         boardList: [],
         cardsList: ""
     }

     this.getBoard=this.getBoard.bind(this);
     this.handleChange=this.handleChange.bind(this);
     this.handleSubmit=this.handleSubmit.bind(this);
     this.showCards=this.showCards.bind(this);
   


       
    }

    handleChange(event) {
        this.setState({boardName: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.boardName);

        var data = null;

        var xhr = new XMLHttpRequest();
       var self=this;

        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          console.log(this.responseText);
         }
                }       );

         xhr.open("PUT", "https://api.trello.com/1/boards/"+this.props.boardID+"?name="+self.state.boardName+"&key=f9852088f40aeaff1db849dd3f178d48&token=83f492d37b9f9500a9e0ccc5cb8d9a73560334446deab360aed72af494fb961b");

        xhr.send(data);
      }

    showCards(){
    console.log("componentMounted");
    var data = null;

        var xhr = new XMLHttpRequest();
        let self = this;
   
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          var data = this.responseText
          var jsonResponse = JSON.parse(data);
          console.log(jsonResponse)
            dataTesting=jsonResponse;
            self.setState({
                boardName: dataTesting.name,
                boardList: dataTesting.lists,
                boardLoaded: true,
                boardId: dataTesting.id,
            })
        }
      });
      
      xhr.open("GET", "https://api.trello.com/1/boards/"+this.props.boardIDs+"?actions=all&boardStars=none&cards=none&card_pluginData=false&checklists=none&customFields=false&fields=name%2Cdesc%2CdescData%2Cclosed%2CidOrganization%2Cpinned%2Curl%2CshortUrl%2Cprefs%2ClabelNames&lists=open&members=none&memberships=none&membersInvited=none&membersInvited_fields=all&pluginData=false&organization=false&organization_pluginData=false&myPrefs=false&tags=false&key=f9852088f40aeaff1db849dd3f178d48&token=83f492d37b9f9500a9e0ccc5cb8d9a73560334446deab360aed72af494fb961b");
      
      xhr.send(data);
            
    }


getBoard(){
    console.log(dataTesting);
    



 
}



// getCards(){
    
//     var data = null;

//     var xhr = new XMLHttpRequest();

// xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === this.DONE) {
//       var data = this.responseText
//       var jsonResponse = JSON.parse(data);
    
//       cardsData=jsonResponse;
//       console.log(cardsData)
     
//     }
//   });
  
//   xhr.open("GET", "https://api.trello.com/1/boards/"+dataTesting.id+"/cards?key=f9852088f40aeaff1db849dd3f178d48&token=83f492d37b9f9500a9e0ccc5cb8d9a73560334446deab360aed72af494fb961b");
  
//   xhr.send(data);
//   //console.log(cardsData)
  
  
// }


    






    render(){
        return(
            <div style={styleDiv}>
           
            <div >
                <h1>{this.state.boardName}</h1>

                <form onSubmit={this.handleSubmit}>
              
                 <h1><input type="text" value={this.state.boardName} onChange={this.handleChange} /></h1>
                
                 <input type="submit" value="+" />
                </form>

                <button onClick={this.showCards}>Show Cards</button>
               
               {this.state.boardList.map(item=>(
                   <ul key={item.id} style= {styleUl}>
                   {item.name}
                    <GetCards id={item.id}></GetCards>
                   </ul>
               ))}
            </div>
         
           
            </div>
        )
    }
}

export default GetBoard;