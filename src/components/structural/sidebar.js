import React, { Component } from "react";
import Api from "../../services/Api";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
        users: []
    };

    this.api = new Api();
  }

  componentDidMount() {
    this.api.get(`/users`)
        .then(users => {
            this.setState({ users });
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
              <li key={user._id}><a href={`/users/${user._id}`}>{user.name}</a></li>
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