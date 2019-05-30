import React, {Component} from "react";

let datatesting="";

const styleLi = {
    listStyle: "none",
    fontWeight: "100",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "12.5%",
    marginTop: "3px"
}

const styleUpdate= {
   border: "transparent",
    
    backgroundColor: "none",
    fontWeight: "bold",
    fontSize: "20px",
    
}
const styleAddCards= {
    height: "25px",
    width: "70%",
    textAlign: "center",
    marginTop: "30px"
}

const styleAddCardsBtn={
    height: "100%",
    width: "70%"
}




class GetCards extends Component{

    constructor(props){
        super(props);
        this.state={
            cardLoaded: false,
            cardName: "",
            cardArray: [],
            value: "",
            boardID: "",
            cardsDesc:""
        }
   
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCardsHandler=this.updateCardsHandler.bind(this);
        this.handleChangeCards=this.handleChangeCards.bind(this);
        this.handleSubmitCards=this.handleSubmitCards.bind(this);
        this.addCardsHandler=this.addCardsHandler.bind(this);

    
          
       }


       handleChange(event) {
        let test = this.state.cardArray;
       
       console.log(event.target.getAttribute("data-number"))
       test[event.target.getAttribute("data-number")].name=event.target.value;
        this.setState({cardArray: test});
      }
    
      handleSubmit(event) {
        
        event.preventDefault();
        console.log(event.target.getAttribute("data-index"));


        this.state.cardArray.map(item=>(
            this.updateCardsHandler(item.id, item.name)
            
        ))

         
        
      }

      updateCardsHandler(cardNumber, name){
        var data = null;

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
             console.log(this.responseText);
        }
            });

        xhr.open("PUT", "https://api.trello.com/1/cards/"+cardNumber+"?name="+name+"&key=f9852088f40aeaff1db849dd3f178d48&token=83f492d37b9f9500a9e0ccc5cb8d9a73560334446deab360aed72af494fb961b");

            xhr.send(data);
       
        
      }

    
      

    componentDidMount(){
        var data = null;

        var xhr = new XMLHttpRequest();
        var self= this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
            var data = this.responseText
            var jsonResponse = JSON.parse(data);
            console.log(jsonResponse)
            datatesting=jsonResponse;
            self.setState({cardArray: datatesting})
            
            }
        });
      
      xhr.open("GET", "https://api.trello.com/1/boards/"+this.props.boardID+"/cards?key=f9852088f40aeaff1db849dd3f178d48&token=83f492d37b9f9500a9e0ccc5cb8d9a73560334446deab360aed72af494fb961b");
      
      xhr.send(data);
      console.log(datatesting)
      
    }

    handleChangeCards(event){
        this.setState({cardsDesc: event.target.value});

    }

    handleSubmitCards(event){
        event.preventDefault();
        console.log(this.state.cardsDesc);
        console.log(event.target.getAttribute("data-index"));
        this.addCardsHandler(this.state.cardsDesc, event.target.getAttribute("data-index"));
        this.updateCardsHandler();

    }

    addCardsHandler(newCard, listId){
        var data = null;

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
        });

        xhr.open("POST", "https://api.trello.com/1/cards?name="+newCard+"&idList="+listId+"&keepFromSource=all&key=f9852088f40aeaff1db849dd3f178d48&token=83f492d37b9f9500a9e0ccc5cb8d9a73560334446deab360aed72af494fb961b");

        xhr.send(data);
    }

    

    
   
render(){
    return(
        <div>
        {this.state.cardArray.map(item=>(
            <div>
                {this.props.id===item.idList?
                 <form onSubmit={this.handleSubmit} data-index={item.id} >
                 <input key={item.id} style={styleLi} type="text" value={item.name} data-number={this.state.cardArray.indexOf(item)} onChange={this.handleChange} />
                 <input  style = {styleUpdate} type="submit" value="&#10003;"/>
                 <input  style = {styleUpdate} type="button" value="Del"/>
                </form> :null}
            </div>
        ))}
        {/* <li key={item.id} style={styleLi}>{item.name}</li> */}
        {console.log(this.state.cardArray)}

        <form onSubmit={this.handleSubmitCards} data-index={this.props.dataIndex}>
            <input key={this.props.key} style={styleAddCards} type="text" placeholder="New card goes here" value={this.state.cardsDesc} onChange={this.handleChangeCards}></input>
            <input style={styleAddCardsBtn} type="submit" value="Add a new card"/>
        </form>
       
         
        
        </div>
        
        
    )
}

}

export default GetCards;