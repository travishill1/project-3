import React from 'react'

class MiniProfile extends React.Component {
    render() {
        const currentUser = this.props.currentUser
        return (
            <div className="mini-profile">
                <ul>
                    <li><img className="mini-profile-pic" alt={currentUser.id} src={currentUser.avatar_url}></img></li>
                    <li> <h3> {currentUser.id} </h3></li>
                    <li> <a><img className="mini-profile-options" alt="options-wheel" src="https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-23-512.png"></img></a> </li>
                    {console.log(currentUser)}
                </ul>
            </div>
        )
    }
}

export default MiniProfile