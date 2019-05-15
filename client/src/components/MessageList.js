import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

const DUMMY_DATA = [
    {
        senderId: 'travishill',
        text: 'Hey, how is it going?'
    },
    {
        senderId: 'donkeydoug',
        text: 'Great! How about you?'
    },
    {
        senderId: 'travishill',
        text: 'Good to hear!  I am great as well'
    }
]

class MessageList extends React.Component {
/* turn this back on after DUMMY_DATA is finished */
    // componentWillUpdate() {
    //     const node = ReactDOM.findDOMNode(this);
    //     this.shouldScrollBottom = node.scrollTop + node.clientHeight + 50 >= node.scrollHeight;
    // }

    // componentDidUpdate() {
    //     if (this.shouldScrollBottom) {
    //         const node = ReactDOM.findDOMNode(this);
    //         node.scrollTop = node.scrollHeight
    //     }
    // }

    render() {
        return (
            <div className="message-list">
                {DUMMY_DATA.map((message, index) => {
                    return (
                        <div>{message.text}</div>
                    )
                })}
            </div>
        )
    }
/* turn this back on after DUMMY_DATA is finished */
    /* render() {
         if (!this.props.currentRoomId) {
             return (
                 <div className="message-list">
                     <div className="join-room">
                         &larr; Join a room!
                     </div>
 
                 </div>
             )
         }
         return (
             <div className="message-list">
                 {this.props.messages.map((message, index) => {
                     return <Message key={index} user={message.senderId} text={message.text} />
                 })}
             </div>
         )
     } */
}

export default MessageList