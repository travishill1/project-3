import React, {Component} from "react";

let datatesting="";

const styleLi = {
    listStyle: "none",
    fontWeight: "100",
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "white",
    borderRadius: "7.5%"
}



class GetCards extends Component{

    constructor(props){
        super(props);
        this.state={
            cardLoaded: false,
            cardName: "",
            cardArray: [],
            value: ""
        }
   
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCardsHandler=this.updateCardsHandler.bind(this);
          
       }


       handleChange(event) {
        let test = this.state.cardArray;
       // test[event.target.getAttribute("data-number")].name= "Diwal";
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
      
      xhr.open("GET", "https://api.trello.com/1/boards/5ce32e17583b4883033b57cf/cards?key=f9852088f40aeaff1db849dd3f178d48&token=83f492d37b9f9500a9e0ccc5cb8d9a73560334446deab360aed72af494fb961b");
      
      xhr.send(data);
      console.log(datatesting)
      
    }

   

    
   
render(){
    return(
        <div>
        {this.state.cardArray.map(item=>(
            <div>
                {this.props.id===item.idList?
                 <form onSubmit={this.handleSubmit} data-index={item.id} >
                 <input key={item.id} style={styleLi} type="text" value={item.name} data-number={this.state.cardArray.indexOf(item)} onChange={this.handleChange} />
                 <input type="submit" value="++"/>
                </form> :null}
           
            </div>
        ))}
        {/* <li key={item.id} style={styleLi}>{item.name}</li> */}
        {console.log(this.state.cardArray)}

         
        
        </div>
        
        
    )
}

}

export default GetCards;