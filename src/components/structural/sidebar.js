import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
        users: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:4500/api/users`)
        .then(response => response.json())
        .then(users => {
            this.setState({ users });
            console.log(users);
        });
  }

  render() {
    return (
      <div>
        <div className="sidebar-widget content-sidebar-profile">
          <img src="http://via.placeholder.com/200x200" alt={"Profile"} />
          <span className="content-sidebar-profile-salutation">
              Welcome back
              <span className="content-sidebar-profile-name">John Doe</span>
            </span>
        </div>
        <div className="sidebar-widget">
          <ul>
            {this.state.users.map((user) =>
              <li key={user._id}><a href={`/api/users/${user._id}`}>{user.name}</a></li>
            )}
          </ul>
        </div>
        <div className="sidebar-widget bottom">
          <ul>
            <li><a href="">Logout</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;