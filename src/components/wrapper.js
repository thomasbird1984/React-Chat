import React, { Component } from "react";

import socketClient from "socket.io-client";

import MessageList from "./messages-list";
import StructuralSidebar from "./structural-sidebar";

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

  send() {
    if(this.state.msg !== "") {
      this.socket.emit("message-sent", this.state.msg);
      this.setState({ msg: "" });
    }
  }

  handleChange(e) {
    this.setState({ msg: e.target.value });
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

            <input
              type={"text"}
              value={this.state.msg}
              placeholder={"Enter message..."}
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <button
              type={"button"}
              onClick={() => {
                this.send();
              }}>
                Send
            </button>

          </div>
        </div>
      </div>
    );
  }
}

export default Wrapper;