import React from 'react'
import Message from './Message'

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <Message key={index} username={message.senderId} text={message.text} />
                        // not recommended to use index but for now its good
                    )
                })}
            </div>
        )
    }
}

export default MessageList