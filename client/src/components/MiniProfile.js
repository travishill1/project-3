import React from 'react'

class MiniProfile extends React.Component {
    render() {
        const currentUser = this.props.currentUser
        return (
            <div className="mini-profile">
                <ul>
                    <li><img className="mini-profile-pic" src="https://i.pinimg.com/originals/6a/4d/b0/6a4db06a551690903d497fee1cb81016.jpg"></img></li>
                    <li> <h3> {currentUser} </h3></li>
                    <li> <a><img className="mini-profile-options" src="https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-23-512.png"></img></a> </li>
                    {console.log(currentUser)}
                </ul>
            </div>
        )
    }
}

export default MiniProfile