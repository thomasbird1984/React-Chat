import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
            <li><a href="">Link 1</a></li>
            <li><a href="">Link 2</a></li>
            <li><a href="">Link 3</a></li>
            <li><a href="">Link 4</a></li>
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