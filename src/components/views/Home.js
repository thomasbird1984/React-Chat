import React, { Component } from "react";
import socketClient from "socket.io-client";
import Api from "../../services/Api";
import Storage from "../../services/Storage";

import MessageList from "../partials/messages-list";

class Home extends Component {

    constructor(props) {
      super(props);

      this.state = {
        messages: [],
        msg: "",
        endpoint: "http://localhost:4500"
      };

      this.api = new Api();
      this.store = new Storage();
      this.socket = socketClient(this.state.endpoint);
    }

    componentDidMount() {
      // get the saved messages
      this.api.get(`/messages`).then((chats) => {
        this.setState({ messages: chats });
      });

      // receive new messages
      this.socket.on("message-received", (msg) => {console.log("received new message", msg);
        const previous = this.state.messages;
        previous.unshift(msg);
        this.setState({
          messages: previous
        });
      });
    }

    render() {
      return (
        <MessageList
          messages={this.state.messages}
        />
      );
    }
}

export default Home;