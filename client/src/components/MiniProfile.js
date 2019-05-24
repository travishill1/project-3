import React from 'react'

class MiniProfile extends React.Component {
    render () {
        const currentUser = this.props.currentUser
        return (
            <div className="mini-profile">
                <ul>
                <h4>Your Name:</h4>
               <li> {currentUser} </li>
               {console.log(this)}
               {console.log(currentUser)}
               {console.log(this.props.currentUser)}
                </ul>
            </div>
        )
    }
}

export default MiniProfile