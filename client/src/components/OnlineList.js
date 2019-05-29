import React, { Component } from 'react'
class OnlineList extends Component {
  render() {
    if (this.props.users) {
      return (<ul>
        {this.props.users.map((user, index) => {
          return <li>{user.name} ({user.presence.state})</li>
        })}
      </ul>)
    } else {
      return <p>Loading...</p>
    }
  }
}
export default OnlineList