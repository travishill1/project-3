import React from 'react'
import Chatkit from '@pusher/chatkit'
// import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

class ChatScreen extends React.Component {
    componentDidMount () {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:62c10789-c012-4aa0-b6c7-a824e4374773',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/auth'
            }),
        })

        chatManager
        .connect()
        .then(currentUser => console.log('currentUser', currentUser))
        .catch(error => console.log(error))

    }
    render() {
        return (
            <div>
                <h1>Chat</h1>
                <p>Hello, {this.props.currentUsername}</p>
            </div>
        )
    }
}

export default ChatScreen