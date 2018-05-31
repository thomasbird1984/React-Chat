import React, { Component } from "react";
import socketClient from "socket.io-client";

import MessageList from "./messages-list";
import StructuralSidebar from "./structural-sidebar";
import FormMessage from "./form-message";

class Wrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      msg: "",
      endpoint: "http://localhost:4500"
    };

    this.socket = socketClient(this.state.endpoint);
  }

  componentDidMount() {
    this.socket.on("message-received", (msg) => {
      const previous = this.state.messages;
      previous.unshift(msg);
      this.setState({
        messages: previous
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className={"content-sidebar"}>

          <StructuralSidebar />

        </div>
        <div className={"content-main"}>
          <div className={"messages"}>

            <MessageList
              messages={this.state.messages}
            />

          </div>
          <div className={"message-input"}>

            <FormMessage />

          </div>
        </div>
      </div>
    );
  }
}

export default Wrapper;