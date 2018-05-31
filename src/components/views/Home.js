import React, { Component } from "react";
import socketClient from "socket.io-client";

import MessageList from "../partials/messages-list";

class Home extends Component {

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
            <MessageList
                messages={this.state.messages}
            />
        );
    }
}

export default Home;