import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./views/Home";
import About from "./views/About";
import Profile from "./views/Profile";

import Sidebar from "./structural/sidebar";
import MessageSend from "./forms/message-send";

class Wrapper extends Component {
  render() {
    return (
      <div className="container">
        <div className={"content-sidebar"}>

          <Sidebar />

        </div>
        <div className={"content-main"}>
          <div className={"content-container"}>

              <Router>
                  <div className={"messages"}>
                      <Route exact path="/" component={Home} />
                      <Route path="/about" component={About} />
                      <Route path={"/users/:id"} component={Profile} />
                  </div>
              </Router>

          </div>
          <div className={"message-input"}>

            <MessageSend />

          </div>
        </div>
      </div>
    );
  }
}

export default Wrapper;