import React, { Component } from "react";
import Api from "../../services/Api";
import Storage from "../../services/Storage";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.api = new Api();
    this.store = new Storage();

    this.state = {
      user: this.store.get("user"),
      users: []
    };
  }

  componentDidMount() {
    this.api.get(`/users`)
      .then(users => {console.log("users", users);
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
              <span className="content-sidebar-profile-name">{this.state.user.name}</span>
            </span>
        </div>
        <div className={"sidebar-widget"}>
          <ul>
            <li><a href={"/dash"}>Home</a></li>
              <li><a href={"/about"}>About</a></li>
          </ul>
        </div>
        <div className={"sidebar-widget"}>
          <ul>
            <li className={"title"}>Users</li>
            {this.state.users.map((user) =>
              <li key={user._id}><a href={`/users/${user._id}`}>{user.name}</a></li>
            )}
          </ul>
        </div>
        <div className={"sidebar-widget bottom"}>
          <ul>
            <li><a href="">Logout</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;