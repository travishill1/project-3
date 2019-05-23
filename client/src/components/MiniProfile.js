import React from 'react'

class MiniProfile extends React.Component {
    render () {
        const currentUser = this.props.currentUser
        return (
            <div className="mini-profile">
                <ul>
                <h3>Your Name:</h3>
               <li> {this.currentUser} </li>
                    {/* {orderedRooms.map(room => {
                        const active = this.props.roomId === room.id ? 'active' : '';
                        return (
                            <li key={room.id} className={"room " + active}>
                                <a 
                                    onClick={() => this.props.subscribeToRoom(room.id)} 
                                    href="#">
                                        # {room.name}
                                </a>
                            </li>
                        )
                    })} */}
                </ul>
            </div>
        )
    }
}

export default MiniProfile