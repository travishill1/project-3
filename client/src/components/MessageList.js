import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class MessageList extends React.Component {

    // (Future Feature)
    // This auto-scroll method as described in the video doesn't seem to work, there are a bunch of other auto-scroll methods online.
    // see: https://stackoverflow.com/questions/33188994/scroll-to-the-top-of-the-page-after-render-in-react-js

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }

    componentDidUpdate() {
        if (this.shouldScrollToBottom) {
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }
    }

    // End auto-scroll method

    render() {
        if (!this.props.roomId) {
            return (
                <div className="message-list">
                    <div className="join-room">
                        <h2>
                            &larr; Join a room!
                            </h2>
                    </div>
                </div>
            )
        }
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <Message key={message.id} username={message.senderId} text={message.text} />
                        // not recommended to use index but for now its good
                    )
                })}
            </div>
        )
    }
}

export default MessageList