import React, { Component } from 'react'
    class OnlineList extends Component {
      render() {
        // if (user.presence.state === 'online') {
          return (
            <div className="online-list">
              {`${this.props.user.name} is online`}
            </div>
          )
        // }
        return <div />
      }
    }
export default OnlineList